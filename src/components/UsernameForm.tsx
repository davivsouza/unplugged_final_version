import { VStack } from "native-base";
import { QuestionnaireHeader } from "@components/QuestionnaireHeader";
import { Button } from "@components/Button";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeScreenButton } from "./ChangeScreenButton";
import * as yup from "yup";
import { Input } from "./Input";
import { SignUpFormDataProps } from "@screens/AuthScreens/SignUp";
import { api } from "../services/api";
import { AuthNavigatorRouteProps } from "@routes/auth.routes";
import { useAuth } from "@hooks/useAuth";

type UsernameFormDataProps = {
  nickname: string;
};

type Props = {
  tempData?: SignUpFormDataProps;
  onOpenUsernameForm: (bool: boolean) => void
};

const usernameFormSchema = yup.object({
  nickname: yup
    .string()
    .matches(/^[a-z0-9._]+$/, "Utilize apenas letras minúsculas e números ou '.' e '_'.")
    .required("Informe seu nome de usuário"),
});
export function UsernameForm({ tempData, onOpenUsernameForm }: Props) {
  const { signIn } = useAuth()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UsernameFormDataProps>({
    resolver: yupResolver(usernameFormSchema),
  });

  async function handleCreateUsername({ nickname }: UsernameFormDataProps) {
    try {
      const newTempData = { ...tempData, nickname: nickname.toLowerCase() };
      // // fazer requisição enviando o newTempData para o servidor.
      await api.post('/users/create', newTempData)
      await signIn(newTempData?.email, newTempData?.password)


    } catch (error) {
      return
    }
  }
  return (
    <VStack flex={1}>
      <ChangeScreenButton onPress={() => onOpenUsernameForm(false)} />
      <VStack position="relative">
        <QuestionnaireHeader title="Como devemos chamá-lo?" />
        <Controller
          control={control}
          name="nickname"
          render={({ field: { onChange, value } }) => (
            <Input
              underline

              autoCapitalize="none"
              placeholder="Nome de usuário"
              mt={20}
              onChangeText={(text) => onChange(text.trim())}
              value={value}
              returnKeyType="send"
              onSubmitEditing={handleSubmit(handleCreateUsername)}
              errorMessage={errors.nickname?.message}
            />
          )}
        />

        <Button
          title="Finalizar"
          mt={20}
          onPress={handleSubmit(handleCreateUsername)}
        />
      </VStack>
    </VStack>
  );
}
