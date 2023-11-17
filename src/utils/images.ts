import { ImageSourcePropType } from "react-native";

export function getImg(name: string) {
  switch (name) {
    case 'Foco':
      return require('@assets/images/binaural-foco.jpg');
    case 'Relaxamento':
      return require('@assets/images/binaural-relax-nargas.jpg');
    case 'Criativo':
      return require('@assets/images/binaural-criativo.jpg');

  }
}

export const ImagesTest = {
  'Foco': {
    uri: '@assets/images/binaural-foco.jpg'
  },
  'Relaxamento': {
    uri: '@assets/images/binaural-relax-nargas.jpg'
  },
  'Criativo': {
    uri: '@assets/images/binaural-criativo.jpg'
  }
}