<template>
  <div>
    <!-- 查詢框 -->
    <div style="margin: 10px 0">
      <el-input
      style="width: 200px; margin-right: 10px;"
      placeholder="請輸入會員帳號"
      suffix-icon="el-icon-search"
      v-model="inputVal"
      class="ml-5"
      ></el-input>
      <el-button type="warning" @click="reset">重置</el-button>
    </div>
    <!-- 查詢框 結束 -->

    <!-- 表格內容 -->
    <el-table
    :data="tableData"
    border
    stripe
    :header-cell-class-name="headerBg"
    :header-cell-style="{ textAlign: 'center' }"
    :cell-style="{ textAlign: 'center' }"
    
    >
      <el-table-column
        prop="id"
        label="訂單編號"
      >
      </el-table-column>
      <el-table-column
        prop="member.account"
        label="會員帳號"
      >
      </el-table-column>
      <el-table-column
        prop="items[0].checkinDate"
        label="入住日期"
      >
       <template #default="scope">
          {{scope.row.items[0].checkinDate.slice(0, 10)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="items[0].checkoutDate"
        label="退房日期"
      >
        <template #default="scope">
          {{scope.row.items[0].checkoutDate.slice(0, 10)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="items[0].status"
        label="狀態"
        :formatter="formatterColumn"
      >
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="查看" placement="top">
            <el-button type="primary" icon="el-icon-view" circle @click="handlelook(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="編輯" placement="top">
            <el-button type="success" icon="el-icon-edit" circle @click="handleEdit(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="刪除" placement="top">
            <el-popconfirm
              class="ml-5"
              confirm-button-text="確定"
              cancel-button-text="我再想想"
              icon="el-icon-info"
              icon-color="red"
              title="您確定刪除嗎？"
              @confirm="del(scope.row.id)"
              >
              <el-button type="danger" icon="el-icon-delete" slot="reference" circle></el-button>
            </el-popconfirm>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格內容 結束 -->

  <!-- 分頁 
    current-page 是當前頁數
    pageSize 改變時會觸發 這裏返回的是每頁條數
    page-sizes	每頁顯示個數選擇器的選項設置 返回的是數組 [5,10,20]
    layout 組件佈局，子組件名用逗號分隔 sizes, prev, pager, next, jumper, ->, total, slot
    total 總頁數
     -->

     <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage1"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="rawList.length"
        ></el-pagination>

    <!-- 分頁 結束 -->

        <!-- 檢視表單 -->
        <el-dialog
      title="訂單明細"
      :visible.sync="dialogFormVisiblelook"
      width="50%"
    >
    <el-form :model="lookForm" label-width="90px" size="small" id="editForm" > 
      <el-form-item label="訂單編號">
        <el-input v-model="lookForm.id" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="訂單日期">
        <el-input v-model="lookForm.orderDate" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="房型名稱" >
        <el-input v-model="lookForm.roomType" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="樓　　層">
        <el-input v-model="lookForm.roomFloor" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="房　　號">
        <el-input v-model="lookForm.roomNum" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="入住日期">
        <el-input v-model="lookForm.checkinDate" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="退房日期">
        <el-input v-model="lookForm.checkoutDate" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="房　　價">
        <el-input v-model="lookForm.roomPrice" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="會員帳號">
        <el-input v-model="lookForm.account" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="會員姓名">
        <el-input v-model="lookForm.realName" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="連絡電話">
        <el-input v-model="lookForm.tel" autocomplete="off" type="tel" disabled></el-input>
      </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisiblelook = false">返 回</el-button>
      </div>
    </el-dialog>
    <!-- 修改表單 結束 -->


    <!-- 修改表單 -->
    <el-dialog
      title="訂單狀態"
      :visible.sync="dialogFormVisibleedit"
      width="50%"
    >
    <el-form :model="editForm" label-width="90px" size="small" id="editForm" > 
      <el-form-item label="訂單編號">
        <el-input v-model="editForm.id" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="訂單日期">
        <el-input v-model="editForm.orderDate" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="入住日期">
        <el-input v-model="editForm.checkinDate" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="退房日期">
        <el-input v-model="editForm.checkoutDate" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="訂單狀態">
        <select v-model="editForm.status" :value="editForm.status" style="width: 100%; height: 30px; border: 1px solid #DCDFE6; color: #606266;">
          <option value="1">未完成</option>
          <option value="2">已完成</option>
          <option value="0">已取消</option>
        </select>
      </el-form-item>
      <!-- 為了傳值給後端資料庫，只能隱藏掉，不可刪掉，會報錯 -->
      <el-form-item>
        <el-input v-model="editForm.room" autocomplete="off" disabled type="hidden"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="editForm.member" autocomplete="off" disabled type="hidden"></el-input>
      </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleedit = false">取 消</el-button>
        <el-button type="primary" @click="edit">確 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改表單 結束 -->
  </div>
</template>

<script>

export default {
  name: "order",
  data() {
    return {
      // 分頁
      currentPage1: 1, //當前頁
      pageSize: 5,    //一頁顯示多少項
      rawList: [],
      // tableData: [], 
      tableData: [{
        id: "",
        orderDate: "",
        checkinDate: "",
        checkoutDate: "",
        status: "",         //訂單狀態
        room: "",           //room_id   => 房間id
        member: "",         //member_id => 會員id
        item: "",           //item_id   => 訂單明細id
        OrderJournal_room: "", //OrderJournal_room
        account: "",        //會員帳號
        realName: "",       //會員姓名
        tel: "",            //會員電話
        orderDate: "",                //訂單日期
        roomType: "",                 //房型名稱
        roomFloor: "",                //樓層
        roomNum: "",                  //房號
        roomPrice: "",              //房價
      }], 
      // 修改表單
      editForm: {},
      dialogFormVisibleedit: false, //修改表單不自動彈出
      //檢視表單
      lookForm: {},
      dialogFormVisiblelook: false, //檢視表單不自動彈出
      // 
      multipleSelection: [],
      headerBg: "headerBg",
      // 查詢表單
      inputVal: "", // 輸入框輸入值
      //
    };
  },
  // ================================================================
  // 導入後端資料
  created() {
    this.getAllData();
  },
  // ================================================================
  // 設置監聽：當輸入框值變化時，實時出現相應的表信息（使用搜索按鈕也可以）
  watch: {
    inputVal(newValue) {
      if (newValue) {
        this.searchData(true);
      } else {
        this.searchData(false);
      }
    },
  },
  // ================================================================
  methods: {
    // 查詢框--模糊查詢
    searchData(bool) {
      this.currentPage = 1;
      if (bool) {
        // 前端實現模糊查詢--不用對介面
        let newListData = []; // 用於存放搜索出來資料的新陣列
        if (this.inputVal) {
          this.tableData.filter((item) => {
            // 會員帳號模糊查詢
            if (item.member.account.indexOf(this.inputVal) !== -1) {
              newListData.push(item);
            }
          });
        }
        this.tableData = newListData;
      } else {
        this.refreshData(); //刷新頁面，即點擊搜索框的清除會回到原始頁面
      }
    },
    // 查詢按鈕重置
    reset() {
      this.inputVal = "";
      // this.account = "";
      this.getAllData();
    },
    // ================================================================
    // 渲染後端資料
    getAllData() {
      //要請求的地址
      var url = "/order/";
      //發送axios請求，$http是我封裝的接口地址，可看main.js
      this.$http
        .get(url, {
          params: {
            id: this.id,                      //訂單編號
            orderDate: this.orderDate,        //訂單日期
            roomType: this.roomType,          //房型名稱
            roomPrice: this.roomPrice,        //房價
            roomFloor: this.roomFloor,        //樓層
            roomNum: this.roomNum,            //房號
            checkinDate: this.checkinDate,    //入住日期
            checkoutDate: this.checkoutDate,  //退房日期
            status: this.status,              //訂單狀態
            account: this.account,            //會員帳號
            realName: this.realName,          //會員姓名
            tel: this.tel,                    //會員電話
            member: this.member,
            room: this.room,
            item: this.item,

          },
        })
        .then((res) => {
          console.log(res);
          this.tableData = res.data;
          // 分頁
          this.rawList = res.data;
          this.currentChangePage(this.rawList, 1);
        })
    },
    // ================================================================
    // 檢視按鈕 + 方法
    handlelook(row) {
      console.warn(row)
      this.lookForm = {
        id: row.id,
        orderDate: row.orderDate.slice(0,10),
        roomType: row.items[0].room.roomType.roomType,
        roomFloor: row.items[0].room.roomFloor,
        roomNum: row.items[0].room.roomNum,
        checkinDate: row.items[0].checkinDate.slice(0,10),
        checkoutDate: row.items[0].checkoutDate.slice(0,10),
        roomPrice: row.items[0].room.roomType.roomPrice,
        account: row.member.account,
        realName: row.member.realName,
        tel: row.member.tel,
      }
      console.warn(this.lookForm)
      this.dialogFormVisiblelook = true;
    },
    // ================================================================
    // 修改按鈕 + 方法
    handleEdit(row) {
      console.warn(row)
      this.editForm = {
        id: row.id,
        orderDate: row.orderDate.slice(0,10),
        checkinDate: row.items[0].checkinDate.slice(0,10),
        checkoutDate: row.items[0].checkoutDate.slice(0,10),
        status: row.items[0].status,
        member: row.member.id,
        room: row.items[0].room.id,
      }
      console.warn(this.editForm)
      this.dialogFormVisibleedit = true;
    },
    edit() {
      this.$http.put(`/order/` + this.editForm.id, {
        checkinDate: this.editForm.checkinDate,
        checkoutDate: this.editForm.checkoutDate,
        status: this.editForm.status,
        member_id: this.editForm.member,
        room_id: this.editForm.room,
     
      }
        ).then((res) => {
        if (res) {
          this.$message.success("修改成功");
          this.dialogFormVisibleedit = false; //讓對話框隱藏
          this.getAllData();
        } else {
          this.$message.error("修改失败");
        }
      });
    },
    // ================================================================
    // 刪除按鈕=>透過id刪除
    del(id) {
      this.$http.delete("/order/" + id).then((res) => {
        if (res) {
          this.$message.success("删除成功");
          this.getAllData();
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    // ================================================================
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    // ================================================================
    // 將狀態改成文字
    formatterColumn(row) {
      switch (row.items[0].status) {
        case 1:
          return "未完成";
          case 2:
            return "已完成";
            default:
              return "已取消";
            }
          },
    // ================================================================
    // 分頁
    handleSizeChange: function(pageSize) {
      this.pageSize = pageSize;
      this.handleCurrentChange(this.currentPage1);
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage1 = currentPage;
      this.currentChangePage(this.rawList, currentPage);
    },
    currentChangePage(list, currentPage) {
      let from = (currentPage - 1) * this.pageSize;
      let to = currentPage * this.pageSize;
      this.tableData = [];
      for (; from < to; from++) {
        if (list[from]) {
          this.tableData.push(list[from]);
        }
      }
    }
  },
};
</script>

<style>
.headerBg {
  background: #eee !important;
}

</style>
