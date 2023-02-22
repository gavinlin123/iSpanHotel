<template>
  <div>
    <!-- 查詢框 -->
    <div style="margin: 10px 0">
      <el-input
      style="width: 200px; margin-right: 10px;"
      placeholder="請輸入房號"
      suffix-icon="el-icon-search"
      v-model="inputVal"
      class="ml-5"
      ></el-input>
      <el-button type="warning" @click="reset">重置</el-button>
    </div>
    <!-- 查詢框 結束 -->
    
    <!-- 新增按鈕 -->
    <div style="margin: 10px 0">
      <el-button type="primary" @click="handleAdd">
        新增
        <i class="el-icon-circle-plus-outline"></i>
      </el-button>
    </div>
    <!-- 新增按鈕 結束 -->

    <!-- 表格內容 -->
    <el-table
    :data="tableData"
    border
    stripe
    :header-cell-class-name="headerBg"
    :header-cell-style="{ textAlign: 'center' }"
    :cell-style="{ textAlign: 'center' }"
    style="min-width: 100%"
    >
      <el-table-column
      prop="id"
      label="編號"
      style="min-width: 5%"
      >
      </el-table-column>
      <el-table-column
      prop="roomType.id"
      label="房型名稱"
      style="min-width: 30%"
      :formatter="roomTypeColumn"
      >
      </el-table-column>
      <el-table-column
        prop="roomFloor"
        label="樓層"
        style="min-width: 30%"
      >
      </el-table-column>
      <el-table-column
        prop="roomNum"
        label="房號"
        style="min-width: 30%"
      >
      </el-table-column>
      <el-table-column
        prop="roomStatus"
        label="狀態"
        style="min-width: 30%"
        :formatter="formatterColumn"
      >
      </el-table-column>
        <el-table-column label="操作" style="min-width: 35%" align="center">
          <template slot-scope="scope">
            <el-button type="success" @click="handleEdit(scope.row)" >
              編輯
              <i class="el-icon-edit"></i>
            </el-button>
            <el-popconfirm
            class="ml-5"
            confirm-button-text="確定"
            cancel-button-text="我再想想"
            icon="el-icon-info"
            icon-color="red"
            title="您確定刪除嗎？"
            @confirm="del(scope.row.id)"
            >
            <el-button type="danger" slot="reference">
              刪除
              <i class="el-icon-delete"></i>
            </el-button>
          </el-popconfirm>
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
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="rawList.length"
        ></el-pagination>

    <!-- 分頁 結束 -->

    <!-- 新增表單 -->
    <el-dialog title="房務資料" :visible.sync="dialogFormVisible" width="50%">
      <el-form label-width="80px" size="small">
        <el-form-item label="房型名稱">
          <!-- <el-input v-model="addForm.roomType" autocomplete="off"></el-input> -->
          <select v-model="addForm.roomType" placeholder="請選擇房型名稱"  style="width: 100%; height: 30px; border: 1px solid #DCDFE6; color: #606266;">
          <option value="1">經濟雙人房</option>
          <option value="2">經濟四人房</option>
          <option value="3">景觀雙人房</option>
          <option value="4">景觀四人房</option>
          <option value="5">豪華雙人房</option>
          <option value="6">豪華四人房</option>
          <option value="7">尊榮雙人房</option>
          <option value="8">尊榮四人房</option>
          <option value="9">總統套房</option>
          </select>
        </el-form-item>
        <el-form-item label="樓　　層">
          <el-input v-model="addForm.roomFloor" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="房　　號">
          <el-input v-model="addForm.roomNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="狀　　態">
          <select v-model="addForm.roomStatus" placeholder="請選擇房務狀態"  style="width: 100%; height: 30px; border: 1px solid #DCDFE6; color: #606266;">
          <option value="1">待入住</option>
          <option value="2">已入住</option>
          <option value="3">已退房</option>
          <option value="0">退款中</option>
          </select>
          </el-form-item>
        <el-form-item label="備　　註">
          <el-input v-model="addForm.note" autocomplete="off" type="textarea" :rows="10"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">確 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增表單 結束 -->

    <!-- 修改表單 -->
    <el-dialog
      title="房務資料"
      :visible.sync="dialogFormVisibleedit"
      width="50%"
    >
      <el-form :model="editForm" label-width="80px" size="small" > 
        <el-form-item label="編號">
          <el-input v-model="editForm.id" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="房型名稱">
          <select v-model="editForm.roomType" :value="editForm.roomType" style="width: 100%; height: 30px; border: 1px solid #DCDFE6; color: #606266;">
            <option value="1">經濟雙人房</option>
            <option value="2">經濟四人房</option>
          <option value="3">景觀雙人房</option>
          <option value="4">景觀四人房</option>
          <option value="5">豪華雙人房</option>
          <option value="6">豪華四人房</option>
          <option value="7">尊榮雙人房</option>
          <option value="8">尊榮四人房</option>
          <option value="9">總統套房</option>
          </select>
        </el-form-item>
        <el-form-item label="樓　　層">
          <el-input v-model="editForm.roomFloor" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="房 　號">
          <el-input v-model="editForm.roomNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="狀　　態">
          <select v-model="editForm.roomStatus" :value="editForm.roomStatus" style="width: 100%; height: 30px; border: 1px solid #DCDFE6; color: #606266;">
          <option value="1">待入住</option>
          <option value="2">已入住</option>
          <option value="3">已退房</option>
          <option value="0">退款中</option>
        </select>
        </el-form-item>
        <el-form-item label="備　　註">
          <el-input v-model="editForm.note" autocomplete="off" type="textarea" :rows="10"></el-input>
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
  name: "roomtype",
  data() {
    return {
      // 分頁
      currentPage1: 1, //當前頁
      pageSize: 10,    //一頁顯示多少項
      rawList: [],
      // 表格資料
      // 導入表格內容
      // tableData: [], 
      tableData: [{
        id: "",
        roomType: "",   //房型id
        roomFloor: "",  //樓層
        roomNum: "",    //房號
        roomStatus: "", //房務狀態
        note: "",       //備註
      }], 
      // 新增表單
      addForm: {},
      dialogFormVisible: false, // 新增表單不自動彈出
      // 房型下拉式選單
      roomTypeOptions:[
	    {
	      label:'經濟雙人房', value:'1'
	    },
	    {
	      label:'經濟四人房', value:'2'
	    },
	    {
	      label:'景觀雙人房', value:'3'
	    },
	    {
	      label:'景觀四人房', value:'4'
	    },
	    {
	      label:'豪華雙人房', value:'5'
	    },
	    {
	      label:'豪華四人房', value:'6'
	    },
	    {
	      label:'尊榮雙人房', value:'7'
	    },
	    {
	      label:'尊榮四人房', value:'8'
	    },
	    {
	      label:'總統套房', value:'9'
	    },
	        ],
      //狀態下拉式選單
      statusOptions:[
	    {
	      label:'待入住', value:'1'
	    },
	    {
	    label:'已入住', value:'2'
	    },
	    {
	    label:'已退房', value:'3'
	    },
	    {
	    label:'退款中', value:'0'
	    },
	        ],
      // 修改表單
      editForm: {},
      dialogFormVisibleedit: false, //修改表單不自動彈出
      // 
      multipleSelection: [],
      headerBg: "headerBg",
      // 查詢表單
      inputVal: "", // 輸入框輸入值
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
            // 房型名稱模糊查詢
            if (item.roomNum.indexOf(this.inputVal) !== -1) {
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
      var url = "/room/";
      //發送axios請求，$http是我封裝的接口地址，可看main.js
      this.$http
        .get(url, {
          params: {
            id: this.id,
            roomType: this.roomType,
            roomFloor: this.roomFloor,
            roomNum: this.roomNum,
            roomStatus: this.roomStatus,
            note: this.note,
          },
        })
        .then((res) => {
          // console.log(roomType);
          console.log(res);
          this.tableData = res.data;
          // // this.tableData = res.data.record;
          // 分頁
          this.rawList = res.data;
          this.currentChangePage(this.rawList, 1);

        })
    },
    // ================================================================
    // 新增按鈕 + 方法
    handleAdd() {
      this.dialogFormVisible = true;
      this.addForm = {};
    },
    add() {
      this.$http.post("/room/", this.addForm).then((res) => {
        if (res) {
          this.$message.success("新增成功");
          this.dialogFormVisible = false; //讓對話框隱藏
          this.getAllData();
        } else {
          this.$message.error("新增失败");
        }
      });
    },
    // ================================================================
    // 修改按鈕 + 方法
    handleEdit(row) {
      this.editForm = {
        id: row.id,
        roomType: row.roomType.id,
        roomFloor: row.roomFloor,
        roomNum: row.roomNum,
        roomStatus: row.roomStatus,
        note: row.note,
      }
      this.dialogFormVisibleedit = true;
    },
    edit() {
      this.$http.put(`/room/` + this.editForm.id, 
        {
        id: this.editForm.id,
        roomType: this.editForm.roomType,
        roomFloor: this.editForm.roomFloor,
        roomNum: this.editForm.roomNum,
        roomStatus: this.editForm.roomStatus,
        note: this.editForm.note,
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
      this.$http.delete("/room/" + id).then((res) => {
        if (res) {
          this.$message.success("删除成功");
          this.getAllData();
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    // ================================================================
    //
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    // ================================================================
    // 將表格房務狀態轉成文字
    formatterColumn(row, column) {
      switch (row.roomStatus) {
        case 1:
          return "待入住";
        case 2:
          return "已入住";
        case 3:
          return "已退房";
        default:
          return "退款中";
      }
    },
    // ================================================================
    // 將表格房型id轉成文字
    roomTypeColumn(row, column) {
      switch (row.roomType.id) {
        case 1:
          return "經濟雙人房";
        case 2:
          return "經濟四人房";
        case 3:
          return "景觀雙人房";
        case 4:
          return "景觀四人房";
        case 5:
          return "豪華雙人房";
        case 6:
          return "豪華四人房";
        case 7:
          return "尊榮雙人房";
        case 8:
          return "尊榮四人房";
        default:
          return "總統套房";
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
