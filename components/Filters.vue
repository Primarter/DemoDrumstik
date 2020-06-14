<template>
  <div class="filters-wrapper">
    <a :style="linkStyle[0]" @click="updateFilter(0, 'all')">Tous</a>
    <a :style="linkStyle[1]" @click="updateFilter(1, 'files')">Mes fichiers</a>
    <a :style="linkStyle[2]" @click="updateFilter(2, 'favorites')">Favoris</a>
    <a :style="linkStyle[3]" @click="updateFilter(3, 'styles')">Styles</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      linkStyle: ['text-decoration: underline', '', '', '']
    }
  },
  methods: {
    updateFilter(idx, newFilter) {
      for (let i = 0; i < this.linkStyle.length; i++) {
        if (i == idx) {
          this.$set(this.linkStyle, i, 'text-decoration: underline');
        } else {
          this.$set(this.linkStyle, i, '');
        }
      }
      this.$store.commit('updateFilter', newFilter);
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

.filters-wrapper a {
  vertical-align: middle;
  text-align: center;
  cursor: pointer;
  display: table-cell;
  text-align: center;
  color: #60dfe8;
  font-size: 14px;
}
</style>