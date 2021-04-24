<template>
  <section class="table-wrap">
    <el-table
      :data="list"
      border
    >
      <el-table-column prop="id" label="需求ID" />
      <el-table-column prop="contacts" label="联系人姓名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="phone" label="手机号" />
      <el-table-column prop="wxNum" label="微信号" />
      <el-table-column prop="followUser" label="跟进人ID" />
      <el-table-column prop="followUserName" label="跟进人姓名" />
      <el-table-column prop="needTypeList" label="需求类型"  :formatter="formatNeed"/>
      <el-table-column prop="department" label="需求提交时间" />
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
    formatNeed (row) {
      let title = ''
      const list = JSON.parse(JSON.stringify(row.needTypeList))
      for (let num = 0; num < list.length; num++) {
        const item = list[num]
        title.length ? title += ',' + item.names : title += item.names
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
