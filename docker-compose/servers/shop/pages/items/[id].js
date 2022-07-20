import { useRouter } from 'next/router'
import Head from 'next/head'

const Item = () => {
  const router = useRouter()
  const id = router.query.id

  return (
    <div className="bg-neutral-50">
      <Head>
        <title>{id} | Shopping DEMO</title>
      </Head>
      <h1>Page: {id}</h1>
    </div>
  )
}

export default Item
