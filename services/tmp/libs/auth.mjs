/*
 * @license
 * Copyright 2023 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License
 */
import express from "express"
const router = express.Router()
import crypto from "crypto"
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse
} from "@simplewebauthn/server"
import { isoBase64URL } from "@simplewebauthn/server/helpers"
import { Users, Credentials } from "./db.mjs"

router.use(express.json())

function csrfCheck(req, res, next) {
  // if (req.header("X-Requested-With") != "XMLHttpRequest") {
  //   return res.status(400).json({ error: "invalid access." })
  // }
  next()
}

/**
 * Checks CSRF protection using custom header `X-Requested-With`
 * If the session doesn't contain `signed-in`, consider the user is not authenticated.
 **/
function sessionCheck(req, res, next) {
  if (!req.session["signed-in"] || !req.session.username) {
    return res.status(401).json({ error: "not signed in." })
  }
  const user = Users.findByUsername(req.session.username)
  if (!user) {
    return res.status(401).json({ error: "user not found." })
  }
  res.locals.user = user
  next()
}

function getOrigin(userAgent) {
  let origin = process.env.ORIGIN

  const appRe = /^[a-zA-z0-9_.]+/
  const match = userAgent.match(appRe)
  if (match) {
    // Check if UserAgent comes from a supported Android app.
    if (process.env.ANDROID_PACKAGENAME && process.env.ANDROID_SHA256HASH) {
      const package_names = process.env.ANDROID_PACKAGENAME.split(",").map((name) => name.trim())
      const hashes = process.env.ANDROID_SHA256HASH.split(",").map((hash) => hash.trim())
      const appName = match[0]
      for (let i = 0; i < package_names.length; i++) {
        if (appName === package_names[i]) {
          // We recognize this app, so use the corresponding hash.
          const octArray = hashes[i].split(":").map((h) => parseInt(h, 16))
          const androidHash = isoBase64URL.fromBuffer(octArray)
          origin = `android:apk-key-hash:${androidHash}`
          break
        }
      }
    }
  }

  return origin
}

/**
 * Check username, create a new account if it doesn't exist.
 * Set a `username` in the session.
 **/
router.post("/username", async (req, res) => {
  const { username } = req.body
  console.error({ username })
  try {
    // Only check username, no need to check password as this is a mock
    if (username && /^[a-zA-Z0-9@\.\-_]+$/.test(username)) {
      // See if account already exists
      let user = Users.findByUsername(username)
      // If user entry is not created yet, create one
      if (!user) {
        user = {
          id: isoBase64URL.fromBuffer(crypto.randomBytes(32)),
          username,
          displayName: username
        }
        await Users.update(user)
      }
      // Set username in the session
      req.session.username = username

      return res.json(user)
    } else {
      throw new Error("Invalid username")
    }
  } catch (e) {
    console.error(e)
    return res.status(400).send({ error: e.message })
  }
})

/**
 * Verifies user credential and let the user sign-in.
 * No preceding registration required.
 * This only checks if `username` is not empty string and ignores the password.
 **/
router.post("/password", (req, res) => {
  if (!req.body.password) {
    return res.status(401).json({ error: "Enter at least one random letter." })
  }
  const user = Users.findByUsername(req.session.username)

  if (!user) {
    return res.status(401).json({ error: "Enter username first." })
  }

  req.session["signed-in"] = "yes"
  return res.json(user)
})

router.post("/userinfo", csrfCheck, sessionCheck, (req, res) => {
  const { user } = res.locals
  return res.json(user)
})

router.put("/userinfo", sessionCheck, async (req, res) => {
  const { newName } = req.body
  if (newName) {
    const { user } = res.locals
    user.displayName = newName
    await Users.update(user)
    return res.json(user)
  } else {
    return res.status(400)
  }
})

router.get("/signout", (req, res) => {
  // Remove the session
  req.session.destroy()
  // Redirect to `/`
  return res.redirect(307, "/")
})

router.get("/keys", csrfCheck, sessionCheck, async (req, res) => {
  const { user } = res.locals
  const credentials = Credentials.findByUserId(user.id)
  return res.json(credentials || {})
})

router.put("/key", sessionCheck, async (req, res) => {
  const { id, newName } = req.body
  const { user } = res.locals
  const credential = Credentials.findById(id)
  if (!user || user.id !== credential?.user_id) {
    return res.status(401).json({ error: "User not authorized." })
  }
  credential.name = newName
  await Credentials.update(credential)
  return res.json(credential)
})

