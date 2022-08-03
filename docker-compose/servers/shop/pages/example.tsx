import { createContext, Dispatch, SetStateAction, useCallback, useContext, useState } from "react"

interface CountState {
  count: number
  setCount: Dispatch<SetStateAction<number>>
}

const countContext = createContext<CountState>({
  count: 0,
  setCount: () => undefined
})

const Button = () => {
  const { setCount } = useContext(countContext)
  const increment = useCallback(() => {
    setCount((prev) => prev + 1)
  }, [setCount])
  return (
    <div>
      <button onClick={increment}>+1</button>
    </div>
  )
}

const DisplayCount = () => {
  const { count } = useContext(countContext)
  return <p>カウント: {count}</p>
}

const App = () => {
  return (
    <div className="App">
      <DisplayCount />
      <Button />
    </div>
  )
}

const Root = () => {
  const [count, setCount] = useState<number>(0)
  return (
    <countContext.Provider value={{ count, setCount }}>
      <App />
    </countContext.Provider>
  )
}

export default Root
