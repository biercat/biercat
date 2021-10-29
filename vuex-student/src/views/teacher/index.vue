<template>
  <div>
    <!-- 最上方条件 查询 -->
    <el-form
      v-if="!bb"
      :inline="true"
      :model="searchMap"
      ref="searchForm"
      class="demo-form-inline"
    >
      <el-form-item prop="jobnumber">
        <el-input v-model="searchMap.jobnumber" placeholder="工号"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="searchMap.name" placeholder="教师姓名"></el-input>
      </el-form-item>
      <el-form-item prop="role">
        <el-select v-model="searchMap.role" placeholder="教师职务">
          <el-option
            v-for="option in roleOptions"
            :key="option.type"
            :label="option.name"
            :value="option.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="entrydate">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          v-model="searchMap.entrydate"
        ></el-date-picker>
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
    <!-- 主体信息渲染 -->
    <el-table
      :data="list"
      height="400"
      border
      style="width: 100%"
      :highlight-current-row="bb"
      @current-change="clickCurrentChange"
    >
      <el-table-column type="index" v-if="!bb" label="序号"> </el-table-column>
      <el-table-column prop="jobnumber" v-if="!bb" label="工号">
      </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="role" label="职务">
        <template slot-scope="scope">
          <span>{{ scope.row.role | roleFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="entrydate" v-if="!bb" label="入职时间">
      </el-table-column>
      <el-table-column prop="phone" label="电话"> </el-table-column>
      <el-table-column label="操作" v-if="!bb">
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
      :layout="
        !bb ? 'total, sizes, prev, pager, next, jumper' : 'prev, pager, next'
      "
      :total="total"
    >
    </el-pagination>
    <!-- 弹出框区域 -->
    <el-dialog title="新增教师" :visible.sync="dialogFormVisible">
      <el-form :model="pojo" ref="pojoFrom" :rules="rules">
        <el-form-item label="工号" prop="jobnumber">
          <el-input
            style="width: 200px"
            v-model="pojo.jobnumber"
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
        <el-form-item label="职务" prop="role">
          <el-select
            v-model="pojo.role"
            style="width: 200px"
            placeholder="请选择职务"
          >
            <el-option
              v-for="option in roleOptions"
              :key="option.type"
              :label="option.name"
              :value="option.type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入职时间" prop="entrydate">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            v-model="pojo.entrydate"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input
            style="width: 200px"
            v-model="pojo.phone"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="
            pojo.id === null
              ? addFormData('pojoFrom')
              : updateFormData('pojoFrom')
          "
          >确 定</el-button
        >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import teacherApi from "@/api/teacher.js";
let roleOptions = [
  { type: "1", name: "班主任" },
  { type: "2", name: "教师" },
];
export default {
  props: {
    bb: Boolean,
  },
  data() {
    return {
      list: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      searchMap: {
        jobnumber: "",
        name: "",
        role: "",
        entrydate: "",
      },
      roleOptions,
      pojo: {
        id: null,
        jobnumber: "",
        phone: "",
        name: "",
        entrydate: "",
        role: "",
      },
      dialogFormVisible: false,
      rules: {
        jobnumber: [{ required: true, message: "工号", trigger: "blur" }],
        phone: [{ required: true, message: "电话号码", trigger: "blur" }],
        name: [{ required: true, message: "姓名", trigger: "blur" }],
        entrydate: [{ required: true, message: "入职时间", trigger: "blur" }],
        role: [{ required: true, message: "职务", trigger: "blur" }],
      },
    };
  },
  methods: {
    getList() {
      teacherApi
        .seacrch(this.currentPage, this.pageSize, this.searchMap)
        .then((res) => {
          let resArr = res.data;
          this.total = resArr.data.content;
          this.list = resArr.data.rows;
          // console.log(resArr);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    handleEdit(msg) {
      this.addData();
      // console.log(msg);
      teacherApi.getId(msg).then((res) => {
        // console.log(res);
        if (res.data.flag) {
          this.pojo = res.data.data;
        }
      });
    },
    handleDelete(msg) {
      this.$confirm("是否要删除当前数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          teacherApi.delete(msg).then((res) => {
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
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      // if(this.bb){
      //   return false
      // }
      this.currentPage = val;
      this.getList();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.currentPage = 1;
      this.getList();
    },
    onSubmit() {
      this.currentPage = 1;
      this.getList();
    },
    addData() {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        // 当渲染操作结束之后  去执行回调函数
        this.$refs["pojoFrom"].resetFields();
      });
    },
    addFormData(formName) {
      console.log("新增操作");
      this.$refs[formName].validate((valid) => {
        if (valid) {
          teacherApi
            .add(this.pojo)
            .then((res) => {
              console.log(11);
              if (res.data.flag) {
                this.getList();
                this.dialogFormVisible = false;
              }
            })
            .catch((err) => {
              console.log("err", err);
            });
        } else {
          alert("验证不通过");
          return false;
        }
      });
    },
    updateFormData(formName) {
      console.log("更新操作");
      this.$refs[formName].validate((valid) => {
        if (valid) {
          teacherApi.update(this.pojo).then((res) => {
            if (res.data.flag) {
              this.getList();
              this.dialogFormVisible = false;
              this.pojo.id = null;
              this.pojo.name = "";
              this.pojo.jobnumber = "";
              this.pojo.entrydate = "";
              this.pojo.name = "";
              this.pojo.phone = "";
            }
          });
        } else {
          alert("验证不通过");
          return false;
        }
      });
    },
    clickCurrentChange(val) {
      // console.log(val);
      if (val) {
        // 判断是否是  val 整行信息   如果有  向父组件传值
        this.$emit("option-teacher", val);
      }
    },
  },
  created() {
    // this.queryList();
    this.getList();
  },
  filters: {
    roleFilter(type) {
      let obj = roleOptions.find((item) => item.type === type);
      return obj ? obj.name : null;
    },
  },
};
</script>

<style>
</style>