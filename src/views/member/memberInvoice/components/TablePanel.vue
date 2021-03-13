<template>
  <section class="table-wrap">
    <el-table
      :data="list"
      border
    >
      <el-table-column prop="id" label="发票ID" />
      <el-table-column prop="id" label="用户ID" />
      <el-table-column prop="user_name" label="发票抬头" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="phone_number" label="手机号" />
      <el-table-column prop="roles_name" label="纳税人识别号" />
    </el-table>
    <!-- 分页 -->
    <div class="page">
      <el-pagination
        :current-page="page"
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
export default {
  name: 'AdminTable',
  data () {
    return {
      page: 1,
      pageSize: 10,
      total: 400,
      list: [{
        id: '11111111',
        link: '111',
        email: 'webheng@126.com',
        user_name: '张恒',
        department: '1111',
        roles_name: '111111',
        time: '2019-02-02 19:00',
        image_url: '11111',
        status: 0
      }, {
        link: '111',
        image_url: '11111',
        status: 1
      }]
    }
  },
  methods: {
    handleSizeChange (size) {
      console.log(size)
    },
    handleCurrentChange (page) {
      console.log(page)
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
