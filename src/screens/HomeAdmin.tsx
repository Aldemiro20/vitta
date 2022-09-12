import React,{ useState, useEffect } from 'react';
import { Alert,View,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HStack, IconButton, VStack, useTheme, Text, Heading, FlatList, Center } from 'native-base';
import { SignOut } from 'phosphor-react-native';
import { ChatTeardropText } from 'phosphor-react-native';
import Api from '../Api/Api';
import { Filter } from '../components/Filter';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { Order, OrderProps } from '../components/Order';

export function HomeAdmin() {
  const [isLoading, setIsLoading] = useState(true);
  const [statusSelected, setStatusSelected] = useState<'0' | '1'>('0');
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();
  const { colors } = useTheme();

  function handleNewOrder() {
    navigation.navigate('RegisterUser');
  }

  function handleOpenDetails(orderId: string) {
    navigation.navigate('DetailsUser', { orderId, statusSelected });
  }

  async function handleLogout() {
    let json=await Api.logout();
    console.log(json);
  }
  const listar=async()=>{
    let json=await Api.listUsers(statusSelected);
    setOrders(json.data);
      setIsLoading(false);
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
       <Heading color="gray.100" fontSize="xl" >
        Administrador
      </Heading>
      
      </View>

        <IconButton
          icon={<SignOut size={26} color={colors.gray[300]} />}
          onPress={handleLogout}
        />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
          <Heading color="gray.100">
            DashBoard
          </Heading>

          <Text color="gray.200">
            {orders.length}
          </Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            type="closed"
            title="FUNCIONARIO"
            onPress={() => setStatusSelected('0')}
            isActive={statusSelected === '0'}
          />

          <Filter
            type="closed"
            title="PACIENTE"
            onPress={() => setStatusSelected('1')}
            isActive={statusSelected === '1'}
          />
        </HStack>
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
                     {statusSelected === '0' ? 'funcionario registrado' : 'paciente registrado'}
                  </Text>
                </Center>
              )}
            />
        }

        <Button title="Novo funcionario" onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
}