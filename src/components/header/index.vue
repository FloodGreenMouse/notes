<template lang="pug">
  .header-component.flex.a-center.j-between
    .logo.flex.a-center
      img(src="/img/logo.png")
      span Notes
    .settings
      vSettings
</template>

<script>
import vSettings from '../settings'

export default {
  name: 'header-component',
  components: {
    vSettings
  }
}
</script>

<style lang="scss" scoped>
  .header-component {
    padding: 0 20px;
    height: 50px;
    margin-bottom: 40px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    user-select: none;
    transition: $trs3;
    .logo {
      img {
        width: 25px;
        height: 25px;
      }
      span {
        margin-left: 5px;
        cursor: default;
        font-weight: 900;
      }
    }
  }
  .theme-dark {
    .header-component {
      background-color: $color-dark;
    }
  }
</style>
