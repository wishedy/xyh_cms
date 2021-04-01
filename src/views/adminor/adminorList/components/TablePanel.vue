<template>
  <section class="table-wrap">
    <el-table
      :data="list"
      border
    >
      <el-table-column prop="id" label="用户ID" />
      <el-table-column prop="realName" label="用户姓名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="phoneNum" label="手机号" />
      <el-table-column prop="idNum" label="身份证号" />
      <el-table-column prop="idNum" label="管理员角色">
        <template slot-scope="scope">
          <el-tag type="danger" v-if="parseInt(scope.row.role,10)===0">超级管理员</el-tag>
          <el-tag type="success" v-if="parseInt(scope.row.role,10)===1">高级管理员</el-tag>
          <el-tag v-if="parseInt(scope.row.role,10)===2">普通管理员</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="states" label="管理员状态">
        <template slot-scope="scope">
          <span v-if="parseInt(scope.row.states,10)===0">待审核</span>
          <span v-if="parseInt(scope.row.states,10)===1">审核通过</span>
          <span v-if="parseInt(scope.row.states,10)===2">审核拒绝</span>
          <span v-if="parseInt(scope.row.states,10)===3">用户注销</span>
        </template>
      </el-table-column>
      <el-table-column prop="states" label="是否为客服经理">
        <template slot-scope="scope">
          <span v-if="parseInt(scope.row.isManager,10)===0">否</span>
          <span v-if="parseInt(scope.row.isManager,10)===1">是</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="注册时间">
        <template slot-scope="scope">
          <span
          >{{moment(scope.row.createTime).format("YYYY-MM-DD HH:mm:ss")}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status_name" label="操作"  fixed="right" align="center">
        <template slot-scope="scope">
          <section class="handle-item">
            <el-tag
              title="点击重置管理员密码"
              type="danger"
              effect="dark"
              @click="handleSetManger(scope.row.id)"
            >
              设为客户经理
            </el-tag>
          </section>
          <section class="handle-item">
            <el-tag
              title="点击重置管理员密码"
              type="danger"
              effect="dark"
              @click="handleResetPassword(scope.row.id)"
            >
              密码重置
            </el-tag>
            <el-tag
              title="点击注销管理员账号"
              type="danger"
              effect="dark"
              @click="auditAdmin(3,scope.row.id)"
            >
              账号注销
            </el-tag>
          </section>
          <section class="handle-item">
          <el-tag
            title="点击审核通过管理员"
            v-if="parseInt(scope.row.states,10)===0"
            type="success"
            effect="dark"
            @click="auditAdmin(1,scope.row.id)"
          >
            审核通过
          </el-tag>
            <el-tag
              title="点击拒绝该管理员审核"
              v-if="parseInt(scope.row.states,10)===0"
              type="success"
              effect="dark"
              @click="auditAdmin(1,scope.row.id)"
            >
              审核拒绝
            </el-tag>
          </section>
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
    handleSizeChange (size) {
      console.log(size)
      const _this = this
      _this.$emit('handleSizeChange', size)
    },
    auditAdmin (state, id) {
      const _this = this
      _this.$emit('handleAuditAdmin', { states: state, id })
    },
    handleResetPassword (id) {
      const _this = this
      _this.$emit('handleResetPassword', { sysUserId: id })
    },
    handleSetManger (id) {
      const _this = this
      _this.$emit('handleSetManger', { id, isManager: 1 })
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
