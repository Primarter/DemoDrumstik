<template>
  <div class="graph-component-wrapper">
    <section class="btn-wrapper">
      <div class="my-btn" @click="toggleDataType()">Performances</div>
      <div class="graph-btn-separation"></div>
      <div class="my-btn" @click="toggleDataType()">Contre-la-montre</div>
    </section>
    <div class="graph-wrapper">
      <line-chart :data="dataCollection" :options="options"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LineChart from '~/components/LineChart'

export default {
  data() {
    return {
      dataCollection: null,
      options: {
        // events: ['click'],
        // onClick:this.handle,
        tooltips: {
            mode: 'nearest'
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    fontColor: "#fff",
                    min: 0,
                    max : 100,
                    stepsize: 10,
                },
                gridLines: {
                    display: true,
                    color: "#cccccc44",
                }
            }],
            xAxes: [ {
                ticks: {
                    fontColor: "#fff"
                },
                gridLines: {
                    display: false
                }
            }]
        },
        legend: {
            display: false
        },
        responsive: true,
        maintainAspectRatio: false,
      }
    }
  },
  mounted() {
    this.dataCollection = this.extractData();
  },
  computed: {
    ...mapGetters({
      activePost: 'activePost',
      dataType: 'dataType'
    })
  },
  methods: {
    toggleDataType() {
      this.$store.commit('toggleDataType');
    },
    extractData() {
      let graphData = {
        labels: [],
        datasets: [{
          label: 'Try',
          data: []
        }]
      };
      graphData.datasets[0].label = this.activePost.title;
      this.activePost[this.dataType].forEach(element => {
        graphData.datasets[0].data.push(element.percent)
      });
      return graphData;
    }
  },
  components: {
    LineChart
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
      display: flex;
      justify-content: center;
    }
  }
</style>