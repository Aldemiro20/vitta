import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {VStack} from 'native-base';
import {useRoute, useNavigation} from '@react-navigation/native';
import Api from '../Api/Api';

import {Header} from '../components/Header';
import {Input} from '../components/Input';
import {Button} from '../components/Button';
import moment from 'moment'
export function Update() {
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(route.params.order.name);
  const [email, setEmail] = useState(route.params.order.email);
  const [created_at, set]=useState(moment().format('YYYY-MM-DD hh:mm:ss'));
  const [telephone, setTelephone] = useState(
    String(route.params.order.telephone),
  );
  const [order, setOrder] = useState([]);
  //2022-09-09 17:15:11
  const navigation = useNavigation();

  async function handleEdit() {
    if (!name || !email || !telephone) {
      return Alert.alert('Registrar', 'Preencha todos os campos.');
    }

   setIsLoading(true);
    let json = await Api.EditContact(
      name,
      email,
      telephone,
      route.params.order.id,
      route.params.order.status,
      created_at,
    );
    if (json.code == 200) {
      Alert.alert('Editar', 'Paciente editado com sucesso.');
      navigation.navigate("Home");
      console.log(json);
      setIsLoading(false);
    } else {
      console.log(json);
      setIsLoading(false);
      alert("Email invalido")
     
    }
  }

  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Editar Paciente" />

      <Input placeholder="Nome" mt={4} onChangeText={setName} value={name} />
      <Input
        placeholder="Telefone"
        mt={4}
        onChangeText={setTelephone}
        value={telephone}
      />

      <Input placeholder="Email" mt={4} onChangeText={setEmail} value={email} />

      <Button
        title="Editar"
        mt={5}
        isLoading={isLoading}
        onPress={handleEdit}
      />
    </VStack>
  );
}
