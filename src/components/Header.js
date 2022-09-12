import React from "react";
import { Heading, HStack, IconButton, useTheme, StyledProps } from 'native-base';
import { CaretLeft, ClipboardText  } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';


export function Header({ title,status,order, ...rest }) {
  const { colors } = useTheme();
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }
  function handleEdit() {
    navigation.navigate("Update",{order});
    
  }

  return (
    <HStack
      w="full"
      justifyContent="space-between"
      alignItems="center"
      bg="gray.600"
      pb={6}
      pt={12}
      {...rest}
    >
      <IconButton
        icon={<CaretLeft color={colors.gray[200]} size={24} />}
        onPress={handleGoBack}
      />

      <Heading color="gray.100" textAlign="center" fontSize="lg" flex={1} ml={-6}>
        {title}
      </Heading>
      {
        status == '0' && 
        <IconButton
        icon={<ClipboardText  size={26} color={colors.gray[200]} />}
        onPress={handleEdit}
      />
      }
     
    </HStack>
  );
}