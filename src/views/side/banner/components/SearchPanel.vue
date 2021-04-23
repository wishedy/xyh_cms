<template>
  <section class="search-wrap">
    <el-form
      ref="searchForm"
      :model="formData"
      :inline="true"
      label-width="110px"
    >
      <el-form-item
        label="轮播图ID:"
      >
        <el-input
          v-model="formData.id"
          class="search-box"
          type="text"
          placeholder="请输入轮播图ID"
          @keyup.enter.native="handleSearch"
        />
      </el-form-item>
      <el-form-item
        label="轮播图名称:"
      >
        <el-input
          v-model="formData.names"
          class="search-box"
          type="text"
          placeholder="请输入轮播图名称"
          @keyup.enter.native="handleSearch"
        />
      </el-form-item>
      <el-form-item label="轮播图位置" prop="showType">
        <el-select v-model="formData.showType" clearable placeholder="请选择" style="width:256px;"  auto-complete="off">
          <el-option
            v-for="item in showTypeList"
            :key="item.id"
            :label="item.title"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="轮播图状态" prop="status">
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
      showTypeList: [
        {
          id: 1,
          title: 'PC首页'
        }, {
          id: 10,
          title: '小程序'
        }, {
          id: 20,
          title: '学研课堂'
        },
        {
          id: 30,
          title: '课堂列表'
        }
      ],
      originalForm: {
        id: '',
        names: '',
        status: '',
        showType: ''
      },
      formData: {
        id: '',
        names: '',
        status: '',
        showType: ''
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
