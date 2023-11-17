import { Input as NativeBaseInput, IInputProps, FormControl } from "native-base";

type Props = IInputProps & {
  underline?: boolean;
  errorMessage?: string | null
};
export function Input({ underline = false, errorMessage = null, isInvalid, ...rest }: Props) {
  const invalid = !!errorMessage || isInvalid
  return (

    <FormControl isInvalid={invalid}>
      <NativeBaseInput
        h={12}
        my={invalid ? 0 : 4}
        borderWidth={underline ? 0 : 2}
        borderBottomWidth={2}
        rounded={underline ? 'none' : "lg"}
        fontSize="md"
        fontFamily="body"
        placeholderTextColor="gray.400"
        isInvalid={invalid}
        _invalid={{
          borderColor: 'red.500'
        }}
        _focus={{
          bg: "transparent",
          borderWidth: underline ? 0 : 2,
          borderBottomWidth: 2,
          borderColor: underline ? "black" : 'purple.500',
          _android: {
            selectionColor: 'purple.500'
          }
        }}

        {...rest}
      />

      <FormControl.ErrorMessage mb={4}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
