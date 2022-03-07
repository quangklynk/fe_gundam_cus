<template>
  <div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="changePass-Form"
    >
      <h5 class="title-changepass">Đổi mật khẩu</h5>
      <el-form-item label="Mật Khẩu Cũ" prop="passold">
        <el-input
          type="password"
          v-model="ruleForm.passold"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="Mật Khẩu Mới" prop="passnew">
        <el-input
          type="password"
          v-model="ruleForm.passnew"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="Xác Nhận" prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">
          Đổi Mật Khẩu
        </el-button>
        <el-button @click="resetForm('ruleForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    var validateOldPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Nhập Mật Khẩu Cũ"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Nhập Mật Khẩu Mới"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Vui Lòng Xác Nhận Mật Khẩu"));
      } else if (value !== this.ruleForm.passnew) {
        callback(new Error("Không Khớp!!!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        id: this.$store.getters.id,
        passnew: "",
        checkPass: "",
        passold: "",
      },
      rules: {
        passnew: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        passold: [{ validator: validateOldPass, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
          axios
            .post("/change/customer", this.ruleForm)
            .then((result) => {
              console.log(result);
              this.$notify({
                title: "Success",
                message: "Đổi Mật Khẩu Thành Công",
                type: "success",
                offset: 100,
              });
            })
            .catch((err) => {
              console.log(err);
              this.$notify({
                title: "error",
                message: `${err}`,
                type: "success",
                offset: 100,
              });
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
.changePass-Form {
  background-color: #fff;
  width: 600px;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.title-changepass {
  font-weight: 400;
  font-size: 20px;
  padding-bottom: 20px;
}
</style>
