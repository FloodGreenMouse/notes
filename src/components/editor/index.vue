<template lang="pug">
.editor-component.flex.center(:style="{'background-color': color}")
  .container.flex.j-center.column
    span.title(v-show="!showEditor" @click="show") Заметка...
    .fields.flex.column(v-if="showEditor")
      input.title-area(
        v-model.trim="title"
        type="text"
        placeholder="Название заметки"
        ref="titleArea")
      textarea.text-area(
        v-model.trim="text"
        placeholder="Текст заметки"
        rows="1"
        ref="textArea")
      .buttons.flex.j-end.a-center
        vPalette(@changeColor="changeColor")
        button.save-button(@click="addNote") Сохранить
</template>

<script>
import vPalette from './palette'

export default {
  name: 'editor-component',
  components: {
    vPalette
  },
  data () {
    return {
      showEditor: false,
      title: '',
      text: '',
      color: 'white'
    }
  },
  methods: {
    changeColor (color) {
      this.color = color
    },
    show () {
      if (!this.showEditor) {
        this.showEditor = true
        setTimeout(() => {
          this.$refs.textArea.focus()
          this.$refs.textArea.onkeydown = (e) => {
            e.target.style.height = 'auto'
            e.target.style.height = `${this.$refs.textArea.scrollHeight}px`
          }
        }, 10)
      }
    },
    addNote () {
      if (this.title.length) {
        const note = {
          title: this.title,
          text: this.text,
          color: this.color
        }
        this.$store.dispatch('addNote', note)
        this.showEditor = false
        this.color = '#ffffff'
      }
    }
  },
  mounted () {
    document.addEventListener('click', e => {
      if (!this.$el.contains(e.target)) {
        this.title = ''
        this.text = ''
        this.showEditor = false
        this.showEditor = false
        this.color = '#ffffff'
      }
    })
  },
  beforeDestroy () {
    document.removeEventListener('click', () => {})
    this.$refs.textArea.onkeydown = null
  }
}
</script>

<style lang="scss" scoped>
  .editor-component {
    flex: 1;
    max-width: 500px;
    margin: 20px 10px 100px 10px;
    transition: background-color 0.3s ease;
    border-radius: 5px;
    .title {
      display: block;
      padding: 15px;
      user-select: none;
      font-weight: 400;
      cursor: text;
      color: rgba($color-dark, 0.8);
    }
    .container {
      width: 100%;
      border-radius: 5px;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }
    input, textarea {
      outline: none;
      border: 0;
      font-size: 16px;
      font-weight: 400;
      border-radius: 5px;
      background-color: transparent;
      transition: $trs3;
      &::placeholder {
        transition: $trs3;
      }
      &:focus::placeholder {
        opacity: 0.2;
      }
    }
    .title-area {
      padding: 25px 25px 5px 25px;
    }
    .text-area {
      padding: 10px 25px 25px 25px;
      resize: none;
      min-height: 100px;
      overflow: hidden;
    }
    .buttons {
      padding: 20px 25px;
      .save-button {
        border: 1px solid transparent;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        transition: $trs3;
        background-color: transparent;
        user-select: none;
        font-weight: 400;
        color: rgba($color-dark, 0.8);
        &:hover {
          border-color: rgba($color-dark, 0.3);
          box-shadow: 0 3px 3px rgba(0,0,0,0.1), 0 3px 3px rgba(0,0,0,0.2);
        }
      }
    }
  }
  .theme-dark {
    .editor-component {
      input, textarea {
        background-color: $color-dark;
        color: $color-white;
        &::placeholder {
          color: $color-white
        }
      }
    }
  }
</style>
