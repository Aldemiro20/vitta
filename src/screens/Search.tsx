import React,{ useState, useEffect } from 'react';
import { Alert,View,Image } from 'react-native';
import { useNavigation,useRoute } from '@react-navigation/native';
import { HStack, VStack, useTheme, Text, Heading, FlatList, Center,Icon } from 'native-base';
import { ChatTeardropText, MagnifyingGlass } from 'phosphor-react-native';
import Api from '../Api/Api';
import { Loading } from '../components/Loading';
import {Header} from '../components/Header';
import {Input} from '../components/Input';
import { Order, OrderProps } from '../components/Order';

export function Search() {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();
  const { colors } = useTheme();
  const route = useRoute();
 
  function handleOpenDetails(orderId: string) {
    navigation.navigate('Details', { orderId });
  }

 
  const listar=async()=>{
    let json=await Api.Search(search);
    setOrders(json.list);
      setIsLoading(false);
  }

  useEffect(() => {
    listar();
   
  }, [search]);

  return (
    <VStack flex={1} pb={6} bg="gray.700">
     
       <Header title="Pesquisar paciente" />
    

      <VStack flex={1} px={6}>
       

        <HStack space={3} mb={8}>
         
        </HStack>
        <Input
        mb={4}
        placeholder="Digite alguma coisa"
        InputLeftElement={
          <Icon as={<MagnifyingGlass color={colors.gray[300]} />} ml={4} />
        }
        onChangeText={setSearch}
      />
        {
          isLoading ? <Loading /> :
            <FlatList
              data={orders}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <Order data={item} onPress={() => handleOpenDetails(item.id)} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 100 }}
              ListEmptyComponent={() => (
                <Center>
               
                  <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                   Faça a sua pesquisa
                  </Text>
                </Center>
              )}
            />
        }

        
      </VStack>
    </VStack>
  );
}