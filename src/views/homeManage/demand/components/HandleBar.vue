<template>
  <section class="handle-wrap">
    <el-button-group>
      <el-button type="primary" @click="$emit('handleCreate')" icon="el-icon-circle-plus-outline">
        新建
      </el-button>
    </el-button-group>
    <el-popover placement="top-start" title="温馨提示" width="400" trigger="hover">
      <li>1、首页的服务类型均在此处维护</li>
      <li>2、点击下方编辑可以修改类型名字</li>
      <li>3、点击上架或下架可以展示或隐藏首页该类型</li>
      <li>4、点击左侧按钮可以新建</li>
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
