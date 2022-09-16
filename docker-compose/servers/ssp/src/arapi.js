// type: 2bit
export const SOURCE_TYPE = {
  click: 0b10,
  view: 0b11
}

// advertiser: 16bit
export const ADVERTISER = {
  shop: 0b0,
  travel: 0b1
}

// publisher:  16bit
export const PUBLISHER = {
  news: 0b0
}

// dimention: 8bit
export const DIMENTION = {
  quantity: 0b0,
  gross: 0b1
}

// type 8bit
export const TRIGGER_TYPE = {
  quantity: 0b1000_0000,
  gross: 0b1100_0000
}

export function sourceKeyPiece({ type, dimention, id, advertiser, publisher }) {
  console.log({ type, dimention, id, advertiser, publisher })
  const source = encodeSource({ type, dimention, id, advertiser, publisher })
  const uint64 = new DataView(source).getBigUint64()
  return `0x${(uint64 << 64n).toString(16)}`
}

export function triggerKeyPiece({ type, id, size, category, option }) {
  console.log({ type, id, size, category, option })
  const trigger = encodeTrigger({ type, id, size, category, option })
  const uint64 = new DataView(trigger).getBigUint64()
  return `0x${"0".repeat(16)}${uint64.toString(16)}`
}

// type:        2bit
// dimention:   6bit
// id:         24bit
// advertiser: 16bit
// publisher:  16bit
// -----------------
//             64bit
function encodeSource({ type, dimention, id, advertiser, publisher }) {
  const buffer = new ArrayBuffer(8)
  const view = new DataView(buffer)
  const first32 = (((type << 6) + dimention) << 24) + id
  view.setUint32(0, first32)
  view.setUint16(4, advertiser)
  view.setUint16(6, publisher)
  return buffer
}

function decodeSource(buffer) {
  const view = new DataView(buffer)
  const first32 = view.getUint32(0)
  const id = first32 & (2 ** 24 - 1)
  const first8 = first32 >>> 24
  const dimention = first8 & 0b111111
  const type = first8 >>> 6
  const advertiser = view.getUint16(4)
  const publisher = view.getUint16(6)
  return { type, dimention, id, advertiser, publisher }
}

// type:      8bit
// id:       24bit
// size:      8bit
// category:  8bit
// option:   16bit
// -----------------
//             64bit
function encodeTrigger({ type, id, size, category, option }) {
  const buffer = new ArrayBuffer(8)
  const view = new DataView(buffer)
  view.setUint32(0, (type << 24) + id)
  view.setUint8(4, size)
  view.setUint8(5, category)
  view.setUint16(6, option)
  return buffer
}

function decodeTrigger(buffer) {
  const view = new DataView(buffer)
  const first32 = view.getUint32(0)
  const type = first32 >>> 24
  const id = first32 & 0xffffff
  const size = view.getUint8(4)
  const category = view.getUint8(5)
  const option = view.getUint16(6)
  return { type, id, size, category, option }
}

export function decodeBucket(buffer) {
  const u8a = new Uint8Array(buffer)
  const sourceBuf = u8a.slice(0, u8a.length / 2)
  const source = decodeSource(sourceBuf.buffer)
  const triggerBuf = u8a.slice(u8a.length / 2, u8a.length)
  const trigger = decodeTrigger(triggerBuf.buffer)

  source.type = key_from_value(SOURCE_TYPE, source.type)
  source.dimention = key_from_value(DIMENTION, source.dimention)
  source.id = source.id.toString(16)
  source.advertiser = key_from_value(ADVERTISER, source.advertiser)
  source.publisher = key_from_value(PUBLISHER, source.publisher)

  trigger.type = key_from_value(TRIGGER_TYPE, trigger.type)
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

function key_from_value(obj, value) {
  return Object.entries(obj)
    .filter(([k, v]) => v === value)
    .at(0)
    .at(0)
}

function test() {
  const advertiser = ADVERTISER["shop"]
  const publisher = PUBLISHER["news"]
  const id = 0xff
  const dimention = DIMENTION["gross"]
  const size = (26.5 - 20) * 10
  const category = 1
  const source_type = SOURCE_TYPE.click
  const trigger_type = TRIGGER_TYPE.gross
  const option = 2

  const source_key = sourceKeyPiece({ type: source_type, dimention, id, advertiser, publisher })
  console.log({ source_key })

  const triger_key = triggerKeyPiece({ type: trigger_type, id, size, category, option })
  console.log({ triger_key })

  const source = encodeSource({ type: source_type, dimention, id, advertiser, publisher })
  console.log(decodeSource(source))

  const trigger = encodeTrigger({ type: trigger_type, id, size, category, option })
  console.log(decodeTrigger(trigger))
}

test()
