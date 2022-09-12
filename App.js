import React from 'react';
import { NativeBaseProvider, StatusBar } from 'native-base';

import { THEME } from './src/styles/theme';

import { Routes } from './src/routes';
import { Loading } from './src/components/Loading';

export default function App() {
  

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
     <Routes />
    </NativeBaseProvider>
  );
}
