import "../styles/globals.css"
import type { AppProps } from "next/app"
import { CartContextProvider } from "../context/CartContextProvider"
import { Order } from "../lib/items"

function App({ Component, pageProps }: AppProps) {
  const initialState: Order[] = pageProps.cart || []
  return (
    <CartContextProvider initialState={initialState}>
      <Component {...pageProps} />
    </CartContextProvider>
  )
}

export default App
