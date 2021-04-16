<template>
  <section class="handle-wrap">
    <el-button-group>
      <el-button type="primary" @click="$emit('handleCreate')" icon="el-icon-circle-plus-outline">
        新建
      </el-button>
    </el-button-group>
    <el-popover placement="top-start" title="温馨提示" width="300" trigger="hover">
      <li>1、整个平台的banner位在此维护</li>
      <li>2、上传的时候可以与美工沟通下相应的上传尺寸</li>
      <li>3、如果不想展示相应的banner可以选择下架</li>
      <li>4、如果想展示相应的banner可以选择上架</li>
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
