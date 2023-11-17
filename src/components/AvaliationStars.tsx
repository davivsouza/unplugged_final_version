import { AntDesign } from '@expo/vector-icons';
import { HStack, useTheme } from 'native-base';

type Props = {
  rating: number
}

export function AvaliationStars({ rating }: Props) {
  const { colors } = useTheme()
  switch (rating) {
    case 0:
      return (
        <HStack alignItems="center" >
          <AntDesign name="star" size={15} color={colors.gray[400]} />
          <AntDesign name="star" size={15} color={colors.gray[400]} />
          <AntDesign name="star" size={15} color={colors.gray[400]} />
          <AntDesign name="star" size={15} color={colors.gray[400]} />
          <AntDesign name="star" size={15} color={colors.gray[400]} />
        </HStack>
      )
    case 1:
      return (
        <HStack alignItems="center" >
          <AntDesign name="star" size={15} color={colors.yellow[500]} />
          <AntDesign name="star" size={15} color={colors.gray[400]} />
          <AntDesign name="star" size={15} color={colors.gray[400]} />
          <AntDesign name="star" size={15} color={colors.gray[400]} />
          <AntDesign name="star" size={15} color={colors.gray[400]} />
        </HStack>
      )
    case 2:
      return (
        <HStack alignItems="center" >
          <AntDesign name="star" size={15} color={colors.yellow[500]} />
          <AntDesign name="star" size={15} color={colors.yellow[500]} />
          <AntDesign name="star" size={15} color={colors.gray[400]} />
          <AntDesign name="star" size={15} color={colors.gray[400]} />
          <AntDesign name="star" size={15} color={colors.gray[400]} />
        </HStack>
      )
    case 3:
      return (
        <HStack alignItems="center" >
          <AntDesign name="star" size={15} color={colors.yellow[500]} />
          <AntDesign name="star" size={15} color={colors.yellow[500]} />
          <AntDesign name="star" size={15} color={colors.yellow[500]} />
          <AntDesign name="star" size={15} color={colors.gray[400]} />
          <AntDesign name="star" size={15} color={colors.gray[400]} />
        </HStack>
      )
    case 4:
      return (
        <HStack alignItems="center" >
          <AntDesign name="star" size={15} color={colors.yellow[500]} />
          <AntDesign name="star" size={15} color={colors.yellow[500]} />
          <AntDesign name="star" size={15} color={colors.yellow[500]} />
          <AntDesign name="star" size={15} color={colors.yellow[500]} />
          <AntDesign name="star" size={15} color={colors.gray[400]} />
        </HStack>
      )
    case 5:
      return (
        <HStack alignItems="center" >
          <AntDesign name="star" size={15} color={colors.yellow[500]} />
          <AntDesign name="star" size={15} color={colors.yellow[500]} />
          <AntDesign name="star" size={15} color={colors.yellow[500]} />
          <AntDesign name="star" size={15} color={colors.yellow[500]} />
          <AntDesign name="star" size={15} color={colors.yellow[500]} />
        </HStack>
      )

    default:
      return <></>
  }
}