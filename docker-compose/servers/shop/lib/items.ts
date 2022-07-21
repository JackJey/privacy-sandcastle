export class Item {
  id: string
  name: string
  icon: string
  price: number
  constructor({ id, name, icon, price }: { id: string; name: string; icon: string; price: number }) {
    this.id = id
    this.name = name
    this.icon = icon
    this.price = price
  }
}

export const items = [
  new Item({ id: "1f45e", icon: "👞", price: 180, name: "Man's Shoe" }),
  new Item({ id: "1f45f", icon: "👟", price: 100, name: "Running Shoe" }),
  new Item({ id: "1f460", icon: "👠", price: 200, name: "High-Heeled Shoe" }),
  new Item({ id: "1f461", icon: "👡", price: 120, name: "Woman's Sandal" }),
  new Item({ id: "1f462", icon: "👢", price: 400, name: "Woman's Boot" }),
  new Item({ id: "1f6fc", icon: "🛼", price: 230, name: "Roller Skate" }),
  new Item({ id: "1f97e", icon: "🥾", price: 210, name: "Hiking Boot" }),
  new Item({ id: "1f97f", icon: "🥿", price: 140, name: "Flat Shoe" }),
  new Item({ id: "1fa70", icon: "🩰", price: 900, name: "Ballet Shoes" }),
  new Item({ id: "1fa74", icon: "🩴", price: 12, name: "Thong Sandal" }),
  new Item({ id: "1f3bf", icon: "🎿", price: 1120, name: "Ski Boots" }),
  new Item({ id: "26f8", icon: "⛸", price: 1200, name: "Ice Skate" })
]

export function getItem(id: string): Item {
  return items
  .filter((item) => {
      return item.id === id
    })
    .at(0) as Item
}
