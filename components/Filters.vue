<template>
  <div class="filters-wrapper">
    <div :class="focusBtnClass[0]" @click="updateFilter(0, 'all')">Tous</div>
    <div :class="focusBtnClass[1]" @click="updateFilter(1, 'files')">Mes fichiers</div>
    <div :class="focusBtnClass[2]" @click="updateFilter(2, 'favorites')">Favoris</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      focusBtnClass: ['my-btn filter btn-focus', 'my-btn filter', 'my-btn filter'],
    }
  },
  computed: {
    filter() {
      return this.$store.getters.filter
    }
  },
  methods: {
    updateFilter(idx, newFilter) {
      for (let i = 0; i < this.focusBtnClass.length; i++) {
        if (i == idx && this.focusBtnClass[i].search(" btn-focus") == -1) {
          this.$set(this.focusBtnClass, i, this.focusBtnClass[i] + " btn-focus")
        } else {
          this.$set(this.focusBtnClass, i, this.focusBtnClass[i].replace(" btn-focus", ""));
        }
      }
      this.$store.commit('updateFilter', newFilter);
      console.log('Results now filtered by ' +  this.filter);
    }
  }
}

</script>

<style lang="less">


  @import '~/assets/css/devices.less';

  @keyframes filter-click {
    from { background-color: @dark-background; }
    to { background-color: @focus-background; }
  }

  .filters-wrapper {
    text-align: center;
    width: 100%;
    display: table;
    vertical-align: middle;
    color: @neon-blue;
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
    color: @neon-blue;
  }
</style>