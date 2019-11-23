<template lang="pug">
  .note-modal-component
    .wrapper(@click="close")
    .container.col-sm-8.col-md-4.col-4(:style="{'background-color': color}" ref="container")
      input.title(type="text" v-model="title")
      textarea.text(v-model="text" ref="textarea")
      .flex.a-center
        button.save-button(@click="updateNote") Сохранить
        vPalette(@changeColor="changeColor")
</template>

<script>
import vPalette from '../editor/palette'

export default {
  name: 'note-modal-component',
  components: {
    vPalette
  },
  props: {
    note: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      title: this.note.title,
      text: this.note.text,
      color: this.note.color
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    changeColor (color) {
      this.color = color
    },
    updateNote () {
      this.$store.dispatch('updateNote', {
        index: this.note.index,
        title: this.title,
        text: this.text,
        color: this.color
      })
      this.close()
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
      display: flex;
      flex-direction: column;
      position: fixed;
      padding: 20px 15px;
      height: 300px;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      background-color: $color-white;
      border-radius: 5px;
      box-shadow: -3px 0 6px rgba(0,0,0,0.16), 3px 0 6px rgba(0,0,0,0.23);
      z-index: 24;
      max-width: calc(100% - 20px);
      transition: background-color 0.3s ease;
      animation: container 0.3s ease 1;
      .title {
        padding: 10px 5px;
        margin-bottom: 20px;
        outline: none;
        background-color: transparent;
        border: 1px solid rgba($color-dark, 0.1);
        border-radius: 5px;
      }
      .text {
        flex: 1;
        padding: 10px 5px;
        margin-bottom: 10px;
        resize: none;
        background-color: transparent;
        outline: none;
        border: 1px solid rgba($color-dark, 0.1);
        &::-webkit-scrollbar {
          width: 8px;
          background-color: rgba(60, 66, 77, 0.1);
        }
        &::-webkit-scrollbar-thumb {
          background-color: rgba($color-dark, 0.5)
        }
      }
      .save-button {
        flex: 1;
        border: 1px solid transparent;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        transition: $trs3;
        background-color: transparent;
        user-select: none;
        font-weight: 400;
        &:hover {
          border-color: rgba($color-dark, 0.3);
          box-shadow: 0 3px 3px rgba(0,0,0,0.1), 0 3px 3px rgba(0,0,0,0.2);
        }
      }
    }
    @keyframes container {
      0% {
        transform: translateY(20px);
      }
      100% {
        transform: translateY(0);
      }
    }
  }
</style>
