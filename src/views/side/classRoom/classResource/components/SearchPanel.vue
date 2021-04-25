<template>
  <section class="search-wrap">
    <el-form
      ref="searchForm"
      :model="formData"
      :inline="true"
      label-width="110px"
    >
      <el-form-item
        label="课程ID:"
      >
        <el-input
          v-model="formData.id"
          class="search-box"
          type="text"
          placeholder="请输入课程ID"
          @keyup.enter.native="handleSearch"
        />
      </el-form-item>
      <el-form-item
        label="课程名称:"
      >
        <el-input
          v-model="formData.title"
          class="search-box"
          type="text"
          placeholder="请输入课程名称"
          @keyup.enter.native="handleSearch"
        />
      </el-form-item>
      <el-form-item label="资源类型" prop="resType">
        <el-select v-model="formData.resType" clearable placeholder="请选择" style="width:256px;"  auto-complete="off">
          <el-option
            v-for="item in resTypeList"
            :key="item.id"
            :label="item.title"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收费类型" prop="resType">
        <el-select v-model="formData.chargeType" clearable placeholder="请选择" style="width:256px;"  auto-complete="off">
          <el-option
            v-for="item in chargeTypeList"
            :key="item.id"
            :label="item.title"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程状态" prop="status">
        <el-select v-model="formData.status" clearable placeholder="请选择" style="width:256px;"  auto-complete="off">
          <el-option
            v-for="item in status"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程分类" prop="status">
        <el-select v-model="formData.courseTypeId" clearable placeholder="请选择" style="width:256px;"  auto-complete="off">
          <el-option
            v-for="item in itemize"
            :key="item.id"
            :label="item.names"
            :value="item.id">
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
    },
    itemize: {
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
      resTypeList: [
        {
          id: 1,
          title: '文章'
        }, {
          id: 2,
          title: '视频'
        }
      ],
      chargeTypeList: [
        {
          id: 1,
          title: '全员免费'
        }, {
          id: 2,
          title: '会员免费'
        }, {
          id: 3,
          title: '收费'
        }
      ],
      originalForm: {
        id: '',
        resType: '',
        courseTypeId: '',
        status: '',
        chargeType: '',
        title: ''
      },
      formData: {
        id: '',
        resType: '',
        courseTypeId: '',
        status: '',
        chargeType: '',
        title: ''
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
