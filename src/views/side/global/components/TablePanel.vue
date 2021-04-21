<template>
  <section class="table-wrap">
    <el-table
      :data="list"
      border
    >
      <el-table-column prop="id" label="合作资源ID" />
      <el-table-column prop="title" label="合作资源名称" />
      <el-table-column prop="status" label="合作资源状态" :formatter="formatStatus"/>
      <el-table-column prop="showType" label="合作资源类型"  :formatter="formatTypes"/>
      <el-table-column label="封面" min-width="140px">
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
      <el-table-column prop="status_name" label="操作" min-width="100px">
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
          <el-tag
            title="点击上架合作资源"
            style="cursor: pointer;"
            effect="dark"
            v-if="parseInt(scope.row.status,10)===0"
            class="tag-btn"
            @click="updateStatus(scope.row)"
          >
            上架
          </el-tag>
          <el-tag
            title="点击下架合作资源"
            style="cursor: pointer;"
            effect="dark"
            type="danger"
            v-if="parseInt(scope.row.status,10)===1"
            class="tag-btn"
            @click="updateStatus(scope.row)"
          >
            下架
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
    formatStatus (row) {
      let title = ''
      switch (parseInt(row.status, 10)) {
        case 0:
          title = '下架'
          break
        case 1:
          title = '上架'
          break
      }
      return title
    },
    updateStatus (data) {
      const _this = this
      _this.$emit('handleStatus', data)
    },
    formatTypes: function (row, column) {
      let title = ''
      switch (parseInt(row.showType)) {
        case 0:
          title = '全球合作'
          break
        case 1:
          title = '服务客户'
          break
      }
      return title
    },
    handleSizeChange (size) {
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
