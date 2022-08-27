import next, { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import Modal from "../../components/Modal";
import { message } from 'antd'

const Post = (props) => {
    const router = useRouter();
    const { postId } = router.query;
    const { id, title, body, userId } = props.post;
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [postTitle, setPostTitle] = useState(title);
    const [postBody, setPostBody] = useState(body);
    const [updatedPostTitle, setUpdatedPostTitle] = useState(title);
    const [updatedPostBody, setUpdatedPostBody] = useState(body);


    const editPost = async () => {
        message.loading({ content: "Updating Post...", key: "update" })
        const response = await fetch('/api/post', {
            method: "PUT",
            body: JSON.stringify({
                id,
                title: postTitle,
                body: postBody,
                userId
            }),
        }).then(response => response.ok)
        if (response) {
            message.success({ content: "Post updated", key: "update", duration: 2 })
            setPostTitle(updatedPostTitle)
            setPostBody(updatedPostBody)
            setShowUpdateModal(false)

        }
    }
    const deletePost = async () => {
        message.loading({ content: "Deleting Post...", key: "delete" })
        const response = await fetch('/api/post', {
            method: "DELETE",
            body: JSON.stringify(props.post)
        }).then(response => response.ok)
        if (response) {
            message.success({ content: "Post deleted... Redirecting to Homepage", key: "delete", duration: 2 }).then(router.push("/"))
        }
    }
    return (
        <div className="min-w-full min-h-screen flex flex-col items-center box-border pt-10 pb-0 bg-indigo-100">
            <h1 className="text-lg font-bold">Post: {postId}</h1>
            {props.post ? (
                <div className="w-9/12 min-h-48 min-w-72 border border-indigo-700 rounded-md shadow-lg shadow-indigo-300 flex flex-col justify-center items-center pt-10 pb-4">
                    <div className="box-border pl-10 pr-10 h-fit">
                        <h1 className="text-xl">Title: <i>{postTitle}</i></h1>
                        <p className="text-xl"><strong>Post:</strong> <i>{postBody}</i></p>
                    </div>
                    <div className="max-w-72 flex justify-between gap-2 min-w-fit lg:gap-10">
                        <button className="bg-green-500 min-w-fit  box-border p-3 h-fit text-white text-lg font-semibold rounded-lg" onClick={() => setShowUpdateModal(true)}>Edit Post</button>
                        <button className="bg-red-500 min-w-fit box-border p-3 h-fit text-white text-lg font-semibold rounded-lg" onClick={() => setShowDeleteModal(true)}>Delete Post</button>
                    </div>
                    <Modal show={showUpdateModal} onClose={() => setShowUpdateModal(false)} title="Update Post">
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex flex-col w-full">
                                <label htmlFor="title">Enter title</label>
                                <input id="title" name="title" type="text" value={updatedPostTitle} onChange={(e) => setUpdatedPostTitle(e.target.value)}
                                    className="border-2 rounded-md"
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="postBody">Enter content</label>
                                <textarea id="postBody" name="postBody" type="text" rows="6" col="50" maxLength="100" value={updatedPostBody} onChange={(e) => setUpdatedPostBody(e.target.value)}
                                    className="border-2 rounded-md resize-none overflow-y-auto"
                                />
                            </div>
                            <div className="w-full flex justify-center gap-6 mt-2">
                                <button className='bg-green-500 w-24 h-10 text-white text-lg font-semibold rounded-lg' onClick={editPost}>Update</button>
                                <button className='bg-red-500 w-24 h-10 text-white text-lg font-semibold rounded-lg' onClick={() => setShowUpdateModal(false)}>Cancel</button>
                            </div>
                        </div>
                    </Modal>
                    <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="DeletePost">
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex flex-col w-full">
                                <h3 className="text-center">Are you sure you want to delete the following post</h3>
                                <p><strong>Title:</strong> {title}</p>
                                <p><strong>Post Id:</strong> {id}</p>
                                <p><strong>Post:</strong> {body}</p>
                            </div>
                            <div className="w-full flex justify-center gap-6 mt-2">
                                <button className='bg-red-500 w-24 h-10 text-white text-lg font-semibold rounded-lg' onClick={deletePost}>Delete</button>
                                <button className='bg-gray-500 w-24 h-10 text-white text-lg font-semibold rounded-lg' onClick={() => setShowDeleteModal(false)}>Cancel</button>
                            </div>
                        </div>
                    </Modal>
                </div>

            ) : (
                <p>Post not found</p>
            )}</div>
    )
}
export const getServerSideProps = async context => {
    const postId = context.params?.postId;
    if (!postId) {
        return {
            props: {},
        };
    }
    const post = (await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
    ).then(res => res.json()))
    return {
        props: {
            post,
        },
    };
};
export default Post;