<template>
  <section class="search-wrap">
    <el-form
      ref="searchForm"
      :model="formData"
      :inline="true"
      label-width="110px"
    >
      <el-form-item
        label="需求ID:"
        prop="search"
      >
        <el-input
          v-model="formData.id"
          class="search-box"
          type="text"
          placeholder="请输入需求ID"
          @keyup.enter.native="handleSearch"
        />
      </el-form-item>
      <el-form-item
        label="课程ID:"
        prop="search"
      >
        <el-input
          v-model="formData.courseId"
          class="search-box"
          type="text"
          placeholder="请输入课程ID"
          @keyup.enter.native="handleSearch"
        />
      </el-form-item>
      <el-form-item
        label="用户微信名称:"
        prop="search"
      >
        <el-input
          v-model="formData.wxName"
          class="search-box"
          type="text"
          placeholder="请输入用户姓名"
          @keyup.enter.native="handleSearch"
        />
      </el-form-item>
      <el-form-item
        label="课程名称:"
        prop="search"
      >
        <el-input
          v-model="formData.courseName"
          class="search-box"
          type="text"
          placeholder="请输入课程名称"
          @keyup.enter.native="handleSearch"
        />
      </el-form-item>
      <el-form-item
        label="用户姓名:"
        prop="search"
      >
        <el-input
          v-model="formData.userName"
          class="search-box"
          type="text"
          placeholder="请输入用户姓名"
          @keyup.enter.native="handleSearch"
        />
      </el-form-item>
      <el-form-item
        label="邮箱:"
        prop="search"
      >
        <el-input
          v-model="formData.email"
          class="search-box"
          type="text"
          placeholder="请输入用户邮箱"
          @keyup.enter.native="handleSearch"
        />
      </el-form-item>
      <el-form-item
        label="手机号:"
        prop="search"
      >
        <el-input
          v-model="formData.phone"
          class="search-box"
          type="text"
          placeholder="请输入用户手机号"
          @keyup.enter.native="handleSearch"
        />
      </el-form-item>
      <el-form-item label="资源类型" prop="resType">
        <el-select v-model="formData.resType" clearable placeholder="请选择" style="width:156px;"  auto-complete="off">
          <el-option label="文章"
                     value="1"></el-option>
          <el-option label="视频"
                     value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单类型" prop="orderType">
        <el-select v-model="formData.orderType" clearable placeholder="请选择" style="width:156px;"  auto-complete="off">
          <el-option label="课程"
                     value="1"></el-option>
          <el-option label="需求"
                     value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="form-button-line block">
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="handleSearch"
        >查询</el-button>
        <el-button
          type="warning"
          icon="el-icon-refresh"
          @click="handleReset"
        >重置</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
export default {
  name: 'SearchPanel',
  props: {
    demandList: {
      default () {
        return []
      },
      type: Array
    }
  },
  data () {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
    return {
      status: [
        {
          id: 0,
          name: '离职'
        },
        {
          id: 1,
          name: '在职'
        }
      ],
      roles: [{
        id: 0,
        name: '暂无角色'
      }, {
        id: 1,
        name: '超级管理员'
      }, {
        id: 2,
        name: '普通管理员'
      }, {
        id: 3,
        name: '小编'
      }],
      originalForm: {
        id: '',
        phone: '',
        createUser: parseInt(user.role, 10) === 0 ? '' : user.id,
        resType: '',
        courseId: '',
        userName: '',
        courseName: '',
        status: '1',
        email: '',
        wxName: ''
      },
      formData: {
        id: '',
        phone: '',
        createUser: parseInt(user.role, 10) === 0 ? '' : user.id,
        resType: '',
        courseId: '',
        userName: '',
        courseName: '',
        status: '1',
        email: '',
        wxName: ''
      }
    }
  },
  methods: {
    handleSearch () {
      this.$emit('handleSearch', this.formData)
    },
    handleReset () {
      const _this = this
      _this.formData = JSON.parse(JSON.stringify(_this.originalForm))
      _this.$emit('handleSearch', _this.formData)
    },
    handleCreate () {
      this.$emit('handleCreate')
    }
  }
}
</script>
