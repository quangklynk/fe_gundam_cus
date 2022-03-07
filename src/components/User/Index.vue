<template>
  <el-container>
    <Header />
    <Main />
    <Footer />
  </el-container>
</template>

<script>
import Header from "./../Home/Header.vue";
import Footer from "./../Home/Footer.vue";
import Main from "./Info.vue";
export default {
  name: "User",
  components: {
    Header,
    Footer,
    Main,
  },
};
</script>

<style scoped>
.el-container {
  flex-direction: column;
}
</style>
