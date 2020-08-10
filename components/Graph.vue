<template>
  <div class="graph-component-wrapper">
    <section class="btn-wrapper">
      <div :class="'my-btn' + focusBtnClass[0]" @click="toggleDataType(); updateBtn(0, 'Same', null);">Performances</div>
      <div class="graph-btn-separation"></div>
      <div :class="'my-btn' + focusBtnClass[1]" @click="toggleDataType(); updateBtn(1, 'Same', null);">Chronomètres</div>
    </section>
    <div class="graph-wrapper">
      <line-chart />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LineChart from '~/components/LineChart'
import btnFocus from '~/mixins/btnFocus'
import loadData from '~/mixins/loadData'

export default {
  components: {
    LineChart
  },
  mixins: [btnFocus, loadData],
  data() {
    return {
      focusBtnClass: [' btn-focus', ''],
    }
  },
  mounted() {
    this.extractData();
  },
  computed: {
    ...mapGetters({
      activePost: 'activePost',
      dataType: 'dataType'
    }),
  },
  methods: {
    toggleDataType() {
      this.$store.commit('toggleDataType');
    },
  },
}
</script>

<style lang="less">
  @import "@/assets/css/main.less";
  @import "@/assets/css/devices.less";

  .graph-component-wrapper {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;

    .btn-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: @dark-background;

      .my-btn {
        align-self: center;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 75px;
        font-size: 30px;
        width: 48%;
      }

      .graph-btn-separation {
        .separation(3px, 75px, @neon-blue, @neon-blue, 0.5em);
        margin: 0 0.5em 0 0.5em;
      }
    }
    .graph-wrapper {
      position: relative;
      height: 60vh;
      width: 60vw;
      justify-content: center;
    }
  }
</style>