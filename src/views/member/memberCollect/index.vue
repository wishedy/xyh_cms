<template>
  <section class="el-main">
    <SearchPanel @handleSearch="getList"/>
    <TablePanel @handleEdit="editData" />
  </section>
</template>
<script>
import SearchPanel from './components/SearchPanel'
import TablePanel from './components/TablePanel'
export default {
  name: 'Administrator',
  components: {
    SearchPanel,
    TablePanel
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
    editData (data) {
      console.log(data)
      this.openEditPanel()
    }
  }
}
</script>
