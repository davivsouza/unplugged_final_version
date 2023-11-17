import { HStack, Pressable, Text, VStack } from "native-base";
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { ProductAvaliations } from "./ProductAvaliations";
export function ShopProductDropInfos() {
    const [detailsDropBox, setDetailsDropBox] = useState('')

    function toggleDetailsDropBox(dropbox: string) {
        if (detailsDropBox === dropbox) {
            return setDetailsDropBox('')
        }
        setDetailsDropBox(dropbox)
    }
    return (
        <VStack space={2}>
            <Pressable borderTopWidth={1} borderBottomWidth={1} borderColor="white" py={3} onPress={() => toggleDetailsDropBox('details')}>
                {detailsDropBox === 'details' ? (
                    <VStack alignItems="flex-start" space={3}>
                        <Text color="white" fontFamily="semiBold" fontSize="3xl">Detalhes</Text>
                        <Text color="white" fontSize="md">
                            Hello Brain possui todas as licenças exigidas pela Anvisapara
                            a fabricação e distribuição atendendo segundo a resoluçãoRDC 240/2018 – CÓD. 4300041.
                        </Text>
                        <Text color="white" fontSize="md">
                            O Hello Brain não possui nenhuma contra indicação. vale lembrar que ele também NÃO É UM MEDICAMENTO, não vicia e NÃO CAUSA nenhum efeito colateral. porém é importante salientar que crianças, grávidas, lactantes e idosos consulte a opnião do seu médico.
                        </Text>
                        <Text color="white" fontSize="md">
                            Trabalhamos com os melhores cientistas do cérebro e nutrólogospara desenvolver o que consideramos uma dose saúdável de produtividade e bem estar. sugerimos duas cápsulas, 30 min antes da atividade que deseja ter alta performace.
                        </Text>
                    </VStack>
                ) : (
                    <HStack alignItems="center" space={1}>
                        <Ionicons name="md-document-text-outline" size={24} color="white" />
                        <Text color="white" fontSize="md">Detalhes</Text>
                    </HStack>
                )}
            </Pressable>
            <ProductAvaliations />


        </VStack>
    )
}