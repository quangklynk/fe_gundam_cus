<template>
  <el-main class="container-main" background-color="#f4f4f4">
    <el-container>
      <el-aside width="250px">
        <el-menu :default-openeds="['1', '3']" background-color="#f4f4f4">
          <div class="container-name-user">
            <el-avatar
              size="medium"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            ></el-avatar>
            <div class="name-user">
              <span> Tài khoản </span>
              <h5>{{ data.user }}</h5>
            </div>
          </div>
          <router-link to="/user/">
            <el-menu-item index="1">
              <i class="el-icon-user"></i>Thông tin tài khoản
            </el-menu-item>
          </router-link>
          <router-link to="/user/changepass">
            <el-menu-item index="2">
              <i class="el-icon-document"></i>Đổi mật khẩu
            </el-menu-item>
          </router-link>
          <router-link to="/user/order">
            <el-menu-item index="3">
              <i class="el-icon-box"></i>Quản lý đơn hàng
            </el-menu-item>
          </router-link>
          <el-menu-item index="4" @click="logout">
            <i class="el-icon-switch-button"></i>Đăng xuất
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </el-main>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      data:{
        user: this.$store.getters.user
      }
    };
  },
  methods: {
    logout() {
      this.$swal({
        icon: "info",
        title: "Đã đăng xuất",
        showConfirmButton: false,
      });
      axios
        .post("/logout")
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
      localStorage.removeItem(`token`);
      localStorage.removeItem(`id`);
      localStorage.removeItem(`user`);
      localStorage.removeItem(`role`);
      this.$store.dispatch("id", "");
      this.$store.dispatch("user", "");
      this.$store.dispatch("role", "");
      this.data.user = "";
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style scoped>
.container-main {
  background-color: #f4f4f4;
}

.container-name-user {
  display: flex;
  margin-left: 20px;
  margin-bottom: 10px;
}

.container-name-user .name-user {
  padding-left: 5px;
}

.container-name-user .name-user span {
  font-size: 13px;
  font-weight: 400;
}

.container-name-user .name-user h5 {
  font-size: 16px;
  font-weight: 500;
}
</style>
