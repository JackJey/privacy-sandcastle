import items from "./items.json" assert { type: "json" }

export type Order = {
  item: Item
  size: string
  quantity: number
}

export type Item = {
  id: string
  icon: string
  price: number
  category: string
  name: string
}

export async function getItems(): Promise<Item[]> {
  return items as Item[]
}

export async function getItem(id: string): Promise<Item> {
  return items.find((item) => {
    return item.id === id
  }) as Item
}
