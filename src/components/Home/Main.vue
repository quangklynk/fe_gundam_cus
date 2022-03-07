<template>
  <el-main class="bg-main">
    <div class="container-slider">
      <div class="left-slider">
        <el-carousel indicator-position="inside">
          <el-carousel-item v-for="item in data.slides" :key="item.id">
            <img class="img-in-sider" :src="item.image" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="center-slider"></div>
      <div class="right-slider">
        <img :src="data.slides[0].image" alt="" />
      </div>
    </div>

    <div class="today-item">
      <div class="title-today-item">
        <img src="./../../assets/imge/Home/giasoc.svg" alt="" />
        <img
          src="./../../assets/imge/Home/dealFlashIcon.svg"
          alt=""
          class="flash-animated"
        />
        <img src="./../../assets/imge/Home/homnay.svg" alt="" />
      </div>
      <el-divider></el-divider>
      <div class="list-item">
        <div
          class="element-list"
          v-for="item in data.discoutList"
          :key="item.id"
          @click="switchToProduct(item.id)"
        >
          <img :src="item.avatar" alt="" />
          <div class="discount-value">-{{ item.discount }}%</div>
          <p class="makeup-price">
            {{ formatPrice(item.price - (item.price * item.discount) / 100) }}
          </p>
        </div>
      </div>
    </div>

    <div class="menu-sub">
      <div class="element-sub" @click="gotoContact">
        <div>
          <img src="./../../assets/imge/Home/contact.webp" alt="" />
        </div>
        <p>Hợp Tác</p>
      </div>
      <div class="element-sub" @click="gotoBlog">
        <div>
          <img src="./../../assets/imge/Home/blogs.webp" alt="" />
        </div>
        <p>Blog</p>
      </div>
    </div>

    <div class="hot-item">
      <div class="title-hot-item">
        <h2>Sản Phẩm Nổi Bật</h2>
      </div>
      <el-divider></el-divider>
      <div class="list-item">
        <div
          class="element-hot-item"
          v-for="item in data.remarkList"
          :key="item.id"
          @click="switchToProduct(item.id)"
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
            <div class="container-price">
              <p class="makeup-price">{{ formatPrice(item.price) }}</p>
              <div class="price-discount">-{{ item.discount }}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-empty v-if="loading" description="Đang tải trang"></el-empty>
  </el-main>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      loading: true,
      value: 3.7,
      data: {
        slides: [],
        discoutList: [],
        remarkList: [],
      },
      defaulPathSlide: "http://localhost/image/slide/",
      defaulPathProduct: "http://localhost/image/product/",
    };
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " ₫";
    },
    gotoContact() {
      this.$router.push("/contact");
    },
    gotoBlog() {
      this.$router.push("/blog");
    },
    getAllSlide() {
      axios
        .get("slide/v1/customer")
        .then((result) => {
          this.data.slides = result.data.data;
          this.data.slides.forEach((element) => {
            element.image = this.defaulPathSlide + element.image;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loadPage() {
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },
    getProductHome() {
      axios
        .get("product/v1/home")
        .then((result) => {
          console.log(result);
          this.data.discoutList = result.data.data;
          this.data.discoutList.forEach((element) => {
            element.avatar = this.defaulPathProduct + element.avatar;
          });
          this.data.remarkList = result.data.remark;
          this.data.remarkList.forEach((element) => {
            element.avatar = this.defaulPathProduct + element.avatar;
            element.avgRate = 0;
            element.rate.forEach((element1) => {
              element.avgRate += element1.vote;
            }, element.avgRate);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    switchToProduct(id) {
      this.$router.push(`/product/${id}`);
    },
  },
  async mounted() {
    this.loadPage();
  },
  async created() {
    this.getAllSlide();
    this.getProductHome();
  },
};
</script>

<style scoped>
.menu-sub {
  display: flex;
  width: 1200px;
  margin: 0 auto;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding: 10px;
}

.element-sub {
  text-align: center;
  padding: 0 15px;
  cursor: pointer;
  color: rgb(36, 36, 36);
}

.bg-main {
  background: #f4f4f4;
}

.name-element {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 38px;
}

.title-hot-item h2 {
  font-weight: 400;
  font-size: 20px;
}

.info-element {
  padding: 10px;
}

.container-price {
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

.element-hot-item img {
  width: inherit;
  height: 200px;
  object-fit: cover;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.today-item,
.hot-item {
  background: #fff;
  max-width: 1200px;
  margin: 15px auto;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.title-today-item,
.title-hot-item {
  padding: 15px 0 0 15px;
  display: flex;
  align-items: center;
}

.list-item {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 15px;
  justify-content: center;
  padding: 0 15px 15px 15px;
}

.element-list,
.element-hot-item {
  cursor: pointer;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #d8dbe0;
  position: relative;
}

.element-list img {
  width: inherit;
  height: 200px;
  object-fit: cover;
}

.element-list .discount-value {
  background-color: rgb(255, 66, 78);
  color: rgb(255, 255, 255);
  font-size: 13px;
  line-height: 20px;
  font-weight: 500;
  position: absolute;
  z-index: 3;
  top: 0px;
  left: 0px;
  border-radius: 4px 0px 26px;
  padding: 2px 8px 4px 2px;
}

.element-list .makeup-price {
  font-weight: 500;
  font-size: 15px;
  line-height: 24px;
  text-align: center;
  color: rgb(36, 36, 36);
}

.flash-animated {
  animation: 0.8s linear 0s infinite normal none running hOKweE;
}

@keyframes hOKweE {
  50% {
    opacity: 0.3;
    transform: scale(1.3);
  }
}

.container-slider {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
}
.center-slider {
  width: 15px;
}

.left-slider {
  flex-basis: 65%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
}

.img-in-sider {
  object-fit: cover;
  width: inherit;
  height: inherit;
}

.right-slider {
  border-radius: 4px;
  flex-basis: 35%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.right-slider img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.el-carousel__item {
  width: 100%;
  height: inherit;
}
</style>
