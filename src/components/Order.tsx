import React from "react";
import { Box, Circle, HStack, Text, useTheme, VStack, Pressable, IPressableProps } from 'native-base';
import { ClockAfternoon, Hourglass, CircleWavyCheck,User } from 'phosphor-react-native';

export type OrderProps = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  status: '0' | '1';
}

type Props = IPressableProps & {
  data: OrderProps;
}

export function Order({ data, ...rest }: Props) {
  const { colors } = useTheme();

  const statusColor = data.status == '0' ? colors.secondary[700] : colors.green[300];

  return (
    <Pressable {...rest}>
      <HStack
        bg="gray.600"
        mb={4}
        alignItems="center"
        justifyContent="space-between"
        rounded="sm"
        overflow="hidden"
      >
        <Box h="full" w={2} bg={statusColor} />

        <VStack flex={1} my={5} ml={5}>
          <Text color="white" fontSize="md">
            {data.name}
          </Text>
          <HStack alignItems="center">
            <ClockAfternoon size={15} color={colors.gray[300]} />
            <Text color="gray.200" fontSize="xs" ml={1}>
              {data.status=="1"?data.updated_at:data.created_at}
            </Text>
          </HStack>
        </VStack>

        <Circle bg="gray.500" h={12} w={12} mr={5}>
          {
            data.status==undefined?
            <User size={24} color={statusColor} />
            :
            data.status == '1'
              ? <CircleWavyCheck size={24} color={statusColor} />
              : <Hourglass size={24} color={statusColor} />
          }
        </Circle>
      </HStack>
    </Pressable>
  );
}