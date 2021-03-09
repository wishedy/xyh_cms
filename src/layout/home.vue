<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <home-navbar/>
<!--        <tags-view v-if="needTagsView" />-->
      </div>
      <section class="app-main">
        <h1 class="title">欢迎使用CRM系统</h1>
        <h1 class="subTitle">学研汇-科研服务创新平台</h1>
      </section>
<!--      <right-panel v-if="showSettings">
        <settings />
      </right-panel>-->
    </div>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import {  HomeNavbar, Settings, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    HomeNavbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";
.main-container{
  height: 100vh;
  overflow: hidden;
}
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh);
  width: 100%;
  position: relative;
  overflow: hidden;
  background: url("~@/assets/401_images/crmBg.jpg") no-repeat center/cover;
  .subTitle,.title{
    font-size: 60px;
    color:#fff;
    position: absolute;
    left: 50%;
    text-align: center;
    width: 100%;
    transform: translateX(-50%);
    top:220px;
    text-shadow: 0 8px 9px #000, 0px -2px 1px #fff;
    line-height: 40px;
  }
  .subTitle{
    top:300px;
    font-size: 64px;
    text-shadow: 0 12px 9px #000, 0px -2px 1px #fff;
  }
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px)
}

.mobile .fixed-header {
  width: 100%;
}
</style>
