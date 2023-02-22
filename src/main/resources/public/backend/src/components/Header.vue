<template>
  <div style="line-height: 60px; display: flex; color: #fff">
    <div style="flex: 1">
      <span
        :class="collapseBtnClass"
        style="cursor: pointer; font-size: 18px"
        @click="iscollapse"
      ></span>
      <!-- 麵包屑 -->
      <el-breadcrumb
        separator="/"
        style="display: inline-block; margin-left: 10px; color: #fff"
      >
        <el-breadcrumb-item style="color: #fff" :to="'/home'">
          主頁
        </el-breadcrumb-item>
        <el-breadcrumb-item style="color: #fffff">
          {{ currentPathName }}
        </el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 麵包屑 結束 -->
    </div>


    <!-- 登錄用戶的資料 -->
    <el-dropdown style="width: 100px; cursor: pointer; color: #fff">
      <span style="text-decoration: none; margin-left: 60px;" @click="logout">登出</span>
      <div style="display: inline-block; color: #fff">
        <span>{{ employee.name }}</span>
      </div>
    </el-dropdown>
    <!-- 登錄用戶的資料 結束 -->
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    collapseBtnClass: String,
    iscollapse: false,
  },
  computed: {
    currentPathName() {
      return this.$store.state.currentPathName; //需要監聽的數據
    },
  },
  data() {
    return {
      employee: localStorage.getItem("employee")
        ? JSON.parse(localStorage.getItem("employee"))
        : {},
    };
  },
  methods: {
    logout() {
      this.$router.push("/login");
      localStorage.removeItem("employee");
      this.$message.success("登出成功");
    },
  },
};
</script>

<style scoped></style>
