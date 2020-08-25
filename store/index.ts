// import { GetterTree, MutationTree } from 'vuex'
import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import { PostClass } from '../shims/types'

function getPostIndById(posts: any[], postId: number) {
  for (let post in posts)
    if (posts[post].id == postId) {
      return post
    }
  return ""
}

@Module({
  name: 'appData',
  stateFactory: true,
  namespaced: true
})
export default class appData extends VuexModule {
  public lessons: PostClass[] = require('../data.json');
  public results: PostClass[] = require('../data.json');
  public activePost = new PostClass;
  public filter = 'all';
  public search = 'title';
  public heartClass = 'fa fa-heart fa-2x';
  public page = 'Details';
  public dataType = 'performances';
  public graphOptions = {
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
  };
  get getLessons() {
    return this.lessons;
  };
  get getResults() {
    return this.results;
  };
  get getActivePost() {
    return this.activePost;
  };
  get getFilter() {
    return this.filter;
  };
  get getSearch() {
    return this.search;
  };
  get getHeartClass() {
    return this.heartClass;
  };
  get getPage() {
    return this.page;
  };
  get getDataType() {
    return this.dataType;
  };
  get getGraphOptions() {
    return this.graphOptions;
  };
  @Mutation
  public initLikes(): void {
    this.lessons.forEach((lesson: any) => {
      lesson.liked = false;
    });
  };
  @Mutation
  public updateFilter(newFilter: string): void {
    this.filter = newFilter;
  };
  @Mutation
  public updateResults(newResults: PostClass[]): void {
    this.results = newResults;
  };
  @Mutation
  public updateSearch(newSearch: string): void {
    this.search = newSearch;
  };
  @Mutation
  public updatePage(newPage: string): void {
    this.page = newPage;
  };
  @Mutation
  public updateActive(postId: number): void {
    if (postId == -1) {
      PostClass.resetPost(this.activePost);
      return;
    }
    this.activePost = this.lessons[getPostIndById(this.lessons, postId)];
    this.heartClass = this.activePost.liked == true ? 'fa fa-heart fa-2x' : 'fa fa-heart-o fa-2x'
  };
  @Mutation
  public addLike(): void {
    this.heartClass = 'fa fa-heart fa-2x';
    this.activePost.liked = true;
    this.lessons[getPostIndById(this.lessons, this.activePost.id)].liked = true;
  };
  @Mutation
  public removeLike(): void {
    this.heartClass = 'fa fa-heart-o fa-2x';
    this.activePost.liked = false;
    this.lessons[getPostIndById(this.lessons, this.activePost.id)].liked = false;
  };
  @Mutation
  public toggleDataType(): void {
    if (this.dataType == 'performances') {
      this.dataType = 'stopwatches';
    } else
      this.dataType = 'performances';
    console.log('Showing ' + this.dataType);
  }
}

// export const state = () => ({
//   lessons: require('../data.json') as PostClass[],
//   results: require('../data.json') as PostClass[],
//   activePost: new PostClass,
//   filter: 'all',
//   search: 'title',
//   heartClass: 'fa fa-heart fa-2x',
//   page: 'Details',
//   dataType: 'performances',
//   graphOptions: {
//     // events: ['click'],
//     // onClick:this.handle,
//     tooltips: {
//         mode: 'nearest'
//     },
//     elements: {
//       point: {
//         radius: 5,
//         backgroundColor: "#ffffff",
//         borderColor: "rgba(96, 223, 232, 1)"
//       }
//     },
//     scales: {
//         yAxes: [{
//             ticks: {
//                 beginAtZero: true,
//                 fontColor: "#fff",
//                 min: 0,
//                 max : 100,
//                 stepsize: 10,
//             },
//             gridLines: {
//                 display: true,
//                 color: "#cccccc44",
//             }
//         }],
//         xAxes: [ {
//             ticks: {
//                 fontColor: "#fff"
//             },
//             gridLines: {
//                 display: false
//             }
//         }]
//     },
//     legend: {
//         display: false
//     },
//     responsive: true,
//     maintainAspectRatio: false,
//   }
// })

// export type RootState = ReturnType<typeof state>
// export const getters: GetterTree<RootState, RootState> = {
//   getLessons(state) {
//     return state.lessons;
//   },
//   getResults(state) {
//     return state.results;
//   },
//   getActivePost(state) {
//     return state.activePost;
//   },
//   getFilter(state) {
//     return state.filter;
//   },
//   getSearch(state) {
//     return state.search;
//   },
//   getHeartClass(state) {
//     return state.heartClass;
//   },
//   getPage(state) {
//     return state.page;
//   },
//   getDataType(state) {
//     return state.dataType;
//   },
//   getGraphOptions(state) {
//     return state.graphOptions;
//   }
// }

// export const mutations: MutationTree<RootState> = {
//   initLikes(state) {
//     state.lessons.forEach((lesson: any) => {
//       lesson.liked = false;
//     });
//   },
//   updateFilter(state, newFilter) {
//     state.filter = newFilter;
//   },
//   updateResults(state, newResults) {
//     state.results = newResults;
//   },
//   updateSearch(state, newSearch) {
//     state.search = newSearch;
//   },
//   updatePage(state, newPage) {
//     state.page = newPage;
//   },
//   updateActive(state, postId) {
//     if (postId == -1) {
//       PostClass.resetPost(state.activePost);
//       return;
//     }
//     state.activePost = state.lessons[getPostIndById(state.lessons, postId)];
//     state.heartClass = state.activePost.liked == true ? 'fa fa-heart fa-2x' : 'fa fa-heart-o fa-2x'
//   },
//   addLike(state) {
//     state.heartClass = 'fa fa-heart fa-2x';
//     state.activePost.liked = true;
//     state.lessons[getPostIndById(state.lessons, state.activePost.id)].liked = true;
//   },
//   removeLike(state) {
//     state.heartClass = 'fa fa-heart-o fa-2x';
//     state.activePost.liked = false;
//     state.lessons[getPostIndById(state.lessons, state.activePost.id)].liked = false;
//   },
//   toggleDataType(state) {
//     if (state.dataType == 'performances') {
//       state.dataType = 'stopwatches';
//     } else
//       state.dataType = 'performances';
//     console.log('Showing ' + state.dataType);
//   }
// }