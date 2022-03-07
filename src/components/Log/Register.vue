<template>
  <div class="wrapp-form">
    <form action="" @submit.prevent="registerAccount">
      <div class="item-form title">
        <h1>Đăng Ký</h1>
      </div>
      <div class="left-form">
        <div class="item-form">
          <i class="fas fa-envelope"></i>
          <input
            name="email"
            type="email"
            v-model="register.email"
            placeholder="Nhập email"
          />
        </div>
        <div class="item-form">
          <i class="fas fa-lock"></i>
          <input
            type="password"
            name="password"
            v-model="register.password"
            placeholder="Nhập mật khẩu"
          />
          <i class="fas fa-eye pass-icon"></i>
        </div>
        <div class="item-form">
          <i class="fas fa-lock"></i>
          <input
            type="password"
            name="repassword"
            v-model="register.repassword"
            placeholder="Nhập lại mật khẩu"
          />
        </div>
      </div>
      <div class="right-form">
        <div class="item-form">
          <i class="fas fa-user"></i>
          <input
            name="name"
            type="text"
            v-model="register.name"
            placeholder="Nhập Tên"
          />
        </div>
        <div class="item-form">
          <i class="fas fa-phone"></i>
          <input
            name="phone"
            type="text"
            autocomplete="off"
            v-model="register.phone"
            @keypress="isInputNumber"
            maxlength="10"
            placeholder="Nhập SDT"
          />
        </div>
        <div class="item-form">
          <i class="fas fa-map-marker-alt"></i>
          <input
            name="address"
            v-model="register.address"
            placeholder="Nhập Địa Chỉ"
          />
        </div>
      </div>
      <div class="item-form">
        <button class="btn" type="submit" :loading="true" id="btn-login">
          {{ loading ? "Đăng Ký..." : "Đăng Ký" }}
        </button>
      </div>
      <div class="or">
        <div></div>
        <span>Hoặc</span>
        <div></div>
      </div>
      <div class="sign-up-link">
        <p>
          Nếu Bạn Có Tài Khoản,Vui Lòng
          <button id="btn-open-login" type="button">
            <span @click="switchToLogin">Đăng Nhập</span>
          </button>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Register",
  data() {
    return {
      register: {
        email: "",
        password: "",
        repassword: "",
        address: "",
        phone: "",
        name: "",
      },
      loading: false,
    };
  },
  methods: {
    switchToLogin() {
      this.$router.push({ path: "/login" });
    },
    isInputNumber(evt) {
      var char = String.fromCharCode(evt.which);
      if (!/[0-9]/.test(char)) {
        evt.preventDefault();
      }
    },
    registerAccount() {
       const regex_phone = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
      if (
        !this.register.email.trim() ||
        !this.register.password.trim() ||
        !this.register.repassword.trim() ||
        !this.register.name.trim() ||
        !this.register.phone.trim() ||
        !this.register.address.trim()
      ) {
        this.$notify({
          title: "Cảnh báo",
          message: "Nhập đầy đủ thông tin",
          type: "warning",
          offset: 100,
        });
        return;
      }

      if (this.register.password.length < 8) {
        this.$notify({
          title: "Cảnh báo",
          message: "Mật khẩu phải 8 kí tự trở lên",
          type: "warning",
          offset: 100,
        });
        return;
      }

      if (!this.register.phone.match(regex_phone)) {
        this.$notify({
          title: "Cảnh báo",
          message: "Số điện thoại chưa đúng chuẩn!!!",
          type: "warning",
          offset: 100,
        });
        return;
      }

      if (!this.register.repassword.match(this.register.password)) {
        this.$notify({
          title: "Cảnh báo",
          message: "Mật khẩu và Xác nhận chưa khớp",
          type: "warning",
          offset: 100,
        });
        return;
      }
      this.loading = true;
      axios
        .post("/register/customer", this.register)
        .then((result) => {
          console.log(result);
          this.$swal({
            icon: "success",
            title: "Đăng ký thành công!!!",
            showConfirmButton: false,
          });
        })
        .catch((err) => {
          this.$swal({
            icon: "error",
            title: "Đăng ký lỗi!!!",
            text: `${err}`,
            showConfirmButton: false,
          });
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
.wrapp-form {
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  height: fit-content;
  align-self: center;
}

form {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

form .btn:hover {
  opacity: 0.8;
}
form .left-form,
form .right-form {
  flex-basis: 50%;
}
form .left-form {
  border-right: 2px solid #dbdbdb;
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
  flex-basis: 100%;
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
