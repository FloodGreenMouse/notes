<template lang="pug">
  transition(name="fade")
    .note-modal-component(v-if="show")
      .wrapper(@click="close")
      .container.col-6
        .title {{ title }}
        .text {{ text }}
</template>

<script>
export default {
  name: 'note-modal-component',
  props: {
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
  .note-modal-component {
    position: relative;
    z-index: 22;
    .wrapper {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba($color-dark, 0.3);
      cursor: pointer;
      z-index: 23;
    }
    .container {
      position: fixed;
      padding: 20px 15px;
      height: 200px;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      background-color: $color-white;
      border-radius: 5px;
      box-shadow: -3px 0 6px rgba(0,0,0,0.16), 3px 0 6px rgba(0,0,0,0.23);
      overflow-y: auto;
      z-index: 24;
      .title {
        margin-bottom: 20px;
      }
      .text {
        word-break: break-all;
        word-break: break-word;
      }
    }
  }
</style>
