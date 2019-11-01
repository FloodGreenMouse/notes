import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notes: [],
    showDeleteSection: false,
    noteToDelete: null
  },

  getters: {
    notesFirstColumn: state => {
      return state.notes.filter((note, i) => i % 3 === 0)
    },

    notesSecondColumn: state => {
      return state.notes.filter((note, i) => i % 3 === 1)
    },

    notesThirdColumn: state => {
      return state.notes.filter((note, i) => i % 3 === 2)
    }
  },

  actions: {
    addNote ({ commit }, note) {
      commit('ADD_NOTE', note)
    },

    addNoteToDelete ({ commit }, noteIndex) {
      commit('ADD_NOTE_TO_DELETE', noteIndex)
    },

    deleteNote ({ commit }, index) {
      commit('DELETE_NOTE', index)
    },

    toggleDeleteSection ({ commit }, value) {
      commit('TOGGLE_DELETE_SECTION', value)
    }
  },

  mutations: {
    ADD_NOTE (state, note) {
      note.index = new Date().valueOf()
      state.notes.push(note)
    },

    ADD_NOTE_TO_DELETE (state, noteIndex) {
      state.noteToDelete = noteIndex
    },

    DELETE_NOTE (state, index) {
      state.notes.forEach((note, i) => {
        if (note.index === index) {
          state.notes.splice(i, 1)
        }
      })
    },

    TOGGLE_DELETE_SECTION (state, value) {
      state.showDeleteSection = value
    }
  }
})
