<template>
  <div class="page">
    <div class="header">
      <h1>Yoofi's blog post</h1>
      <button @click="enterPost()">{{ back }}</button>
    </div>
    <div class="image">
      <img src="me.jpeg" alt="" />
    </div>
    <h2>{{ username }}</h2>
    <div v-if="state == 'addpost'" class="add-post">
      <input v-model="postContent.title" type="text" placeholder="Title" />
      <textarea
        v-model="postContent.content"
        placeholder="Content"
        name=""
        id=""
        cols="30"
        rows="3"
      ></textarea>
      <button v-if="posting == true" @click="addPost()">{{ action }}</button>
      <button v-else @click="editPost()">{{ action }}</button>
    </div>
    <div v-else class="post" v-for="posts in post" :key="posts.id">
      <h3>{{ posts.title }}</h3>
      <!-- <p>{{ posts.slug }}</p> -->
      <p>{{ posts.content }}</p>
      <div class="buttons">
        <button class="like">
          👍🏽 Like
          <p>{{ posts.likes.length }}</p>
        </button>
        <div class="delete-edit">
          <button @click="editingPost(posts.title, posts.content, posts.id)">Edit</button>
          <button @click="deletePost(posts.id)" id="delete">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: rgb(6, 162, 105);
}
.page {
  background-color: #f4eeee;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}
.header {
  display: flex;
  justify-content: space-between;
  width: 65%;
  margin: auto;
  margin-top: 2rem;
}
.header button {
  width: 12%;
  height: 35px;
  color: rgb(255, 255, 255);
  font-size: 16px;
  font-weight: bold;
  background-color: rgb(6, 162, 105);
  cursor: pointer;
  border: none;
  margin-top: 0.7rem;
  border-radius: 5px;
}
.header button:hover {
  background-color: rgb(8, 134, 88);
}
.image {
  width: 50%;
  margin: auto;
  display: flex;
  justify-content: center;
}
img {
  width: 240px;
  height: 240px;
  border-radius: 120px;
  margin-bottom: 1rem;
}
.page h2 {
  width: 65%;
  margin: auto;
  padding-left: 1rem;
  color: rgb(6, 162, 105);
}
.post {
  width: 65%;
  height: 170px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  background-color: #fff;
  padding-left: 2rem;
  gap: 2rem;
  border-radius: 10px;
}
.add-post {
  width: 65%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
  padding-left: 2rem;
  gap: 2rem;
  border-radius: 10px;
}

.add-post button {
  width: 60px;
  background-color: rgb(6, 162, 105);
  color: #fff;
  border-radius: 3px;
  border: none;
  cursor: pointer;
  margin-bottom: 2rem;
  margin-left: 2rem;
  height: 30px;
  font-weight: bold;
}
.add-post button:hover {
  background-color: rgb(8, 134, 88);
}
.add-post input {
  height: 40px;
  width: 60%;
  border-radius: 5px;
  border: none;
  padding-left: 1rem;
  margin-left: 1.5rem;
  margin-top: 1.5rem;
}
.add-post textarea {
  width: 60%;
  border-radius: 5px;
  border: none;
  padding-left: 1rem;
  padding-top: 0.8rem;
  margin-left: 1.5rem;
  font-family: 'Times New Roman', Times, serif;
}

.post button:hover {
  background-color: rgb(6, 162, 105);
}
.buttons {
  display: flex;
  justify-content: space-between;
  width: 90%;
  border: none;
}

.delete-edit {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
.like {
  display: flex;
  /* width: 80px; */
}
.delete-edit button {
  cursor: pointer;
  background-color: rgb(6, 162, 105);
  color: #fff;
  border-radius: 1px;
  border: none;
  width: 80px;
  border-radius: 3px;
}
.delete-edit button:hover {
  background-color: rgb(8, 134, 88);
}
.delete-edit #delete {
  background-color: red;
}
.delete-edit #delete:hover {
  background-color: rgb(211, 8, 8);
}
.add-post {
  display: flex;
  flex-direction: column;
}
</style>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      UserPage: '',
      username: '',
      email: '',
      post: '',
      state: '',
      posting: '',
      temPostId: '',
      back: 'Add post',
      action: 'Post',
      postContent: { title: '', content: '' }
    }
  },
  created() {
    const token = localStorage.getItem('token')
    axios
      .get('http://localhost:3000/user/posts', { headers: { token } })
      .then((res) => {
        console.log(res)
        this.username = res.data.user.username
        this.email = res.data.user.email
        this.post = res.data.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    addPost() {
      this.posting = true
      this.state = ''
      const token = localStorage.getItem('token')
      axios
        .post('http://localhost:3000/post', this.postContent, { headers: { token } })
        .then((res) => console.log(res))
        .catch((error) => console.log(error))
    },
    enterPost() {
      if (this.back == 'Add post') {
        this.state = 'addpost'
        this.back = 'My post'
      } else if (this.back == 'My post') {
        this.state = ''
        this.back = 'Add post'
      }
    },
    deletePost(postId) {
      const token = localStorage.getItem('token')
      axios
        .delete(`http://localhost:3000/post/${postId}`, { headers: { token } })
        .then((res) => console.log(res))
        .catch((error) => console.log(error))
    },
    editPost() {
      const token = localStorage.getItem('token')
      axios.put(`http://localhost:3000/post/${this.temPostId}`, this.postContent, {
        headers: { token }
      })
    },
    editingPost(title, content, id) {
      this.posting = false
      this.action = 'Update'
      this.state = 'addpost'
      this.temPostId = id
      this.postContent = { title, content }
    }
  }
}
</script>
