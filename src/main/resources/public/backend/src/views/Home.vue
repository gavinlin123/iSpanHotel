<template>
  <div>
    <el-row>
  <el-col :span="5" style="margin-left: 100px; margin-bottom: 20px;">
    <el-card :body-style="{ padding: '0px' }">
      <img src="../assets/image/pic/pexels-vlada-karpovich-4050312 (2).jpg" class="image">
      <div style="padding: 14px;">
        <div class="bottom clearfix">
          <el-link href="employee" target="_blank" style="padding: 0;float: right; font-size: 15px;">員工管理</el-link>
        </div>
      </div>
    </el-card>
  </el-col>
<el-col :span="5" style="margin-left: 100px; margin-bottom: 20px;">
      <el-card :body-style="{ padding: '0px' }">
      <img src="../assets/image/pic/pexels-mikhail-nilov-7820616.jpg" class="image">
      <div style="padding: 14px;">
        <div class="bottom clearfix">
          <el-link href="member" target="_blank" style="padding: 0;float: right; font-size: 15px;">會員管理</el-link>
        </div>
      </div>
    </el-card>
  </el-col>
    <el-col :span="5" style="margin-left: 100px; margin-bottom: 20px;">
    <el-card :body-style="{ padding: '0px' }">
      <img src="../assets/image/pic/pexels-mikhail-nilov-7820321.jpg" class="image">
      <div style="padding: 14px;">
        <div class="bottom clearfix">
          <el-link href="order" target="_blank" style="padding: 0;float: right; font-size: 15px;">訂單管理</el-link>
        </div>
      </div>
    </el-card>
  </el-col>
</el-row>
<el-row>
        <el-col :span="5" style="margin-left: 100px; margin-bottom: 20px;">
    <el-card :body-style="{ padding: '0px' }">
      <img src="../assets/image/pic/pexels-pixabay-164595.jpg" class="image">
      <div style="padding: 14px;">
        <div class="bottom clearfix">
          <el-link href="roomtype" target="_blank" style="padding: 0;float: right; font-size: 15px;">房型管理</el-link>
        </div>
      </div>
    </el-card>
  </el-col>
        <el-col :span="5" style="margin-left: 100px; margin-bottom: 20px;">
    <el-card :body-style="{ padding: '0px' }">
      <img src="../assets/image/pic/pexels-pixabay-271639.jpg" class="image">
      <div style="padding: 14px;">
        <div class="bottom clearfix">
          <el-link href="room" target="_blank" style="padding: 0;float: right; font-size: 15px;">房務管理</el-link>
        </div>
      </div>
    </el-card>
  </el-col>
          <el-col :span="5" style="margin-left: 100px; margin-bottom: 20px;">
    <el-card :body-style="{ padding: '0px' }">
      <img src="../assets/image/pic/pexels-lisa-fotios-1369476.jpg" class="image">
      <div style="padding: 14px;">
        <div class="bottom clearfix">
          <el-link href="hotelNews" target="_blank" style="padding: 0;float: right; font-size: 15px;">最新消息與活動管理</el-link>
        </div>
      </div>
    </el-card>
  </el-col>
</el-row>
  </div>
  
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
    };
  }
};
</script>

<style>
.time {
    font-size: 15px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }


</style>
