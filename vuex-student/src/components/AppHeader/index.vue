<template>
  <div class="header">
    <a href="#">
      <img src="@/assets/logo.png" class="logo" alt="" />
      <span class="company">学院管理系统</span>
    </a>

    <el-dropdown trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        admin
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-circle-plus-outline" command="a"
          >修改密码</el-dropdown-item
        >
        <el-dropdown-item icon="el-icon-circle-plus-outline" command="b"
          >退出系统</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 修改密码区域 -->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="pwdForm" :rules="rules">
        <el-form-item label="原密码" prop="password">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="form.newPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input v-model="form.checkPassword" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit('pwdForm')">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pwd from "@/api/pwd";
import { logout } from "@/api/login.js";
export default {
  methods: {
    handleCommand(command) {
      if (command == "a") {
        // 修改密码的具体功能
        this.dialogFormVisible = true;
      } else if (command == "b") {
        this.out()
      }
    },
    out() {
      this.$store.dispatch("user/Logout").then(res=>{
        if(res.flag){
          this.$router.push("/login");
        }
      })
    },
    onSubmit(formName) {
      this.$refs[formName].validate((vali) => {
        if (vali) {
          alert("验证通过");
          let userdata = JSON.parse(localStorage.getItem("sms-user"));
          userdata.pwd = this.form.newPassword;
          pwd.update(userdata).then((res) => {
            if (res.data.flag) {
              this.dialogFormVisible = false;
              this.out
            }
          });
        } else {
          alert("验证不通过");
          return false;
        }
      });
    },
  },
  data() {
    let validatePass = (rule, value, callback) => {
      let userdata = JSON.parse(localStorage.getItem("sms-user"));
      userdata.pwd = this.form.password;
      pwd.getPass(userdata).then((res) => {
        if (res.data.flag) {
          callback();
        } else {
          callback(new Error(res.data.message));
        }
      });
    };
    let checkpass = (rule, value, callback) => {
      if (value == this.form.newPassword) {
        callback();
      } else {
        callback(new Error("密码不一致"));
      }
    };
    return {
      dialogFormVisible: false,
      form: {
        password: "",
        newPassword: "",
        checkPassword: "",
      },
      rules: {
        password: [
          { required: true, message: "请输入原密码", trigger: "blur" },
          { validator: validatePass, message: "原密码不正确", trigger: "blur" },
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
        ],
        checkPassword: [
          { required: true, message: "不能为空", trigger: "blur" },
          { validator: checkpass, trigger: "blur" },
        ],
      },
    };
  },
};
</script>

<style scoped>
.header {
  position: absolute;
  line-height: 50px;
  background-color: goldenrod;
  padding: 0px;
  top: 0px;
  width: 100%;
}
.logo {
  vertical-align: middle;
  padding: 0 10px 0 40px;
  width: 30px;
}
.company {
  position: absolute;
  color: white;
}
/* 下拉菜单 */
.el-dropdown {
  float: right;
  margin-right: 40px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
</style>