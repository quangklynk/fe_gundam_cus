<template>
  <el-main class="container-main">
    <div class="container-product">
      <el-row class="container-detail">
        <el-col :span="10" class="left-img contain-wrap">
          <div class="main-img">
            <img :src="main_img" alt="" />
          </div>
          <div
            v-if="data.product.list_image.length != 0"
            class="child-list-img"
          >
            <img :src="data.product.avatar" @mouseover="getpath" alt="" />
            <img
              @mouseover="getpath"
              v-for="item in data.product.list_image"
              :key="item.id"
              :src="item.image"
              alt=""
            />
          </div>
        </el-col>
        <el-col :span="14" class="right-info">
          <div>
            <h2 class="name-product">
              {{ data.product.name }}
            </h2>
            <div class="rating-product">
              <el-rate
                v-model="data.product.avgRate"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value} điểm"
              >
              </el-rate>
            </div>
            <div class="container-info-product">
              <div class="container-price" v-if="data.product.discount != 0">
                <p class="price-product">
                  {{
                    formatPrice(
                      data.product.price -
                        (data.product.price * data.product.discount) / 100 || 0
                    )
                  }}
                </p>
                <strike class="price-before-discount">
                  {{ formatPrice(data.product.price) }}
                </strike>
                <div class="price-discount">-{{ data.product.discount }}%</div>
              </div>
              <div class="container-price" v-else>
                <p class="price-product">
                  {{ formatPrice(data.product.price) }}
                </p>
              </div>
              <p class="category">
                <i class="el-icon-receiving"></i>
                Loại sản phẩm : {{ data.nameCategory }}
              </p>
              <p class="unit">
                <i class="el-icon-s-grid"></i>
                Số lượng: <span>{{ data.product.unit }}</span> sản phẩm
              </p>
            </div>
            <div class="container-add-card">
              <el-input-number
                v-model="num"
                @change="handleChange"
                :min="1"
                :max="data.product.unit"
              ></el-input-number>
              <el-button class="btn-add-card" @click="addToCart"
                >Thêm vào giỏ hàng</el-button
              >
            </div>
            <div class="right-note">
              <h5><i class="fas fa-shield-alt"></i>Chính Sách Mua Hàng</h5>
              <ul>
                <li>
                  <p>
                    VẬN CHUYỂN TỨC THỜI Giao Nhanh Nội Thành Hà Nội - Hồ Chí
                    Minh
                  </p>
                </li>
                <li>
                  <p>
                    CHẤT LƯỢNG ĐẢM BẢO Hơn 200 Thương Hiệu hàng đầu Thế Giới
                  </p>
                </li>
                <li>
                  <p>CAM KẾT HỖ TRỢ 24/7 Gọi Điện - SMS - Messenger</p>
                </li>
              </ul>
            </div>
            <div class="share-service">
              <h5><i class="fas fa-share-alt"></i> Chia sẻ:</h5>
              <div
                class="elfsight-app-bb2debb1-5048-44d8-b60a-ee2a0bdd672a"
              ></div>
            </div>
          </div>
        </el-col>
      </el-row>

      <div class="container-cmt">
        <el-menu
          default-active="1"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1">Bình Luận</el-menu-item>
          <el-menu-item index="2">Mô Tả</el-menu-item>
          <el-menu-item index="3">Đánh Giá</el-menu-item>
        </el-menu>
        <div class="container-menu-cmt">
          <div v-if="menu_info == 2" class="description">
            <p>
              {{ data.product.description }}
            </p>
          </div>
          <div v-else-if="menu_info == 3" class="rating">
            <span class="heading">Đánh Giá Người Dùng</span>
            <div v-if="data.product.rate.length != 0">
              <el-rate
                v-model="data.product.avgRate"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value} điểm"
              >
              </el-rate>
              <div class="row">
                <div class="side">
                  <div>5 sao</div>
                </div>
                <div class="middle">
                  <div class="bar-container">
                    <div class="bar-5" :style="{width: percent.vote5}"></div>
                  </div>
                </div>
                <div class="side right">
                  <div>{{ data.product.vote5 }}</div>
                </div>

                <div class="side">
                  <div>4 sao</div>
                </div>
                <div class="middle">
                  <div class="bar-container">
                    <div class="bar-4" :style="{width: percent.vote4}"></div>
                  </div>
                </div>
                <div class="side right">
                  <div>{{ data.product.vote4 }}</div>
                </div>
                <div class="side">
                  <div>3 sao</div>
                </div>
                <div class="middle">
                  <div class="bar-container">
                    <div class="bar-3" :style="{width: percent.vote3}"></div>
                  </div>
                </div>
                <div class="side right">
                  <div>{{ data.product.vote3 }}</div>
                </div>
                <div class="side">
                  <div>2 sao</div>
                </div>
                <div class="middle">
                  <div class="bar-container">
                    <div class="bar-2" :style="{width: percent.vote2}"></div>
                  </div>
                </div>
                <div class="side right">
                  <div>{{ data.product.vote2 }}</div>
                </div>
                <div class="side">
                  <div>1 sao</div>
                </div>
                <div class="middle">
                  <div class="bar-container">
                    <div class="bar-1" :style="{width: percent.vote1}"></div>
                  </div>
                </div>
                <div class="side right">
                  <div>{{ data.product.vote1 }}</div>
                </div>
              </div>
            </div>
            <div v-else>
              <el-empty description="Chưa đánh giá"></el-empty>
            </div>
          </div>
          <div v-else class="comment">
            <div id="fb-root"></div>
            <div
              class="fb-comments"
              data-href="https://www.facebook.com/quang.klynk/"
              data-width="700"
              data-numposts="5"
            ></div>
          </div>
        </div>
      </div>

      <div class="container-same">
        <div class="title-section">
          <img
            src="http://localhost:83/WebTMDT/resource/imgs/02cf6c9f749be445cfb064087755d364.png"
            alt=""
          />
        </div>
        <div class="same-product">
          <div
            class="element-hot-item"
            v-for="(item, index) in data.same"
            :key="index"
          >
            <img :src="item.avatar" alt="" />
            <div class="info-element">
              <p class="name-element">
                {{ item.name }}
              </p>
              <el-rate
                v-model="item.avgRate"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              >
              </el-rate>
              <div class="container-price-same">
                <p class="makeup-price">
                  {{
                    formatPrice(
                      item.price - (item.price * item.discount) / 100 ||
                        item.price
                    )
                  }}
                </p>
                <div class="price-discount">-{{ item.discount }}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-main>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      data: {
        product: {
          rate: [],
          list_image: [],
        },
        nameCategory: "",
        defaulPath: "http://localhost/image/product/",
        same: [],
      },
      percent: { vote1: "", vote2: "", vote3: "", vote4: "", vote5: "" },

      cart: {
        idCustomer: this.$store.getters.id,
        idProduct: this.$route.params.id,
        unit: null,
      },
      main_img:
        "https://specials-images.forbesimg.com/imageserve/609a78f59ba171be93705854/960x0.jpg?fit=scale",
      value: 5,
      num: 1,
      menu_info: "",
    };
  },
  methods: {
    getpath(e) {
      this.main_img = e.target.currentSrc;
    },
    getProductById() {
      axios
        .get(`product/v1/customer/${this.$route.params.id}`)
        .then((result) => {
          this.data.same = result.data.same;
          this.data.same.forEach((element) => {
            element.avatar = this.data.defaulPath + element.avatar;
            element.avgRate = 0;
            element.rate.forEach((element1) => {
              element.avgRate = element1.vote;
            }, element.avgRate);
            element.avgRate = element.avgRate / element.rate.length || 0;
          });

          this.data.product = result.data.data;
          this.data.nameCategory = this.data.product.category.name;
          this.data.product.avatar =
            this.data.defaulPath + this.data.product.avatar;
          this.main_img = this.data.product.avatar;

          this.data.product.list_image.forEach((element) => {
            element.image = this.data.defaulPath + element.image;
          });
          this.data.product.avgRate = 0;
          this.data.product.vote1 = 0;
          this.data.product.vote2 = 0;
          this.data.product.vote3 = 0;
          this.data.product.vote4 = 0;
          this.data.product.vote5 = 0;
          this.data.product.rate.forEach(
            (element) => {
              this.data.product.avgRate += element.vote;
              this.data.product.vote1 =
                element.vote == "1"
                  ? (this.data.product.vote1 = this.data.product.vote1 + 1)
                  : this.data.product.vote1;
              this.data.product.vote2 =
                element.vote == "2"
                  ? (this.data.product.vote2 = this.data.product.vote2 + 1)
                  : this.data.product.vote2;
              this.data.product.vote3 =
                element.vote == "3"
                  ? (this.data.product.vote3 = this.data.product.vote3 + 1)
                  : this.data.product.vote3;
              this.data.product.vote4 =
                element.vote == "4"
                  ? (this.data.product.vote4 = this.data.product.vote4 + 1)
                  : this.data.product.vote4;
              console.log(element.vote == "4");
              this.data.product.vote5 =
                element.vote == "5"
                  ? (this.data.product.vote5 = this.data.product.vote5 + 1)
                  : this.data.product.vote5;
            },
            this.data.product.avgRate,
            this.data.product.vote1,
            this.data.product.vote2,
            this.data.product.vote3,
            this.data.product.vote4,
            this.data.product.vote5
          );
          this.data.product.avgRate =
            this.data.product.avgRate / this.data.product.rate.length || 0;
          this.percent.vote1 =
            (this.data.product.vote1 / this.data.product.rate.length) * 100;
          this.percent.vote2 =
            (this.data.product.vote2 / this.data.product.rate.length) * 100;
          this.percent.vote3 =
            (this.data.product.vote3 / this.data.product.rate.length) * 100;
          this.percent.vote4 =
            (this.data.product.vote4 / this.data.product.rate.length) * 100;
          this.percent.vote5 =
            (this.data.product.vote5 / this.data.product.rate.length) * 100;
          console.log(this.data.product);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleChange(value) {
      console.log(value);
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " ₫";
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.menu_info = keyPath[0];
    },
    addToCart() {
      if (
        localStorage.getItem("token") &&
        this.$store.getters.role == "customer"
      ) {
        if (!this.num || this.num == 0) {
          this.$swal({
            icon: "error",
            title: "Vui lòng nhập số lượng",
            showConfirmButton: false,
          });
          return;
        }
        this.cart.unit = this.num;
        console.log(this.cart);
        axios
          .post(`/cart/v1`, this.cart)
          .then((result) => {
            console.log(result.data);
            if (result.data.error) {
              this.$swal({
                icon: "error",
                title: result.data.error,
                showConfirmButton: false,
              });
            } else {
              this.$swal({
                icon: "success",
                title: "Đã thêm vào giỏ hàng",
                showConfirmButton: false,
              });
              this.$store.dispatch("cart", result.data.cart);
              localStorage.setItem("cart", result.data.cart);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$router.push({ path: "/login" });
      }
    },
  },
  async mounted() {
    this.getProductById();
  },
};
</script>

<style scoped>
.container-same {
  margin-top: 15px;
  background-color: #fff;
  border-radius: 4px;
}

.container-same .title-section {
  border-bottom: 2px solid #ececec;
  padding: 10px 0;
  padding-left: 15px;
}

.container-same .title-section img {
  width: 190px;
  height: 24px;
}

.container-main {
  background-color: #f4f4f4;
}
.container-product {
  width: 1200px;
  margin: 0 auto;
}

.container-cmt {
  margin-top: 15px;
  background-color: #fff;
  height: 500px;
  overflow-y: scroll;
}

.description p {
  padding: 20px;
  line-height: 22px;
}

.container-detail {
  background-color: #fff;
  border-radius: 4px;
}

.rating {
  padding: 20px;
}

.rating .row {
  width: 500px;
}

.contain-wrap {
  border-top-left-radius: 4px;
  background: #fff;
  border-right: 1px solid #e6e6e6;
  height: 460px;
}

.main-img {
  padding: 20px;
}

.main-img img {
  width: -webkit-fill-available;
  object-fit: scale-down;
  height: 318px;
}

.child-list-img {
  width: 100%;
  display: flex;
  justify-content: center;
}

.child-list-img img {
  margin: 5px;
  width: 82px;
  height: 82px;
  object-fit: cover;
}

.child-list-img img:hover,
.child-list-img img:focus,
.child-list-img img:active {
  border: 2px solid #636f83;
}

.right-info {
  padding: 20px;
}

.name-product {
  margin: 0px 0px 4px;
  color: rgb(36, 36, 36);
  font-size: 24px;
  font-weight: 300;
  line-height: 32px;
}

.rating-product {
  margin: 10px 0px;
}

.price-product {
  font-size: 32px;
  line-height: 40px;
  margin-right: 8px;
  font-weight: 500;
}

.right-note h5,
.share-service h5 {
  font-size: 17px;
  color: #242424;
}

.share-service {
  padding-top: 15px;
}

.right-note h5 i,
.share-service h5 i {
  color: #2f8dd2;
  padding-right: 5px;
}

.right-note ul {
  padding-left: 15px;
  list-style-type: none;
  margin: unset;
}

.right-note ul li p {
  line-height: 25px;
  font-size: 16px;
  font-weight: 400;
  color: #242424;
}

.right-note ul li p {
  line-height: 25px;
  font-size: 16px;
  font-weight: 400;
  color: #242424;
}

.container-info-product {
  background-color: #eef8ff;
  padding: 15px;
  border-radius: 4px;
}

.container-price {
  width: 350px;
  display: flex;
  justify-content: space-between;
}

.price-discount {
  margin-left: 9px;
  font-size: 13px;
  line-height: 20px;
  border-radius: 2px;
  background: rgb(255, 66, 78);
  color: white;
  padding: 0px 2px;
  width: fit-content;
  display: inline-block;
  align-self: flex-end;
}

.category,
.unit {
  color: #736b62;
  padding: 10px 0;
  font-weight: 500;
}

.unit span {
  color: rgb(255, 57, 69);
}

.price-before-discount {
  font-size: 15px;
  align-self: flex-end;
}

.container-add-card {
  padding: 15px 0;
  display: flex;
  flex-direction: column;
}

.btn-add-card {
  margin-top: 15px;
  color: rgb(255, 255, 255);
  background-color: rgb(255, 57, 69);
  cursor: pointer;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  min-width: 190px;
  width: 100%;
  max-width: 300px;
  height: 48px;
  font-size: 15px;
  line-height: 24px;
  font-weight: 500;
  text-transform: capitalize;
  border: none;
  border-radius: 4px;
  outline: none;
}

/* Rating */

/* Three column layout */
.side {
  float: left;
  width: 15%;
  margin-top: 10px;
}

.middle {
  margin-top: 10px;
  float: left;
  width: 70%;
}

/* Place text to the right */
.right {
  text-align: right;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* The bar container */
.bar-container {
  width: 100%;
  background-color: #f1f1f1;
  text-align: center;
  color: white;
}

/* Individual bars */
.bar-5 {
  height: 18px;
  background-color: #04aa6d;
}
.bar-4 {
  height: 18px;
  background-color: #2196f3;
}
.bar-3 {
  height: 18px;
  background-color: #00bcd4;
}
.bar-2 {
  height: 18px;
  background-color: #ff9800;
}
.bar-1 {
  height: 18px;
  background-color: #f44336;
}

.same-product {
  margin-top: 15px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 15px;
  justify-content: center;
  padding: 0 15px 15px 15px;
}

.element-hot-item {
  width: 100%;
  border-radius: 4px;
  border: 1px solid #d8dbe0;
  position: relative;
}

.element-hot-item img {
  width: inherit;
  height: 200px;
  object-fit: cover;
}

.name-element {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 38px;
}

.container-price-same {
  display: flex;
}

.price-discount {
  margin-left: 9px;
  font-size: 13px;
  line-height: 20px;
  border-radius: 2px;
  background: rgb(255, 66, 78);
  color: white;
  padding: 0px 2px;
  width: fit-content;
  display: inline-block;
}
.info-element {
  padding: 10px;
}
.makeup-price {
  font-weight: 500;
  font-size: 15px;
  line-height: 24px;
  text-align: center;
  color: rgb(36, 36, 36);
}
</style>
