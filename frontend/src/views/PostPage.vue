<template>
  <div class="page">
    <div class="header">
      <h1>Yoofi's blog post</h1>
      <button class="profile"><router-link to="/userposts"> My profile</router-link></button>
    </div>
    <div class="image">
      <img src="me.jpeg" alt="" />
    </div>
    <div class="container" v-for="post in allPost" :key="post.id">
      <h3>{{ post.title }}</h3>
      <p>{{ post.content }}</p>
      <p>{{ post.user.username }}</p>
      <button @click="likePost(post.id, post.likes)" :class="{ liked: liked(post.likes) }">
        👍🏽 like {{ post.likes.length }}
      </button>
    </div>
  </div>
</template>
<style>
td,
th {
  border: 1px solid black;
}
</style>

<script>
import axios from 'axios'
import jwtDecode from 'jwt-decode'
// import UserPageVue from './UserPage.vue'
export default {
  data() {
    return {
      postBody: '',
      allPost: [],
      username: '',
      title: '',
      content: '',
      like: [],
      deletingLike: ''
    }
  },
  created() {
    const token = localStorage.getItem('token')
    const user_id = jwtDecode(token).id
    this.userId = user_id
    axios
      .get('http://localhost:3000/post', { headers: { token } })
      .then((res) => {
        console.log(res)
        console.log(res)
        this.allPost = res.data.allPost
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    likePost(postId, likes) {
      const token = localStorage.getItem('token')
      const hasLiked = this.liked(likes)
      if (hasLiked) {
        axios
          .delete(`http://localhost:3000/like/${this.deletingLike}`, { headers: { token } })
          .then((res) => console.log(res))
          .catch((error) => console.log(error))
      } else {
        axios
          .post('http://localhost:3000/like', { post_id: postId }, { headers: { token } })
          .then((res) => console.log(res))
          .catch((error) => console.log(error))
      }
      this.deletingLike = ''
    },
    liked(likes) {
      let isLiked = likes.find((like) => {
        if (like.user.id == this.userId) {
          return true
        } else {
          return false
        }
      })
      if (isLiked) {
        this.deletingLike = isLiked.id
        return true
      } else {
        this.deletingLike = ''
        return false
      }
    }
  }
}
</script>
<style scoped>
.page {
  /* background-color: rgb(6, 162, 105); */
  background-color: #f4eeee;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3rem;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  margin: auto;
  margin-top: 2.5rem;
}
.header .profile {
  width: 10%;
  height: 35px;
  color: rgb(255, 255, 255);
  font-size: 16px;
  font-weight: bold;
  background-color: rgb(6, 162, 105);
  cursor: pointer;
  border: none;
  margin-top: 0.7rem;
  border-radius: 5px;
  /* box-shadow: 1px 1px 30px 1px rgb(140, 141, 145); */
}
.profile:hover {
  background-color: rgb(3, 130, 83);
}
.profile a {
  color: #fff;
  text-decoration: none;
}
.header h1 {
  font-weight: bold;
  color: rgb(6, 162, 105);
  /* font-size: 50px; */
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
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #ffffff;
  width: 70%;
  margin: auto;
  height: 180px;
  padding-left: 2rem;
  gap: 1rem;
  border-radius: 10px;
  box-shadow: 1px 1px 30px 1px rgb(140, 141, 145);
}
.container button {
  width: 8%;
  height: 30px;
  border: none;
  color: #b4b4b4;
  cursor: pointer;
  border-radius: 5px;
}
.container button:hover {
  background-color: rgb(6, 162, 105);
}
.liked {
  background-color: rgb(6, 162, 105);
  color: #fff;
}
</style>
