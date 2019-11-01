<template lang="pug">
  .delete-section-component
    .delete-block.flex.center
      .delete-block-wrapper
      span.message Удалить заметку?
      .delete-button.flex.center
        iconTrash
</template>

<script>
import { mapState } from 'vuex'
import iconTrash from '../icons/trash'

export default {
  name: 'delete-section-component',
  components: {
    iconTrash
  },
  computed: {
    ...mapState({
      noteToDelete: state => state.noteToDelete
    })
  }
}
</script>

<style lang="scss">
  .delete-section-component {
    .delete-block {
      .delete-button {
        @include svg($color-dark);
        .polygon {
          transition: $trs3;
          transform: translateY(42px);
        }
        .fill {
          transform: translateY(22px);
        }
      }
      &.delete-block--hovered {
        .delete-button {
          svg {
            .polygon {
              transform-origin: top;
              transform: translateY(0) rotate(5deg);
            }
          }
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
  .delete-section-component {
    .delete-block {
      position: fixed;
      right: 0;
      margin: auto;
      top: 0;
      bottom: 0;
      width: 20rem;
      height: 20rem;
      border-radius: 50%;
      z-index: 2;
      &.delete-block--hovered {
        .delete-block-wrapper {
          width: 150%;
          height: 150%;
        }
      }
      &.delete-block--active {
        .delete-block-wrapper {
          right: 0;
          width: 100%;
          height: 100%;
          border-radius: 10px;
          background-color: rgba($color-primary, 0.8);
          animation: delete-block--active 0.2s ease 1 forwards;
        }
        .buttons-block {
          opacity: 1;
        }
        .message {
          opacity: 1;
        }
      }
      .delete-block-wrapper {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 0;
        height: 0;
        margin: auto;
        background-color: rgba($color-primary, 0.5);
        border-radius: 50%;
        transition: $trs3;
      }
      .message {
        position: absolute;
        left: -100%;
        top: 20px;
        font-weight: 900;
        opacity: 0;
        font-size: 20px;
        color: $color-white;
        transition: $trs3;
      }
      .delete-button {
        position: relative;
        width: 100px;
        height: 100px;
        background-color: $color-white;
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(0,0,0,0.16), 0 0 6px rgba(0,0,0,0.5);
      }
      svg {
        width: 50px;
        height: 50px;
        padding: 5px;
      }
    }
  }

  @keyframes delete-block--active {
    0% {
      width: 10%;
      height: 10%;
    }
    100% {
      width: 250%;
      height: 100%;
    }
  }
</style>
