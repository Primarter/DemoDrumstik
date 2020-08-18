<template>
  <div class="search-container">
    <div class="search-icon-wrapper">
      <i class="fa fa-search" />
    </div>
    <input
      ref="search-input"
      id="search-input"
      type="search"
      v-on:keyup="onKeyUp()"
      placeholder="Votre recherche"
    />
    <div @click="toggleDropdown()" class="dropdown-wrapper search-dropdown">
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

<script>
import { mapGetters } from 'vuex';
import formattinh from '~/mixins/formatting';

export default {
  mixins: [formattinh],
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

<style>
.search-container {
  float: left;
  padding: 2%;
  color: black;
  background-color: #ffffff;
}
.search-container input {
  display: flex;
  float: left;
  width: 60%;
  font-size: 18px;
  padding-left: 5px;
  margin-bottom: 0px;
  border: 0;
  box-shadow: none;
}
@media screen and (max-width: 1000px) {
  .search-container input {
    font-size: 16px;
  }
}
@media screen and (max-width: 800px) {
  .search-container input {
    font-size: 14px;
  }
}
.search-icon-wrapper { display: flex; float: left; width: 10% }
.search-icon-wrapper i { font-size: 1.5em; }

.search-dropdown { display: flex; float: right; width: 20%; }

.wordwrap {
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
}
</style>