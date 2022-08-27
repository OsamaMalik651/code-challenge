import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar'
import Modal from "../components/Modal"
import { message } from 'antd'

const Home = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [title, setTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [userId, setUserId] = useState(1)

  //userIdArray created from all posts for select component
  const userIdArray = [...new Set(props.posts.map(post => post.userId))]

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

  const createPost = async () => {
    message.loading({ content: "Creating Post...", key: "create" })
    const response = await fetch("/api/post/", {
      method: "POST",
      body: JSON.stringify({
        userId,
        title,
        body: postBody
      })
    })
    const data = await response.json()
    if (data) {
      message.success({ content: "Post created", key: "create", duration: 2 })
      setTitle(""), setPostBody(""), setUserId(1)
      setShowModal(false)
    }

  }
  return (
    <div className="">
      <Head>
        <title>Code Challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex min-w-full min-h-full items-center justify-center bg-indigo-100 ">
          <div className="min-h-screen h-screen max-w-screen-md flex flex-1 flex-col gap-8 pt-10 items-center">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} maxPosts={props.posts.length} />
            <button className='w-72 h-16 rounded-lg bg-indigo-500 text-white shadow-slate-800 shadow-sm font-bold text-xl' onClick={() => setShowModal(true)}>Create Post</button>
            <div className="min-w-full h-full overflow-y-scroll scrollbar-hide flex flex-wrap gap-10 p-2 items-center justify-center border-1 border-gray-400 rounded-lg shadow-lg box-border pt-6 border-indigo-500 border">
              {posts && posts?.map(post => {
                return <div className="min-h-fit h-32 border-2 w-full max-w-xs border-indigo-400 rounded-lg cursor-pointer p-2 shadow-lg" key={post.id}>
                  <Link href={`/post/${post.id}`}>
                    <div className="flex flex-col gap-2 items-center">
                      <p><b>Post Id:</b><i> {post.id}</i></p>
                      <p className='self-start'><b>Title:</b><i> {post.title}</i></p>
                    </div>
                  </Link>
                </div>
              })}
            </div>
          </div>
        </div>
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col w-50 self-start gap-2">
              <label htmlFor="userId" className='text-sm'>Enter User Id</label>
              <select name="userId" id="userId" value={userId} onChange={(e) => setUserId(e.target.value)}
                className="border-2 rounded-md"
              >
                {userIdArray.map(item => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="title">Enter title</label>
              <input id="title" name="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                className="border-2 rounded-md"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="postBody">Enter content</label>
              <textarea id="postBody" name="postBody" type="text" rows="4" col="50" maxLength="100" value={postBody} onChange={(e) => setPostBody(e.target.value)}
                className="border-2 rounded-md resize-none overflow-y-auto"
              />
            </div>
            <div className="w-full flex justify-center gap-6 mt-2">
              <button className='bg-green-500 w-24 h-10 text-white text-lg font-semibold rounded-lg' onClick={createPost}>Create</button>
              <button className='bg-red-500 w-24 h-10 text-white text-lg font-semibold rounded-lg' onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </Modal>
      </main >
    </div >
  )
}
export const getStaticProps = async () => {
  const posts = await fetch("https://jsonplaceholder.typicode.com/posts?_start=0&_limit=20").then(
    res => res.json()
  )
  return {
    props: {
      posts: posts
    }
  }
}
export default Home
