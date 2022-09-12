import React, {useState} from 'react';
import {Alert} from 'react-native';
import {VStack} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import Api from '../Api/Api';

import {Header} from '../components/Header';
import {Input} from '../components/Input';
import {Button} from '../components/Button';

export function RegisterUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const [created_at, set] = useState('2022-09-09 17:15:11');
  const [description, setDescription] = useState('');
  //2022-09-09 17:15:11
  const navigation = useNavigation();

  async function handleNewOrderRegister() {
    if (!name || !email || !password) {
      return Alert.alert('Registrar', 'Preencha todos os campos.');
    }

    //setIsLoading(true);
    let json = await Api.createUser(
      name,
      email,
      password,
    );
    if (json.code == 200) {
      Alert.alert('Sucesso', 'Funcionario cadastrado com sucesso.');
      navigation.goBack();
      console.log(json);
      setIsLoading(false);
    } else {
      console.log(json);
      setIsLoading(false);
      return Alert.alert('Cadastrar', json.error);
    }
  }

  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Funcionario" />

      <Input placeholder="Nome" mt={4} onChangeText={setName} />
      <Input placeholder="Email" mt={4} onChangeText={setEmail} />
      <Input placeholder="Senha" mt={4} onChangeText={setPassword} />

      <Button
        title="Cadastrar"
        mt={5}
        isLoading={isLoading}
        onPress={handleNewOrderRegister}
      />
    </VStack>
  );
}
