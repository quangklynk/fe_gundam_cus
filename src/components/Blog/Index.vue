<template>
  <el-main class="bg-main">
    <div class="container-blog">
      <el-divider><h2 class="name-page">Blog</h2></el-divider>
      <el-timeline>
        <el-timeline-item
          v-for="blog in blogs"
          :key="blog.id"
          :timestamp="blog.created_at | formatDate"
          placement="top"
        >
          <el-card>
            <div class="container-card">
              <div class="wrap-img"><img :src="blog.image" alt="" /></div>
              <div class="wrap-content">
                <h4>{{ blog.titleBlog }}</h4>
                <small>Tác giả: {{ blog.employee.name }}</small>
                <p>{{ blog.content }}</p>
              </div>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </el-main>
</template>

<script>
import axios from "axios";
export default {
  name: "Blog",
  data() {
    return {
      blogs: [],
      defaut_path: "http://localhost/image/blog/",
    };
  },
  methods: {
    getAllBlog() {
      axios
        .get("blog/v1/customer")
        .then((result) => {
          console.log(result);
          this.blogs = result.data.data;
          this.blogs.forEach((element) => {
            element.image = this.defaut_path + element.image;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  async mounted() {
    this.getAllBlog();
  },
};
</script>

<style scoped>
.container-blog {
  width: 1200px;
  margin: 0 auto;
}

.container-card {
  display: flex;
}

.container-card .wrap-img {
  flex-basis: 20%;
  height: 200px;
}

.container-card .wrap-img img {
  width: 100%;
  object-fit: cover;
  height: inherit;
}

.container-card .wrap-content {
  flex-basis: 80%;
  width: 100%;
  padding: 10px;
}

.name-page {
  font-size: 25px;
  font-weight: 500;
}
</style>
