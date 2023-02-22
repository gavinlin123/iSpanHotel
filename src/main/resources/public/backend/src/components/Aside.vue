<template>
  <el-menu
    :default-openeds="['1', '3']"
    style="min-height: 100%; overflow-x: hidden"
    background-color="#002C2F"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse-transition="false"
    :collapse="false"
    router
  >
    <div style="height: 60px; line-height: 60px; text-align: center">
      <img
        src="../assets/logo.png"
        alt=""
        style="width: 20px; position: relative; top: 5px; right: 0px"
      />
      <b style="color: white" v-show="logoTextShow">　後台管理系統</b>
    </div>
    <el-menu-item index="/home">
      <template slot="title">
        <i class="el-icon-house"></i>
        <span slot="title">　主頁</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/employee">
      <template slot="title">
        <i class="el-icon-s-custom"></i>
        <span slot="title">　員工管理</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/member">
      <template slot="title">
        <i class="el-icon-eleme"></i>
        <span slot="title">　會員管理</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/order">
      <template slot="title">
        <i class="el-icon-s-order"></i>
        <span slot="title">　訂單管理</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/roomtype">
      <template slot="title">
        <i class="el-icon-office-building"></i>
        <span slot="title">　房型管理</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/room">
      <template slot="title">
        <i class="el-icon-receiving"></i>
        <span slot="title">　房務管理</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/hotelNews">
      <template slot="title">
        <i class="el-icon-chat-line-round"></i>
        <span slot="title">　最新消息與活動管理</span>
      </template>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  props: {
    collapse: Boolean,
    logoTextShow: Boolean,
  },
};
</script>

<style></style>
