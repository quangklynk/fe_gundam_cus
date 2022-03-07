<template>
  <header>
    <div class="container-header">
      <div class="wrap-page">
        <div class="cart-logo">
          <router-link
            data-toggle="tooltip"
            data-placement="bottom"
            title="Quay lại Cửa Hàng"
            to="/"
            ><img src="./../../assets/imge/logo-t.png" alt="" />
          </router-link>
          <div class="vl"></div>
          <h5 id="title-name">Đăng Nhập</h5>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
/* line 1, header-cart.scss */
* {
  font-family: "Roboto", sans-serif;
}

/* line 5, header-cart.scss */
.container-header {
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
}
/* line 8, header-cart.scss */
.container-header .wrap-page {
  max-width: 1200px;
  margin: 0px auto;
  height: 101px;
}
/* line 12, header-cart.scss */
.container-header .wrap-page .cart-logo {
  display: flex;
  align-items: center;
  height: inherit;
}
/* line 16, header-cart.scss */
.container-header .wrap-page .cart-logo img {
  width: initial;
}
/* line 19, header-cart.scss */
.container-header .wrap-page .cart-logo .vl {
  border-left: 3px solid #1664af;
  height: 80%;
  border-radius: 15px;
}
/* line 24, header-cart.scss */
.container-header .wrap-page .cart-logo h5 {
  font-size: 20px;
  font-weight: 400;
  color: #1664af;
  padding-left: 5px;
}
</style>
