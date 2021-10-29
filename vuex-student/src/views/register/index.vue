<template>
  <div class="register-container">
    <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="childForm"
      label-width="100px"
      class="register-form"
    >
      <h2 class="title-zc">注册页</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model.number="form.username"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model.number="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="form.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('childForm')">注册</el-button>
        |
        <a href="#/login">已有账号，点击登录</a>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { register } from "@/api/login.js";
// 对项目进行清理  views中的所有删掉
// router 中的index.js清理
// views中register->index.vue
// h1   ==>回到路由去配置     /register
// element ui  复制
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      // console.log(rule);
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.childForm.validateField("checkPass");
        }
        callback();
      }
    };

    var validatePass2 = (rule, value, callback) => {
      // console.log(rule);
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (value !== this.form.password) {
          callback(new Error("密码不一致"));
        } else {
          callback();
        }
      }
    };
    return {
      form: {
        username: "",
        password: "",
        nickname: "",
        checkPass: "",
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          register(this.form.username, this.form.nickname, this.form.password)
            .then((res) => {
              if (res.data.flag) {
                this.$router.push("/login");
              }
            })
            .catch((err) => {
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.register-container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: url("../../assets/bg.png");
  background-size: 100% 100%;
}
.register-form {
  width: 350px;
  margin: 150px auto;
  background-color: rgba(48, 162, 255, 0.7);
  padding: 30px;
  border-radius: 20px;
}
.title-zc {
  text-align: center;
}
</style>