// advertiser: 16bit
export const ADVERTISER = ["shop", "travel"]

// publisher:  16bit
export const PUBLISHER = ["news"]

// dimention: 8bit
export const DIMENTION = ["quantity", "gross"]

export function sourceKeyPiece({ advertiser, publisher, id, dimention }) {
  console.log({ advertiser, publisher, id, dimention })
  const source = encodeSource({ advertiser, publisher, id, dimention })
  const uint64 = new DataView(source).getBigUint64()
  return `0x${(uint64 << 64n).toString(16)}`
}

export function triggerKeyPiece({ id, size, category }) {
  console.log({ id, size, category })
  const trigger = encodeTrigger({ id, size, category })
  const uint64 = new DataView(trigger).getBigUint64()
  return `0x${"0".repeat(16)}${uint64.toString(16)}`
}

// advertiser: 16bit
// publisher:  16bit
// id:         24bit
// dimention:   8bit
// -----------------
//             64bit
export function encodeSource({ advertiser, publisher, id, dimention }) {
  const buffer = new ArrayBuffer(8)
  const view = new DataView(buffer)
  const prefix = 1 << 15 // make first bit to 1
  view.setUint16(0, prefix + advertiser)
  view.setUint16(2, publisher)
  view.setUint32(4, (id << 8) + dimention)
  return buffer
}

export function decodeSource(buffer) {
  const view = new DataView(buffer)
  const prefix = 1 << 15
  const advertiser = view.getUint16(0) - prefix
  const publisher = view.getUint16(2)
  const id_dimention = view.getUint32(4)
  const id = id_dimention >> 8
  const dimention = id_dimention & 0xff
  return { advertiser, publisher, id, dimention }
}

// id:         24bit
// size:        8bit
// category:    8bit
// opt:        24bit
// -----------------
//             64bit
export function encodeTrigger({ id, size, category }) {
  const buffer = new ArrayBuffer(8)
  const view = new DataView(buffer)
  const prefix = 1 << 31 // make first bit to 1
  view.setUint32(0, prefix + (id << 8) + size)
  view.setUint8(4, category)
  return buffer
}

export function decodeTrigger(buffer) {
  const view = new DataView(buffer)
  const prefix = 1 << 31 // make first bit to 1
  const uint32 = view.getUint32(0) - prefix
  const id = uint32 >> 8
  const size = uint32 & 0xff
  const category = view.getUint8(4)
  return { id, size, category }
}

export function decodeBucket(buffer) {
  const u8a = new Uint8Array(buffer)
  const sourceBuf = u8a.slice(0, u8a.length / 2)
  const source = decodeSource(sourceBuf.buffer)
  const triggerBuf = u8a.slice(u8a.length / 2, u8a.length)
  const trigger = decodeTrigger(triggerBuf.buffer)

  source.advertiser = ADVERTISER.at(source.advertiser)
  source.publisher = PUBLISHER.at(source.publisher)
  source.dimention = DIMENTION.at(source.dimention)
  source.id = source.id.toString(16)

  trigger.id = trigger.id.toString(16)

  return {
    source,
    trigger
  }
}

export function sourceEventId() {
  // 64bit dummy value
  return ((1n << 64n) - 1n).toString()
}

export function debugKey() {
  // 64bit dummy value
  return ((1n << 64n) - 2n).toString()
}

function test() {
  const advertiser = ADVERTISER.indexOf("shop")
  const publisher = PUBLISHER.indexOf("news")
  const id = 0xff
  const dimention = DIMENTION.indexOf("gross")
  const size = (26.5 - 20) * 10
  const category = 1

  const source_key = sourceKeyPiece({ advertiser, publisher, id, dimention })
  console.log({ source_key })

  const triger_key = triggerKeyPiece({ id, size, category })
  console.log({ triger_key })

  const source = encodeSource({ advertiser, publisher, id, dimention })
  console.log(decodeSource(source))

  const trigger = encodeTrigger({ id, size, category })
  console.log(decodeTrigger(trigger))

  const arr = new Uint8Array("80 01 00 01 01 f4 5e 01 81 f4 5e 32 01 00 00 00".split(" ").map((e) => Number(`0x${e}`)))
  console.log(decodeBucket(arr.buffer))
}

// test()
