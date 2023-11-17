import { VStack, useTheme } from "native-base";
import { useNavigation } from '@react-navigation/native'
import { WelcomeCard } from "@components/WelcomeCard";
import { FormHeader } from "@components/FormHeader";
import { AuthNavigatorRouteProps } from "@routes/auth.routes";
import Animated, { FadeInDown } from 'react-native-reanimated'
export function Welcome() {
  const { colors } = useTheme()
  const navigation = useNavigation<AuthNavigatorRouteProps>()

  function handleNewUser() {
    navigation.navigate('introSlider')
  }
  function handleGoSignIn() {
    navigation.navigate('signIn')
  }
  return (
    <VStack flex={1} bg="white">
      <FormHeader heading="Vamos Começar" text="Escolha umas das opções abaixo." />
      <VStack my={8} alignItems="flex-start">
        <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} style={{
          marginBottom: 42,
          width: '100%',
          borderRadius: 20,
          backgroundColor: colors.gray[50],
          paddingHorizontal: 24,
          paddingVertical: 18,

        }}>

          <WelcomeCard
            label="Sou Novo"
            description="Use essa opção para criar uma conta."
            onPress={handleNewUser}
          />
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} style={{
          marginBottom: 12,
          width: '100%',
          borderRadius: 20,
          backgroundColor: colors.gray[50],
          paddingHorizontal: 24,
          paddingVertical: 18,
        }}>
          <WelcomeCard
            label="Já tenho conta"
            description="Use essa opção para entrar na sua conta."
            hasAccount
            onPress={handleGoSignIn}
          />
        </Animated.View>
      </VStack>
    </VStack>
  );
}
