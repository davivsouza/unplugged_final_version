import { Box, HStack, Heading, VStack} from "native-base";

import GoogleSvg from '@assets/google-login.svg'
import FaceSvg from '@assets/facebook-login.svg'
import TwitterSvg from '@assets/twitter-login.svg'

export function ThirdPartyAuth(){
  return (
    <VStack mt={4}>
      <HStack alignItems="center">
        <Box flexGrow={1} h={0.5} bg="black"/>
        <Heading flexGrow={2} textAlign="center" w={1} fontSize="lg" fontFamily="semiBold">Acesso rápido</Heading>
        <Box flexGrow={1} h={0.5} bg="black" />
      </HStack>
      <HStack  justifyContent="space-around" mt={8}>
        <GoogleSvg width={60}/>
        <FaceSvg  width={60}/>
        <TwitterSvg width={60}/>
      </HStack>
    </VStack>
  )
}