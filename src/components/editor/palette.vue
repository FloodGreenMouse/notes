<template lang="pug">
  .palette-component
    .container(@click="show")
      paletteIcon
    transition(name="palette")
      .colors(v-show="showPalette")
        .color(
          v-for="(color, i) in colors"
          :key="i"
          @click="changeColor(color)"
          :style="{'background-color': color}")
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
      showPalette: false,
      colors: [
        '#ffffff',
        '#f28b82',
        '#fbbc04',
        '#fff475',
        '#ccff90',
        '#a7ffeb',
        '#cbf0f8',
        '#aecbfa',
        '#d7aefb',
        '#fdcfe8',
        '#e6c9a8',
        '#e8eaed'
      ]
    }
  },
  methods: {
    changeColor (color) {
      this.$emit('changeColor', color)
    },
    show () {
      if (!this.showPalette) {
        this.showPalette = true
      } else {
        this.showPalette = false
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
      margin: 0 20px;
      outline: none;
    }
    .colors {
      position: absolute;
      top: calc(100% + 5px);
      right: 0;
      left: 0;
      width: 150px;
      height: 125px;
      background-color: $color-white;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
      padding: 10px 0 10px 10px;
      border-radius: 5px;
      .color {
        display: inline-block;
        margin-bottom: 10px;
        margin-right: 10px;
        width: 25px;
        height: 25px;
        border: 2px solid lighten($color-dark, 50%);
        border-radius: 50%;
        background-color: aquamarine;
        cursor: pointer;
        overflow: hidden;
        transform: scale(1);
        transition: $trs3;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }

  @include md {
    .palette-component {
      .colors {
        width: 220px;
        height: 86px;
        left: auto;
      }
    }
  }
</style>
