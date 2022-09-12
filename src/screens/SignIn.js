import React, {useState} from 'react';
import {Alert, Image, View, LogBox} from 'react-native';
import {VStack, Heading, Icon, useTheme} from 'native-base';
import {Envelope, Key} from 'phosphor-react-native';
import {Input} from '../components/Input';
import {Button} from '../components/Button';
import Api from '../Api/Api';

export function SignIn({navigation}) {
  LogBox.ignoreAllLogs();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {colors} = useTheme();

  async function handleSignIn() {
    if (!email || !password) {
      return Alert.alert('Entrar', 'Informe e-mail e senha.');
    }

    setIsLoading(true);

    let json = await Api.signIn(email, password);
    if (json.token) {
      if (json.data.permissions[0].pivot.permission_id == 1) {
        navigation.navigate('HomeAdmin');
      } else {
        navigation.navigate('Home');
      }
      
      setIsLoading(false);
    } else {
      Alert.alert('Error', json.error);
      setIsLoading(false);
    }
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{width: 80, height: 80}}
          resizeMode="contain"
          source={require('../assets/paciente.png')}
        />
        <Heading color="gray.100" fontSize="xl" mb={6}>
          Vitta
        </Heading>
      </View>

      <Heading color="gray.100" fontSize="xl" mt={15} mb={6}>
        Acesse sua conta
      </Heading>

      <Input
        mb={4}
        placeholder="E-mail"
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
        }
        onChangeText={setEmail}
      />

      <Input
        mb={8}
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button
        title="Entrar"
        w="full"
        onPress={handleSignIn}
        isLoading={isLoading}
      />
    </VStack>
  );
}
