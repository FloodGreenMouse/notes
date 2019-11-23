<template lang="pug">
.page.home
  .editor.flex.j-center
    vEditor
  transition(name="fade")
    deleteSection(v-show="showDeleteSection")
  .notes.flex.j-center.wrap
    .notes-column.flex.col-sm-8.col-md-4.col-3.j-start.column
      .note.col-12(v-for="(note, i) in notesFirstColumn" :key="i")
        vNote(:note="note")
    .notes-column.flex.col-sm-8.col-md-4.col-3.j-start.column
      .note.col-12(v-for="(note, i) in notesSecondColumn" :key="i")
        vNote(:note="note")
    .notes-column.flex.col-sm-8.col-md-4.col-3.j-start.column
      .note.col-12(v-for="(note, i) in notesThirdColumn" :key="i")
        vNote(:note="note")
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import vEditor from '../components/editor'
import vNote from '../components/note'
import deleteSection from '../components/delete-section'

export default {
  components: {
    vEditor,
    vNote,
    deleteSection
  },
  computed: {
    ...mapState({
      notes: state => state.notes,
      showDeleteSection: state => state.showDeleteSection
    }),
    ...mapGetters({
      notesFirstColumn: 'notesFirstColumn',
      notesSecondColumn: 'notesSecondColumn',
      notesThirdColumn: 'notesThirdColumn'
    })
  }
}
</script>

<style lang="scss" scoped>
  .page.home {
    .notes {
      justify-content: center;
      .notes-column {
        position: relative;
        padding: 10px;
        transition: all ease 0.2s, padding-top 0s;
        &:after {
          content: '';
          left: 0;
          top: 0;
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 5px;
          transition: $trs3;
        }
      }
      .notes-column--active {
        min-height: 210px;
        padding-top: 210px;
        &:after {
          content: '';
          left: 0;
          top: 0;
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: rgba($color-primary, 0.3);
          transition: $trs3;
        }
      }
    }
  }

  @include md {
    .page.home {
      .notes {
        justify-content: flex-start;
        .notes-column {
          padding: 0 10px;
        }
      }
    }
  }
</style>
