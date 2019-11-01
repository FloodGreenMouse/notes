<template lang="pug">
  .palette-component
    .container(@click="show")
      paletteIcon
    transition(name="fade")
      .colors(v-show="showPalette")
</template>

<script>
import paletteIcon from '../icons/palette'

export default {
  name: 'palette-component',
  components: {
    paletteIcon
  },
  data () {
    return {
      showPalette: false
    }
  },
  methods: {
    show () {
      if (!this.showPalette) {
        this.showPalette = true
      }
    }
  },
  mounted () {
    document.addEventListener('click', e => {
      if (!this.$el.contains(e.target)) {
        this.showPalette = false
      }
    })
  },
  beforeDestroy () {
    document.removeEventListener('click', () => {})
  }
}
</script>

<style lang="scss">
  .palette-component {
    .container {
      svg {
        width: 100%;
        height: 100%;
      }
      @include svg($color-light)
    }
  }
</style>

<style lang="scss" scoped>
  .palette-component {
    position: relative;
    .container {
      cursor: pointer;
      width: 20px;
      height: 20px;
      margin-right: 20px;
      outline: none;
    }
    .colors {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      width: 200px;
      height: 200px;
      background-color: $color-white;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }
  }
</style>
