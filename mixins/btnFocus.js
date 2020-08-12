export default {
  data() {
  },
  methods: {
    updateBtn(idx, newFocus, storeCommit, classString=" btn-focus") {
      for (let i = 0; i < this.focusBtnClass.length; i++) {
        if (i == idx) {
          this.$set(this.focusBtnClass, i, classString)
        } else {
          this.$set(this.focusBtnClass, i, "");
        }
      }
      if (newFocus != 'Same' && storeCommit) {
        this.$store.commit(storeCommit, newFocus);
      }
    }
  },
}