import { IronSession } from "iron-session"

export class SessionCart {
  private cart: Map<string, number>
  private session: IronSession
  constructor(session: IronSession) {
    this.session = session
    this.cart = new Map(Object.entries(session.cart || {}))
  }
  add(id: string, size: string, quantity: number) {
    const key = `${id}:${size}`
    if (this.cart.has(key)) {
      const current = this.cart.get(key) || 0
      this.cart.set(key, current + quantity)
    } else {
      this.cart.set(key, quantity)
    }
  }
  getAll() {
    return Array.from(this.cart.entries()).map(([key, quantity]) => {
      const [id, size] = key.split(":")
      return {id, size, quantity}
    })
  }
  async save() {
    this.session.cart = Object.fromEntries(this.cart.entries())
    await this.session.save()
  }
}
