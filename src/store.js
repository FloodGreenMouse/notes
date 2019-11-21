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
    },

    getCurrentNote: state => index => {
      return state.notes.find(note => note.index === index)
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

    updateNote ({ commit }, note) {
      commit('UPDATE_NOTE', note)
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

    UPDATE_NOTE (state, note) {
      state.notes.forEach((item, i) => {
        if (item.index === note.index) {
          state.notes[i].title = note.title
          state.notes[i].text = note.text
          state.notes[i].color = note.color
        }
      })
    },

    TOGGLE_DELETE_SECTION (state, value) {
      state.showDeleteSection = value
    }
  }
})
