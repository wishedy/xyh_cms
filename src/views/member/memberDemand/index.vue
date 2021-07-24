<template>
  <section class="el-main">
    <SearchPanel
      :triggerReset="reset"
      @handleSearch="getList"
      :demandList="demandList"
    />
    <TablePanel
      @handleEdit="editData"
      :pageSize="pageSize"
      :pageNum="pageNum"
      :total="total"
      :list="list"
      @handleRedmine="handleRedmine"
      @handleSizeChange="handleSizeChange"
      @handlePageChange="handlePageChange"
    />
    <EditPanel :visible.sync="visible" @handleCancel="closeEditPanel" />
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
      <el-select v-model="selectUser" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.realName"
          :value="item.id">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="redmineDemand">确 定</el-button>
  </span>
    </el-dialog>
  </section>
</template>
<script>
import { createDemandUser, getAdminList, getDemandList, getUserDemandList } from '@/resource'
import EditPanel from './components/EditPanel'
import SearchPanel from './components/SearchPanel'
import TablePanel from './components/TablePanel'
export default {
  name: 'Administrator',
  components: {
    SearchPanel,
    TablePanel,
    EditPanel
  },
  data () {
    return {
      reset: 0,
      list: [],
      demandList: [],
      demandData: {},
      searchForm: {},
      pageSize: 20,
      pageNum: 1,
      total: 0,
      selectUser: '',
      options: [],
      visible: false,
      dialogVisible: false
    }
  },
  mounted () {
    const _this = this
    _this.getList()
    _this.getDemand()
  },
  methods: {
    async getDemand () {
      const _this = this
      const res = await getDemandList({ status: 1 })
      _this.demandList = res.result
    },
    async getAdminDataList (form) {
      const _this = this
      const res = await getAdminList({
        pageSize: 10000,
        states: 1,
        role: 1,
        pageNum: 1,
        ...form
      })
      _this.options = res.result.list
    },
    handleClose () {
      console.log('关闭')
      const _this = this
      _this.dialogVisible = true
    },
    async getList (form) {
      const _this = this
      const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
      _this.searchForm = form ? JSON.parse(JSON.stringify(form)) : {}
      if (Object.keys(_this.searchForm).length === 0) {
        _this.reset++
      }
      const res = await getUserDemandList({
        pageSize: _this.pageSize,
        pageNum: _this.pageNum,
        ..._this.searchForm,
        followUser: parseInt(user.role, 10) === 0 ? '' : user.id
      })
      _this.total = res && res.result && res.result.total ? res.result.total : 0
      _this.list = res && res.result && res.result.list ? res.result.list : []
    },
    async redmineDemand () {
      const _this = this
      try {
        const res = await createDemandUser({
          id: _this.demandData.id,
          followUser: _this.selectUser
        })
        console.log(res)
        _this.handleClose()
        _this.getList()
        _this.dialogVisible = false
        _this.$message.success('操作成功')
      } catch (e) {
        console.log(e.msg || '指派业务员失败')
      }
    },
    handleRedmine (data) {
      const _this = this
      _this.demandData = data
      _this.getAdminDataList()
      _this.dialogVisible = true
    },
    handleSizeChange (size) {
      const _this = this
      _this.pageSize = size
      _this.getList(_this.searchForm)
    },
    handlePageChange (page) {
      const _this = this
      _this.pageNum = page
      _this.getList(_this.searchForm)
    },
    createItem () {
      this.openEditPanel()
    },
    openEditPanel () {
      this.visible = true
    },
    closeEditPanel () {
      this.visible = false
    },
    editData () {
      this.openEditPanel()
    }
  }
}
</script>
