<template>
  <section class="handle-wrap">
    <el-button-group>
      <el-button type="primary" @click="$emit('handleCreate')" icon="el-icon-circle-plus-outline">
        新建
      </el-button>
    </el-button-group>
    <el-popover placement="top-start" title="温馨提示" width="300" trigger="hover">
      <li>1、平台的全球合作统一在这里维护</li>
      <li>2、不需要在平台展示该合作资源可以下架</li>
      <li>3、需要在平台展示该合作资源可以上架</li>
      <li>4、支持修改合作资源内容</li>
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
