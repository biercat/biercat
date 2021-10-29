<template>
  <div>
    <!-- 最上方条件 查询 -->
    <el-form
      :inline="true"
      :model="searchMap"
      ref="searchForm"
      class="demo-form-inline"
    >
      <el-form-item prop="stunum">
        <el-input v-model="searchMap.stunum" placeholder="学号"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="searchMap.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item prop="teacher">
        <el-input
          v-model="searchMap.teacher"
          readonly
          @click.native="dialogFormVisible = true"
          placeholder="授课教师"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addData">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 主体 -->
    <el-table :data="list" height="400" border style="width: 100%">
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column prop="stunum" label="学号"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="admissiondate" label="入学时间"> </el-table-column>
      <el-table-column prop="phone" label="电话"> </el-table-column>
      <el-table-column prop="teacher" label="授课教师"> </el-table-column>
      <el-table-column prop="class" label="班级"> </el-table-column>
      <el-table-column prop="job" label="工作"> </el-table-column>
      <el-table-column prop="money" label="工资"> </el-table-column>
      <el-table-column label="操作" width="150px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row._id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row._id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <el-dialog title="请选择教师" :visible.sync="dialogFormVisible">
      <teacher :bb="true" @option-teacher="optionTeacher"></teacher>
    </el-dialog>

    <el-dialog title="学员编辑" :visible.sync="studentVisible">
      <el-form :model="pojo" ref="pojoFrom" :rules="rules">
        <el-form-item label="学号" prop="stunum">
          <el-input
            style="width: 200px"
            v-model="pojo.stunum"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input
            style="width: 200px"
            v-model="pojo.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="入学时间" prop="admissiondate">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            v-model="pojo.admissiondate"
          ></el-date-picker>
        </el-form-item>      
        <el-form-item label="电话号码" prop="phone">
          <el-input
            style="width: 200px"
            v-model="pojo.phone"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="class">
          <el-input
            style="width: 200px"
            v-model="pojo.class"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="教师" prop="teacher">
          <el-input
            style="width: 200px"
            v-model="pojo.teacher"
            readonly
            @click.native="editTeacher"
            placeholder="教师"
          ></el-input>
        </el-form-item>
        <el-form-item label="工作" prop="job">
          <el-input
            style="width: 200px"
            v-model="pojo.job"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="工资" prop="money">
          <el-input
            style="width: 200px"
            v-model="pojo.money"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- @click="
            pojo.id === null
              ? addFormData('pojoFrom')
              : updateFormData('pojoFrom')
          " -->
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="
            pojo.id === null
              ? addFormData('pojoFrom')
              : updateFormData('pojoFrom')
          "
          >确 定</el-button
        >
        <el-button @click="studentVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import studentApi from "@/api/student.js";
import Teacher from "../teacher/index.vue";
export default {
  components: {
    Teacher,
  },
  data() {
    return {
      list: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      searchMap: {
        stunum: "",
        name: "",
        teacher: "",
        id: "",
      },
      dialogFormVisible: false,
      studentVisible: false,
      rules: {
        stunum: [{ required: true, message: "工号", trigger: "blur" }],
        phone: [{ required: true, message: "电话号码", trigger: "blur" }],
        name: [{ required: true, message: "姓名", trigger: "blur" }],
        admissiondate: [
          { required: true, message: "入职时间", trigger: "blur" },
        ],
        class: [{ required: true, message: "职务", trigger: "blur" }],
      },
      pojo: {
        id: null,
        name: "",
        stunum: "",
        admissiondate: "",
        teacher: "",
        phone: "",
        class: "",
        job: "",
        money: "",
      },
      isEdit: false,
    };
  },
  methods: {
    handleEdit(value) {
      this.addData()
      // console.log(value);
      this.pojo.id=value
      studentApi.getById(value).then(res=>{
        let resArr=res.data
        if(resArr.flag){
          this.pojo=resArr.data
          // this.getList()
          // this.studentVisible=false
        }
      })
    },
    handleDelete(msg) {
      console.log(msg);
       this.$confirm("是否要删除当前数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          studentApi.delete(msg).then((res) => {
            this.$message({
              type: "success",
              message: res.data.message,
            });
            if (res.data.flag) {
              this.getList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    getList() {
      studentApi
        .search(this.currentPage, this.pageSize, this.searchMap)
        .then((res) => {
          let resArr = res.data;
          this.list = resArr.data.rows;
          this.total = resArr.data.content;
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    onSubmit() {
      this.currentPage = 1;
      this.getList();
    },
    addData() {
      this.pojo.id=null
      this.studentVisible = true;
      this.$nextTick(() => {
        // 当渲染操作结束之后  去执行回调函数
        this.$refs["pojoFrom"].resetFields();
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.currentPage = 1;
      this.getList();
    },
    optionTeacher(val) {
      // console.log(val);
      if (this.isEdit) {
        // this.pojo.id = val._id;
        this.pojo.teacher = val.name;
      } else {
        this.searchMap.teacher = val.name;
        // this.searchMap.id = val._id;
      }
      this.isEdit = false;
      this.dialogFormVisible = false;
    },
    addFormData(formName) {
      console.log("新增");
      this.$refs[formName].validate((valid) => {
        // console.log(this.pojo.id);
        if (valid) {
          // console.log("验证通过");
          studentApi.save(this.pojo).then((res) => {
            let resArr=res.data
            // console.log(resArr);
            if(resArr.flag){
              this.getList()
              this.studentVisible=false
            }else{
              console.log("新增失败");
            }
          });
        } else {
          alert("验证失败");
        }
      });
    },
    updateFormData() {
      console.log('更新');
      // _id
      studentApi.update(this.pojo).then(res=>{
        // console.log(res);
        let resArr=res.data
        if(resArr.flag){
          this.getList()
          this.studentVisible=false
        }
      })
    },
    editTeacher() {
      this.isEdit = true;
      this.dialogFormVisible = true;
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style>
</style>