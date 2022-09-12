import React,{ useState, useEffect } from 'react';
import { Alert,View,Image } from 'react-native';
import { useNavigation,useRoute } from '@react-navigation/native';
import { HStack, IconButton, VStack, useTheme, Text, Heading, FlatList, Center,Icon } from 'native-base';
import { SignOut } from 'phosphor-react-native';
import { ChatTeardropText, MagnifyingGlass } from 'phosphor-react-native';
import Api from '../Api/Api';
import { dateFormat } from '../utils/firestoreDateFormat';
import { Filter } from '../components/Filter';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import {Input} from '../components/Input';
import { Order, OrderProps } from '../components/Order';
import AsyncStorage from '@react-native-community/async-storage';
export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [statusSelected, setStatusSelected] = useState<'0' | '1'>('0');
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();
  const { colors } = useTheme();
  const route = useRoute();
  function handleNewOrder() {
    navigation.navigate('Register');
  }
  function handleSearch() {
    navigation.navigate('Search');
  }

  function handleOpenDetails(orderId: string) {
    navigation.navigate('Details', { orderId });
  }

  async function handleLogout() {
    navigation.navigate('SignIn');
  }
  const listar=async()=>{
    let json=await Api.listContact(statusSelected);
    setOrders(json.data);
      setIsLoading(false);
    const token = await AsyncStorage.getItem('att');
  }

  useEffect(() => {
    listar();
   
  }, [statusSelected]);

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <View style={{flexDirection:"row", alignItems: "center"}}>
      <Image 
       style={{width:24,height:24, marginRight:5}}
       resizeMode="contain"
       source={require("../assets/paciente.png")}/>
       <Heading color="gray.100" fontSize="xl" >
       Vitta
      </Heading>
      
      </View>
      <IconButton
          icon={<MagnifyingGlass size={26} color={colors.gray[300]} />}
          onPress={handleSearch}
        />

        <IconButton
          icon={<SignOut size={26} color={colors.gray[300]} />}
          onPress={handleLogout}
        />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
          <Heading color="gray.100">
            Paciente
          </Heading>

          <Text color="gray.200">
            {orders.length}
          </Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            type="open"
            title="EM ESPERA"
            onPress={() => setStatusSelected('0')}
            isActive={statusSelected === '0'}
          />

          <Filter
            type="closed"
            title="ATENDIDO"
            onPress={() => setStatusSelected('1')}
            isActive={statusSelected === '1'}
          />
        </HStack>
        {/*<Input
        mb={4}
        placeholder="E-mail"
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
        }
        onChangeText={setSearch}
      />*/}
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
                  <ChatTeardropText color={colors.gray[300]} size={40} />
                  <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                    Você ainda não possui {'\n'}
                    paciente {statusSelected === '0' ? 'em espera' : 'atendido'}
                  </Text>
                </Center>
              )}
            />
        }

        <Button title="Novo paciente" onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
}