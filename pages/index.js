
import Head from 'next/head'
import Image from 'next/image'

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start py-2">
      <Head>
        <title>Code Challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="">
        Code Challenge
      </div>
    </div>
  )
}

export default Home
