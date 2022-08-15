import { createHash } from "node:crypto"

// advertiser: 16bit
export const ADVERTISER = {
  shop: 1,
  travel: 2
}

// publisher:  16bit
export const PUBLISHER = {
  news: 1
}

// dimention: 8bit
export const DIMENTION = {
  quantity: 0,
  gross: 1
}

// advertiser: 16bit
// publisher:  16bit
// id:         24bit
// dimention:   8bit
// -----------------
//             64bit
export function sourceKeyPiece({ advertiser, publisher, id, dimention }) {
  console.log({ advertiser, publisher, id, dimention })
  const buffer = new DataView(new ArrayBuffer(8))
  const prefix = 1 << 15 // make first bit to 1
  buffer.setUint16(0, prefix + advertiser)
  buffer.setUint16(2, publisher)
  buffer.setUint32(4, (id << 8) + dimention)
  return `0x${(buffer.getBigUint64() << 64n).toString(16)}`
}

// id:         24bit
// size:        8bit
// category:    8bit
// opt:        24bit
// -----------------
//             64bit
export function triggerKeyPiece({ id, size, cat: category }) {
  const buffer = new DataView(new ArrayBuffer(8))
  const prefix = 1 << 31 // make first bit to 1
  buffer.setUint32(0, prefix + id)
  buffer.setUint8(4, size)
  buffer.setUint8(5, category)
  console.log(buffer.getBigUint64())
  return `0x0000000000000000${buffer.getBigUint64().toString(16)}`
}

export function sourceEventId() {
  // return `${Math.floor(Math.random() * 1000000000000000)}`
  return "999999999999999"
}

export function debugKey() {
  return "1111111111111"
}

function test() {
  const source = sourceKeyPiece({ advertiser: ADVERTISER.shop, publisher: PUBLISHER.news, id: 0xff, dimention: DIMENTION.gross })
  console.log({ source })

  const triger = triggerKeyPiece({ id: 0xff, size: 26.5, category: 1 })
  console.log({ triger })
}

test()
