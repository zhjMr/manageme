<template>
  <div>

  </div>
</template>
<script>
import TestApi from "../api/mag"
export default {
  data() {
    return {
      username: "admin",
      password: 'admin',
    };
  },
  methods: {
    login() {
      TestApi.login({ username: this.username, password: this.password }).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    },
  },
  created() {
    this.login()
  },
}
</script>
<style scoped lang="scss">

</style>