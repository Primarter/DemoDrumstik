<template>
  <div class="footer-container">
    <div :class="'footer-btn my-btn ' + focusBtnClass[0]" @click="updateBtn(0, 'Details', 'updatePage'); resetActive()">
      <i class="fa fa-book" style="line-height: 75px; font-size: 3em" />
    </div><!--
 --><div :class="'footer-btn my-btn ' + focusBtnClass[1]" @click="updateBtn(1, 'Graphics', 'updatePage'); resetActive()">
      <i class="fa fa-line-chart" style="line-height: 75px; font-size: 3em" />
    </div><!--
 --><div :class="'footer-btn my-btn ' + focusBtnClass[2]" @click="updateBtn(2, 'Calendrier', 'updatePage'); resetActive()">
      <i class="fa fa-calendar" style="line-height: 75px; font-size: 3em" />
    </div><!--
 --><div v-show="activePost" :class="'footer-btn my-btn ' + focusBtnClass[3]" @click="updateBtn(3, 'Same', 'updatePage'); resetActive()">
      <img src="~/assets/train.svg" alt="S'entraîner">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import btnFocus from '~/mixins/btnFocus'

export default {
  mixins: [btnFocus],
  data() {
    return {
      focusBtnClass: [' btn-focus', '', '', '']
    }
  },
  computed: {
    ...mapGetters({
      activePost: 'getActivePost',
      page: 'getPage',
    })
  },
  methods: {
    resetActive() {
      this.$store.commit('updateActive', -1);
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
    display: flex;
    flex-direction: row;
    padding-bottom: 3px;
    width: inherit;
    color: white;
    background-color: @dark-background;
    border-top: solid @neon-blue 2px;
  }

  .footer-btn {
    width: 75px;
    height: 75px;
    text-align: center;
    position: relative;

    img {
      height: 100%;
      width: 100%;
      vertical-align: center;
    }
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