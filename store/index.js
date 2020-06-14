export const state = () => ({
  lessons: (require('../data.json')),
  results: require('../data.json'),
  activePost: null,
  filter: 'all',
  winWidth: 1280,
  winHeight: 720
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
  updateResults(state, newResults) {
    state.results = newResults;
  },
  updateActive(state, postId) {
    state.activePost = state.lessons[getPostIndById(state.lessons, postId)];
  },
  addLike(state) {
    state.activePost.liked = true;
    state.lessons[getPostIndById(state.lessons, state.activePost.id)].liked = true;
  },
  removeLike(state) {
    state.activePost.liked = false;
    state.lessons[getPostIndById(state.lessons, state.activePost.id)].liked = false;
  }
}