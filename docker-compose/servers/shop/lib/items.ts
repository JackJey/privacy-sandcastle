export type Order = {
  item: Item
  size: string
  quantity: number
}

export type Item = {
  id: string
  icon: string
  price: number
  name: string
}
