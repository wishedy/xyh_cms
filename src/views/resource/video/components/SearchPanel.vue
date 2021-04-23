<template>
  <section class="search-wrap">
    <el-form
      ref="searchForm"
      :model="formData"
      :inline="true"
      label-width="110px"
    >
      <el-form-item
        label="视频ID:"
      >
        <el-input
          v-model="formData.id"
          class="search-box"
          type="text"
          placeholder="请输入视频ID"
          @keyup.enter.native="handleSearch"
        />
      </el-form-item>
      <el-form-item
        label="视频名称:"
      >
        <el-input
          v-model="formData.names"
          class="search-box"
          type="text"
          placeholder="请输入视频名称"
          @keyup.enter.native="handleSearch"
        />
      </el-form-item>
      <el-form-item label="资源类型" prop="platform">
        <el-select v-model="formData.platform" clearable placeholder="请选择" style="width:256px;"  auto-complete="off">
          <el-option
            v-for="item in demandList"
            :key="item.id"
            :label="item.names"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="资源状态" prop="status">
        <el-select v-model="formData.status" clearable placeholder="请选择" style="width:256px;"  auto-complete="off">
          <el-option
            v-for="item in status"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
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
    triggerReset: {
      default () {
        return 0
      },
      type: Number
    },
    demandList: {
      default () {
        return []
      },
      type: Array
    }
  },
  data () {
    return {
      status: [
        {
          value: '0',
          name: '下架'
        },
        {
          value: '1',
          name: '上架'
        }
      ],
      originalForm: {
        id: '',
        status: '',
        platform: '',
        names: ''
      },
      formData: {
        id: '',
        status: '',
        platform: '',
        names: ''
      }
    }
  },
  watch: {
    triggerReset () {
      const _this = this
      _this.formData = JSON.parse(JSON.stringify(_this.originalForm))
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
