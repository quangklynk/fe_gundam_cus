<template>
  <el-main>
    <div class="container-cart">
      <h2>Thông tin giỏ hàng</h2>
      <div class="container-main">
        <div class="left-main">
          <div class="title-cart">
            <div class="product-name">
              <label for=""> Sản phẩm </label>
            </div>
            <div class="product-price">
              <p>Giá</p>
            </div>
            <div class="product-quantity">
              <p>Số lượng</p>
            </div>
            <div class="product-amount">
              <p>Số tiền</p>
            </div>
            <div class="action">
              <p>Thao tác</p>
            </div>
          </div>
          <div class="list-product">
            <div
              class="item-product"
              v-for="(item, index) in data.list_cart"
              :key="index"
            >
              <div class="product-name list-name-img">
                <div class="product-img">
                  <img :src="item.avatar" />
                </div>
                <label for="">
                  {{ item.name }}
                </label>
              </div>
              <div class="product-price">
                <p class="price-product">
                  {{ formatPrice(item.price - (item.price * item.discount)/100) ||  formatPrice(item.price) }}
                </p>
              </div>
              <div class="product-quantity">
                <el-input-number
                  size="small"
                  :min="1"
                  :max="item.max"
                  v-model="item.unit"
                  @change="handleChange"
                ></el-input-number>
              </div>
              <div class="product-amount">
                <p class="product-amount-p price-product">
                  {{ formatPrice(item.unit * (item.price - (item.price * item.discount)/100)) ||  formatPrice(item.unit * item.price)}}
                </p>
              </div>
              <div class="action">
                <el-button
                  type="danger"
                  plain
                  @click="deleteRowCart(item.idProduct)"
                  >Xóa</el-button
                >
              </div>
            </div>
          </div>
          <el-button type="danger" @click="handleDeleteAll"
            >Xóa toàn bộ</el-button
          >
        </div>
        <div class="right-main">
          <div class="box-amount-all-pro">
            <div class="all-product">
              <h5>Tổng sản phẩm:</h5>
              <span> {{ totalUnit || 0 }}</span>
            </div>
            <div class="all-money-product">
              <h5>Tạm tính:</h5>
              <span> {{ formatPrice(total || 0) }}</span>
            </div>
            <button v-if="event.updateOrBuy" @click="buyProduct">
              Mua hàng
            </button>
            <button v-else @click="updateCart">Cập nhật</button>
          </div>
        </div>
      </div>
    </div>
  </el-main>
</template>

<script>
import axios from "axios";
export default {
  name: "Cart",
  data() {
    return {
      event: {
        updateOrBuy: true,
      },
      total: null,
      totalUnit: null,
      data: {
        list_cart: [],
      },
      defaulPath: "http://localhost/image/product/",
      row: {
        idProduct: "",
        idCustomer: this.$store.getters.id,
      },
    };
  },
  methods: {
    getAllCart() {
      this.total = this.totalUnit = 0;
      axios
        .get(`cart/v1/${this.$store.getters.id}`)
        .then((result) => {
          console.log(result);
          this.data.list_cart = result.data.data;
          this.data.list_cart.forEach((element) => {
            element.avatar = this.defaulPath + element.avatar;
            this.total += element.unit * (element.price - (element.price * element.discount)/100) ||  (element.unit * element.price);
            this.totalUnit += element.unit;
            
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " ₫";
    },
    handleChange() {
      this.total = 0;
      this.totalUnit = 0;
      this.data.list_cart.forEach((element) => {
        this.total += element.unit * element.price;
        this.totalUnit += element.unit;
      });
      this.event.updateOrBuy = false;
    },
    handleDeleteAll() {
      const swalWithBootstrapButtons = this.$swal.mixin({
        customClass: {
          confirmButton: "el-button el-button--success",
          cancelButton: "el-button el-button--danger",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Bạn có chắc?",
          text: "Bạn sẽ không phục hồi được giỏ hàng!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Vâng, xóa hết!",
          cancelButtonText: "Hủy!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(`/cart/v1/${this.$store.getters.id}`)
              .then((result) => {
                console.log(result);
                swalWithBootstrapButtons.fire("Đã xóa!", result, "success");
                this.getAllCart();
              })
              .catch((err) => {
                swalWithBootstrapButtons.fire("Lỗi", err, "error");
              });
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === this.$swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire("Đã hủy", "", "error");
          }
        });
    },
    deleteRowCart(idProduct) {
      this.row.idProduct = idProduct;
      const swalWithBootstrapButtons = this.$swal.mixin({
        customClass: {
          confirmButton: "el-button el-button--success",
          cancelButton: "el-button el-button--danger",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Bạn có chắc?",
          text: "Sản phẩm sẽ xóa, bạn có thể tìm lại trong cửa hàng!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Vâng, xóa!",
          cancelButtonText: "Hủy!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .post(`/cart/v1/row`, this.row)
              .then((result) => {
                console.log(result);
                swalWithBootstrapButtons.fire("Đã xóa!", result, "success");
                this.getAllCart();
              })
              .catch((err) => {
                swalWithBootstrapButtons.fire("Lỗi", err, "error");
              });
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === this.$swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire("Đã hủy", "", "error");
          }
        });
    },
    updateCart() {
      console.log(this.data);
      axios
        .patch(`cart/v1/update/${this.$store.getters.id}`, this.data)
        .then((result) => {
          console.log(result);
          this.getAllCart();
          this.$swal({
            icon: "success",
            title: "Cập nhật thành công!!!",
            showConfirmButton: false,
          });
          this.event.updateOrBuy = true;
        })
        .catch((err) => {
          console.log(err);
          this.$swal({
            icon: "error",
            title: "Server lỗi!!!",
            text: `${err}`,
            showConfirmButton: false,
          });
        });
    },
    buyProduct() {
      this.$store.dispatch("list_cart", this.data.list_cart);
      console.log(this.$store.getters.list_cart)
       this.$router.push("/order");
    },
  },
  async mounted() {
    this.getAllCart();
  },
};
</script>

<style scoped>
.container-cart {
  width: 1200px;
  margin: 0 auto;
}

button,
input[type="checkbox"] {
  cursor: pointer;
}

main {
  background-color: #f4f4f4;
}

h2 {
  text-align: center;
  padding-top: 15px;
  margin: unset;
}

.container-main {
  display: flex;
  flex-wrap: wrap;
}

.container-main .left-main {
  flex-basis: 78%;
}

.container-main .right-main {
  margin-left: 15px;
  height: inherit;
  flex-basis: 20%;
  margin-top: 20px;
}

.container-main .right-main .box-amount-all-pro {
  background-color: #fff;
  position: sticky;
  top: 0px;
  padding: 30px 15px;
}

.container-main .right-main .all-product,
.container-main .right-main .all-money-product {
  padding: 10px 0px;
}

.container-main .right-main .all-product h5,
.container-main .right-main .all-money-product h5 {
  display: inline;
}

.container-main .right-main .all-product span,
.container-main .right-main .all-money-product span {
  display: inline;
}

.container-main .right-main button {
  margin-top: 50px;
  color: #fff;
  background-color: #3785df;
  padding: 15px;
  border-radius: 4px;
  width: 100%;
  display: block;
  text-align: center;
}

.container-main .right-main a:hover {
  opacity: 0.5;
  text-decoration: none;
}

.title-cart,
.item-product {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  margin-top: 20px;
  background-color: #fff;
  padding: 20px;
  justify-content: center;
  text-align: center;
}

.title-cart .product-name {
  text-align: left;
}

.item-product div {
  align-self: center;
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
  padding-left: 5px;
  height: 36px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 20px;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>