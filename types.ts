export interface LoginModel {
  username: string;
  password: string;
}

export interface SearchModel {
  titleSearch: string;
  tagSearch: string;
  skip: number;
  limit: number;
}

export interface Post {
  title: string;
  content: string;
  postedAt: Date;
  postedBy: string;
  tags: string[];
}
