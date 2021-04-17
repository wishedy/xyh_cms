<template>
  <section class="table-wrap">
    <el-table
      :data="list"
      border
    >
      <el-table-column prop="id" label="订单ID" />
      <el-table-column prop="userName" label="用户姓名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="phone" label="手机号" />
      <el-table-column prop="wxName" label="微信号" />
      <el-table-column prop="courseName" label="课程名称" />
      <el-table-column prop="courseId" label="课程ID" />
      <el-table-column prop="resType" label="需求类型"  :formatter="formatResourceType"/>
      <el-table-column prop="department" label="注册时间" />
      <el-table-column prop="status_name" label="操作"  fixed="right" align="center">
<!--        <template slot-scope="scope">
          <section class="handle-item">
            <el-tag
              title="点击指派业务经理"
              type="danger"
              effect="dark"
            >
              指派业务经理
            </el-tag>
          </section>
        </template>-->
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
