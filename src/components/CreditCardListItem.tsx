import { VStack, Text, Pressable, HStack, useTheme, Box } from "native-base";
import { ImageBackground } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import MasterCard from '@assets/shop/mastercard-card.png'
import MasterCardIcon from '@assets/shop/mastercard-icon.svg'

type Props = {
  number?: string
}
export function CreditCardListItem({ number }: Props) {
  return (
    <Pressable w="full" h={190} bg="black" overflow="hidden" rounded="xl" shadow={8}>
      <ImageBackground
        source={MasterCard}
        resizeMode='contain'

        style={{
          width: 600,
          height: 190,
          position: 'absolute',
          right: -120,
          bottom: 0,
        }}
      />
      {
        number ? (
          <Box flex={1} py={8} px={4}>
            <Text color="white" fontFamily="semiBold" fontSize="lg">
              {number}
            </Text>
            <MasterCardIcon
              width={50}
              height={50}
              style={{
                position: 'absolute',
                bottom: 4,
                right: 15,
              }}
            />
          </Box>
        ) : (
          <HStack flex={1} space={4} p={8}>
            <Text
              color="white"
              fontFamily="heading"
              fontSize="3xl"
              style={{
                transform: [
                  { translateY: -14 }
                ]
              }}
            >....
            </Text>
            <Text color="white" fontFamily="semiBold" fontSize="2xl">7777</Text>
            <MasterCardIcon
              width={50}
              height={50}
              style={{
                position: 'absolute',
                bottom: 4,
                right: 15,
              }}
            />
          </HStack>
        )
      }


    </Pressable>
  )
}