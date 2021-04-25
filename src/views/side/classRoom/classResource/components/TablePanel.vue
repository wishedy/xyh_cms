<template>
  <section class="table-wrap">
    <el-table
      :data="list"
      border
    >
      <el-table-column prop="id" label="课程ID" />
      <el-table-column label="课程封面" min-width="240px">
        <template slot-scope="scope">
          <img :src="scope.row.imgUrl" alt class="table-img" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="课程标题" />
      <el-table-column prop="status" label="课程状态" :formatter="formatStatus"/>
      <el-table-column prop="introduce" label="课程简介" />
      <el-table-column prop="videoUrl" label="视频链接" />
      <el-table-column prop="articleUrl" label="文章链接" />
      <el-table-column prop="orderBy" label="排序" />
      <el-table-column prop="resType" label="课程类型" :formatter="formatTypes"/>
      <el-table-column prop="labelList" label="课程标签" :formatter="formatLabel"/>
      <el-table-column prop="itemizeList" label="课程分类" :formatter="formatItemize"/>
      <el-table-column prop="columnList" label="课程栏目" :formatter="formatColumn"/>
      <el-table-column prop="resId" label="资源ID"/>
      <el-table-column prop="chargeType" label="收费类型" :formatter="formatChargeTypes"/>
      <el-table-column prop="isTop" label="置顶" :formatter="formatIsTop"/>
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
      <el-table-column prop="status_name" label="操作" min-width="140px">
        <template slot-scope="scope">
          <section class="handle-item">
          <el-tag
            title="点击编辑课程"
            type="success"
            style="cursor: pointer;"
            effect="dark"
            @click="editData(scope.row)"
          >
            编辑
          </el-tag>
          <el-tag
            title="点击上架课程"
            style="cursor: pointer;"
            effect="dark"
            v-if="parseInt(scope.row.status,10)===0"
            class="tag-btn"
            @click="updateStatus(scope.row)"
          >
            上架
          </el-tag>
          <el-tag
            title="点击下架课程"
            style="cursor: pointer;"
            effect="dark"
            type="danger"
            v-if="parseInt(scope.row.status,10)===1"
            class="tag-btn"
            @click="updateStatus(scope.row)"
          >
            下架
          </el-tag>
          </section>
          <section class="handle-item">
            <el-tag
              title="点击编辑课程是否置顶"
              type="success"
              style="cursor: pointer;"
              effect="dark"
              @click="upTop(scope.row)"
            >
              编辑置顶
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
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="80%"
      center>
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="selectTypes" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="item in topList" :label="item.typeId" :key="item.typeId">{{item.names}}</el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
  </span>
    </el-dialog>
  </section>
</template>
<script>
import { getCourseType, updateTop } from '@/resource'
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
      checkAll: false,
      selectTypes: [],
      topList: [],
      courseId: '',
      centerDialogVisible: false,
      isIndeterminate: true
    }
  },
  methods: {
    moment,
    handleCheckAllChange (val) {
      const _this = this
      _this.selectTypes = val ? _this.getTopList(_this.topList, 1) : []
      _this.isIndeterminate = false
    },
    async submit () {
      const _this = this
      try {
        const res = await updateTop({ courseId: _this.courseId, typeIds: _this.selectTypes })
        console.log(res)
        _this.$message.success('更新成功')
        _this.$emit('handleSearch')
      } catch (e) {
        _this.$message.error(e.msg || '更新失败')
      } finally {
        _this.centerDialogVisible = false
      }
    },
    handleCheckedCitiesChange (value) {
      const _this = this
      const checkedCount = value.length
      _this.checkAll = checkedCount === _this.topList.length
      _this.isIndeterminate = checkedCount > 0 && checkedCount < _this.topList.length
    },
    async upTop (row) {
      const _this = this
      _this.courseId = row.id
      try {
        const res = await getCourseType({ courseId: _this.courseId })
        console.log(res)
        _this.topList = res.result
        _this.selectTypes = _this.getTopList(res.result)
        _this.centerDialogVisible = true
      } catch (e) {
        console.log(e.msg || '获取数据失败')
      }
    },
    getTopList (list, all) {
      const originalList = JSON.parse(JSON.stringify(list))
      const result = []
      for (let num = 0; num < originalList.length; num++) {
        const item = originalList[num]
        if (all) {
          result.push(item.typeId)
        } else {
          if (parseInt(item.isTop, 10)) {
            result.push(item.typeId)
          }
        }
      }
      return result
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
    updateStatus (data) {
      const _this = this
      _this.$emit('handleStatus', data)
    },
    formatList (list) {
      const result = []
      const original = JSON.parse(JSON.stringify(list))
      for (let num = 0; num < original.length; num++) {
        result.push(original[num].names)
      }
      return result.join('、')
    },
    formatLabel (row) {
      const _this = this
      const list = row.labelList
      return _this.formatList(list)
    },
    formatItemize (row) {
      const _this = this
      const list = row.itemizeList
      return _this.formatList(list)
    },
    formatColumn (row) {
      const _this = this
      const list = row.columnList
      return _this.formatList(list)
    },
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
    formatIsTop: function (row, column) {
      return row.isTop && parseInt(row.isTop, 10) === 1 ? '置顶' : '未置顶'
    },
    handleSizeChange (size) {
      const _this = this
      _this.$emit('handleSizeChange', size)
    },
    editData (data) {
      const _this = this
      const formattingList = (list) => {
        const originalList = list ? JSON.parse(JSON.stringify(list)) : []
        const resultList = []
        for (let num = 0; num < originalList.length; num++) {
          const item = originalList[num]
          resultList.push(item.id)
        }
        return resultList
      }
      data.columnList = formattingList(data.columnList)
      data.labelList = formattingList(data.labelList)
      data.itemizeList = formattingList(data.itemizeList)
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
