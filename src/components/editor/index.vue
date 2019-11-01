<template lang="pug">
.editor-component.flex.center
  .container.flex.j-center.column
    span.title(v-show="!showEditor" @click="show") Заметка...
    .fields.flex.column(v-if="showEditor")
      input.title-area(
        v-model="title"
        type="text"
        placeholder="Название заметки"
        ref="titleArea")
      textarea.text-area(
        v-model="text"
        placeholder="Текст заметки"
        rows="1"
        ref="textArea")
      .buttons.flex.j-end.a-center
        vPalette
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
      text: ''
    }
  },
  methods: {
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
          text: this.text
        }
        this.$store.dispatch('addNote', note)
        this.showEditor = false
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
    .title {
      display: block;
      padding: 15px;
      user-select: none;
      font-weight: 900;
      cursor: text;
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
      font-weight: 500;
      border-radius: 5px;
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
        border: 0;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        transition: $trs3;
        background-color: transparent;
        user-select: none;
        font-weight: 900;
        &:hover {
          background-color: rgba(0, 0, 0, 0.2);
          box-shadow: 0 3px 6px rgba(0,0,0,0.1), 0 3px 6px rgba(0,0,0,0.2);
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
