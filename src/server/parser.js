const axios = require('axios')
const express = require('express')

const app = express()
const PORT = 3001

let posts = []
let requestComplited = false
let page = 1

app.get('/api', (_, res) => {
  res.send('Hello world!')
})

app.get('/api/d3/', async (req, res) => {
  const domain = req.query.domain
  while (!requestComplited) {
    let newPosts
    await axios.get(`https://d3.ru/api/domains/${domain}/posts/?per_page=42&page=${page}`)
      .then((data) => {
        newPosts = data.data.posts
        console.log(page)
        posts = [...posts, ...newPosts]
      })
      .catch(err => {throw err})
    if (newPosts.length < 42 || page === 75) {
      requestComplited = true
    }
    page += 1
  }
  res.send(posts)
})

app.listen(PORT, () => {
  console.log(`listen on ${PORT}`)
})