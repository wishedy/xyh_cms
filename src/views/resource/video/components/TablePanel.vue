<template>
  <section class="table-wrap">
    <el-table
      :data="list"
      border
    >
      <el-table-column prop="id" label="视频ID" />
      <el-table-column prop="videoName" label="视频名称" />
      <el-table-column prop="status" label="视频状态" :formatter="formatStatus"/>
      <el-table-column prop="author" label="作者" />
      <el-table-column prop="platform" label="资源类型" :formatter="formatPlatform"/>
      <el-table-column label="复制资源ID" min-width="120px">
        <template slot-scope="scope">
          <el-button type="text" @click="handleCopyId(scope.row.id)">复制资源ID</el-button>
        </template>
      </el-table-column>
      <el-table-column label="视频链接" min-width="120px">
        <template slot-scope="scope">
          <el-button type="text" @click="handleCopyLink('https://www.xueyanhui.com/video?id='+scope.row.id)">复制完整链接</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="createUserName" label="创建管理员" />
      <el-table-column prop="createTime" label="创建时间">
        <template slot-scope="scope">
          <span
          >{{moment(scope.row.createTime).format("YYYY-MM-DD HH:mm:ss")}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status_name" label="操作" min-width="140px">
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
            title="点击上架视频资源"
            style="cursor: pointer;"
            effect="dark"
            v-if="parseInt(scope.row.status,10)===0"
            class="tag-btn"
            @click="updateStatus(scope.row)"
          >
            上架
          </el-tag>
          <el-tag
            title="点击下架视频资源"
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
import { copyToClipboard } from '@/utils'
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
    handleCopyLink (link) {
      if (copyToClipboard(link)) {
        this.$message({
          type: 'success',
          message: '链接复制成功'
        })
      } else {
        this.$message.error('您的系统不支持复制到剪切板')
      }
    },
    handleCopyId (id) {
      if (copyToClipboard(id)) {
        this.$message({
          type: 'success',
          message: 'ID复制成功'
        })
      } else {
        this.$message.error('您的系统不支持复制到剪切板')
      }
    },
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
    formatPlatform (row) {
      let title = ''
      switch (parseInt(row.platform, 10)) {
        case 1:
          title = '平台介绍'
          break
        case 2:
          title = '活动介绍'
          break
        case 3:
          title = '业务介绍'
          break
        case 4:
          title = '课堂资源'
          break
        case 5:
          title = '会议培训'
          break
      }
      return title
    },
    updateStatus (data) {
      const _this = this
      _this.$emit('handleStatus', data)
    },
    handleSizeChange (size) {
      const _this = this
      _this.$emit('handleSizeChange', size)
    },
    editData (data) {
      const _this = this
      _this.$emit('handleEdit', { names: data.videoName, needId: data.needId, id: data.id, author: data.author, urls: data.urls, introduce: data.introduce ? data.introduce : '', platform: data.platform })
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
