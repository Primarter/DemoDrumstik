<template>
  <div class="highlight-container">
    <div class="top-banner">
      <h3>{{ title }}</h3>
      <i v-if="showLike" @click="likeItem()" :class="heartClass" />
    </div>
    <div class="highlight-content-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    title: { type: String, required: true },
    showLike: { type: Boolean, default: false }
  },
  computed: {
    ...mapGetters({
      activePost: 'getActivePost',
      liked: 'getLiked',
      heartClass: 'getHeartClass'
    })
  },
  methods: {
    likeItem() {
      if (this.activePost.liked) {
        this.$store.commit('removeLike');
      } else {
        this.$store.commit('addLike');
      }
    },
  }
}
</script>

<style lang="less">
  @import 'assets/css/devices.less';

  .highlight-container {
    width: 100%;
    height: 100vh;
    max-height: 100vh;
    display: flex;
    color: white;
    background-color: @light-background;
    flex-direction: column;
    overflow-y: auto;
    -ms-overflow-style: none;

    ::-webkit-scrollbar {
      display: none;
    }

    .top-banner {
      flex: 0 1 0;
      position: -webkit-sticky;
      position: sticky;
      top: 0;
      z-index: 1;
      background-color:  @banner-color;
      display: flex;
      max-height: 68px;
      height: 68px;
      width: 100%;
      padding: 0.5em;
      justify-content: center;
      text-align: center;

      h3 { width: 100%; }
      i { margin: auto; }
    }

    .highlight-content-wrapper {
      background-color: @light-background;
      width: 100%;
      position: relative;
      flex: 1 1 auto;
    }
  }
</style>