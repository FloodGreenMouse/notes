<template lang="pug">
  .note-component
    .container(ref="note")
      span {{ note.index }}
      .title {{ note.title }}
      .text {{ note.text }}
    transition(name="fade")
      .buttons-block(v-show="showButtons" ref="buttons")
        button.button(@click="deleteNote") Да
        button.button(@click="cancelDelete") Нет
    vModal(
      :title="note.title"
      :text="note.text"
      :show="showModal"
      @close="closeModal")
</template>

<script>
import vModal from './modal'

export default {
  name: 'note-component',
  components: {
    vModal
  },
  props: {
    note: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      showModal: false,
      showButtons: false
    }
  },
  methods: {
    deleteNote () {
      this.$store.dispatch('deleteNote', this.note.index)
      this.$store.dispatch('toggleDeleteSection', false)
      document.onmousemove = null
      // this.cancelDelete()
    },
    cancelDelete () {
      const note = this.$refs.note
      this.$store.dispatch('toggleDeleteSection', false)
      note.style = null
      this.showButtons = false
    },
    openModal () {
      this.showModal = true
      document.body.style.overflow = 'hidden'
    },
    closeModal () {
      this.showModal = false
      document.body.style.overflow = 'visible'
    },
    // Захват позиции поля
    getElPosition (target) {
      const element = target.getBoundingClientRect()
      return {
        left: element.left,
        right: element.right,
        top: element.top,
        bottom: element.bottom,
        width: element.width
      }
    },
    // Активация поля удаления
    toggleActiveDeleteBlock (e) {
      const deleteSectionPosition = this.getElPosition(document.querySelector('.delete-block'))
      const deleteSection = document.querySelector('.delete-block')
      if (deleteSectionPosition.left + deleteSectionPosition.width > e.clientX && deleteSectionPosition.right - deleteSectionPosition.width < e.clientX) {
        deleteSection.classList.add('delete-block--hovered')
      } else {
        deleteSection.classList.remove('delete-block--hovered')
      }
    },
    prepareMoving (e, shiftX, shiftY) {
      // Удаляем слушатель на resize
      window.onresize = null
      // Добавляем заметку в переменную для удобства
      const note = this.$refs.note
      // Выключаем поле удаления
      this.$store.dispatch('toggleDeleteSection', false)
      // Добавляем индекс текущей заметки к удалению
      this.$store.dispatch('addNoteToDelete', this.note.index)
      // Добавляем заметке стили
      note.style.width = `${this.$el.getBoundingClientRect().width}px`
      note.style.position = 'fixed'
      note.style.zIndex = '30'
      note.style.opacity = '0.8'
      note.style.transition = null
      // Включаем поле удаления
      const deleteSection = document.querySelector('.delete-block')
      // Удаляем класс у поля удаления
      deleteSection.classList.remove('delete-block--active')
      this.$store.dispatch('toggleDeleteSection', true)
      this.movingNote(e, shiftX, shiftY)
    },
    movingNote (e, shiftX, shiftY) {
      this.showButtons = false
      // Отслеживаем перемещение курсора
      this.$refs.note.style.left = `${e.clientX - shiftX}px`
      this.$refs.note.style.top = `${e.clientY - shiftY}px`
      // Активируем поле для удаления
      this.toggleActiveDeleteBlock(e)
    },
    endMoveNote (e) {
      this.showModal = false
      // Добавляем заметку в переменную для удобства
      const note = this.$refs.note
      // Удаляем слушатель
      const self = this
      const shiftX = 0
      const shiftY = 0
      document.removeEventListener('mousemove', function mouseMove (e) {
        console.log('doc', e)
        self.movingNote(e, shiftX, shiftY)
      })
      note.style.opacity = null
      // Берем параметры поля удаления
      const deleteSectionPosition = this.getElPosition(document.querySelector('.delete-block'))
      // Захватываем поле удаления в переменную
      const deleteSection = document.querySelector('.delete-block')
      // Если курсор находится в поле удаления
      if (deleteSectionPosition.left + deleteSectionPosition.width > e.clientX && deleteSectionPosition.right - deleteSectionPosition.width < e.clientX) {
        this.showModal = false
        deleteSection.classList.add('delete-block--active')
        note.style.left = `${deleteSectionPosition.left - deleteSectionPosition.width}px`
        note.style.top = `${deleteSectionPosition.top + 50}px`
        note.style.transition = 'all 0.3s ease'
        this.showButtons = true
        this.$refs.buttons.style.top = `${deleteSectionPosition.bottom - 40}px`
        this.$refs.buttons.style.left = note.style.left
        window.onresize = () => {
          const deleteSectionPosition = this.getElPosition(document.querySelector('.delete-block'))
          note.style.left = `${deleteSectionPosition.left - deleteSectionPosition.width}px`
          note.style.top = `${deleteSectionPosition.top + 50}px`
          this.$refs.buttons.style.top = `${deleteSectionPosition.bottom - 40}px`
          this.$refs.buttons.style.left = note.style.left
        }
      } else {
        this.showModal = false
        // Если курсор НЕ находится в поле удаления
        deleteSection.classList.remove('delete-block--hovered')
        this.$store.dispatch('toggleDeleteSection', false)
        note.style = null
        this.showButtons = false
      }
    }
  },
  mounted () {
    const self = this
    this.$refs.note.addEventListener('mousedown', function mouseDown (e) {
      const coords = self.getElPosition(self.$refs.note)
      const shiftX = e.clientX - coords.left
      const shiftY = e.clientY - coords.top
      self.prepareMoving(e, shiftX, shiftY)
      self.toggleActiveDeleteBlock(e)
      document.addEventListener('mousemove', function mouseMove (e) {
        self.movingNote(e, shiftX, shiftY)
        e.stopPropagation()
      })
    })
    this.$refs.note.addEventListener('mouseup', e => {
      this.endMoveNote(e)
    })
  },
  beforeDestroy () {
    this.$refs.note.removeEventListener('mousedown', function mouseDown (e) {
      console.log(123)
      const coords = this.getElPosition(this.$refs.note)
      const shiftX = e.clientX - coords.left
      const shiftY = e.clientY - coords.top
      this.prepareMoving(e, shiftX, shiftY)
      this.toggleActiveDeleteBlock(e)
      document.onmousemove = e => {
        this.movingNote(e, shiftX, shiftY)
      }
    })
    this.$refs.note.removeEventListener('mouseup', e => {
      this.endMoveNote(e)
    })
    this.$refs.note.onmousedown = null
    this.$refs.note.onmouseup = null
    document.onmousemove = null
  }
}
</script>

<style lang="scss" scoped>
  .note-component {
    position: relative;
    flex: 0;
    width: 100%;
    height: 200px;
    user-select: none;
    background-color: transparent;
    margin-bottom: 20px;
    .container {
      position: absolute;
      padding: 20px 15px;
      left: 0;
      top: 0;
      width: 100%;
      height: 200px;
      cursor: pointer;
      z-index: 1;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
      border-radius: 5px;
      border: 1px solid rgba($color-dark, 0.3);
      background-color: $color-white;
      overflow-y: hidden;
      transform: rotate(0deg);
      &:hover {
        box-shadow: 0 5px 7px rgba(0,0,0,0.26), 0 3px 7px rgba(0,0,0,0.33);
      }
    }
    .buttons-block {
      position: fixed;
      transition: $trs3;
      z-index: 30;
      .button {
        background-color: $color-white;
        border: 0;
        border-radius: 5px;
        padding: 5px 10px;
        margin-right: 10px;
        font-weight: 900;
        cursor: pointer;
      }
    }
    .title {
      margin-bottom: 15px;
    }
    .text {
      margin-bottom: 25px;
      word-break: break-all;
      word-break: break-word;
    }
  }
</style>