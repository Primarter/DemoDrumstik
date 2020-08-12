export const state = () => ({
  lessons: require('../data.json'),
  results: require('../data.json'),
  activePost: null,
  filter: 'all',
  search: 'title',
  heartClass: 'fa fa-heart fa-2x',
  page: 'Details',
  dataType: 'performances',
  graphOptions: {
    // events: ['click'],
    // onClick:this.handle,
    tooltips: {
        mode: 'nearest'
    },
    elements: {
      point: {
        radius: 5,
        backgroundColor: "#ffffff",
        borderColor: "rgba(96, 223, 232, 1)"
      }
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
                fontColor: "#fff",
                min: 0,
                max : 100,
                stepsize: 10,
            },
            gridLines: {
                display: true,
                color: "#cccccc44",
            }
        }],
        xAxes: [ {
            ticks: {
                fontColor: "#fff"
            },
            gridLines: {
                display: false
            }
        }]
    },
    legend: {
        display: false
    },
    responsive: true,
    maintainAspectRatio: false,
  }
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
  },
  dataType(state) {
    return state.dataType;
  },
  graphOptions(state) {
    return state.graphOptions;
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
    if (postId == -1) {
      state.activePost = null;
      return;
    }
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
  },
  toggleDataType(state) {
    if (state.dataType == 'performances') {
      state.dataType = 'stopwatches';
    } else
      state.dataType = 'performances';
    console.log('Showing ' + state.dataType);
  }
}