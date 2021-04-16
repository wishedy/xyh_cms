<template>
  <section class="handle-wrap">
    <el-button-group>
      <el-button type="primary" @click="$emit('handleCreate')" icon="el-icon-circle-plus-outline">
        新建
      </el-button>
    </el-button-group>
    <el-popover placement="top-start" title="温馨提示" width="300" trigger="hover">
      <li>1、PC页面底部的二维码统一在这里维护</li>
      <li>2、不需要在展示该二维码可以下架</li>
      <li>3、需要在展示该二维码可以上架</li>
      <li>4、支持修改二维码内容</li>
      <li>5、点击左侧按钮可以新建</li>
      <li>6、页面只能展示两个二维码，因此只能有两个二维码上架</li>
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
