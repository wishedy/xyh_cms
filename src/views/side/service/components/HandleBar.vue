<template>
  <section class="handle-wrap">
    <el-button-group>
      <el-button type="primary" @click="$emit('handleCreate')" icon="el-icon-circle-plus-outline">
        新建
      </el-button>
    </el-button-group>
    <el-popover placement="top-start" title="温馨提示" width="200" trigger="hover">
      <li>1、创建的产品均展示在首页</li>
      <li>2、创建产品的资源ID和连接均需要在文章资源和视频资源处复制粘贴过来</li>
      <li>3、如果不想展示相应的产品可以选择下架</li>
      <li>4、如果想展示相应的产品可以选择上架</li>
      <li>5、点击左侧按钮可以新建</li>
      <el-button slot="reference" size="mini" icon="el-icon-info" style="float:right">
        操作提示
      </el-button>
    </el-popover>
  </section>
</template>
<script>
export default {
  name: 'HandleBar'
}
</script>
