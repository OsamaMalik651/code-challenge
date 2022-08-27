// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const { body, method } = req
  if (method === "POST") {
    await fetch(
      `https://jsonplaceholder.typicode.com/posts`, {
      method: method,
      body: body,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    }
    ).then(res => res.json())
    res.status(200).json("Ok")
  } else if (method === "PUT") {
    const postId = JSON.parse(body).id
    await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: method,
      body: body,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    }
    ).then(() => res.status(200).send("Ok"))
  }
  else if (method === "DELETE") {
    const postId = JSON.parse(body).id
    await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    ).then(() => res.status(200).send("Ok"))
  }
}
