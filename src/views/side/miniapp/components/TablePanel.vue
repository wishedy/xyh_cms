<template>
  <section class="table-wrap">
    <el-table
      :data="list"
      border
    >
      <el-table-column prop="id" label="入口ID" />
      <el-table-column prop="title" label="入口名称" />
      <el-table-column label="入口封面" min-width="140px">
        <template slot-scope="scope">
          <img :src="scope.row.imgUrl" alt class="table-img" />
        </template>
      </el-table-column>
      <el-table-column prop="url" label="跳转连接" />
      <el-table-column prop="createUserName" label="创建管理员" />
      <el-table-column prop="createTime" label="创建时间">
        <template slot-scope="scope">
          <span
          >{{moment(scope.row.createTime).format("YYYY-MM-DD HH:mm:ss")}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status_name" label="操作">
        <template slot-scope="scope">
          <el-tag
            title="点击编辑需求类型"
            type="success"
            style="cursor: pointer;"
            effect="dark"
            @click="editData(scope.row)"
          >
            编辑
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="page">
      <el-pagination
        :current-page="pageNum"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </section>
</template>
<script>
import moment from 'moment'
export default {
  name: 'AdminTable',
  props: {
    pageNum: {
      default () {
        return 1
      },
      type: Number
    },
    list: {
      default () {
        return []
      },
      type: Array
    },
    total: {
      default () {
        return 0
      },
      type: Number
    },
    pageSize: {
      default () {
        return 10
      },
      type: Number
    }
  },
  methods: {
    moment,
    formatTypes: function (row, column) {
      let title = ''
      switch (parseInt(row.showType)) {
        case 1:
          title = 'PC首页'
          break
        case 10:
          title = '小程序'
          break
        case 20:
          title = '学研课堂'
          break
        case 30:
          title = '课堂列表'
          break
      }
      return title
    },
    handleSizeChange (size) {
      console.log(size)
      const _this = this
      _this.$emit('handleSizeChange', size)
    },
    editData (data) {
      const _this = this
      _this.$emit('handleEdit', data)
    },
    handleResetPassword (id) {
      const _this = this
      _this.$emit('handleResetPassword', { sysUserId: id })
    },
    handleCurrentChange (page) {
      console.log(page)
      const _this = this
      _this.$emit('handlePageChange', page)
    }
  }
}
</script>
<style lang="scss" scoped>
.table-wrap{
  .handle-item{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 5px;
    cursor: pointer;
    ::v-deep .el-tag{
      margin: 3px;
    }
  }
}
</style>
