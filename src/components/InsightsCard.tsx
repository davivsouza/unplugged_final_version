import { VStack } from 'native-base'
type Props = {
  children: React.ReactNode
}

export function InsightsCard({ children }: Props) {
  return (
    <VStack w="full" h={320} alignItems="center" justifyContent="center" bg="transparent" rounded="xl" mb={12} position={'relative'}>
      {children}
    </VStack>
  )
}