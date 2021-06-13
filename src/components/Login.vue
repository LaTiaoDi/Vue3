<template>
  <div>登陆页</div>
  <el-button @click="goHome">回首页</el-button>
</template>

<script>
export default {
  name: 'login',
  methods: {
    goHome() {
      this.$router.push('/welcome')
    }
  },
  mounted() {
    this.$request
      .get('/login', { name: 'jack' }, { mock: true, loading: true })
      .then((res) => {
        console.log(res)
      })
  }
}
</script>

<style>
</style>