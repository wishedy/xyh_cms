<template>
  <section class="table-wrap">
    <el-table
      :data="list"
      border
    >
      <el-table-column prop="id" label="发票信息ID" />
      <el-table-column prop="contacts" label="联系人" />
      <el-table-column prop="email" label="电子邮箱" />
      <el-table-column prop="bankNo" label="开户行账号" />
      <el-table-column prop="bankName" label="开户行" />
      <el-table-column prop="phone" label="手机号" />
      <el-table-column prop="rise" label="发票抬头" />
      <el-table-column prop="address" label="邮寄地址" />
      <el-table-column prop="dutyNo" label="纳税人识别号" />
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
    formatResourceType (row) {
      let title = ''
      switch (parseInt(row.resType, 10)) {
        case 1:
          title = '文章'
          break
        case 2:
          title = '视频'
          break
      }
      return title
    },
    moment,
    handleSizeChange (size) {
      console.log(size)
      this.$emit('handleSizeChange', size)
    },
    handleCurrentChange (page) {
      console.log(page)
      this.$emit('handlePageChange', page)
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
