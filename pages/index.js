import Head from 'next/head'
import Link from 'next/link'
const Home = (props) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start py-2">
      <Head>
        <title>Code Challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="">
          <div className="">Search Bar</div>
          <div className="">Posts component
            {props.posts?.map(post => {
              return <div className="" key={post.id}>
                <Link href={`/post/${post.id}`}>{post.title}</Link>
              </div>
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
export const getStaticProps = async () => {
  const posts = await fetch("https://jsonplaceholder.typicode.com/posts").then(
    res => res.json()
  )
  return {
    props: {
      posts: posts
    }
  }
}
export default Home
