<template>
  <div>
    <!-- 查詢框 -->
    <div style="margin: 10px 0">
      <el-input
      style="width: 200px; margin-right: 10px;"
      placeholder="請輸入標題名稱"
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
      prop="newsType"
      label="類型"
      style="min-width: 15%"
      :formatter="formatterColumn"
      >
      </el-table-column>
      <el-table-column
        prop="title"
        label="標題"
        style="min-width: 15%"
      >
      </el-table-column>
      <el-table-column
        prop="startDate"
        label="開始日期"
        style="min-width: 15%"
      >
      </el-table-column>
      <el-table-column
        prop="endDate"
        label="結束日期"
        style="min-width: 15%"
      >
      </el-table-column>
      <el-table-column
      label="圖片"
      style="min-width: 15%"
      >
      <template slot-scope="scope">
          <el-popover placement="top-start" title trigger="click">
            <img :src="'data:image/png;base64,'+scope.row.pic" alt style="width: 300" />
            <img slot="reference" :src="'data:image/png;base64,'+scope.row.pic" style="width: 50px;height: 50px" />
          </el-popover>
        </template>
      </el-table-column>
        <el-table-column label="操作" style="min-width: 20%" align="center">
          <template slot-scope="scope">
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

    <!-- 新增表單 -->
    <el-dialog title="最新消息與活動資料" :visible.sync="dialogFormVisible" width="50%">
      <el-form label-width="80px" size="small">
        <el-form-item label="類別">
            <select v-model="addForm.newsType" style="width: 100%; height: 30px; border: 1px solid #DCDFE6; color: #606266;">
              <option value=1>活動情報</option>
              <option value=2>住房優惠</option>
            </select>
        </el-form-item>
        <el-form-item label="標題">
          <el-input v-model="addForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="開始日期">
          <el-input v-model="addForm.startDate" autocomplete="off" type="date"></el-input>
        </el-form-item>
        <el-form-item label="結束日期">
          <el-input v-model="addForm.endDate" autocomplete="off" type="date"></el-input>
        </el-form-item>
        <el-form-item label="圖片">
        <!-- ============= -->
        <!-- 新增照片 -->
        <el-upload
          ref="uploadMutiple"
          action="action"
          name="files"
          :auto-upload="false"
          :on-success="allHandleSuccess"
          :on-change="handleChange"
          :file-list="fileList"
          :http-request="allUpload"
          :before-upload="before_upload"
          >
            <el-button size="small" type="primary">點擊上傳</el-button>
          </el-upload>
        <!-- ============== -->
        </el-form-item>
        <el-form-item label="內容">
          <el-input v-model="addForm.content" autocomplete="off" type="textarea"  :rows="10"></el-input>
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
      title="最新消息與活動資料"
      :visible.sync="dialogFormVisibleedit"
      width="50%"
    >
      <el-form :model="editForm" label-width="80px" size="small" > 
        <el-form-item label="編號">
          <el-input v-model="editForm.id" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="消息類型">
            <select v-model="editForm.newsType" :value="editForm.newsType" style="width: 100%; height: 30px; border: 1px solid #DCDFE6; color: #606266;">
              <option value="1">活動情報</option>
              <option value="2">住房優惠</option>
            </select>

        </el-form-item>
        <el-form-item label="標題">
          <el-input v-model="editForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="開始日期">
          <el-input v-model="editForm.startDate" autocomplete="off" type="date"></el-input>
        </el-form-item>
        <el-form-item label="截止日期">
          <el-input v-model="editForm.endDate" autocomplete="off" type="date"></el-input>
        </el-form-item>

        <!-- ============================== -->     
        <el-form-item label="照片">
        <!-- 修改照片 -->
          <el-upload
            class="upload-demo"
            ref="uploadMutiple"
            list-type="picture"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            action="action"
            name="files"
            :auto-upload="false"
            :on-success="allHandleSuccess"
            :on-change="handleChange"
            :file-list="fileList"
            :http-request="allUpload"
            :before-upload="before_upload"
            >
          <el-button size="small" type="primary">點擊上傳</el-button>
          </el-upload>
        </el-form-item>
        <!-- ============================== -->
        <el-form-item label="內容">
          <el-input v-model="editForm.content" autocomplete="off" type="textarea" :rows="10"></el-input>
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
      pageSize: 5,    //一頁顯示多少項
      rawList: [],
      // 表格資料
      // 導入表格內容
      // tableData: [], 
      tableData: [{
        id: "",
        newsType: "",   //最新消息與活動類型
        title: "",      //標題
        startDate: "",  //開始日期
        endDate: "",    //截止日期
        pic: "",        //圖片
        content: "",    //內容
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
      // 下拉式選單
      newsTypeoptions:[
        { value: 1, label: "活動情報"},
        { value: 2, label: "住房優惠"},
      ],
      // upload img
      fileList: [],
    };
  },
  // ================================================================
  // 導入後端資料
  created() {
    this.getAllData();
  },
  // ================================================================
  // 設置監聽：當輸入框值變化時，實時出現相應的表資訊（使用搜索按鈕也可以）
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
    // 修改img會用到的方法(1)
    // on-preview	點擊文件列表中已上傳的文件時的鉤子	function(file)
    handlePreview(file){
      console.warn('handlePreview')
    },
    // 修改img會用到的方法(2)
    // on-remove	文件列表移除文件時的鉤子	function(file, fileList)
    handleRemove(){
      this.fileList = []
    },
    //  upload img:
    handleChange(file, fileList) {
      console.warn('handleChange')
      this.fileList = fileList;
    },
    submitUpload() {
      console.warn('submitUpload')
      this.$refs.uploadMutiple.submit();
    },
    before_upload (){
      console.warn('before_upload')
    },
    allUpload (){
      console.warn('allUpload')
    },
    allHandleSuccess (){
      console.warn('allHandleSuccess')
    },
    // ================================================================
    // 查詢框--標題模糊查詢
    searchData(bool) {
      this.currentPage = 1;
      if (bool) {
        // 前端實現模糊查詢--不用對介面
        let newListData = []; // 用於存放搜索出來資料的新陣列
        if (this.inputVal) {
          this.tableData.filter((item) => {
            // 標題模糊查詢
            if (item.title.indexOf(this.inputVal) !== -1) {
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
      var url = "/hotelNews/";
      //發送axios請求，$http是我封裝的介面位址，可看main.js
      this.$http
        .get(url, {
          params: {
            id: this.id,
            newsType: this.newsType,
            title: this.title,
            startDate: this.startDate,
            endDate: this.endDate,
            pic: this.pic,
            content: this.content,
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
    // 新增按鈕
    handleAdd() {
      this.dialogFormVisible = true;
      this.addForm = {};
    },
    // 新增表單 post 到後端方法
    add() {
      // 新增圖片+表單的code 
      let formData = new FormData();
    
      formData.append("newsType", this.addForm.newsType);
      formData.append("pic", this.fileList[0].raw);
      formData.append("startDate", this.addForm.startDate);
      formData.append("endDate", this.addForm.endDate);
      formData.append("content", this.addForm.content);
      formData.append("title", this.addForm.title);
      
      this.$http.post("/hotelNews/", formData).then((res) => {
        if (res) {
          this.$message.success("新增成功");
          this.dialogFormVisible = false; //讓對話框隱藏
          this.getAllData();
        } else {
          this.$message.error("新增失敗");
        }
      });
    },
    // ================================================================
    // 修改按鈕
    handleEdit(row) {
      this.editForm = {
        id: row.id,
        newsType: row.newsType,
        title: row.title,
        startDate: row.startDate.slice(0,10),
        endDate: row.endDate.slice(0,10),
        content: row.content,
      };
      console.warn(this.editForm)
      this.dialogFormVisibleedit = true;
    },
    // 修改表單 put 到後端方法
    edit() {
      //formdata
      let formData = new FormData();
      formData.append("newsType", this.editForm.newsType);
      formData.append("title", this.editForm.title);
      formData.append("startDate", this.editForm.startDate);
      formData.append("endDate", this.editForm.endDate);
      formData.append("pic", this.fileList[0].raw);
      formData.append("content", this.editForm.content);

      this.$http.put(`/hotelNews/` + this.editForm.id, formData
        ).then((res) => {
        if (res) {
          this.$message.success("修改成功");
          this.dialogFormVisibleedit = false; //讓對話框隱藏
          this.getAllData();
        } else {
          this.$message.error("修改失敗");
        }
      });
    },
    // ================================================================
    // 刪除按鈕=>透過id刪除
    del(id) {
      this.$http.delete("/hotelNews/" + id).then((res) => {
        if (res) {
          this.$message.success("刪除成功");
          this.getAllData();
        } else {
          this.$message.error("刪除失敗");
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
    // 將狀態改成文字
    formatterColumn(row) {
      switch (row.newsType) {
        case 1:
          return "活動情報";
          default:
          return "住房優惠";
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
    },
  },
};
</script>

<style>
.headerBg {
  background: #eee !important;
}
</style>
