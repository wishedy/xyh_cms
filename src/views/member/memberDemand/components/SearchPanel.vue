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
      <el-form-item label="需求类型" prop="needId">
        <el-select v-model="formData.needId" clearable placeholder="请选择" style="width:256px;"  auto-complete="off">
          <el-option
            v-for="item in demandList"
            :key="item.id"
            :label="item.names"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="用户微信名称:"
        prop="search"
      >
        <el-input
          v-model="formData.wxNum"
          class="search-box"
          type="text"
          placeholder="请输入用户姓名"
          @keyup.enter.native="handleSearch"
        />
      </el-form-item>
      <el-form-item
        label="跟进经理:"
        prop="search"
      >
        <el-input
          v-model="formData.followUserName"
          class="search-box"
          type="text"
          placeholder="请输入经理姓名"
          @keyup.enter.native="handleSearch"
        />
      </el-form-item>
      <el-form-item
        label="姓名:"
        prop="search"
      >
        <el-input
          v-model="formData.contacts"
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
        needType: '',
        contacts: '',
        followUserName: '',
        email: '',
        wxNum: ''
      },
      formData: {
        id: '',
        phone: '',
        needType: '',
        contacts: '',
        followUserName: '',
        email: '',
        wxNum: ''
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
