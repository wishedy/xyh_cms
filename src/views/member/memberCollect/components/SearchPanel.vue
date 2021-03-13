<template>
  <section class="search-wrap">
    <el-form
      ref="searchForm"
      :model="formData"
      :inline="true"
      label-width="110px"
    >
      <el-form-item
        label="姓名:"
        prop="search"
      >
        <el-input
          v-model="formData.title"
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
          v-model="formData.title"
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
          v-model="formData.title"
          class="search-box"
          type="text"
          placeholder="请输入用户手机号"
          @keyup.enter.native="handleSearch"
        />
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
  data () {
    return {
      status: [
        {
          id: 0,
          name: '需求类型1'
        },
        {
          id: 1,
          name: '需求类型2'
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
        status: '',
        role: '',
        title: ''
      },
      formData: {
        status: '',
        role: '',
        title: ''
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
