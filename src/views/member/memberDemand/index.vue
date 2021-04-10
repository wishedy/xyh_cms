<template>
  <section class="el-main">
    <SearchPanel @handleSearch="getList"/>
    <TablePanel @handleEdit="editData"
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
import EditPanel from './components/EditPanel'
import SearchPanel from './components/SearchPanel'
import TablePanel from './components/TablePanel'
import { getUserDemandList } from '@/resource'
export default {
  name: 'Administrator',
  components: {
    SearchPanel,
    TablePanel,
    EditPanel
  },
  data () {
    return {
      pageSize: 10,
      total: 0,
      pageNum: 1,
      list: [],
      visible: false
    }
  },
  mounted () {
    const _this = this
    _this.getList()
  },
  methods: {
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
    async getList (form) {
      const _this = this
      const res = await getUserDemandList({
        pageSize: _this.pageSize,
        pageNum: _this.pageNum,
        ...form
      })
      _this.total = res.result.total
      _this.list = res.result.list
      console.log(res)
      console.log(form)
    },
    createItem () {
      this.openEditPanel()
    },
    openEditPanel () {
      this.visible = true
    },
    closeEditPanel () {
      console.log('触发')
      this.visible = false
    },
    editData (data) {
      console.log(data)
      this.openEditPanel()
    }
  }
}
</script>
