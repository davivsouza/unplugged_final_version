export type Module = {
  number: number;
  name: string;
  videosLength: number;
  completedVideos: number;
  description: string
  content: {
    videoNumber: number,
    videoTitle: string,
    duration: number,
    comments?: [
      {
        userId: string,
        username: string
        comment: string,
        likes: number
        stars: number[]
      }
    ]
  }[]

};