import { createHash } from "node:crypto"

export function hash64(input) {
  return (createHash("sha256").update(input).digest().readBigInt64BE() << 64n).toString(16)
}

export function createHashAs64BitHex(input) {
  return createHash("sha256").update(input).digest("hex").substring(0, 16)
}

export function generateSourceKeyPiece(input) {
  const hash = createHashAs64BitHex(input)
  return `0x${hash}0000000000000000`
}

export function generateTriggerKeyPiece(input) {
  const hash = createHashAs64BitHex(input)
  return `0x0000000000000000${hash}`
}

function test() {
  const key_purchaseCount = generateSourceKeyPiece("COUNT, CampaignID=12, GeoID=7")
  const key_purchaseValue = generateSourceKeyPiece("VALUE, CampaignID=12, GeoID=7")
  console.assert(key_purchaseCount === "0x3cf867903fbb73ec0000000000000000")
  console.assert(key_purchaseValue === "0x245265f432f16e730000000000000000")
}
