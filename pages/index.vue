<template>
  <div class="full-page">
    <div class="library-wrapper">
      <div class="library-banner">
        <h3>Bibliothèque</h3>
        <Search />
        <Filters />
      </div>
      <div class="vertical-list">
        <h1 v-if="results.length == 0" class="hint">No results</h1>
        <div v-for="lesson in results">
          <Post
            v-if="checkFilter(lesson)"
            :title="lesson.title"
            :lessonStyle="lesson.style"
            :level="lesson.level"
            :postid="lesson.id"
          />
        </div>
      </div>
      <Footer class="footer-positioning" />
    </div>
    <BaseHighlight v-if="activePost" :title="tradTitle(page)" :showLike="page == 'Details'">
      <Details v-if="page == 'Details'" />
      <Graph v-else-if="page == 'Graphics'" />
      <div v-else class="dummy-page">
        <h1>Development in progress</h1>
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          class="video-player"
        />
        </div>
    </BaseHighlight>
    <div v-else class="awaiting-selection">
      <div class="centered-items">
        <img src="https://drumstik.com/wp-content/themes/Drumstik_Theme/img/logo-text.png" alt="Drumstik" width="500px"/>
        <h1><i class="fa fa-arrow-left" /> Sélectionnez un cours sur le panneau de gauche</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Footer from '~/components/Footer'
import Filters from '~/components/Filters'
import Search from '~/components/Search'
import Post from '~/components/Post'
import BaseHighlight from '~/components/BaseHighlight'
import Details from '~/components/Details'
import Graph from '~/components/Graph'
import extractWasm from '~/mixins/extractModule'
// import myTest from '~/test/test.wasm'

export default {
  components: {
    Footer,
    Filters,
    Search,
    Post,
    BaseHighlight,
    Details,
    Graph
  },
  mixins: [extractWasm],
  computed: {
    ...mapGetters({
      lessons: 'lessons',
      results: 'results',
      liked: 'liked',
      activePost: 'activePost',
      filter: 'filter',
      page: 'page'
    })
  },
  methods: {
    initLikes() {
      this.$store.commit('initLikes');
    },
    getPostById(searchedId) {
      for (const post in this.lessons)
        if (this.lessons[post].id == searchedId)
          return this.lessons[post]
      return null
    },
    checkFilter(lesson) {
      if (this.page == 'Graphics' && (!lesson.performances && !lesson.stopwatches))
        return false;
      if (this.filter == 'all')
        return true;
      if (this.filter == 'favorites' && lesson.liked == true)
        return true;
      if (this.filter == 'files')
        return true;
      return false;
    },
    tradTitle(title) {
      switch (title) {
        case 'Details':
          return 'Détails';
        case 'Graphics':
          return 'Statistiques';
        default:
          return 'En développement';
      }
    }
  },
  mounted() {
    var importObject = {
      imports: { imported_func: arg => console.log(arg) }
    };
    var testFunc = null;
    // insert WebAssembly code imports here
    let integerFunc = fetch('test.wasm').then(response => {
      if (response.ok)
          return response.arrayBuffer();
        throw new Error(`Unable to fetch WASM.`);
    }).then(bytes => {
      return WebAssembly.compile(bytes);
    }).then(module =>
      WebAssembly.instantiate(module, importObject)
    ).then(instance => {
      console.log(instance.exports);
      testFunc = instance.exports.testInteger;
      console.log(testFunc())
      return testFunc;
    });
    console.log(integerFunc);
    this.initLikes();
  },
}
</script>
