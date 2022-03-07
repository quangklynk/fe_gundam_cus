<template>
  <el-container>
    <Header />
    <router-view/>
    <Footer />
  </el-container>
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
export default {
  name: "Home",
  data() {
    return {};
  },
  methods: {},
  components: {
    Header,
    Footer,
  },
};
</script>

<style scoped>
.el-container {
  flex-direction: column !important;
}
</style>
