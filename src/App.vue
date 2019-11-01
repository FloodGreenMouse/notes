<template lang="pug">
  section
    vHeader
    router-view
</template>

<script>
import vHeader from './components/header'

export default {
  components: {
    vHeader
  }
}
</script>

<style lang="scss">
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }
</style>

<style lang="scss" scoped>

</style>
