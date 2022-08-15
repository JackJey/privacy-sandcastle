import { createHash } from "node:crypto"

export function hash64(input) {
  return createHash("sha256").update(input).digest().readBigUInt64BE()
}

export function sourceKeyPiece(input) {
  const hash = hash64(input).toString(16)
  return `0x${hash}0000000000000000`
}

export function triggerKeyPiece(input) {
  const hash = hash64(input).toString(16)
  return `0x0000000000000000${hash}`
}

export function sourceEventId() {
  // return `${Math.floor(Math.random() * 1000000000000000)}`
  return `999999999999999`
}

export function debugKey() {
  return "1111111111111"
}

function test() {
  const COUNT = "COUNT, CampaignID=12, GeoID=7"
  console.log(createHash("sha256").update(COUNT).digest().readBigUInt64BE().toString(16))
  const VALUE = "VALUE, CampaignID=12, GeoID=7"
  const key_purchaseCount = sourceKeyPiece(COUNT)
  const key_purchaseValue = sourceKeyPiece(VALUE)
  console.log(key_purchaseCount)
  console.log(key_purchaseValue)
  console.assert(key_purchaseCount === "0x3cf867903fbb73ec0000000000000000")
  console.assert(key_purchaseValue === "0x245265f432f16e730000000000000000")

  const CATEGORY = `ProductCategory=${25}`
  const key_piece = triggerKeyPiece(CATEGORY)
  console.log(key_piece)
  console.assert(key_piece === "0x0000000000000000f9e491fe37e55a0c")
}

test()
