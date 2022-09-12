import React,{ useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { VStack, Text, HStack, useTheme, ScrollView, Box } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import { OrderFirestoreDTO } from '../DTOs/OrderFirestoreDTO';
import { CircleWavyCheck, Hourglass, Envelope, IdentificationBadge, Phone } from 'phosphor-react-native';
import Api from '../Api/Api';
import { dateFormat } from '../utils/firestoreDateFormat';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { OrderProps } from '../components/Order';
import { Loading } from '../components/Loading';
import { CardDetails } from '../components/CardDetails';
import moment from 'moment'

export function Details() {
  const [solution, setSolution] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useTheme();


  async function handleOrderClose() {
    let json = await Api.OrderClose(
      route.params.orderId,
      1,
      moment().format('YYYY-MM-DD hh:mm:ss'),
    );
    if (json.code == 200) {
      Alert.alert('Sucesso', 'Paciente Atendido.');
      navigation.navigate("Home");
  
    } else {
      console.log(json);
      alert("Email invalido")
     
    }

  }
  const listar=async()=>{
    let json=await Api.listQ(route.params.orderId);
    setOrder(json.data[0]);
    setIsLoading(false);
     
  }

  useEffect(() => {
    listar();
    console.log(moment().format('YYYY-MM-DD hh:mm:ss'))
  }, []);

  if (isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1} bg="gray.700">
      <Box px={6} bg="gray.600">
        <Header title="Paciente" status={order.status} order={order} />
      </Box>

      <HStack bg="gray.500" justifyContent="center" p={4}>
        {
          order.status == '1'
            ? <CircleWavyCheck size={22} color={colors.green[300]} />
            : <Hourglass size={22} color={colors.secondary[700]} />
        }

        <Text
          fontSize="sm"
          color={order.status == '1' ? colors.green[300] : colors.secondary[700]}
          ml={2}
          textTransform="uppercase"
        >
          {order.status == '1' ? 'Atendido' : 'em espera'}
        </Text>
      </HStack>

      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails
          title="Nome"
          description={` ${order.name}`}
          icon={IdentificationBadge}
        />
        <CardDetails
          title="Telefone"
          description={` ${order.telephone}`}
          icon={Phone}
        />
         <CardDetails
          title="Email"
          description={` ${order.email}`}
          icon={Envelope}
          footer={order.status == '0' ?`Registrado em ${order.created_at}`:`Atendido em ${order.created_at}`}
        />

      
       
      </ScrollView>

      {
        order.status == '0' && 
        <Button
          title="Atendido"
          m={5}
          onPress={handleOrderClose}
        />
      }
    </VStack>
  );
}