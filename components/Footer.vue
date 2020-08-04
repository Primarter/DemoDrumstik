<template>
  <div class="footer-container">
    <div class="footer-btn my-btn" @click="updatePage(0, 'Details')" :style="btnStyle[0]">
      <i class="fa fa-book" style="font-size: 1.5em" />
    </div><!--
 --><div class="footer-btn my-btn" @click="updatePage(1, 'Graph')" :style="btnStyle[1]">
      <i class="fa fa-line-chart" style="font-size: 1.5em" />
    </div><!--
 --><div class="footer-btn my-btn" @click="updatePage(2, 'Calendar')" :style="btnStyle[2]">
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
      btnStyle: ['background-color: #16181f;', '', '']
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
      for (let i = 0; i < this.btnStyle.length; i++) {
        if (i == idx) {
          this.$set(this.btnStyle, i, 'background-color: #16181f');
        } else {
          this.$set(this.btnStyle, i, '');
        }
      }
      this.$store.commit('updatePage', newPage);
    }
  },
}
</script>

<style lang="less">

  @import "~/assets/css/devices.less";

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
  .footer-btn:active .footer-btn:focus {
    border-bottom: 3px solid @neon-blue;
  }
</style>