<template>
  <section class="table-wrap">
    <el-table
      :data="list"
      border
    >
      <el-table-column prop="id" label="用户ID" />
      <el-table-column prop="names" label="用户姓名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="phone" label="手机号" />
      <el-table-column prop="wxName" label="微信号" />
      <el-table-column prop="createTime" label="注册日期">
        <template  slot-scope="scope">
          <span  v-text="moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')"></span>
        </template>
      </el-table-column>
      <el-table-column prop="status_name" label="操作"  fixed="right" align="center">
<!--        <template slot-scope="scope">
          <section class="handle-item">
            <el-tag
              title="点击重置用户密码"
              type="danger"
              effect="dark"
            >
              密码重置
            </el-tag>
            <el-tag
              title="点击注销用户账号"
              type="danger"
              effect="dark"
            >
              账号注销
            </el-tag>
          </section>
          <section class="handle-item">
          <el-tag
            title="点击查看用户需求"
            type="success"
            effect="dark"
          >
            用户需求
          </el-tag>
            <el-tag
              title="点击查看用户课程订单"
              type="success"
              effect="dark"
            >
              课程订单
            </el-tag>
          </section>
          <section class="handle-item">
            <el-tag
              title="点击查看用户发票信息"
              type="success"
              effect="dark"
            >
              发票信息
            </el-tag>
            <el-tag
              title="点击给用户发送消息"
              plain
              effect="dark"
            >
              发送消息
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
