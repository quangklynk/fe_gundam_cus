<template>
  <el-header height="100px">
    <div class="container-header">
      <img
        src="./../../assets/imge/logo-w.png"
        alt=""
        @click="goHome"
        class="logo-header"
      />
      <div class="container-category">
        <el-dropdown @command="handleCommand">
          <span class="custome-font">
            Danh Mục
            <p class="font-color">
              Sản Phẩm <i class="el-icon-caret-bottom el-icon--right"></i>
            </p>
          </span>
          <el-dropdown-menu slot="dropdown">
            <div v-for="item in data.categorys" :key="item.id">
              <span class="supplier">{{ "NCC: " + item.name }}</span>
              <el-dropdown-item
                v-for="item1 in item.category"
                :key="item1.id"
                :command="item1"
                divided
                >{{ item1.name }}
              </el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="container-search">
        <el-input
          placeholder="Tìm sản phẩm, mô tả mong muốn..."
          v-model="searchName"
          class="input-with-select"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchByName"
          ></el-button>
        </el-input>
      </div>
      <div class="container-login">
        <div>
          <i class="el-icon-user customer-icon-login"></i>
        </div>
        <div v-if="!data.user">
          <router-link to="/login" class="login-link">
            <small>Đăng nhập/Đăng ký</small>
            <p>Tài khoản<i class="el-icon-caret-bottom el-icon--right"></i></p>
          </router-link>
        </div>
        <div v-else class="name-login">
          <el-dropdown>
            <small>Tài Khoản</small>
            <p>
              {{ data.user }}<i class="el-icon-caret-bottom el-icon--right"></i>
            </p>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-user">
                <span @click="goToUser">Thông tin tài khoản</span>
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-box" divided>
                <span @click="goToOrder">Quản lý đơn mua</span>
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-switch-button" divided>
                <span @click="logout">Đăng xuất</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="container-cart" @click="goCart">
        <div class="cart-icon">
          <i class="el-icon-shopping-cart-2"></i>
          <span class="unit-cart">{{ cart || 0 }}</span>
        </div>
        <div class="title-cart">
          <small>Giỏ hàng</small>
        </div>
      </div>
    </div>
  </el-header>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      cart: this.$store.getters.cart,
      data: {
        user: this.$store.getters.user,
        categorys: [],
      },
      searchName: "",
    };
  },
  async mounted() {
    this.getAllCategory();
  },
  methods: {
    handleCommand(command) {
      this.$message("Chọn loại " + command.name);
      this.$router.push(`/search/category/${command.id}`);
    },
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
          localStorage.removeItem(`token`);
          localStorage.removeItem(`id`);
          localStorage.removeItem(`user`);
          localStorage.removeItem(`role`);
          localStorage.removeItem(`cart`);
          this.$store.dispatch("id", "");
          this.$store.dispatch("user", "");
          this.$store.dispatch("role", "");
          this.$store.dispatch("cart", 0);
          this.data.user = "";
        })
        .catch((err) => {
          console.log(err);
        });
      if (this.$route.path.indexOf("user")) {
        this.$router.push("/");
      }
    },
    goToOrder() {
      this.$router.push("/user/order");
    },
    goToUser() {
      this.$router.push("/user");
    },
    goHome() {
      this.$router.push("/");
    },
    goCart() {
      this.$router.push("/cart");
    },
    getAllCategory() {
      axios
        .get("/category/v1/customer")
        .then((result) => {
          console.log(result);
          this.data.categorys = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    searchByName() {
      if (!this.searchName) {
        this.$notify({
          title: "Cảnh báo",
          message: "Nhập tìm kiếm",
          type: "warning",
        });
        return;
      }
      this.$store.dispatch("searchName", this.searchName);
      this.$router.push(`/search/name/${this.searchName}`);
    },
  },
};
</script>

<style scoped>
.logo-header {
  cursor: pointer;
}

.login-link {
  color: #fff;
}

.el-header {
  background: rgb(26, 148, 255);
}

.container-header {
  max-width: 1200px;
  margin: 0 auto;
  height: inherit;
  display: flex;
  justify-content: space-between;
}

.container-category {
  align-self: center;
  color: #fff;
}

.container-search {
  align-self: center;
  width: 650px;
}

.supplier {
  padding-left: 5px;
  color: #8492a6;
  font-size: 13px;
  font-weight: 600;
}

.custome-font {
  cursor: pointer;
  color: #fff;
}

.font-color {
  font-weight: 600;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.container-login {
  color: #fff;
  align-self: center;
  display: flex;
  cursor: pointer;
}

.customer-icon-login {
  font-size: 40px;
}

.container-cart {
  align-self: center;
  color: #fff;
  display: flex;
  cursor: pointer;
}

.cart-icon {
  font-size: 35px;
  position: relative;
}

.unit-cart {
  position: absolute;
  top: 0px;
  left: 25px;
  font-size: 12px;
  background: rgb(253, 216, 53);
  padding: 3px;
  color: #000;
  font-weight: 600;
  border-radius: 50%;
}

.title-cart {
  align-self: flex-end;
}

.name-login .el-dropdown {
  color: #fff !important;
}

.name-login .el-dropdown p {
  font-size: 18px;
  font-weight: 400;
}
</style>
