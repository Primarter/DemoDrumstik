<template>
  <div class="footer-container">
    <div :class="focusBtnClass[0]" @click="updatePage(0, 'Details')">
      <i class="fa fa-book" style="font-size: 1.5em" />
    </div><!--
 --><div :class="focusBtnClass[1]" @click="updatePage(1, 'Graph')">
      <i class="fa fa-line-chart" style="font-size: 1.5em" />
    </div><!--
 --><div :class="focusBtnClass[2]" @click="updatePage(2, 'Calendar')">
      <i class="fa fa-calendar" style="font-size: 1.5em" />
    </div>
    <a v-if="activePost" :href="activePost.videoUrl" target="_blank">
      <div class="my-btn" style="float: right">
        S'entrainer
      </div>
    </a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      focusBtnClass: ['footer-btn my-btn btn-focus', 'footer-btn my-btn', 'footer-btn my-btn'],
    }
  },
  computed: {
    ...mapGetters({
      activePost: 'activePost',
      page: 'page'
    })
  },
  methods: {
    changePage(newPage) {
      this.$store.commit('updatePage', newPage);
    },
    updatePage(idx, newPage) {
      for (let i = 0; i < this.focusBtnClass.length; i++) {
        if (i == idx && this.focusBtnClass[i].search(" btn-focus") == -1) {
          this.$set(this.focusBtnClass, i, this.focusBtnClass[i] + " btn-focus")
        } else {
          this.$set(this.focusBtnClass, i, this.focusBtnClass[i].replace(" btn-focus", ""));
        }
      }
      this.$store.commit('updatePage', newPage);
    }
  },
}
</script>

<style lang="less">

  @import "~/assets/css/devices.less";

  @keyframes filter-click {
    from { background-color: @dark-background; }
    to { background-color: @focus-background; }
  }

  .footer-container {
    position: absolute;
    bottom: 0;
    height: 40px;
    width: inherit;
    color: white;
    background-color: @light-background;
    border-top: solid @neon-blue 3px;
  }

  .footer-btn {
    min-height: 100%;
    width: 12.5%;
    text-align: center;
    display: inline-block;
    position: relative;
    z-index : 1;
  }

  .footer-btn::before {
    content: "";
    position: absolute;
    right: 0;
    top: 10%;
    width: 1px;
    height: 80%;
    border-right: 1px solid @neon-blue;
  }

  .footer-btn:hover {
    animation-name: filter-click;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
  }

  .footer-btn:active .footer-btn:focus {
    border-bottom: 3px solid @neon-blue;
  }
</style>