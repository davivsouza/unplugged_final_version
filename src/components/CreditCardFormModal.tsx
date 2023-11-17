
import { HStack, Modal, Text, VStack } from "native-base";
import { useState } from "react";
import { CreditCardListItem } from "./CreditCardListItem";
import { Input } from "./Input";
import { Button } from "./Button";

type Props = {
  isModalOpen: boolean
  onOpenModal: (status: boolean) => void
}
export function CreditCardFormModal({ isModalOpen, onOpenModal }: Props) {
  return (
    <Modal
      isOpen={isModalOpen}
      justifyContent="center"
      alignItems="center"
      _backdrop={{
        bg: "black"
      }}
      onClose={() => onOpenModal(false)}
    >
      <VStack

        borderTopRadius="3xl"
        bg={{
          linearGradient: {
            colors: ["gray.800", "purple.800"],
            start: [0, 1],
            end: [0, 0],
          },
        }}
        py={8}
        px={6}
        width="full"
        position="absolute"
        bottom={0}
        justifyContent="center"
        alignItems="center"

      >
        <Modal.CloseButton _pressed={{
          bg: 'transparent'
        }} />
        <Text
          fontSize="xl"
          fontFamily="semiBold"
          color="white"
          textAlign="center"
          mb={8}
        >
          Adicionar um novo cartão
        </Text>
        <CreditCardListItem number="1234 4321 1234 4321" />
        <VStack mt={6}>
          <Text color="white" fontSize="lg" fontFamily="semiBold">Nome</Text>
          <Input
            w="full"
            rounded="2xl"
            bg="gray.500"
            borderWidth="0"
            borderBottomWidth="0"
            placeholder="Seu nome"
          />

          <Text color="white" fontSize="lg" fontFamily="semiBold">Número</Text>
          <Input
            w="full"
            rounded="2xl"
            bg="gray.500"
            borderWidth="0"
            borderBottomWidth="0"
            placeholder="1234 4321 1234 4321"
          />
          <HStack w="full" alignItems="center" space={4}>
            <VStack flex={1}>
              <Text color="white" fontSize="lg" fontFamily="semiBold">Validade</Text>
              <Input
                rounded="2xl"
                bg="gray.500"
                borderWidth="0"
                borderBottomWidth="0"
                placeholder="Mês/Ano"
              />
            </VStack>
            <VStack flex={1}>
              <Text color="white" fontSize="lg" fontFamily="semiBold">CVV</Text>
              <Input
                rounded="2xl"
                bg="gray.500"
                borderWidth="0"
                borderBottomWidth="0"
                placeholder="123"
              />
            </VStack>
          </HStack>
        </VStack>
        <Button title="Adicionar" mt={8} />
      </VStack>
    </Modal>
  )
}