import TikTokIcon from '@assets/habits/tiktok.png'
import InstagramIcon from '@assets/habits/instagram.png'
import TwitterIcon from '@assets/habits/twitter.png'

export function checkIconUrl(url: string) {
  switch (url) {
    case 'Twitter':
      return TwitterIcon
    case 'Tiktok':
      return TikTokIcon
    case 'Instagram':
      return InstagramIcon
    default:
      break
  }
}