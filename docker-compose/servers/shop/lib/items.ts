export type Item = {
  id: string,
  icon: string,
  price: number,
  name: string
}

export const items: Array<Item> = [
  { id: "1f45e", icon: "👞", price: 180, name: "Man's Shoe" },
  { id: "1f45f", icon: "👟", price: 100, name: "Running Shoe" },
  { id: "1f460", icon: "👠", price: 200, name: "High-Heeled Shoe" },
  { id: "1f461", icon: "👡", price: 120, name: "Woman's Sandal" },
  { id: "1f462", icon: "👢", price: 400, name: "Woman's Boot" },
  { id: "1f6fc", icon: "🛼", price: 230, name: "Roller Skate" },
  { id: "1f97e", icon: "🥾", price: 210, name: "Hiking Boot" },
  { id: "1f97f", icon: "🥿", price: 140, name: "Flat Shoe" },
  { id: "1fa70", icon: "🩰", price: 900, name: "Ballet Shoes" },
  { id: "1fa74", icon: "🩴", price: 12, name: "Thong Sandal" },
  { id: "1f3bf", icon: "🎿", price: 1120, name: "Ski Boots" },
  { id: "26f8", icon: "⛸", price: 1200, name: "Ice Skate" },
]

export function getItem(id: string): Item {
  return items
  .filter((item) => {
      return item.id === id
    })
    .at(0) as Item
}
