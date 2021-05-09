<template>
  <section class="table-wrap">
    <el-table
      :data="list"
      border
    >
      <el-table-column prop="id" label="订单ID" />
      <el-table-column prop="createTime" label="日期">
        <template  slot-scope="scope">
          <span  v-text="moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')"></span>
        </template>
      </el-table-column>
      <el-table-column prop="userName" label="联系人" />
      <el-table-column prop="orderType" label="订单类型" :formatter="formatOrderType"/>
      <el-table-column prop="resType" label="资源类型" :formatter="formatResTypeType"/>
      <el-table-column prop="phone" label="联系方式" />
      <el-table-column prop="needFile" label="需求文件">
        <template slot-scope="scope" v-if="scope.row.needFile&&parseInt(scope.row.orderType,10)===2">
          <el-button
            title="点击下载需求文件"
            type="primary"
            size="mini"
            @click.native="downFile(scope.row.needFile)"
            effect="dark"
          >
            下载
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="resultFile" label="结果文件">
      <template slot-scope="scope" v-if="scope.row.resultFile&&parseInt(scope.row.orderType,10)===2">
        <el-button
          title="点击下载结果文件"
          type="primary"
          size="mini"
          @click.native="downFile(scope.row.resultFile)"
          effect="dark"
        >
          下载
        </el-button>
      </template>
      </el-table-column>
      <el-table-column prop="courseName" label="课程名" />
      <el-table-column prop="amount" label="订单价格" />
      <el-table-column prop="createUserName" label="业务经理"  :formatter="formatAdminUserName"/>
      <el-table-column prop="status_name" label="操作" min-width="140px">
        <template slot-scope="scope" v-if="parseInt(scope.row.orderType,10)===2">
          <section class="handle-item">
            <el-upload
              accept=".zip"
              action="/api/upload/uploadImg"
              :show-file-list="false"
              :on-success="handleNeedFileSuccess"
              :before-upload="beforeAvatarUpload">
              <el-button
                title="点击上传需求文件"
                type="primary"
                size="mini"
                @mouseover.native.stop="setEditId(scope.row.id)"
                effect="dark"
              >
                上传需求文件
              </el-button>
            </el-upload>
          </section>
          <section class="handle-item">
            <el-upload
              accept=".zip"
              action="/api/upload/uploadImg"
              :show-file-list="false"
              :on-success="handleResultFileSuccess"
              :before-upload="beforeAvatarUpload">
              <el-button
                title="点击上传结果文件"
                type="primary"
                size="mini"
                @mouseover.native.stop="setEditId(scope.row.id)"
                effect="dark"
              >
                上传结果文件
              </el-button>
            </el-upload>
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
import { showLoading, hideLoading } from '../../../../utils/loading'
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
  data () {
    return {
      editId: '',
      imageLoading: false
    }
  },
  watch: {
    imageLoading (n) {
      if (n) {
        showLoading()
      } else {
        hideLoading()
      }
    }
  },
  methods: {
    moment,
    downFile (url) {
      window.open(url)
    },
    formatOrderType (row) {
      let title = ''
      switch (parseInt(row.orderType, 10)) {
        case 1:
          title = '课程'
          break
        case 2:
          title = '需求'
          break
      }
      return title
    },
    formatResTypeType (row) {
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
    handleNeedFileSuccess (res, file) {
      const _this = this
      if (res && parseInt(res.code, 10) === 200) {
        _this.$emit('handleUploadNeedFile', { resultFile: res.result.url, id: _this.editId })
        _this.imageLoading = false
      }
    },
    handleResultFileSuccess (res, file) {
      const _this = this
      if (res && parseInt(res.code, 10) === 200) {
        _this.$emit('handleUploadResultFile', { resultFile: res.result.url, id: _this.editId })
        _this.imageLoading = false
      }
    },
    setEditId (id) {
      this.editId = id
      console.log(this.editId + '设置的id')
    },
    beforeAvatarUpload (file) {
      const isLt100M = file.size / 1024 / 1024 < 100
      if (!isLt100M) {
        this.$message.error('上传文件大小不能超过100MB哦!')
        return false
      }
      this.imageLoading = true
    },
    formatAdminUserName (row) {
      let title = ''
      switch (parseInt(row.orderType, 10)) {
        case 1:
          title = ''
          break
        case 2:
          title = row.createUserName
          break
      }
      return title
    },
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
