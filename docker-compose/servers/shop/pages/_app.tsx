import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CartContextProvider } from "../context/CartContextProvider";

function App({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <Component {...pageProps} />
    </CartContextProvider>
  )
}

export default App
