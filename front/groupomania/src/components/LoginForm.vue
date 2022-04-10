<template>
    <div>
        <h1>Login</h1>
        <form action="">
        <div>
    <label for="email">Email</label>
    <input type="email" name="email" id="email" v-model="email" />
  </div>
  <div>
    <label for="password">Password</label>
    <input type="password" name="password" id="password" v-model="password" />
  </div>
  <button @click="loginUser">Login</button>
        </form>
        
    </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    loginUser() {
      const userData = {
        email: this.email,
        password: this.password,
      };

      this.login(userData);
    },
  },
};
</script>