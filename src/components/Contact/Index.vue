<template>
  <el-main class="bg-main">
    <div class="container-contact">
      <el-divider><h2 class="name-page">Liên Hệ</h2></el-divider>
      <el-row>
        <el-col :span="12" class="left-contact"
          ><iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.0526429735014!2d106.80409831412904!3d10.959396158788133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174dbfd2a77aae9%3A0x5727a442fc10b22e!2zR3VuZGFtIGJpw6puIGjDsmE!5e0!3m2!1svi!2s!4v1629345722252!5m2!1svi!2s"
            width="600"
            height="450"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </el-col>
        <el-col :span="12" class="right-contact">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="120px"
            class="demo-ruleForm"
          >
            <el-form-item>
              <h2 class="name-contact">Cộng tác với HOBBYSTORE</h2>
            </el-form-item>
            <el-form-item label="Họ tên" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="Email" prop="email">
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="Nội dung" prop="content">
              <el-input type="textarea" v-model="ruleForm.content"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >Gửi</el-button
              >
              <el-button @click="resetForm('ruleForm')">Reset</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </el-main>
</template>

<script>
import axios from "axios";
export default {
  name: "Contact",
  data() {
    return {
      ruleForm: {
        name: "",
        email: "",
        content: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "Vui lòng nhập họ tên",
            trigger: "blur",
          },
          {
            min: 3,
            max: 50,
            message: "Độ dài từ 3 đến 50 ",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "Vui lòng nhập email",
            trigger: "blur",
          },
          {
            min: 10,
            max: 20,
            message: "Độ dài từ 10 đến 20 ",
            trigger: "blur",
          },
        ],
        content: [
          {
            required: true,
            message: "Vui lòng nhập nội dung",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
          axios
            .post("mail", this.ruleForm)
            .then((result) => {
              console.log(result);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.bg-main {
  background: #f4f4f4;
}
.container-contact {
  width: 1200px;
  margin: 0 auto;
  background: #fff;
  border-radius: 4px;
}
.right-contact,
.left-contact {
  padding: 20px;
}
.name-contact {
  font-weight: 500;
  font-size: 20px;
}
.name-page {
  font-size: 25px;
  font-weight: 500;
}
</style>
