<template>
  <section class="el-main">
    <SearchPanel @handleSearch="getList"/>
    <TablePanel @handleEdit="editData" />
    <EditPanel :visible.sync="visible" @handleCancel="closeEditPanel" />
  </section>
</template>
<script>
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
      visible: false
    }
  },
  methods: {
    getList (form) {
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
    editData () {
      this.openEditPanel()
    }
  }
}
</script>
