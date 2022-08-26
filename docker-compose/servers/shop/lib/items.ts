const items = [
  { id: "1f45e", icon: "👞", price: 180, category: 1, name: "Man's Shoe" },
  { id: "1f45f", icon: "👟", price: 100, category: 0, name: "Running Shoe" },
  { id: "1f460", icon: "👠", price: 200, category: 1, name: "High-Heeled Shoe" },
  { id: "1f461", icon: "👡", price: 120, category: 0, name: "Woman's Sandal" },
  { id: "1f462", icon: "👢", price: 400, category: 1, name: "Woman's Boot" },
  { id: "1f6fc", icon: "🛼", price: 230, category: 2, name: "Roller Skate" },
  { id: "1f97e", icon: "🥾", price: 210, category: 2, name: "Hiking Boot" },
  { id: "1f97f", icon: "🥿", price: 140, category: 0, name: "Flat Shoe" },
  { id: "1fa70", icon: "🩰", price: 900, category: 2, name: "Ballet Shoes" },
  { id: "1fa74", icon: "🩴", price: 12, category: 0, name: "Thong Sandal" },
  { id: "1f3bf", icon: "🎿", price: 1120, category: 2, name: "Ski Boots" },
  { id: "26f8", icon: "⛸", price: 1200, category: 2, name: "Ice Skate" }
]

export const CATEGORIES = ["sale", "luxury", "sports"]

export type Order = {
  item: Item
  size: string
  quantity: number
}

export type Item = {
  id: string
  icon: string
  price: number
  category: number
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

export function displayCategory(id: number): string {
  return CATEGORIES.at(id) || "N/A"
}

export function toSize(num: number): string {
  return `${num / 10 + 20}`
}

export function fromSize(size: string): number {
  return (Number(size) - 20) * 10
}
