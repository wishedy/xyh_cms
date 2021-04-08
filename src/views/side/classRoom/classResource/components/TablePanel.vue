<template>
  <section class="table-wrap">
    <el-table
      :data="list"
      border
    >
      <el-table-column prop="id" label="课程ID" />
      <el-table-column label="课程封面" min-width="140px">
        <template slot-scope="scope">
          <img :src="scope.row.imgUrl" alt class="table-img" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="课程标题" />
      <el-table-column prop="introduce" label="课程简介" />
      <el-table-column prop="videoUrl" label="视频链接" />
      <el-table-column prop="articleUrl" label="文章链接" />
      <el-table-column prop="orderBy" label="排序" />
      <el-table-column prop="resType" label="课程类型" :formatter="formatTypes"/>
      <el-table-column prop="resId" label="资源ID"/>
      <el-table-column prop="chargeType" label="收费类型" :formatter="formatChargeTypes"/>
      <el-table-column prop="price" label="课程价格"/>
      <el-table-column prop="shareNum" label="分享量"/>
      <el-table-column prop="browseNum" label="浏览量"/>
      <el-table-column prop="collNum" label="收藏量"/>
      <el-table-column prop="goodNum" label="点赞"/>
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
            title="点击编辑课程类型"
            type="success"
            style="cursor: pointer;"
            effect="dark"
            @click="editData(scope.row.names,scope.row.id)"
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
      switch (parseInt(row.resType)) {
        case 1:
          title = '文章'
          break
        case 2:
          title = '视频'
          break
      }
      return title
    },
    formatChargeTypes: function (row, column) {
      let title = ''
      switch (parseInt(row.resType)) {
        case 1:
          title = '全员免费'
          break
        case 2:
          title = '会员免费'
          break
        case 3:
          title = '收费'
          break
      }
      return title
    },
    handleSizeChange (size) {
      console.log(size)
      const _this = this
      _this.$emit('handleSizeChange', size)
    },
    editData (names, id) {
      const _this = this
      _this.$emit('handleEdit', { names, id })
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
