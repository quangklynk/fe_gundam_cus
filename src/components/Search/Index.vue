<template>
  <el-main class="main-search">
    <div class="container-main">
      <div class="left-main">
        <!-- cây danh mục -->
        <div class="container-left">
          <div class="title-left">
            <h2><i class="el-icon-s-order"></i> Danh mục sản phẩm</h2>
          </div>
          <br />
          <div class="menu-left-cover">
            <ul class="menu-left">
              <li v-for="(item, index) in data.category" :key="index">
                <label class="supplier" for="">{{ item.name }}</label>
                <ul class="catalog-sub">
                  <li v-for="(item1, index1) in item.category" :key="index1">
                    <router-link :to="'/search/category/' + item1.id">
                      <span>
                        <i class="el-icon-caret-right"></i>
                        {{ item1.name }}
                      </span>
                    </router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <el-divider></el-divider>
          <div class="title-left">
            <h2><i class="el-icon-s-ticket"></i> Khoảng giá</h2>
            <div class="container-search-price">
              <el-row :gutter="20">
                <el-col :span="12">
                  <input
                    class="input-price"
                    placeholder="Từ"
                    type="text"
                    @keypress="isInputNumber"
                    v-model="priceSearch.from"
                    maxlength="9"
                  />
                </el-col>
                <el-col :span="12">
                  <input
                    class="input-price"
                    placeholder="Đến"
                    type="text"
                    @keypress="isInputNumber"
                    v-model="priceSearch.to"
                    maxlength="9"
                  />
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-button class="btn-add-card" @click="searchPrice"
                    >Áp dụng</el-button
                  >
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
      <div class="right-main">
        <!-- hình ảnh -->
        <div class="container-right">
          <div
            class="product-item"
            v-for="(item, index) in data.product"
            :key="index"
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
              <div class="container-price-same" v-if="item.discount">
                <div>
                  <p class="makeup-price">
                    {{
                      formatPrice(
                        item.price - (item.price * item.discount) / 100
                      )
                    }}
                  </p>
                  <strike class="before-price">{{
                    formatPrice(item.price)
                  }}</strike>
                </div>
                <div class="price-discount">-{{ item.discount }}%</div>
              </div>
              <div class="container-price-same" v-else>
                <div>
                  <p class="makeup-price">
                    {{ formatPrice(item.price) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div v-if="data.product.length == 0" class="container-empty">
            <el-empty description="Không có sản phẩm"></el-empty>
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
        category: [],
        product: [],
      },
      defaulPath: "http://localhost/image/product/",
      value: 5,
      priceSearch: {
        to: null,
        from: null,
      },
    };
  },
  methods: {
    isInputNumber(evt) {
      var char = String.fromCharCode(evt.which);
      if (!/[0-9]/.test(char)) {
        evt.preventDefault();
      }
    },
    switchToProduct(id) {
      this.$router.push(`/product/${id}`);
    },
    handleOpen(key) {
      console.log(key);
    },

    searchByCategory() {
      axios
        .get(`/customer/search/${this.$route.params.id}`)
        .then((result) => {
          this.getData(result.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    searchByName() {
      axios
        .post(`/customer/searchname`, {
          name: this.$store.getters.searchName,
        })
        .then((result) => {
          this.getData(result.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    searchPrice() {
      if (!this.priceSearch.to || !this.priceSearch.from) {
        this.$notify({
          title: "Cảnh báo",
          message: "Vui lòng nhập giá trước khi bấm",
          type: "warning",
        });
        return;
      }

      if (parseInt(this.priceSearch.from) > parseInt(this.priceSearch.to)) {
        this.$notify({
          title: "Cảnh báo",
          message: "Giá từ không thể lớn hơn giá đến",
          type: "warning",
        });
        return;
      }
      axios
        .post("customer/searchprice/", this.priceSearch)
        .then((result) => {
          this.getData(result.data.data);
          this.$router.push(`/search/price`);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getData(list) {
      this.data.product = list;
      this.data.product.forEach((element) => {
        element.avatar = this.defaulPath + element.avatar;
        element.avgRate = 0;
        element.rate.forEach((element1) => {
          element.avgRate += element1.vote;
        }, element.avgRate);
        element.avgRate = element.avgRate / element.rate.length || 0;
      });
    },
    getAllCategory() {
      axios
        .get(`/category/v1/customer`)
        .then((result) => {
          console.log(result);
          this.data.category = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " ₫";
    },
    checkSearch() {
      if (!this.$store.getters.searchName) {
        return this.searchByCategory();
      } else {
        return this.searchByName();
      }
    },
  },
  async created() {
    this.getAllCategory();
    this.checkSearch();
  },
  beforeRouteUpdate(to, from, next) {
    next();
    if (to.path.indexOf("/search/category/") == 0) {
      this.searchByCategory();
    }
    if (to.path.indexOf("/search/name") == 0) {
      this.searchByName();
    }
  },
};
</script>

<style scoped>
.input-price {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}

.container-search-price {
  padding: 0 10px;
}

.container-empty {
  grid-column: 1/ 5;
  text-align: center;
}

.main-search {
  padding: 20px;
  background-color: #f4f4f4;
}

.container-main {
  background-color: #f2f2f2;
  display: flex;
  position: relative;
}

.container-main .left-main {
  margin: 30px;
  margin-right: unset;
  flex-basis: 22%;
  background-color: #fff;
  border-radius: 4px;
}

.title-left {
}

.title-left h2 {
  font-size: 20px;
  text-align: left;
  padding: 10px;
}

/* .menu-left-cover{

} */

.menu-left-cover .menu-left {
  list-style-type: none;
  padding: 0px 20px;
}

.menu-left-cover .menu-left li {
  margin-bottom: 10px;
}

.container-main .right-main {
  margin: 30px;
  flex-basis: 78%;
  background-color: #fff;
}

.container-right {
  border-radius: 4px;
  padding: 20px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
  justify-content: center;
}

.product-item:hover {
  box-shadow: 0px 0px 8px 2px rgba(48, 105, 140, 0.76);
  transition: 0.5s;
}
.product-item {
  cursor: pointer;
  transition: transform linear 0.1s;
  border-radius: 5px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #d8dbe0;
  position: relative;
}

.product-item img {
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

.before-price {
  font-size: 12px;
}

.price-discount {
  margin-left: 9px;
  font-size: 13px;
  line-height: 24px;
  border-radius: 2px;
  background: rgb(255, 66, 78);
  color: white;
  padding: 0px 2px;
  width: fit-content;
  display: inline-block;
  height: fit-content;
}
.info-element {
  padding: 10px;
}
.makeup-price {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: rgb(36, 36, 36);
}

/* .info-product .price-product::after {
  content: "\f164";
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  color: #ff424e;
  position: absolute;
  top: 0;
  right: 5px;
} */

.error-list {
  text-align: center;
}

.error-list label {
  display: none;
  font-size: 25px;
  border-bottom: 2px solid #bfbbbb;
  color: #bfbbbb;
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
  height: 40px;
  font-size: 15px;
  line-height: 24px;
  font-weight: 500;
  text-transform: capitalize;
  border: none;
  border-radius: 4px;
  outline: none;
}

/* Menu Left */
.supplier {
  display: inline-block;
  max-width: 100%;
  margin-bottom: 5px;
  font-weight: 600;
  color: #59626e;
}

.catalog-sub {
  padding-left: 15px;
}

.catalog-sub li span {
  color: rgb(36, 36, 36);
  font-weight: 400;
}

.catalog-sub li span:hover {
  text-decoration: underline;
}
</style>
