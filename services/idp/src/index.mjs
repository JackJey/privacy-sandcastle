/*
 Copyright 2022 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

// IDP
import crypto from "crypto"
import express from "express"
import session from "express-session"
import useragent from "express-useragent"

import {
  generateRegistrationOptions,
  generateAuthenticationOptions,
  verifyRegistrationResponse,
  verifyAuthenticationResponse
} from "@simplewebauthn/server"
import { isoBase64URL } from "@simplewebauthn/server/helpers"

const { EXTERNAL_PORT, PORT, IDP_HOST, IDP_TOKEN, IDP_DETAIL } = process.env

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(useragent.express())
app.use(
  session({
    secret: "secret", // You should specify a real secret here
    resave: true,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    }
  })
)

app.use((req, res, next) => {
  console.log(req.method, req.path, req.session.user, req.body)
  if (req.session.user === undefined) {
    req.session.user = {
      id: null,
      name: null,
      credentials: {}
    }
  }
  if (req.session.challenge === undefined) {
    req.session.challenge = null
  }
  next()
})

app.use(
  express.static("src/public", {
    setHeaders: (res, path, stat) => {}
  })
)
app.set("view engine", "ejs")
app.set("views", "src/views")

app.get("/", async (req, res) => {
  const { user } = req.session
  res.render("index", { user })
})

/**
 * Identify Account
 */
app.get("/login/account", async (req, res) => {
  res.render("login/account", {})
})

app.post("/login/account", async (req, res) => {
  const { username } = req.body
  // create new user
  req.session.user.id = isoBase64URL.fromBuffer(crypto.randomBytes(32))
  req.session.user.name = username
  res.redirect("/login/password")
})

/**
 * Password Authentication
 */
app.get("/login/password", async (req, res) => {
  const { user } = req.session
  res.render("login/password", { user })
})

app.post("/login/password", async (req, res) => {
  const { username, password } = req.body
  res.redirect("/login/second-factor")
})

/**
 * 2FA
 */
app.get("/login/second-factor", async (req, res) => {
  const { user } = req.session
  res.render("login/second-factor", { user })
})

/**
 * Passkey
 */
app.post("/login/passkey", async (req, res) => {
  const { user } = req.session
  const response = req.body

  const credential = user.credentials[response.id]

  const options = {
    response,
    expectedChallenge: req.session.challenge,
    expectedOrigin: req.headers.origin,
    expectedRPID: process.env.IDP_HOST,
    authenticator: {
      credentialPublicKey: isoBase64URL.toBuffer(credential.publicKey),
      credentialID: isoBase64URL.toBuffer(credential.id),
      transports: credential.transports
    }
  }

  // Verify the credential
  const { verified, authenticationInfo } = await verifyAuthenticationResponse(options)
  console.log({
    verified,
    authenticationInfo
  })

  // cleanup challenge
  req.session.challenge = null

  if (verified) {
    return res.json({ verified })
  } else {
    return res.status(400).json({ verified })
  }
})

/**
 * Passkey
 */
app.get("/credential/publickey", async (req, res) => {
  const { user } = req.session

  console.log({ user })

  const options = generateRegistrationOptions({
    rpName: "Privacy Sandcastle IDP",
    rpID: process.env.IDP_HOST,
    userID: user.id,
    userName: user.name,
    userDisplayName: user.name,

    // prompt users for additional information about the authenticator.
    attestationType: "none",

    // prevents users from re-registering existing authenticators.
    excludeCredentials: [],
    authenticatorSelection: {
      authenticatorAttachment: "platform",
      requireResidentKey: true
    }
  })

  req.session.challenge = options.challenge

  return res.json(options)
})

app.get("/credential", async (req, res) => {
  const options = await generateAuthenticationOptions({
    rpID: process.env.IDP_HOST,
    allowCredentials: []
  })
  req.session.challenge = options.challenge
  return res.json(options)
})

app.post("/credential", async (req, res) => {
  const options = {
    response: req.body,
    expectedChallenge: req.session.challenge,
    expectedOrigin: req.headers.origin,
    expectedRPID: process.env.IDP_HOST
  }

  const { verified, registrationInfo } = await verifyRegistrationResponse(options)

  const credential = {
    id: isoBase64URL.fromBuffer(registrationInfo.credentialID),
    publicKey: isoBase64URL.fromBuffer(registrationInfo.credentialPublicKey),
    name: req.useragent.platform, // Name the passkey with a user-agent string
    transports: req.body.response.transports
  }

  // save credentials
  req.session.user.credentials[credential.id] = credential

  // cleanup challenge
  req.session.challenge = null

  if (verified) {
    return res.json({ verified })
  } else {
    return res.status(400).json({ verified })
  }
})

/**
 * Register Account
 */
app.get("/signup", async (req, res) => {
  const title = IDP_DETAIL
  res.render("signup", { title })
})

app.listen(PORT || 3000, function () {
  console.log(`Listening on port ${PORT || 3000}`)
})
