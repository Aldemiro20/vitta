import React, {useState} from 'react';
import {Alert} from 'react-native';
import {VStack} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import Api from '../Api/Api';
import AsyncStorage from '@react-native-community/async-storage';
import {Header} from '../components/Header';
import {Input} from '../components/Input';
import {Button} from '../components/Button';
import moment from 'moment'
export function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState(0);
  const [created_at, set] = useState(moment().format('YYYY-MM-DD hh:mm:ss'));
  const [description, setDescription] = useState('');

  //2022-09-09 17:15:11
  const navigation = useNavigation();

  async function handleNewOrderRegister() {
    if (!name || !email || !telephone) {
      return Alert.alert('Registrar', 'Preencha todos os campos.');
    }

    setIsLoading(true);
    let json = await Api.CreateContact(
      name,
      email,
      telephone,
      created_at,
      created_at,
    );
    if (json.code == 200) {
      Alert.alert('Cadastrar', 'Paciente cadastrado com sucesso.');
      AsyncStorage.setItem('att', "1");
      navigation.navigate("Home");
      console.log(json);
      setIsLoading(false);
    } else {
      console.log(json);
      setIsLoading(false);
      return Alert.alert('Cadastrar', 'Não foi possível registrar o pedido');
    }
  }

  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Paciente" />

      <Input placeholder="Nome" mt={4} onChangeText={setName} />
      <Input placeholder="Email" mt={4} onChangeText={setEmail} />
      <Input placeholder="Telefone" mt={4} onChangeText={setTelephone} />

      <Button
        title="Cadastrar"
        mt={5}
        isLoading={isLoading}
        onPress={handleNewOrderRegister}
      />
    </VStack>
  );
}
