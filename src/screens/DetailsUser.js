import React, {useEffect, useState} from 'react';
import {Alert,View} from 'react-native';
import {VStack, Text, HStack, useTheme, ScrollView, Box} from 'native-base';
import {useNavigation, useRoute} from '@react-navigation/native';
import {OrderFirestoreDTO} from '../DTOs/OrderFirestoreDTO';
import {
  CircleWavyCheck,
  Hourglass,
  Envelope,
  IdentificationBadge,
  Phone,
} from 'phosphor-react-native';
import Api from '../Api/Api';
import {dateFormat} from '../utils/firestoreDateFormat';
import {Input} from '../components/Input';
import {Button} from '../components/Button';
import {Header} from '../components/Header';
import {OrderProps} from '../components/Order';
import {Loading} from '../components/Loading';
import {CardDetails} from '../components/CardDetails';

export function DetailsUser() {
  const [solution, setSolution] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();
  const {colors} = useTheme();

  async function handleOrderClose() {
    if(route.params.statusSelected=="1"||route.params.statusSelected=="0"){
      let json = await Api.deleteContact(
        route.params.orderId,
      );
      if (json.code == 200) {
        Alert.alert('Sucesso', 'Paciente Eliminado.');
        navigation.navigate('HomeAdmin');
      } else {
        alert('Aconteceu algum erro');
      }
    }else{
    let json = await Api.deleteUser(
      route.params.orderId,
    );
    if (json.code == 200) {
      Alert.alert('Sucesso', 'Funcionario Eliminado.');
      navigation.navigate('HomeAdmin');
    } else {
      alert('Aconteceu algum erro');
    }
  }
  }
  const listar = async () => {
    let json = await Api.User_id(
      route.params.orderId,
      route.params.statusSelected,
    );
    setOrder(json.data[0]);
    setIsLoading(false);
  };

  useEffect(() => {
    listar();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bg="gray.700">
      <Box px={6} bg="gray.600">
        <Header title={order.status==undefined ? "Funcionario":"Paciente"}  order={order} />
      </Box>

      <HStack bg="gray.500" justifyContent="center" p={4}>
        {order.status == undefined ? (
          <IdentificationBadge size={22} color={colors.green[300]} />
        ) : order.status == '1' ? (
          <CircleWavyCheck size={22} color={colors.green[300]} />
        ) : (
          <Hourglass size={22} color={colors.secondary[700]} />
        )}

        <Text
          fontSize="sm"
          color={
            order.status == undefined?colors.green[300]:order.status == '1' ? colors.green[300] : colors.secondary[700]
          }
          ml={2}
          textTransform="uppercase">
          {order.status == undefined
            ? 'Registrado'
            : order.status == '1'
            ? 'Atendido'
            : 'em espera'}
        </Text>
      </HStack>

      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails
          title="Nome"
          description={` ${order.name}`}
          icon={IdentificationBadge}
        />{order.status==undefined ?<View></View>:
          <CardDetails
          title="Telefone"
          description={` ${order.telephone}`}
          icon={Phone}
        />
        }
       
        <CardDetails
          title="Email"
          description={` ${order.email}`}
          icon={Envelope}
          footer={
            order.status == '0'
              ? `Registrado em ${order.created_at}`
              : `Atendido em ${order.created_at}`
          }
        />
      </ScrollView>

      <Button title="Eliminar" m={5} onPress={handleOrderClose} />
    </VStack>
  );
}
