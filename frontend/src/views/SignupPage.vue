<template>
  <div class="page">
    <div class="container">
      <h1>{{ title }}</h1>
      <img src="me.jpeg" alt="" />
      <div class="verify" v-if="state == 'login'">
        <input type="text" v-model="formData.email" placeholder="Enter email" />
        <input type="password" v-model="formData.password" placeholder="Enter password" /><br />
        <button @click="loginUser()" type="submit">Login</button>
      </div>
      <form v-else @submit.prevent="registerUser()">
        <input type="text" v-model="formData.username" placeholder="Enter username" />
        <input type="text" placeholder="Enter email" v-model="formData.email" />
        <input type="password" placeholder="Enter password" v-model="formData.password" />
        <button>Register</button>
      </form>
      <div>
        <h3 v-if="state == 'register'">
          Already have an account?<a @click="toggle('login')"> Login</a>
        </h3>
        <h3 v-else>Don't have an account? <a @click="toggle('register')"> Register</a></h3>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      formData: {
        username: '',
        email: '',
        password: ''
      },
      state: 'login'
    }
  },
  computed: {
    title() {
      return this.state == 'login' ? 'Welcome, Login' : 'Welcome, Register'
    }
  },
  methods: {
    toggle() {
      if (this.state == 'login') {
        this.state = 'register'
      } else {
        this.state = 'login'
      }
    },
    registerUser() {
      axios
        .post('http://localhost:3000/user', this.formData)
        .then((response) => {
          console.log(response)
          if (response.status == 201) {
            this.$router.push('/post')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    loginUser() {
      this.state = 'posts'
      axios
        .post('http://localhost:3000/user/login', this.formData)
        .then((response) => {
          console.log(response)
          localStorage.setItem('token', response.data.token)
          if (response.status == 200) {
            this.$router.push('/post')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.page {
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: rgb(6, 162, 105);
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 40%;
  height: 85vh;
  margin: auto;
  padding-top: 2rem;
  background-color: white;
  /* box-shadow: 1px 1px 30px 1px rgb(140, 141, 145); */
  border-radius: 15px;
}
img {
  width: 120px;
  height: 120px;
  border-radius: 60px;
}
.container .verify {
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
}
form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  width: 80%;
  margin: 0 auto;
}
input {
  /* padding-top: 1rem; */
  width: 80%;
  height: 50px;
  border-radius: 5px;
  border: none;
  padding-left: 1rem;
}
button {
  cursor: pointer;
  width: 80%;
  height: 50px;
  font-size: x-large;
  background-color: rgb(6, 162, 105);
  color: #ffff;
  border: none;
  border-radius: 10px;
}
h3 {
  margin-top: 2rem;
  padding-bottom: 1.5rem;
}
h3 a {
  cursor: pointer;
  color: rgb(6, 162, 105);
}
a:hover {
  color: blue;
}
</style>
