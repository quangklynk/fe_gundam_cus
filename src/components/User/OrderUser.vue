<template>
  <div>
    <el-collapse accordion>
      <el-collapse-item
        v-for="(item, index) in data.order"
        :key="index"
        :name="index"
      >
        <template slot="title">
          <div class="container-title-order">
            <p>Mã đơn hàng: {{ item.id }}</p>
            <p>Ngày Mua: {{ item.created_at | formatDate }}</p>
            <p class="title-status">
              Trạng thái: {{ item.status.description }}
            </p>
          </div>
        </template>
        <div class="container-detail-order">
          <div
            class="detail-order"
            v-for="(itemsub, index1) in item.detail_order"
            :key="index1"
          >
            <div class="row-order">
              <div class="content">
                <img :src="itemsub.avatar" alt="" />
                <div class="info-pro">
                  <p>{{ itemsub.nameProduct }}</p>
                  <span>x{{ itemsub.unit }}</span>
                </div>
              </div>
              <p class="price-pro">{{ formatPrice(itemsub.price) }}</p>
            </div>
          </div>
          <div class="total">
            <img src="./../../assets/imge/total-money.png" alt="" />
            <p>
              Tổng tiền:
              <span class="total-order">
                {{ formatPrice(item.total || 0) }}
              </span>
            </p>
          </div>
          <div class="action-order">
            <button
              class="btn-cancle-order"
              v-if="item.idStatus == 1"
              @click="cancelOrder(item.id)"
            >
              Hủy Đơn Hàng
            </button>
            <el-button
              @click="ratingOrder(item)"
              v-if="item.idStatus == 3"
              type="success"
              >Đánh giá</el-button
            >
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-dialog title="Đánh giá" :visible.sync="dialogVisible" width="30%">
      <span>
        <span>Đánh giá đơn có mã: {{ currenItem.id }}</span>

        <div class="container-rating">
          <el-rate
            v-model="rating.vote"
            :texts="['Tệ', 'Tạm Ổn', 'Bình Thường', 'Tốt', 'Tuyệt Vời']"
            show-text
          >
          </el-rate>
        </div>
      </span>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Đóng</el-button>
        <el-button type="primary" @click="submitRating"> Đánh giá </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      data: {
        order: [],
      },
      list_total: [],
      defaulPath: "http://localhost/image/product/",
      currenItem: {},
      dialogVisible: false,
      value: null,
      rating: {
        idCustomer: this.$store.getters.id,
        idOrder: null,
        vote: null,
      },
    };
  },
  methods: {
    getOrderByCustomer() {
      axios
        .get(`customer/v1/order/${this.$store.getters.id}`)
        .then((result) => {
          console.log(result);
          this.data.order = result.data.data;
          let temp = result.data.product;
          this.data.order.forEach((element) => {
            element.total = 0;
            element.detail_order.forEach((element1) => {
              element.total += element1.price * element1.unit;
              for (let index = 0; index < temp.length; index++) {
                if (element1.idProduct == temp[index].idProduct) {
                  element1.nameProduct = temp[index].name;
                  element1.avatar = this.defaulPath + temp[index].avatar;
                }
              }
            }, element.total);
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
    cancelOrder(id) {
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
          text: "Đơn hàng sẽ hủy và bạn sẽ không nhận được hàng!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Vâng, Bùm hàng! T.T",
          cancelButtonText: "Hủy, thao tác!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .get(`customer/v1/order/cancel/${id}`)
              .then((result) => {
                swalWithBootstrapButtons.fire("Đã xóa!", result, "success");
                this.getOrderByCustomer();
              })
              .catch((err) => {
                swalWithBootstrapButtons.fire("Lỗi", err, "error");
              });
          } else if (result.dismiss === this.$swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire("Đã hủy", "", "error");
          }
        });
    },
    ratingOrder(item) {
      this.currenItem = item;
      this.dialogVisible = true;
    },
    submitRating() {
      this.dialogVisible = false;
      this.rating.idOrder = this.currenItem.id;
      console.log(this.rating);
      axios
        .post(`customer/v1/rating/`, this.rating)
        .then((result) => {
          console.log(result);
          this.$swal({
              icon: "success",
              title: "Đánh giá thành công!!!",
              showConfirmButton: false,
            });
          this.getOrderByCustomer();
        })
        .catch((err) => {
          console.log(err);
          this.$swal({
            icon: "error",
            title: "Đánh giá bị lỗi!!!",
            text: `${err}`,
            showConfirmButton: false,
          });
        });
    },
  },
  async mounted() {
    this.getOrderByCustomer();
  },
};
</script>

<style scoped>
.title-status {
  width: 200px;
}

.container-rating {
  padding: 20px;
}

.container-title-order {
  padding-left: 15px;
  flex-basis: 100%;
  display: flex;
  justify-content: space-between;
}

.container-detail-order {
  padding: 20px;
}

.detail-order .row-order {
  padding: 10px 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
  display: flex;
  justify-content: space-between;
}

.detail-order .row-order .content {
  flex-basis: 80%;
  display: flex;
}

.detail-order .row-order .content img {
  width: 80px;
  height: 80px;
  object-fit: cover;
}

.detail-order .row-order .content .info-pro {
  width: 100%;
  padding-left: 10px;
}

.detail-order .row-order .content .info-pro p {
  width: 100%;
  padding: unset;
  margin: unset;
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 20px;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  width: 90%;
}

.detail-order .row-order .content .info-pro span {
  font-size: 14px;
}

.detail-order .row-order .price-pro {
  align-self: center;
  font-size: 14px;
}

.total {
  padding-top: 30px;
  padding-right: 10px;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.total img {
  width: 30px;
  height: 30px;
}

.total p {
  font-size: 14px;
}

.total p span {
  font-size: 30px;
  color: #6ca6d9;
}

.action-order {
  text-align: right;
  padding-right: 10px;
}

.action-order button {
  font-size: 14px;
  padding: 10px 20px;
  border: 1px solid rgba(0, 0, 0, 0.09);
  border-radius: 2px;
  background: transparent;
  color: rgba(0, 0, 0, 0.8);
}

.action-order button.btn-info {
  background-color: #337ab7;
  color: #fff;
}
.action-order button.btn-success {
  background-color: #04aa6d;
  color: #fff;
}
.action-order button.btn-cancel {
  background-color: #d9534f;
  color: #fff;
}
</style>
