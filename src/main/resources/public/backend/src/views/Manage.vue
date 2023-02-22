<template>
  <el-container style="min-height: 100vh">
    <!-- 側邊欄 -->
    <el-aside
      :width="sideWidth + 'px'"
      style="
        background-color: rgb(238, 241, 246);
        box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
      "
    >
      <Aside :iscollapse="collapse" :logoTextShow="logoTextShow"></Aside>
    </el-aside>
    <!-- 側邊欄 結束 -->

    <el-container>
      <!-- 上方欄 -->
      <el-header
        style="
          border-bottom: 1px solid #ccc;
          background-color: #1e646e;
          text-color: #fff;
        "
      >
        <Header
          :collapseBtnClass="collapseBtnClass"
          :iscollapse="collapse"
        ></Header>
      </el-header>
      <!-- 上方欄結束 -->

      <!-- 主內容 -->
      <el-main>
        <!-- 表示當前頁面的子路由會在router-view裡面展示 -->
        <router-view></router-view>
      </el-main>
      <!-- 主內容 結束-->
    </el-container>
  </el-container>
</template>

<script>
// import request from "@/utils/request";

import Aside from "@/components/Aside";
import Header from "@/components/Header";

export default {
  name: "Home", //有寫才會導入頁面樣式
  data() {
    return {
      collapseBtnClass: "el-icon-s-fold",
      iscollapse: false,
      sideWidth: 200,
      logoTextShow: true,
    };
  },
  components: {
    Aside,
    Header,
  },
  methods: {
    // 側邊欄收縮方法
    collapse() {
      // 点击收缩按钮触发
      this.iscollapse = !this.iscollapse;
      if (this.iscollapse) {
        // 收缩
        this.sideWidth = 64;
        this.collapseBtnClass = "el-icon-s-unfold";
        this.logoTextShow = false;
      } else {
        // 展开
        this.sideWidth = 200;
        this.collapseBtnClass = "el-icon-s-fold";
        this.logoTextShow = true;
      }
    },
  },
};
</script>
