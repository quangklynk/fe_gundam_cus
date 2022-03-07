<template>
  <div class="card">
    <div
      style="
        border-radius: 200px;
        height: 200px;
        width: 200px;
        background: #f8faf5;
        margin: 0 auto;
        position: relative;
      "
    >
      <i class="checkmark">✓</i>
    </div>
    <h1>Thanh toán thành công</h1>
    <p>
      Chúng tôi sẽ gửi hàng sớm đến bạn<br />
      Bạn có thể xem hóa đơn của mình tại trang cá nhân
    </p>
  </div>
</template>

<script>
export default {
  name: "Success",
  data() {
    return {};
  },
  methods: {
    goHome(){
      setTimeout(() => {
        this.$router.push(`/`);
      }, 3000);
    }
  },
  mounted() {
    this.goHome()
  },
};
</script>

<style scoped>
body {
  text-align: center;
  padding: 40px 0;
  background: #ebf0f5;
}
h1 {
  color: #88b04b;
  font-weight: 900;
  font-size: 40px;
  margin-bottom: 10px;
}
p {
  color: #404f5e;
  font-size: 20px;
  margin: 0;
}
i {
  color: #9abc66;
  font-size: 100px;
  line-height: 200px;
  position: absolute;
  top: 50%;
  left: 46%;
  transform: translate(-50%, -50%);
}
.card {
  background: white;
  padding: 60px;
  border-radius: 4px;
  box-shadow: 0 2px 3px #c8d0d8;
  display: inline-block;
  margin: 0 auto;
  width: 100%;
  height: 100vh;
  text-align: center;
}
</style>