<template>
  <div class="filters-wrapper">
    <div class="my-btn filter" @click="updateFilter(0, 'all')" :style="linkStyle[0]">Tous</div>
    <div class="my-btn filter" @click="updateFilter(1, 'files')" :style="linkStyle[1]">Mes fichiers</div>
    <div class="my-btn filter" @click="updateFilter(2, 'favorites')" :style="linkStyle[2]">Favoris</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      linkStyle: ['background-color: #16181f;', '', '']
    }
  },
  computed: {
    filter() {
      return this.$store.getters.filter
    }
  },
  methods: {
    updateFilter(idx, newFilter) {
      for (let i = 0; i < this.linkStyle.length; i++) {
        if (i == idx) {
          this.$set(this.linkStyle, i, 'background-color: #16181f');
        } else {
          this.$set(this.linkStyle, i, '');
        }
      }
      this.$store.commit('updateFilter', newFilter);
      console.log('Results now filtered by ' +  this.filter);
    }
  }
}

</script>

<style>
.filters-wrapper {
  text-align: center;
  width: 100%;
  display: table;
  vertical-align: middle;
  color: #60dfe8;
}

.filter {
  min-width: 33% !important;
  width: 33% !important;
  max-width: 33% !important;
  display: block;
  flex-wrap: wrap;
}

.filters-wrapper .filter {
  vertical-align: middle;
  text-align: center;
  cursor: pointer;
  display: table-cell;
  text-align: center;
  color: #60dfe8;
  font-size: 18px;
}
</style>