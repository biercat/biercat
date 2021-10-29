 <template>
  <div class="login-container">
    <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="childForm"
      label-width="100px"
      class="login-form"
    >
      <h2 class="title-zc">登录页</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model.number="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('childForm')"
          >登录</el-button
        >
        |
        <a href="#/register">没有账号，点击注册</a>
      </el-form-item>
    </el-form>
  </div>
</template>
 
 <script>
import { login, getUserInfo } from "@/api/login.js";

export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入昵称", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //验证是否通过
          this.$store.dispatch("user/Login", this.form).then((res) => {
            if (res.flag) {
              this.$router.push("/");
            }
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
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../assets/bg.png");
  overflow: hidden;
}
.login-form {
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