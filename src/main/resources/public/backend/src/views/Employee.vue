<template>
  <div>
    <!-- 查詢框 -->
    <div style="margin: 10px 0">
      <el-input
      style="width: 200px; margin-right: 10px;"
      placeholder="請輸入姓名"
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
      prop="name"
      label="姓名"
      style="min-width: 30%"
      ></el-table-column>
      <el-table-column
        prop="account"
        label="帳號"
        style="min-width: 30%"
        ></el-table-column>
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
          :page-sizes="[5, 10, 15, 20]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="rawList.length"
        ></el-pagination>
    <!-- 分頁 結束 -->

    <!-- 新增表單 -->
    <el-dialog title="新增員工資料" :visible.sync="dialogFormVisible" width="30%">
      <el-form label-width="80px" size="small" :model="addForm" :rules="rules">
        <el-form-item label="姓名">
          <el-input v-model="addForm.name" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="帳號" prop="account">
          <el-input v-model="addForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密碼">
          <el-input
            type="password"
            v-model="addForm.passwd"
            autocomplete="off"
          ></el-input>
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
      title="修改員工資料"
      :visible.sync="dialogFormVisibleedit"
      width="30%"
    >
      <el-form :model="editForm" label-width="80px" size="small" > 
        <el-form-item label="編號">
          <el-input v-model="editForm.id" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="帳號">
          <el-input
            v-model="editForm.account"
            autocomplete="off"
            disabled
          ></el-input>
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
  name: "employee",
  data() {
    return {
      // 分頁
      currentPage1: 1, //當前頁
      pageSize: 5,    //一頁顯示多少項
      rawList: [],
      // 導入表格內容
      tableData: [{
        id: "",
        name: "",
        account: "",
        passwd: "",
      }], 
      // 新增表單
      addForm: {},
      dialogFormVisible: false, // 新增表單不自動彈出
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
            if (item.name.indexOf(this.inputVal) !== -1) {
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
      this.getAllData();
    },
    // ================================================================
    // 渲染後端資料
    getAllData() {
      //要請求的地址
      var url = "/employee/";
      //發送axios請求，$http是我封裝的接口地址，可看main.js
      this.$http
        .get(url, {
          params: {
            id: this.id,
            name: this.name,
            account: this.account,
            passwd: this.passwd,
          },
        })
        .then((res) => {
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
      this.$http.post("/employee/", this.addForm).then((res) => {
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
      this.editForm = JSON.parse(JSON.stringify(row));
      this.dialogFormVisibleedit = true;
    },
    edit() {
      this.$http.put(`/employee/` + this.editForm.id, {
            id: this.editForm.id,
            name: this.editForm.name,
            account: this.editForm.account,
        }).then((res) => {
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
      this.$http.delete("/employee/" + id).then((res) => {
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
    },
  },
};
</script>

<style>
.headerBg {
  background: #eee !important;
}
</style>
