import { fromSize } from "../../lib/items"

export const RegisterTrigger = ({
  id,
  quantity,
  size,
  category,
  gross
}: {
  id: string
  quantity: number
  size: string
  category: number
  gross: number
}) => {
  const src = new URL("https://privacy-sandcastle-ssp.web.app/register-trigger")
  src.searchParams.append("id", `${id}`)
  src.searchParams.append("category", `${category}`)
  src.searchParams.append("quantity", `${quantity}`)
  src.searchParams.append("size", `${fromSize(size)}`)
  src.searchParams.append("gross", `${gross}`)
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt="" width={1} height={1} src={src.toString()} />
  )
}
