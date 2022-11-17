// `app` directory

// This function can be named anything
async function fetchData() {
  const res = await fetch(`https://dummyjson.com/users`, { cache: "no-store" })
  const data = await res.json()
  return data
}

export default async function Page() {
  const users = await fetchData()
  return <article>{users.total}</article>
}
