<template>
  <div class="graph-component-wrapper">
    <h3>{{ activePost.title }}</h3>
    <section class="line-wrapper">
      <b class="under-title">{{ activePost.style.toUpperCase() }}</b>
      <Stars :level="activePost.level" :scale="30" style="margin: 0 10px 0 0;"/>
    </section>
    <section class="btn-wrapper">
      <div
        :class="'data-type-btn' + focusBtnClass[0]"
        @click="toggleDataType(); updateBtn(0, 'Same', null, ' data-type-btn-focus');"><h4>Performances</h4></div>
      <div
        :class="'data-type-btn' + focusBtnClass[1]"
        @click="toggleDataType(); updateBtn(1, 'Same', null, ' data-type-btn-focus');"><h4>Chronomètres</h4></div>
    </section>
    <div class="graph-wrapper">
      <line-chart />
    </div>
    <div class="medal-wrapper">
      <svg width="40" height="38" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg" style="top:56px; left: 28px">
        <path d="M0.0864258 7.09046L4.93361 11.8385L3.78922 18.5428L9.78079 15.3774L15.7724 18.5428L14.628 11.8385L19.4752 7.09046L12.7763 6.11266L9.78079 0.0132446L6.78533 6.11266L0.0864258 7.09046ZM9.78014 4.79116L11.3784 8.04553L14.9519 8.56724L12.3657 11.1004L12.976 14.677L9.7795 12.9885L6.58296 14.677L7.19459 11.0998L4.60839 8.56659L8.18187 8.04488L9.78014 4.79116Z" fill="#60DFE8"/>
      </svg>
      <svg width="52" height="54" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg" style="top:50px; left: 22px">
        <path d="M0.0668945 13.3923C0.0668945 20.4364 5.77011 26.1674 12.78 26.1674C19.7905 26.1674 25.4944 20.4364 25.4944 13.3923C25.4944 6.34753 19.7905 0.615845 12.78 0.615845C5.76946 0.616494 0.0668945 6.34818 0.0668945 13.3923ZM24.0151 13.3923C24.0151 19.6171 18.9752 24.6809 12.78 24.6809C6.58541 24.6809 1.5462 19.6164 1.5462 13.3923C1.5462 7.16681 6.58606 2.10237 12.78 2.10237C18.9752 2.10302 24.0151 7.16746 24.0151 13.3923Z" fill="#60DFE8"/>
      </svg>
      <svg width="96" height="118" viewBox="0 0 48 59" fill="none" xmlns="http://www.w3.org/2000/svg" style="position: relative">
        <path d="M30.3245 0L23.7769 10.7441L17.2247 0H16.4372H2.50861H0L13.0745 21.4493C7.50256 25.0168 3.79654 31.2761 3.79654 38.3923C3.79719 49.4652 12.7616 58.4733 23.7807 58.4733C34.7992 58.4733 43.7643 49.4652 43.7643 38.3923C43.7643 31.2754 40.0576 25.0162 34.485 21.4487L47.5608 0H30.3245ZM5.01722 2.82426H15.6504L22.1262 13.4521L18.7758 18.9499C17.6592 19.2403 16.5827 19.6308 15.5495 20.1018L5.01722 2.82426ZM40.6492 38.3923C40.6492 47.7396 33.082 55.3437 23.7801 55.3437C14.4782 55.3437 6.91161 47.7389 6.91161 38.3923C6.91161 29.0456 14.4788 21.4409 23.7807 21.4409C33.0826 21.4409 40.6492 29.045 40.6492 38.3923ZM32.0113 20.1012C29.4995 18.9551 26.7141 18.3112 23.7807 18.3112C23.3256 18.3112 22.8756 18.332 22.4282 18.3626L31.8988 2.82426H42.5423L32.0113 20.1012Z" fill="#60DFE8"/>
      </svg>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Stars from '~/components/Stars'
import LineChart from '~/components/LineChart'
import btnFocus from '~/mixins/btnFocus'
import loadData from '~/mixins/loadData'
import formatting from '~/mixins/formatting'

export default {
  components: {
    LineChart,
    Stars
  },
  mixins: [btnFocus, loadData, formatting],
  data() {
    return {
      focusBtnClass: [' data-type-btn-focus', ''],
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
    height: 100%;
    width: 100%;
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    flex-direction: column;
    flex-wrap: nowrap;

    h3 {
      margin: 0 0 5px 20px;
    }

    .line-wrapper {
      b {
        align-self: center
      }

      padding: 0 0 5px 20px;
      display: flex;
      width: 100%;
      justify-content: space-between;
    }

    .data-type-btn {
      align-items: center;
      justify-content: center;
      display: flex;
      margin: 10px;
      width: 200px;
      height: 50px;
      background-color: @light-background;
      border-radius: 4px;
      color: @neon-blue;
      border: 1px solid @neon-blue;
      box-sizing: border-box;

      :hover { cursor: pointer; }
      h4 { text-align: center; align-self: center;}
    }
    .data-type-btn-focus {
      border: none;
      color: white;
      background-color: #367b80;
    }
    .btn-wrapper {
      display: flex;
      flex-direction: row;

      /* .graph-btn-separation {
        .separation(3px, 75px, @neon-blue, @neon-blue, 0.5em);
        margin: 0 0.5em 0 0.5em;
      } */
    }
    .graph-wrapper {
      align-self: center;
      position: relative;
      width: 90%;
      justify-content: center;
    }
    .medal-wrapper {
      position: relative;

      svg {
        position: absolute;
      }
    }
  }
</style>