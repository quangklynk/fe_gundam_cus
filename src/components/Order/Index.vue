<template>
  <el-main>
    <div class="container-main">
      <div class="info-customer">
        <div class="title">
          <h1>Địa Chỉ Nhận Hàng</h1>
        </div>
        <div class="customer-address">
          <p>{{ data.infoUser.name }}</p>
          <p>{{ data.infoUser.phone }}</p>
          <p id="address-cus">{{ data.infoUser.address }}</p>
          <button type="button" class="btn-fix-address" @click="openForm">
            Sửa
          </button>
          <!-- Sửa địa chỉ giao hàng mới -->
          <el-dialog
            title="Địa chỉ giao hành"
            :visible.sync="dialogFormVisible"
          >
            <el-form :model="form">
              <el-form-item label="Địa chỉ mới" label-width="120px">
                <el-input v-model="form.address" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">Hủy</el-button>
              <el-button type="primary" @click="changeAddress">Đổi</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
      <div class="cart-product">
        <div class="header-cart">
          <div class="product-name">
            <label for=""> Sản phẩm </label>
          </div>
          <div class="product-price">
            <p>Đơn Giá</p>
          </div>
          <div class="product-quantity">
            <p>Số lượng</p>
          </div>
          <div class="product-amount">
            <p>Thành tiền</p>
          </div>
        </div>
      </div>

      <div class="list-ofCart">
        <div
          class="item-product"
          v-for="(item, index) in form.list_cart"
          :key="index"
        >
          <div class="product-name list-name-img">
            <div class="product-img">
              <img :src="item.avatar" />
            </div>
            <label for=""> {{ item.name }} </label>
          </div>
          <div class="product-price">
            <p>
              {{
                formatPrice(item.price - (item.price * item.discount) / 100) ||
                formatPrice(item.price)
              }}
            </p>
          </div>
          <div class="product-quantity">
            <p>{{ item.unit }}</p>
          </div>
          <div class="product-amount">
            <p class="product-amount-p">
              {{
                formatPrice(
                  item.unit * (item.price - (item.price * item.discount) / 100)
                ) || formatPrice(item.unit * item.price)
              }}
            </p>
          </div>
        </div>
      </div>
      <div class="bill">
        <div class="detail-bill">
          <!-- <p>Tổng tiền hàng: <span class="money-buy"></span> đ</p> -->
          <p class="total">
            Tổng thanh toán:
            <span class="money-all">{{ totalPrice(total) }}</span>
          </p>
        </div>
        <div id="buy-it">
          <button class="btn btn-primary" @click="submitOrder">Mua hàng</button>
        </div>
      </div>
    </div>
  </el-main>
</template>

<script>
import axios from "axios";
export default {
  name: "Order",
  data() {
    return {
      total: 0,
      dialogFormVisible: false,
      form: {
        address: "",
        idUser: this.$store.getters.id,
        list_cart: this.$store.getters.list_cart,
      },
      data: {
        infoUser: [],
      },
    };
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " ₫";
    },
    totalPrice(value) {
      this.form.list_cart.forEach((element) => {
        value += element.unit * (element.price - (element.price * element.discount)/100) ||  (element.unit * element.price);
      });
      return this.formatPrice(value);
    },
    changeAddress() {
      this.dialogFormVisible = false;
      this.data.infoUser.address = this.form.address;
    },
    openForm() {
      this.dialogFormVisible = true;
    },
    getInfoCustomer() {
      axios
        .get(`customer/${this.$store.getters.id}`)
        .then((result) => {
          this.data.infoUser = result.data.data;
          this.form.address = this.data.infoUser.address;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitOrder() {
      this.form.list_cart.forEach((item) => {
        item.price =
          item.price - (item.price * item.discount) / 100 || item.price;
      });
      this.form.address = this.data.infoUser.address;
      axios
        .post(`customer/v1/order`, this.form)
        .then((result) => {
          console.log(result);

          if (result.data.status != "failed") {
            this.$router.push(`/success`);
          } else {
            this.$router.push(`/error`);
          }
        })
        .catch((err) => {
          console.log(err);
          this.$router.push(`/error`);
        });
    },
  },
  async mounted() {
    this.getInfoCustomer();
  },
  beforeRouteEnter(to, from, next) {
    if (from.path != "/cart") {
      next("/");
    } else {
      next();
    }
  },
};
</script>

<style scoped>
main {
  background-color: #f5f5f5;
}

.container-main {
  width: 1200px;
  margin-left: auto;
  padding: 20px;
  margin-right: auto;
  background-color: #f5f5f5;
}
.container-main .info-customer {
  background-color: #fff;
  border-radius: 2px;
  padding: 15px;
}
.container-main .info-customer .title h1 {
  font-size: 22px;
}
.container-main .info-customer .title h1::before {
  content: "\f3c5";
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  color: #1664af;
  padding-right: 5px;
}
.container-main .info-customer .customer-address {
  display: flex;
  font-weight: 600;
}
.container-main .info-customer .customer-address p {
  padding: 10px;
  font-weight: 600;
}
.container-main .info-customer .customer-address p:last-child {
  font-weight: 500;
  font-style: oblique;
}
.container-main .info-customer .customer-address .btn-fix-address {
  font-weight: 300;
  text-decoration: underline;
  color: blue;
}

.header-cart,
.item-product {
  margin-top: 20px;
  background-color: #fff;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
}
.header-cart div,
.item-product div {
  width: inherit;
  flex-basis: 12%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
  padding: 10px 0px;
}
.header-cart .check-list,
.item-product .check-list {
  flex-basis: 5%;
}
.header-cart .product-name,
.item-product .product-name {
  flex-basis: 47%;
}
.header-cart div:not(.product-name, .check-list),
.item-product div:not(.product-name, .check-list) {
  text-align: center;
}
.header-cart .action button:hover,
.item-product .action button:hover {
  color: #f04040;
  transition: 0.3s;
}

.title-cart div {
  border: none;
}

.list-name-img {
  display: flex;
}
.list-name-img .product-img {
  height: 80px;
  width: 80px;
  padding: unset;
  border: none;
}
.list-name-img .product-img img {
  width: inherit;
  height: inherit;
  object-fit: cover;
}
.list-name-img label {
  height: 36px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 20px;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.bill {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 15px;
}
.bill .detail-bill {
  border-bottom: 1px dotted #000;
}
.bill .detail-bill .money-all {
  color: #dd3f2a;
  font-size: 35px;
  font-weight: 600;
}
.bill #buy-it {
  width: 250px;
}
.bill #buy-it button {
  margin-top: 50px;
  color: #fff;
  background-color: #3785df;
  padding: 15px;
  border-radius: 4px;
  width: 100%;
}
.bill #buy-it button:hover {
  opacity: 0.5;
}
.bill #buy-it button:active {
  transform: scale(1.2);
}
input#btn-checkout {
  padding: 10px 55px;
  margin: 15px 0px;
  font-size: 20px;
  font-weight: 600;
}
</style>