<template>
  <div class="filters-wrapper">
    <div class="my-btn" @click="updateFilter(0, 'all')" :style="linkStyle[0] + 'display: inline-block; min-width: 33%'">Tous</div>
    <div class="my-btn" @click="updateFilter(1, 'files')" :style="linkStyle[1] + 'display: inline-block; min-width: 33%'">Mes fichiers</div>
    <div class="my-btn" @click="updateFilter(2, 'favorites')" :style="linkStyle[2] + 'display: inline-block; min-width: 33%'">Favoris</div>
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
  table-layout: fixed;
  vertical-align: middle;
  color: #60dfe8;
}

.filter {
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