<template>
  <section class="handle-wrap">
    <el-button-group>
      <el-button type="primary" @click="$emit('handleCreate')" icon="el-icon-circle-plus-outline">
        新建
      </el-button>
    </el-button-group>
    <el-popover placement="top-start" title="温馨提示" width="300" trigger="hover">
      <li>1、课程页面的专栏、标签、分类统一在这里维护</li>
      <li>2、不需要在平台展示该类别可以下架</li>
      <li>3、需要在平台展示该类别可以上架</li>
      <li>4、支持修改类别名称</li>
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
