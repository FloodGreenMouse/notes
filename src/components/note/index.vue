<template lang="pug">
  .note-component
    .container(
      ref="note"
      @click="openModal"
      @mouseup="endMoveNote"
      :style="{'background-color': note.color}")
      .title {{ note.title }}
      .text {{ note.text }}
    .delete-button.flex.center(@click="deleteNote")
      iconTrash
    transition(name="fade")
      .buttons-block(v-show="showButtons" ref="buttons")
        button.button(@click="deleteNote") Да
        button.button(@click="cancelDelete") Нет
    transition(name="fade")
      vModal(
        v-if="showModal"
        :note="note"
        @close="closeModal")
</template>

<script>
import { mapState } from 'vuex'
import iconTrash from '../icons/trash'
import vModal from './modal'

export default {
  name: 'note-component',
  components: {
    iconTrash,
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
      showButtons: false,
      isMoving: false,
      timer: null
    }
  },
  computed: {
    ...mapState({
      showDeleteSection: state => state.showDeleteSection
    })
  },
  methods: {
    deleteNote () {
      this.$store.dispatch('deleteNote', this.note.index)
      this.$store.dispatch('toggleDeleteSection', false)
      document.onmousemove = null
      this.cancelDelete()
    },
    cancelDelete () {
      const note = this.$refs.note
      this.$store.dispatch('toggleDeleteSection', false)
      note.style = null
      note.style.backgroundColor = this.note.color
      this.showButtons = false
    },
    openModal () {
      if (!this.isMoving && !this.showDeleteSection) {
        this.showModal = true
      }
      // document.body.style.overflow = 'hidden'
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
      note.style = null
      note.style.backgroundColor = this.note.color
      // Выключаем поле удаления
      this.$store.dispatch('toggleDeleteSection', false)
      // Добавляем индекс текущей заметки к удалению
      this.$store.dispatch('addNoteToDelete', this.note.index)
      // Добавляем заметке стили
      note.style.maxWidth = `${this.$el.getBoundingClientRect().width}px`
      note.style.width = 'calc(100% - 20px)'
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
      this.isMoving = false
    },
    movingNote (e, shiftX, shiftY) {
      this.isMoving = true
      this.showModal = false
      this.showButtons = false
      // Отслеживаем перемещение курсора
      this.$refs.note.style.left = `${e.clientX - shiftX}px`
      this.$refs.note.style.top = `${e.clientY - shiftY}px`
      // Активируем поле для удаления
      this.toggleActiveDeleteBlock(e)
    },
    endMoveNote (e) {
      clearTimeout(this.timer)
      if (this.isMoving) {
        setTimeout(() => {
          this.isMoving = false
        }, 10)
      }
      // Добавляем заметку в переменную для удобства
      const note = this.$refs.note
      // Удаляем слушатель
      document.onmousemove = null
      note.style.opacity = null
      // Берем параметры поля удаления
      const deleteSectionPosition = this.getElPosition(document.querySelector('.delete-block'))
      // Параметры заметки
      // Захватываем поле удаления в переменную
      const deleteSection = document.querySelector('.delete-block')
      // Если курсор находится в поле удаления
      if (deleteSectionPosition.left + deleteSectionPosition.width > e.clientX && deleteSectionPosition.right - deleteSectionPosition.width < e.clientX) {
        deleteSection.classList.add('delete-block--active')
        // Позиционирование заметки относительно окна удаления
        note.style.left = '50%'
        note.style.transform = 'translateX(-50%)'
        note.style.top = `${deleteSectionPosition.top + 150}px`
        note.style.transition = 'all 0.3s ease'
        this.showButtons = true
        window.onresize = () => {
          note.style.top = `${deleteSectionPosition.top + 150}px`
          this.$refs.buttons.style.top = `${deleteSectionPosition.height - 40}px`
          this.$refs.buttons.style.left = note.style.left
        }
      } else {
        // Если курсор НЕ находится в поле удаления
        deleteSection.classList.remove('delete-block--hovered')
        this.$store.dispatch('toggleDeleteSection', false)
        note.style = null
        note.style.backgroundColor = this.note.color
        this.showButtons = false
      }
    }
  },
  mounted () {
    this.$refs.note.addEventListener('mousedown', e => {
      if (window.innerWidth > 1024) {
        const coords = this.getElPosition(this.$refs.note)
        const shiftX = e.clientX - coords.left
        const shiftY = e.clientY - coords.top
        this.prepareMoving(e, shiftX, shiftY)
        this.toggleActiveDeleteBlock(e)
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          document.onmousemove = e => {
            this.movingNote(e, shiftX, shiftY)
          }
        }, 100)
      }
    })
    this.$refs.note.addEventListener('mouseup', e => {
      this.endMoveNote(e)
    })
  },
  beforeDestroy () {
    this.$refs.note.removeEventListener('mousedown', e => {
      const coords = this.getElPosition(this.$refs.note)
      const shiftX = e.clientX - coords.left
      const shiftY = e.clientY - coords.top
      this.prepareMoving(e, shiftX, shiftY)
      this.toggleActiveDeleteBlock(e)
      clearTimeout(this.timer)
      document.onmousemove = e => {
        this.movingNote(e, shiftX, shiftY)
      }
    })
    // this.$refs.note.removeEventListener('mouseup', e => {
    //   this.endMoveNote(e)
    // })
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
      box-shadow: 0 3px 4px rgba(0,0,0,0.1), 0 3px 4px rgba(0,0,0,0.2);
      border-radius: 5px;
      border: 1px solid rgba($color-dark, 0.3);
      background-color: $color-white;
      overflow-y: hidden;
      transform: rotate(0deg);
      transition: box-shadow 0.3s ease;
      &:hover {
        box-shadow: 0 5px 7px rgba(0,0,0,0.26), 0 3px 7px rgba(0,0,0,0.33);
      }
    }
    .delete-button {
      position: absolute;
      display: none;
      top: 10px;
      right: 10px;
      height: 35px;
      width: 35px;
      border-radius: 50%;
      z-index: 1;
      box-shadow: inset 0 0 5px rgba($color-dark, 0.2);
      svg {
        width: 20px;
        height: 20px;
      }
    }
    .buttons-block {
      position: fixed;
      transition: $trs3;
      left: 50%;
      bottom: 10%;
      transform: translateX(-50%);
      z-index: 30;
      .button {
        background-color: $color-white;
        border: 0;
        border-radius: 5px;
        padding: 5px 10px;
        margin-right: 10px;
        font-weight: 400;
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

  @include md {
    .note-component {
      .delete-button {
        display: flex;
      }
    }
  }
</style>