router.delete("/key", sessionCheck, async (req, res) => {
  const query = req.query
  console.log({ query })
  const { id } = req.query
  const { user } = res.locals
  await Credentials.remove(id, user.id)
  return res.sendStatus(204)
})

router.post("/registerRequest", csrfCheck, sessionCheck, async (req, res) => {
  const { user } = res.locals
  try {
    // `excludeCredentials` prevents users from re-registering existing authenticators.
    const excludeCredentials = []
    const credentials = Credentials.findByUserId(user.id)
    for (const cred of credentials) {
      excludeCredentials.push({
        id: isoBase64URL.toBuffer(cred.id),
        type: "public-key",
        transports: cred.transports
      })
    }
    // Specify the type of authenticator you will allow.
    const authenticatorSelection = {
      authenticatorAttachment: "platform",
      requireResidentKey: true
    }
    // Leave attestation `"none"`
    const attestationType = "none"

    console.log({user})

    // Generate registration options for WebAuthn create
    const options = generateRegistrationOptions({
      rpName: process.env.RP_NAME,
      rpID: process.env.HOSTNAME,
      userID: user.id,
      userName: user.username,
      userDisplayName: user.displayName || user.username,
      // Prompt users for additional information about the authenticator.
      attestationType,
      excludeCredentials,
      authenticatorSelection
    })

    // Keep the challenge in the session
    req.session.challenge = options.challenge

    return res.json(options)
  } catch (e) {
    console.error(e)
    return res.status(400).send({ error: e.message })
  }
})

router.post("/registerResponse", csrfCheck, sessionCheck, async (req, res) => {
  const expectedChallenge = req.session.challenge
  const expectedOrigin = getOrigin(req.get("User-Agent"))
  const expectedRPID = process.env.HOSTNAME
  const response = req.body

  try {
    const op = {
      response,
      expectedChallenge,
      expectedOrigin,
      expectedRPID
    }
    console.log({ op })

    // Verify the credential
    const { verified, registrationInfo } = await verifyRegistrationResponse(op)

    if (!verified) {
      throw new Error("User verification failed.")
    }

    const { credentialPublicKey, credentialID } = registrationInfo

    const base64CredentialID = isoBase64URL.fromBuffer(credentialID)
    const base64PublicKey = isoBase64URL.fromBuffer(credentialPublicKey)

    const { user } = res.locals

    await Credentials.update({
      id: base64CredentialID,
      publicKey: base64PublicKey,
      name: req.useragent.platform, // Name the passkey with a user-agent string
      transports: response.response.transports,
      user_id: user.id
    })

    // Don't forget to kill the challenge for this session.
    delete req.session.challenge

    return res.json(user)
  } catch (e) {
    delete req.session.challenge

    console.error(e)
    return res.status(400).send({ error: e.message })
  }
})

router.post("/publickey", async (req, res) => {
  try {
    const options = await generateAuthenticationOptions({
      rpID: process.env.HOSTNAME,
      allowCredentials: []
    })
    req.session.challenge = options.challenge
    return res.json(options)
  } catch (e) {
    console.error(e)
    return res.status(400).json({ error: e.message })
  }
})

router.post("/session", csrfCheck, async (req, res) => {
  const response = req.body
  const expectedChallenge = req.session.challenge
  const expectedOrigin = getOrigin(req.get("User-Agent"))
  const expectedRPID = process.env.HOSTNAME

  try {
    // Find the credential stored to the database by the credential ID
    const cred = Credentials.findById(response.id)
    if (!cred) {
      throw new Error("Credential not found.")
    }

    // Find the user by the user ID stored to the credential
    const user = Users.findById(cred.user_id)
    if (!user) {
      throw new Error("User not found.")
    }

    // Base64URL decode some values
    const authenticator = {
      credentialPublicKey: isoBase64URL.toBuffer(cred.publicKey),
      credentialID: isoBase64URL.toBuffer(cred.id),
      transports: cred.transports
    }

    const opt = {
      response,
      expectedChallenge,
      expectedOrigin,
      expectedRPID,
      authenticator
    }
    console.log({authenticator})
    console.log({opt})

    console.log({response})

    // Verify the credential
    const { verified, authenticationInfo } = await verifyAuthenticationResponse(opt)

    if (!verified) {
      throw new Error("User verification failed.")
    }

    // Don't forget to kill the challenge for this session.
    delete req.session.challenge

    req.session.username = user.username
    req.session["signed-in"] = "yes"

    return res.json(user)
  } catch (e) {
    delete req.session.challenge

    console.error(e)
    return res.status(400).json({ error: e.message })
  }
})

export { router as auth }
