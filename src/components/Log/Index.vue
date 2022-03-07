<template>
  <div>
    <Header />
    <div>
      <div class="container">
        <el-row style="height: inherit">
          <el-col :span="12"> </el-col>
          <el-col :span="12" :offset="12" class="container-right">
            <router-view></router-view>
          </el-col>
        </el-row>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "./Footer.vue";
import Header from "./Header.vue";
export default {
  name: "LoginPage",
  components: {
    Footer,
    Header,
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 83vh;
  background: #fff;
  background-image: url("https://64.media.tumblr.com/ba6bcf4e46fa8b65ea9b9cbf7e8f3fc1/c4821a8fb51b80ae-3d/s640x960/c13de931cda7f300d500eaf5eeab04a7e25c7ee9.png");
  background-repeat: no-repeat;
  background-position: 10% 50%;
}

.temp-template {
  width: 250px;
}

.container-right {
  display: flex;
  justify-content: center;
  align-content: center;
  height: inherit;
}
</style>
