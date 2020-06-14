<template>
  <div class="search-container">
    <div style="float: left">
      <i class="fa fa-search" style="font-size: 1.5em" />
    </div>
    <span class="in-wrapper">
      <input
        id="search-input"
        type="search"
        v-on:keyup="onKeyUp()"
        placeholder="Votre recherche"
      />
    </span>
  </div>
</template>

<style>
.search-container {
  float: left;
  margin: auto;
  min-width: 100%;
  padding: 2%;
  color: black;
  background-color: #ffffff;
  display: block;
}
.search-container input {
  width: 100%;
  font-size: 20px;
}
.in-wrapper {
  display: block;
  overflow: hidden;
  padding: 0 5px;
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
