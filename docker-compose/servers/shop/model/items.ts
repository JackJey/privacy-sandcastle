export class Item {
  id: number
  name: string
  icon: string
  price: number
  constructor({ id, name, icon, price }: { id: number; name: string; icon: string; price: number }) {
    this.id = id
    this.name = name
    this.icon = icon
    this.price = price
  }
}

export const items = [
  new Item({
    id: 1000,
    icon: "👟",
    price: 100,
    name: "Running Shoe"
  }),
  new Item({
    id: 1001,
    icon: "🥿",
    price: 140,
    name: "Flat Shoe"
  }),
  new Item({
    id: 1002,
    icon: "👠",
    price: 200,
    name: "High-Heeled Shoe"
  }),
  new Item({
    id: 1003,
    icon: "👞",
    price: 180,
    name: "Man's Shoe"
  }),
  new Item({
    id: 1004,
    icon: "🥾",
    price: 210,
    name: "Hiking Boot"
  }),
  new Item({
    id: 1005,
    icon: "👢",
    price: 400,
    name: "Woman's Boot"
  }),
  new Item({
    id: 1006,
    icon: "👡",
    price: 320,
    name: "Woman's Sandal"
  }),
  new Item({
    id: 1007,
    icon: "🩰",
    price: 900,
    name: "Ballet Shoes"
  }),
  new Item({
    id: 1008,
    icon: "⛸",
    price: 1200,
    name: "Ice Skate"
  }),
  new Item({
    id: 1009,
    icon: "🛼",
    price: 400,
    name: "Roller Skate"
  }),
  new Item({
    id: 1010,
    icon: "🩴",
    price: 80,
    name: "Thong Sandal"
  }),
  new Item({
    id: 1011,
    icon: "🎿",
    price: 1120,
    name: "Ski Boots"
  })
]

export function getItem(id: number): Item {
  return items.filter((item) => {
    return item.id === id
  }).at(0) as Item
}