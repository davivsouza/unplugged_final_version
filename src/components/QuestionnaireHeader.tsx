import { Heading } from "native-base";
type Props = {
  title: string;
};
export function QuestionnaireHeader({ title }: Props) {
  return (
    <Heading textAlign="center" fontSize="3xl" mt={20} mb={10} fontFamily="semiBold">
      {title}
    </Heading>
  );
}
