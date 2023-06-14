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
const base64url = {
  encode: (buffer) => {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)))
      .replaceAll(/=/g, "")
      .replaceAll(/\+/g, "-")
      .replaceAll(/\//g, "_")
  },
  decode: (base64url) => {
    const base64 = base64url.replaceAll(/-/g, "+").replaceAll(/_/g, "/")
    const raw = atob(base64)
    const arr = Array.from(raw, (c) => c.charCodeAt(0))
    const bin = new Uint8Array(arr)
    return bin.buffer
  }
}

async function passkeySupport() {
  const [verifiable, conditional] = await Promise.all([
    // Is platform authenticator available in this browser?
    PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable(),
    // Is conditional UI available in this browser?
    PublicKeyCredential.isConditionalMediationAvailable()
  ])
  return { verifiable, conditional }
}

document.addEventListener("DOMContentLoaded", async () => {
  const $ = document.querySelector.bind(document)
  const publicKey = await (await fetch("/credential")).json()
  console.log({ publicKey })

  publicKey.challenge = base64url.decode(publicKey.challenge)

  // Request a conditional UI
  const credentials = await navigator.credentials.get({
    mediation: "conditional",
    publicKey
  })

  console.log({ credentials })

  const body = {
    id: credentials.id,
    rawId: credentials.id,
    type: credentials.type,
    response: {
      clientDataJSON: base64url.encode(credentials.response.clientDataJSON),
      authenticatorData: base64url.encode(credentials.response.authenticatorData),
      signature: base64url.encode(credentials.response.signature),
      userHandle: base64url.encode(credentials.response.userHandle)
    }
  }

  const res = await (
    await fetch(`/login/passkey`, {
      method: "post",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(body)
    })
  ).json()
  console.log(res)
})
