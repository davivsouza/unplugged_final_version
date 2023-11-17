import { VStack, HStack, Text, useTheme } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import { Comments } from './Comments';
const stars = [0, 1, 2, 3, 4]
const comment = {
  userId: "22asfi3@Ufhn",
  username: 'Musashi',
  comment: 'Muito bom! Utilizei, e em algumas semanas vi resultados.',
  likes: 90,
  stars: [0, 1, 2, 3, 4],
}

export function ProductAvaliations() {
  const { colors } = useTheme();
  return (
    <VStack>
      <Text color="white" fontSize="md">Avaliações</Text>
      <HStack alignItems="center" space={2}>
        <Text color="white" fontSize="3xl" fontFamily='semiBold' >4,9</Text>
        <HStack>
          {stars.map((stars, idx) => (
            <AntDesign key={idx} name="star" size={12} color={colors.yellow[300]} />
          ))}
        </HStack>
        <Text color="white" fontSize="sm" fontFamily="body">196 Avaliações</Text>
      </HStack>
      <Comments comments={[comment]} />
    </VStack>
  )
}