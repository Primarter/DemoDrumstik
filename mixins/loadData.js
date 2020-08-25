import { mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters({
      activePost: 'getActivePost',
      dataType: 'getDataType'
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
          data: [],
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
        graphData.datasets[0].data.push(Math.round(element.percent));
        let date = new Date(element.updated_at);
        graphData.labels.push(date.getDate() + '/' + date.getMonth());
      });
      return graphData;
    }
  },
}