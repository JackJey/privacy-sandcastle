const items = [
  { id: "1f45e", icon: "👞", price: 180, category: "luxury", name: "Man's Shoe" },
  { id: "1f45f", icon: "👟", price: 100, category: "sale", name: "Running Shoe" },
  { id: "1f460", icon: "👠", price: 200, category: "luxury", name: "High-Heeled Shoe" },
  { id: "1f461", icon: "👡", price: 120, category: "sale", name: "Woman's Sandal" },
  { id: "1f462", icon: "👢", price: 400, category: "luxury", name: "Woman's Boot" },
  { id: "1f6fc", icon: "🛼", price: 230, category: "sports", name: "Roller Skate" },
  { id: "1f97e", icon: "🥾", price: 210, category: "sports", name: "Hiking Boot" },
  { id: "1f97f", icon: "🥿", price: 140, category: "sale", name: "Flat Shoe" },
  { id: "1fa70", icon: "🩰", price: 900, category: "sports", name: "Ballet Shoes" },
  { id: "1fa74", icon: "🩴", price: 12, category: "sale", name: "Thong Sandal" },
  { id: "1f3bf", icon: "🎿", price: 1120, category: "sports", name: "Ski Boots" },
  { id: "26f8", icon: "⛸", price: 1200, category: "sports", name: "Ice Skate" }
]

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
