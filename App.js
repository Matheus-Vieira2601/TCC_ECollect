import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Carregamento from './telas/TelaCarregamento';
import Login from './telas/TelaLogin';
import Cadastro from './telas/TelaCadastro';
import Home from './telas/TelaPrincipal';
import Denuncia from './telas/TelaDenuncia';
import Conta from './telas/TelaConta';
import Camera from './telas/camera';
import { AuthProvider } from './telas/Context';

const Stack = createStackNavigator();

export default function App() {  
  return (
    <AuthProvider>
        <NavigationContainer>
      <Stack.Navigator initialRouteName='TelaCarregamento'>
        <Stack.Screen name='TelaLogin' component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name='TelaCadastro' component={Cadastro} options={{ headerShown: false }}/>
        <Stack.Screen name='TelaCarregamento' component={Carregamento} options={{ headerShown: false }}/>
        <Stack.Screen name='TelaDenuncia' component={Denuncia} options={{ headerShown: false }}/>
        <Stack.Screen name='TelaHome' component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name='TelaConta' component={Conta} options={{ headerShown: false }}/>
        <Stack.Screen name='TelaCamera' component={Camera} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    backgroundColor: '#0C503C',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
