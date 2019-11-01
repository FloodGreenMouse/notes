<template lang="pug">
  .settings-component
    .icon(@click="toggleSettings")
      gearIcon
    .settings(v-show="show")
      span Темная тема
      input(type="checkbox" @input="toggleTheme" :value="darkTheme" :checked="darkTheme")
</template>

<script>
import { mapState } from 'vuex'
import gearIcon from '../icons/gear'

export default {
  name: 'settings-component',
  components: {
    gearIcon
  },
  data () {
    return {
      show: false
    }
  },
  computed: {
    ...mapState({
      darkTheme: state => state.darkTheme
    })
  },
  methods: {
    toggleSettings () {
      if (!this.show) {
        this.show = true
      } else {
        this.show = false
      }
    },

    toggleTheme () {
      if (!this.darkTheme) {
        this.$store.dispatch('toggleTheme', true)
      } else {
        console.log('false')
        this.$store.dispatch('toggleTheme', false)
      }
    }
  },
  mounted () {
    document.addEventListener('click', e => {
      if (!this.$el.contains(e.target)) {
        this.show = false
      }
    })
  },
  beforeDestroy () {
    document.removeEventListener('click', () => {})
  }
}
</script>

<style lang="scss">
  .settings-component {
    .icon {
      @include svg($color-dark);
      svg {
        width: 24px;
        height: 24px;
      }
    }
  }
  .theme-dark {
    .settings-component {
      .icon {
        @include svg($color-white)
      }
    }
  }
</style>

<style lang="scss" scoped>
  .settings-component {
    position: relative;
    .icon {
      cursor: pointer;
      &:hover {
        svg {
          transform: rotate(45deg);
        }
      }
      svg {
        transition: $trs3;
      }
    }
    .settings {
      position: absolute;
      right: 0;
      top: 100%;
      min-width: 100px;
      padding: 10px 20px;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
      border-radius: 5px;
      background-color: $color-white;
      transition: $trs3;
    }
  }
  .theme-dark {
    .settings-component {
      .settings {
        background-color: $color-dark;
      }
    }
  }
</style>
