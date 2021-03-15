<template>
  <section class="search-wrap">
    <el-form
      ref="searchForm"
      :model="formData"
      :inline="true"
      label-width="110px"
    >
      <el-form-item
        label="用户ID:"
      >
        <el-input
          v-model="formData.id"
          class="search-box"
          type="text"
          placeholder="请输入用户ID"
          @keyup.enter.native="handleSearch"
        />
      </el-form-item>
      <el-form-item
        label="姓名:"
      >
        <el-input
          v-model="formData.realName"
          class="search-box"
          type="text"
          placeholder="请输入用户姓名"
          @keyup.enter.native="handleSearch"
        />
      </el-form-item>
      <el-form-item
        label="邮箱:"
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
      >
        <el-input
          v-model="formData.phoneNum"
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
      originalForm: {
        id: '',
        realName: '',
        phoneNum: '',
        email: ''
      },
      formData: {
        id: '',
        realName: '',
        phoneNum: '',
        email: ''
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
