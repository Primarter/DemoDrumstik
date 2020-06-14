<template>
  <div class="search-container">
    <div style="display: table-cell">
      <i class="fa fa-search" style="font-size: 1.5em" />
    </div>
    <input
      id="search-input"
      type="search"
      v-on:keyup="onKeyUp()"
      placeholder="Votre recherche"
    />
  </div>
</template>

<style>
.search-container {
  float: left;
  min-width: 100%;
  padding: 2%;
  color: black;
  background-color: #ffffff;
  display: table;
}
.search-container input {
  font-size: 18px;
  display: table-cell;
  padding-left: 5px;
  margin-bottom: 0px;
  border: 0;
}
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      lessons: 'lessons',
      results: 'results',
    })
  },
  methods: {
    checkName (name, str) {
      const pattern = str
        .split('')
        .map((x) => {
          return `(?=.*${x})`
        })
        .join('')
      const regex = new RegExp(`${pattern}`, 'g')
      return name.match(regex)
    },
    onKeyUp () {
      const str = event.target.value.toLowerCase().substring(0, 3)
      const filteredArr = this.lessons.filter((x) => {
        const xSub = x.title.substring(0, 3).toLowerCase()
        return x.title.toLowerCase().includes(str) || this.checkName(xSub, str)
      })
      this.$store.commit('updateResults', filteredArr)
    }
  }
}
</script>
