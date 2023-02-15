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

import { cookies } from "next/headers"
import { Order } from "./items"

export async function fetchCart() {
  const host = process.env.host || "localhost"
  const port = "3000"
  const url = `http://${host}:${port}/api/cart`
  const cookie = cookies().get("__session")
  const Cookie = `__session=${cookie?.value}`
  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      Cookie
    }
  })
  const cart: Order[] = await res.json()
  return cart
}
