export type MeditationDTO = {
  id: number;
  meditation_name: string;
  meditation_sound: string;
  meditation_img: string;
  meditation_duration: number;
  Meditation_autor: string;
  meditationCategoryId: number;
  meditation_category: {
    name: string;
  };
}