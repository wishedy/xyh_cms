<template>
  <section class="search-wrap">
    <el-form
      ref="searchForm"
      :model="formData"
      :inline="true"
      label-width="110px"
    >
      <el-form-item
        label="优势ID:"
      >
        <el-input
          v-model="formData.id"
          class="search-box"
          type="text"
          placeholder="请输入优势ID"
          @keyup.enter.native="handleSearch"
        />
      </el-form-item>
      <el-form-item
        label="优势名称:"
      >
        <el-input
          v-model="formData.title"
          class="search-box"
          type="text"
          placeholder="请输入优势名称"
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
        title: ''
      },
      formData: {
        id: '',
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
