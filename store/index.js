export const state = () => ({
  lessons: (require('../data.json')),
  results: require('../data.json'),
  activePost: null,
  filter: 'all',
  winWidth: 1280,
  winHeight: 720,
  search: 'title',
  heartClass: 'fa fa-heart fa-2x',
  page: 'Details'
})

export const getters = {
  lessons(state) {
    return state.lessons;
  },
  results(state) {
    return state.results;
  },
  active(state) {
    return state.active;
  },
  liked(state) {
    return state.liked;
  },
  activePost(state) {
    return state.activePost;
  },
  filter(state) {
    return state.filter;
  },
  search(state) {
    return state.search;
  },
  heartClass(state) {
    return state.heartClass;
  },
  page(state) {
    return state.page;
  }
}

function getPostIndById(posts, postId) {
  for (const post in posts)
    if (posts[post].id == postId) {
      return post
    }
  return null
}

export const mutations = {
  initLikes(state) {
    state.lessons.forEach(lesson => {
      lesson.liked = false;
    });
  },
  updateWindowSize(state, width, height) {
    state.winWidth = width;
    state.winHeight = height;
  },
  updateFilter(state, newFilter) {
    state.filter = newFilter;
  },
  updateResults(state, newResults) {
    state.results = newResults;
  },
  updateSearch(state, newSearch) {
    state.search = newSearch;
  },
  updatePage(state, newPage) {
    state.page = newPage;
  },
  updateActive(state, postId) {
    state.activePost = state.lessons[getPostIndById(state.lessons, postId)];
    state.heartClass = state.activePost.liked == true ? 'fa fa-heart fa-2x' : 'fa fa-heart-o fa-2x'
  },
  addLike(state) {
    state.heartClass = 'fa fa-heart fa-2x';
    state.activePost.liked = true;
    state.lessons[getPostIndById(state.lessons, state.activePost.id)].liked = true;
  },
  removeLike(state) {
    state.heartClass = 'fa fa-heart-o fa-2x';
    state.activePost.liked = false;
    state.lessons[getPostIndById(state.lessons, state.activePost.id)].liked = false;
  }
}