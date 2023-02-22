<template>
  <div class="wrapper">
    <div
      style="
        margin: 150px auto;
        background-color:rgba(255,255,255,0.5);
        height: 300px;
        padding: 20px;
        border-radius: 10px;
        width: 350px;
      "
    >
      <div class="title">
        <b>iRelax Hotel 後台管理系統</b>
      </div>
      <el-form :model="employee" :rules="rules" ref="employee">
        <el-form-item prop="account">
          <el-input
            size="medium"
            style="margin: 10px 0"
            prefix-icon="el-icon-user"
            v-model="employee.account"
            placeholder="請輸入帳號"
          ></el-input>
        </el-form-item>
        <el-form-item prop="passwd">
          <el-input
            size="medium"
            style="margin: 10px 0"
            prefix-icon="el-icon-lock"
            show-password
            v-model="employee.passwd"
            placeholder="請輸入密碼"
          ></el-input>
        </el-form-item>
        <el-form-item style="margin: 10px 0; text-align: right">
          <el-button
            type="primary"
            size="small"
            autocomplete="off"
            @click="login"
          >
            登錄
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { setRoutes } from "@/router";

export default {
  name: "login",
  data() {
    return {
      employee: {
        account: "",
        passwd: "",
      },
      rules: {
        account: [
          { required: true, message: "請輸入帳號", trigger: "blur" },
          { min: 3, max: 10, message: "長度在 3 到 10 個字", trigger: "blur" },
        ],
        passwd: [
          { required: true, message: "請輸入密碼", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "長度在 1 到 20 個字",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //登錄方法 => 登錄請求發送到後台
    login() {
      this.$refs["employee"].validate((valid) => {
        if (valid) {
          // 表單校驗合法
          this.$http.post("/employee/login", this.employee).then((res) => {
            if (res.data == "帳號或密碼錯誤") {
              console.log(res.data);
              this.$message.error("帳號或密碼錯誤");
            } else {
              console.log(res);
              console.log(res.data);
              this.$router.push("/home");
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

<style>

/*
1.banner沒有寫寬度，背景圖尺寸會隨著父元素
2.center 背景圖置中
3.background-size可試著寫入cover(背景圖小於容器時會放大填滿容器) 或 contain(背景圖有設定寬高，會自適應在設定的寬高內)
*/
.wrapper {
  width: 100%;
  min-height: 100vh;
  background-image: url("../assets/login_background.jpg");
  overflow: hidden;
  background-position:center center;
  background-size: 100% 100%;
}
.title{
  margin: 20px 0; 
  text-align: center; 
  font-size: 24px; 
  font-weight: bold;
  box-shadow: 0 1px;
  padding-bottom:5px;
}
</style>
