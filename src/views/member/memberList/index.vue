<template>
  <section class="el-main">
    <SearchPanel @handleSearch="getList"/>
    <TablePanel
      @handleEdit="editData"
      :pageSize="pageSize"
      :pageNum="pageNum"
      :total="total"
      :list="list"
      @handleSizeChange="handleSizeChange"
      @handlePageChange="handlePageChange"
    />
    <EditPanel :visible.sync="visible" @handleCancel="closeEditPanel" />
  </section>
</template>
<script>
import { getUserList } from '@/resource'
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
      list: [],
      pageSize: 20,
      pageNum: 1,
      total: 0,
      visible: false
    }
  },
  mounted () {
    const _this = this
    _this.getList()
  },
  methods: {
    async getList (form) {
      const _this = this
      const res = await getUserList({
        pageSize: _this.pageSize,
        pageNum: _this.pageNum,
        ...form
      })
      _this.total = res && res.result && res.result.total ? res.result.total : 0
      _this.list = res && res.result && res.result.list ? res.result.list : []
    },
    handleSizeChange (size) {
      const _this = this
      _this.pageSize = size
      _this.getList()
    },
    handlePageChange (page) {
      const _this = this
      _this.pageNum = page
      _this.getList()
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
