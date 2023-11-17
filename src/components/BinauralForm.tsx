import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import {
  Container,
  Button as NativeBaseButton,
  SimpleGrid,
  Text,
  VStack,
  View,
  Heading,
  Pressable
} from "native-base";
import { useState } from "react";


type Props = {
  setCategories: React.Dispatch<React.SetStateAction<String[]>>
}

export function BinauralForm({setCategories}:Props) {
  const categories = [
    "Foco",
    "Criatividade",
    "Desenho",
    "Trabalho",
    "Sono",
    "Produtividade",
    "Ansiedade",
    "Estudo",
    "Relaxamento",
    "Leitura",
    "Memória",
  ];

  const {navigate} = useNavigation<AppNavigatorRoutesProps>()

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  function handleSelectedCategory(category: string) {
    //ao clicar novamente, deselecionar a categoria
    if (selectedCategories.includes(category)) {
      const filteredSelectedCategories = selectedCategories.filter(
        (ct) => ct !== category
      );

      
      return setSelectedCategories(filteredSelectedCategories);
    }

    setSelectedCategories((prevState) => [...prevState, category]);
  }

  function handleNavigate(){
    setCategories(selectedCategories)
    navigate('binaural');
  }
  return (
    <VStack>
      <Pressable onPress={handleNavigate}>
        <Text underline color="white" fontFamily="body" fontSize="sm" alignSelf="flex-end">Pular</Text>
      </Pressable>
      <Heading
        textAlign="center"
        fontFamily="semiBold"
        color="white"
        fontSize="3xl"
      >
        No que você está interessado?
      </Heading>
      <Text
        textAlign="center"
        fontFamily="body"
        color="white"
        fontSize="xs"
        mt={5}
        w="70%"
        mx="auto"
      >
        Você pode escolher mais de uma opção caso precise.
      </Text>
      <Container my={12}>
        <View width="80%" mx="auto">
          <SimpleGrid
            columns={2}
            spacingX={6}
            spacingY={5}
          >
            {categories.map((category, idx) => (
              <NativeBaseButton
                key={idx}
                py={1}
                px={5}
                rounded="3xl"
                bg={
                  selectedCategories.includes(category)
                    ? "rgba(108, 99, 255, 0.2)"
                    : "transparent"
                }
                borderColor={
                  selectedCategories.includes(category) ? "purple.500" : "white"
                }
                borderWidth={1}
                fontFamily="body"
                alignItems="center"
                justifyContent="center"
                _pressed={{
                  opacity: 0.5,
                  bgColor: "transparent",
                }}
                onPress={() => handleSelectedCategory(category)}
              >
                <Text
                  fontFamily="body"
                  fontSize="lg"
                  color={
                    selectedCategories.includes(category)
                      ? "purple.500"
                      : "white"
                  }
                >
                  {category}
                </Text>
              </NativeBaseButton>
            ))}
          </SimpleGrid>
        </View>
      </Container>
      <Button onPress={handleNavigate} w="70%" mx="auto" title="Começar"/>
    </VStack>
  );
}
