export class Item {
  name: string
  icon: string
  price: number
  constructor({ name, icon, price }: { name: string; icon: string; price: number }) {
    this.name = name
    this.icon = icon
    this.price = price
  }
}

export const items = [
  new Item({ icon: "👟", price: 100, name: "Running Shoe" }),
  new Item({ icon: "🥿", price: 100, name: "Flat Shoe" }),
  new Item({ icon: "👠", price: 100, name: "High-Heeled Shoe" }),
  new Item({ icon: "👞", price: 100, name: "Man's Shoe" }),
  new Item({ icon: "🥾", price: 100, name: "Hiking Boot" }),
  new Item({ icon: "👢", price: 100, name: "Woman's Boot" }),
  new Item({ icon: "👡", price: 100, name: "Woman's Sandal" }),
  new Item({ icon: "🩰", price: 100, name: "Ballet Shoes" }),
  new Item({ icon: "⛸", price: 100, name: "Ice Skate" }),
  new Item({ icon: "🛼", price: 100, name: "Roller Skate" }),
  new Item({ icon: "🩴", price: 100, name: "Thong Sandal" }),
  new Item({ icon: "🎿", price: 100, name: "Ski Boots" })
]
