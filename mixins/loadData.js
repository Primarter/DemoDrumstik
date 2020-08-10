import { mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters({
      activePost: 'activePost',
      dataType: 'dataType'
    })
  },
  methods: {
    extractData() {
      if (this.activePost[this.dataType] == undefined) {
        console.log(this.activePost[this.dataType] + " " + this.dataType);
        return null;
      }
      let graphData = {
        labels: [],
        datasets: [{
          label: '',
          data: [0],
          borderColor: [
            'rgba(96, 223, 232, 1)',
          ],
          backgroundColor: [
            'rgba(96, 223, 232, 0.2)',
          ],
        }]
      };
      graphData.datasets[0].label = this.activePost.title;
      this.activePost[this.dataType].forEach(element => {
        graphData.datasets[0].data.push(element.percent)
        graphData.labels.push(element.id)
      });
      return graphData;
    }
  },
}