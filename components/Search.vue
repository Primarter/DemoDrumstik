<template>
  <div class="search-container">
    <div style="display: table-cell; float: left">
      <i class="fa fa-search" style="font-size: 1.5em" />
    </div>
    <input
      ref="search-input"
      id="search-input"
      type="search"
      style="display: inline-block; float: left"
      v-on:keyup="onKeyUp()"
      placeholder="Votre recherche"
    />
    <div @click="toggleDropdown()" class="dropdown-wrapper" style="float: right">
      {{ searchTrad() }}&#x25BC;
      <div ref="myDropdown" class="dropdown-content wordwrap">
        <a @click="updateSearch('title')">Titres</a>
        <a @click="updateSearch('style')">Styles</a>
        <a @click="updateSearch('resume')">Résumé</a>
        <a @click="updateSearch('description')">Description</a>
        <a @click="updateSearch('skills')">Technique</a>
      </div>
    </div>
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
  box-shadow: none;
}
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  head () {
    return {
      script: [{ src: 'formatting.js' }],
    }
  },
  computed: {
    ...mapGetters({
      lessons: 'lessons',
      results: 'results',
      search: 'search'
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
        const xSub = x[this.search].toString().substring(0, 3).toLowerCase()
        return x[this.search].toString().toLowerCase().includes(str) || this.checkName(xSub, str)
      })
      this.$store.commit('updateResults', filteredArr)
    },
    toggleDropdown() {
      this.$refs.myDropdown.classList.toggle("show");
    },
    updateSearch(newSearch) {
      this.$store.commit('updateSearch', newSearch);
    },
    searchTrad() {
      switch (this.search) {
        case 'title':
          return 'Titres';
        case 'style':
          return 'Styles';
        case 'resume':
          return 'Résumé';
        case 'description':
          return 'Description';
        case 'skills':
          return 'Techniques';
        case 'duration':
          return 'Durée';
        default:
          break;
      }
    }
  }
}
</script>
