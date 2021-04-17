<template>
  <section class="el-main">
    <SearchPanel @handleSearch="getList"/>
    <HandleBar  @handleCreate="createItem"/>
    <TablePanel @handleEdit="editData" />
    <EditPanel :visible.sync="visible" @handleCancel="closeEditPanel" />
  </section>
</template>
<script>
import EditPanel from '@/views/journal/components/EditPanel'
import SearchPanel from '@/views/journal/components/SearchPanel'
import TablePanel from '@/views/journal/components/TablePanel'
import HandleBar from '@/views/journal/components/HandleBar'
export default {
  name: 'Administrator',
  components: {
    SearchPanel,
    TablePanel,
    EditPanel,
    HandleBar
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
      this.visible = false
    },
    editData () {
      this.openEditPanel()
    }
  }
}
</script>
