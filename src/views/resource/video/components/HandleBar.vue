<template>
  <section class="handle-wrap">
    <el-button-group>
      <el-button type="primary" @click="$emit('handleCreate')" icon="el-icon-circle-plus-outline">
        新建
      </el-button>
    </el-button-group>
    <el-popover placement="top-start" title="温馨提示" width="200" trigger="hover">
      <el-popover placement="top-start" title="温馨提示" width="300" trigger="hover">
        <li>1、整个平台的视频资源在此维护</li>
        <li>2、文章资源创建完毕后可以拿资源ID在其它位置配置例如：课程等</li>
        <li>3、如果不想展示相应的课程可以选择下架</li>
        <li>4、如果想展示相应的课程可以选择上架</li>
        <el-button slot="reference" size="mini" icon="el-icon-info" style="float:right">
          操作提示
        </el-button>
      </el-popover>
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
