<template>
  <div class="container-info">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="info-Form"
    >
      <h5 class="title-info">Thông tin tài khoản</h5>
      <el-form-item label="Họ tên" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Số điện thoại" prop="phone">
        <el-input v-model="ruleForm.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Email">
        <label for="">{{ ruleForm.email }}</label>
      </el-form-item>
      <el-form-item label="Địa chỉ" prop="address">
        <el-input type="textarea" v-model="ruleForm.address"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">
          Cập nhật
        </el-button>
      </el-form-item>
    </el-form>
    <div class="v-line"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    var validateRequired = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Nhập Đầy Đủ"));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        id: this.$store.getters.id,
        phone: "",
        name: "",
        address: "",
      },
      rules: {
        address: [{ validator: validateRequired, trigger: "blur" }],
        name: [{ validator: validateRequired, trigger: "blur" }],
        phone: [{ validator: validateRequired, trigger: "blur" }],
      },
    };
  },
  async mounted() {
    this.getInfoCustomer();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios
            .post("customer/updateinfo", this.ruleForm)
            .then((result) => {
              console.log(result);
              this.$notify({
                title: "Success",
                message: "Đổi Thông Tin Thành Công",
                type: "success",
                offset: 100,
              });
            })
            .catch((err) => {
              this.$notify.error({
                title: "Error",
                message: `${err}`,
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getInfoCustomer() {
      axios
        .get(`customer/${this.$store.getters.id}`)
        .then((result) => {
          this.ruleForm = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.container-info {
  display: flex;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.info-Form {
  width: 600px;
  padding: 20px;
}
.title-info {
  font-weight: 400;
  font-size: 20px;
  padding-bottom: 20px;
}

.v-line {
  border-right: 1px solid #dcdfe6;
}
</style>
