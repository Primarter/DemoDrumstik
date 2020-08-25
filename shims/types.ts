export interface PostInterface {
  id: number,
  uuid: string,
  title: string,
  style: string,
  level: number,
  resume: string,
  description: string,
  videoUrl: string,
  duration: number,
  skills: string,
  created_at: string,
  updated_at: string,
  title_fr: string,
  resume_fr: string,
  description_fr: string,
  resources: string,
  performances: any[],
  stopwatches: any[],
  liked?: boolean
}

export class PostClass implements PostInterface {
  id: number = 0;
  uuid: string = "";
  title: string = "";
  style: string = "";
  level: number = 0;
  resume: string = "";
  description: string = "";
  videoUrl: string = "";
  duration: number = 0;
  skills: string = "";
  created_at: string = "";
  updated_at: string = "";
  title_fr: string = "";
  resume_fr: string = "";
  description_fr: string = "";
  resources: string = "";
  performances: any[] = [];
  stopwatches: any[] = [];
  liked: boolean = false;

  static resetPost(post: PostClass): void {
    post.id = 0;
    post.uuid = "";
    post.title = "";
    post.style = "";
    post.level = 0;
    post.resume = "";
    post.description = "";
    post.videoUrl = "";
    post.duration = 0;
    post.skills = "";
    post.created_at = "";
    post.updated_at = "";
    post.title_fr = "";
    post.resume_fr = "";
    post.description_fr = "";
    post.resources = "";
    post.performances = [];
    post.stopwatches = [];
    if (post.liked)
      post.liked = false;
  }
  constructor() {}
}