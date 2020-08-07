export default {
  data() {
    return {
      focusBtnClass: [' btn-focus', '', '', ''],
    }
  },
  methods: {
    updateBtn(idx, newFocus, storeCommit) {
      for (let i = 0; i < this.focusBtnClass.length; i++) {
        if (i == idx && this.focusBtnClass[i] == " btn-focus") {
          this.$set(this.focusBtnClass, i, " btn-focus")
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