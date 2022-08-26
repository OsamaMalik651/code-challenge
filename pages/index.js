import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar'
const Home = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState("")

  useEffect(() => {
    setPosts(props.posts)
  }, [])

  useEffect(() => {
    if (!searchTerm) setPosts(props.posts)
    if (searchTerm) {
      const filteredPosts = props.posts.filter(post => post.id === searchTerm)
      console.log(filteredPosts)
      setPosts(filteredPosts)
    }
  }, [searchTerm])

  return (
    <div className="">
      <Head>
        <title>Code Challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex min-w-full min-h-full items-center justify-center ">
          <div className=" min-h-screen h-screen max-w-screen-md flex flex-1 flex-col gap-8 pt-10 items-center">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} maxPosts={props.posts.length} />
            <button className='bg-green-200 w-72 h-16 rounded-lg border-2 border-green-800 shadow-green-200 shadow-sm font-bold text-xl'>Create Post</button>
            <div className="min-w-full h-full overflow-y-scroll scrollbar-hide flex flex-col gap-10 p-2 border-1 border-gray-400 rounded-lg shadow-lg">
              {posts && posts?.slice(0, 10)
                .map(post => {
                  return <div className="h-fit border-2 border-gray-400 rounded-lg cursor-pointer p-2" key={post.id}>
                    <Link href={`/post/${post.id}`}>
                      <div className="flex flex-col gap-4 items-center">
                        <p>Id : {post.id}</p>
                        <p>Title: {post.title}</p>
                      </div>
                    </Link>
                  </div>
                })}
            </div>
          </div>
        </div>

      </main >
    </div >
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
