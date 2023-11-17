import { Text, VStack } from "native-base";
import { FormHeader } from "@components/FormHeader";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRouteProps } from "@routes/auth.routes";
import { ChangeScreenButton } from "@components/ChangeScreenButton";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { UsernameForm } from "@components/UsernameForm";
import { Button } from "@components/Button";
import Animated, { FadeInLeft, FadeInDown } from "react-native-reanimated";

export type SignUpFormDataProps = {
  nickname?: string;
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Informe seu nome completo."),
  email: yup.string().required("Informe seu E-mail").email("E-mail inválido."),
  password: yup
    .string()
    .min(8, "A senha deve ter pelo menos 8 dígitos.")
    .required("Informe a senha")
    .matches(/[0-9]/, "Senha deve conter pelo menos 1 número")
    .matches(/[A-Z]/, "Senha deve conter pelo menos 1 letra maiúscula")
    .matches(/\W|_/, "Senha deve conter pelo menos 1 caractere especial"),
  password_confirm: yup
    .string()
    .required("Confirme a senha.")
    .oneOf([yup.ref("password")], "As senhas precisam ser iguais."),
});
export function SignUp() {
  const { navigate } = useNavigation<AuthNavigatorRouteProps>();
  const [tempUserData, setTempUserData] = useState<SignUpFormDataProps>();
  const [isLoadingToNextForm, setIsLoadingToNextForm] = useState(false)
  const [usernameForm, setUsernameForm] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  function handleAskUsername() {
    setUsernameForm(true);
  }

  async function handleTempData(data: SignUpFormDataProps) {
    try {
      setIsLoadingToNextForm(true)
      setTempUserData(data);
      handleAskUsername();
    } catch (error) {
      return
    } finally {
      setIsLoadingToNextForm(false)
    }
  }
  return (
    <VStack flex={1} bg="white">
      {usernameForm ? (
        <UsernameForm tempData={tempUserData} onOpenUsernameForm={setUsernameForm} />
      ) : (
        <>
          <VStack>
            <ChangeScreenButton onPress={() => navigate("welcome")} />
            <FormHeader
              heading="Vamos Começar"
              text="Preencha os campos abaixo."
            />

            <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()}>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Nome completo"
                    autoCapitalize="words"
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.name?.message}
                  />
                )}
              />
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(300).duration(1000).springify()}>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="E-mail"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    autoComplete='email'
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.email?.message}
                  />
                )}
              />
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()}>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Senha"
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.password?.message}
                  />
                )}
              />
            </Animated.View>
            <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()}>
              <Controller
                control={control}
                name="password_confirm"
                render={({ field: { onChange, value } }) => (
                  <Input
                    mt={3}
                    placeholder="Confirmar a Senha"
                    secureTextEntry
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.password_confirm?.message}
                    onSubmitEditing={handleSubmit(handleTempData)}
                    returnKeyType="send"
                  />
                )}
              />
            </Animated.View>
          </VStack>

          <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()}>
            <Text textAlign="center" mt={6} color="gray.400">
              ao avançar você confirma os{" "}
              <Text fontWeight="bold" color="gray.500" underline>
                termos de uso
              </Text>{" "}
              do aplicativo.
            </Text>
            <Button
              onPress={handleSubmit(handleTempData)}
              isLoading={isLoadingToNextForm}
              title="Continuar"
              alignSelf="flex-end"
              mt={4}
            />
          </Animated.View>

        </>
      )}
    </VStack>
  );
}
