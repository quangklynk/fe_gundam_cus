<template>
  <div class="wrapp-form">
    <form @submit.prevent="submitLogin" action="">
      <div class="item-form">
        <h1>Đăng Nhập</h1>
      </div>
      <div class="item-form">
        <i class="fas fa-envelope"></i>
        <input
          name="email"
          type="email"
          placeholder="Nhập email"
          v-model="login.email"
        />
      </div>
      <div class="item-form">
        <i class="fas fa-lock"></i>
        <input
          type="password"
          name="password"
          placeholder="Nhập mật khẩu"
          v-model="login.password"
        />
        <i class="fas fa-eye pass-icon" id="show-pass-login"></i>
        <i
          class="fas fa-eye-slash pass-icon"
          id="hide-pass-login"
          style="display: none"
        ></i>
      </div>
      <div class="item-form">
        <button class="btn" type="submit" :loading="true" id="btn-login">
          {{ loading ? "Đăng Nhập..." : "Đăng Nhập" }}
        </button>
      </div>
      <div class="item-form">
        <a href="#" class="forgot-pass" @click="forgot">Quên mật khẩu</a>
      </div>
      <div class="or">
        <div></div>
        <span>Hoặc</span>
        <div></div>
      </div>
      <div class="sign-up-link">
        <p>
          Bạn mới biết đến Gundam Biên Hòa?
          <button id="btn-open-register" type="button">
            <span @click="switchToRegister">Đăng Ký</span>
          </button>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
      loading: false,
    };
  },
  methods: {
    submitLogin() {
      if (this.login.email.trim() == "" || this.login.password.trim() == "") {
        this.$message({
          message: "Cảnh báo, Nhập đầy đủ email và password.",
          type: "warning",
        });
        return;
      }
      if (this.login.password.trim().length < 8) {
        this.$message({
          message: "Cảnh báo, Mật khẩu > 8.",
          type: "warning",
        });
        return;
      }
      this.loading = true;
      axios
        .post("/login/customer", this.login)
        .then((result) => {
          console.log(result.data.data)
          if (result.data.data.email) {
            this.$swal({
              icon: "error",
              title: "Đăng nhập lỗi!!!",
              text: result.data.data.email,
              showConfirmButton: false,
            });
          } else {
            this.$swal({
              icon: "success",
              title: "Đăng nhập thành công!!!",
              showConfirmButton: false,
            });
            this.$store.dispatch("id", result.data.data.id);
            this.$store.dispatch("user", result.data.data.name);
            this.$store.dispatch("role", result.data.data.role_name);
            this.$store.dispatch("cart", result.data.cart);
            localStorage.setItem("cart", result.data.cart);
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("id", result.data.data.id);
            localStorage.setItem("user", result.data.data.name);
            localStorage.setItem("role", result.data.data.role_name);
            this.$router.push({ path: "/" });
          }
        })
        .catch((err) => {
          this.loading = false;
          this.$swal({
            icon: "error",
            title: "Đăng nhập lỗi!!!",
            text: `${err.response}`,
            showConfirmButton: false,
          });
        });
    },
    switchToRegister() {
      this.$router.push({ path: "/register" });
    },
    forgot() {
      this.$router.push({ path: "/forgot" });
    },
  },
};
</script>

<style scoped>
.wrapp-form {
  width: 400px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  height: fit-content;
  align-self: center;
}

form .item-form {
  width: 100%;
  padding: 10px 30px;
  position: relative;
}
form .item-form input,
form .item-form textarea {
  width: 100%;
  padding: 12px 10px;
  padding-left: 40px;
  display: inline-block;
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
  cursor: text;
  outline: none;
  font-size: 1rem;
  font-weight: 400;
  color: #495057;
  background-color: #cccc;
  background-clip: padding-box;
}
form .item-form .btn {
  background-color: #30698c;
  color: white;
  height: 50px;
  font-weight: 600;
  font-size: 18px;
  padding: 10px;
  text-align: center;
  display: block;
  width: 100%;
  border-radius: 4px;
}

form .item-form .btn:hover {
  opacity: 0.8;
}
form .or {
  display: flex;
  align-items: center;
  padding: 10px 0px;
}
form .or div {
  height: 1px;
  width: 100%;
  background-color: #dbdbdb;
  -webkit-box-flex: 1;
}
form .or span {
  color: #ccc;
  padding: 0 1rem;
  text-transform: uppercase;
  font-size: 0.75rem;
}
form .sign-up-link {
  padding: 10px;
  color: rgba(0, 0, 0, 0.26);
  text-align: center;
}
form .sign-up-link p {
  font-size: 14px;
}
form .sign-up-link p span {
  color: darkblue;
  font-weight: 500;
}
.item-form i {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 42px;
}

.item-form .pass-icon {
  left: unset;
  right: 45px;
}
</style>
