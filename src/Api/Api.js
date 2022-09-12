import AsyncStorage from '@react-native-community/async-storage';

const BASE_API = 'https://vitta-api.herokuapp.com/api';
let formdata = new FormData();
let myHeaders = new Headers();
var urlencoded = new URLSearchParams();

export default {
  signIn: async (email, password) => {
    const req = await fetch(`${BASE_API}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    });
    const json = await req.json();
    if (json.token) {
      
      await AsyncStorage.setItem('token', json.token);
     
    }
    return json;
  },
  signUp: async (name, email, password) => {
    formdata.append('name', name);
    formdata.append('email', email);
    formdata.append('password', password);

    const req = await fetch(`${BASE_API}/create`, {
      method: 'POST',
      body: formdata,
    });
    const json = await req.json();
    return json;
  },
  logout: async () => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/auth/logout`, {
      method: 'POST',
      body: JSON.stringify({token}),
      
    });
    const json = await req.json();
    return json;
  },

  listContact: async status => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/contacts`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({status}),
    });
    const json = await req.json();

    return json;
  },
  listUsers: async status => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token,status}),
    });
    const json = await req.json();

    return json;
  },
  
  listQ: async id => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/contact_q`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id}),
    });
    const json = await req.json();

    return json;
  },
  deleteUser: async id => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/user_d`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id,token}),
    });
    const json = await req.json();

    return json;
  },
  deleteContact: async id => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/contact_d`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id,token}),
    });
    const json = await req.json();

    return json;
  },
  User_id: async (id, status) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/user_id`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id, token, status}),
    });
    const json = await req.json();

    return json;
  },
  CreateContact: async (name, email, telephone, created_at, updated_at) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/contact`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, telephone, created_at, updated_at}),
    });
    const json = await req.json();

    return json;
  },
  createUser: async (name, email, password) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/user`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, password}),
    });
    const json = await req.json();

    return json;
  },
  EditContact: async (name, email, telephone, id, status, updated_at) => {
    const req = await fetch(
      `${BASE_API}/contact_u?id=${id}&name=${name}&email=${email}&telephone=${telephone}&status=${status}&updated_at=${updated_at}`,
      {
        method: 'PUT',
      },
    );
    const json = await req.json();

    return json;
  },
  OrderClose: async (id, status, updated_at) => {
    const req = await fetch(
      `${BASE_API}/contact_u?id=${id}&status=${status}&updated_at=${updated_at}`,
      {
        method: 'PUT',
      },
    );
    const json = await req.json();

    return json;
  },
  Search: async (search) => {
    const req = await fetch(
      `${BASE_API}/search?q=${search}`,
      {
        method: 'GET',
      },
    );
    const json = await req.json();

    return json;
  },
};
