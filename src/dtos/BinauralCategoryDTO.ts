export type BinauralDTO = {
  id: number;
  binaural_name: string;
  binaural_sound: string;
  binaural_img: string;
  binaural_duration: number;
  binaral_autor: string
};

type Objeto = {

};

export type BinauralCategoryDTO = {
  id: number;
  name: string;
  images: string
  binaural: BinauralDTO[];
}