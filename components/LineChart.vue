<script>
import loadData from '~/mixins/loadData'
import { mapGetters } from 'vuex'
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  mixins: [loadData],
  computed: {
    ...mapGetters({
      graphOptions: 'getGraphOptions'
    })
  },
  mounted () {
    let graphData = this.extractData();
    this.renderChart(graphData, this.graphOptions);
  },
  methods: {
    reloadChart() {
      let graphData = this.extractData();
      this.renderChart(graphData, this.graphOptions);
    }
  },
  watch: {
    'dataType': function() {
      this.reloadChart();
    }
  },
}
</script>