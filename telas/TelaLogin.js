// TelaLogin.js
import React, { useState } from 'react';
import { View, Image, TextInput, StyleSheet, TouchableHighlight, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './Context'; // Importe o contexto
import logo from '../assets/LogoEcollect.png';
import slogan from '../assets/SloganEcollect.png';
import axios from 'axios';

export default function TelaLogin() {
  const linklogin = 'https://apiecollect.onrender.com/usuarios/login';
  const { login } = useAuth(); // Obtenha a função de login do contexto
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !senha) {
      handleMessage('Por favor, preencha todos os campos.', 'FALHOU');
      return;
    }

    try {
      const response = await axios.post(
        linklogin,
        {
          email: email,
          senha: senha,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const status = response.status;

      if (status == 200) {
        console.log('Resposta da API após o login:', response.data.user);
        // Chame a função de login do contexto para armazenar os dados do usuário
        login(response.data.user); // Certifique-se de que a resposta contenha os dados do usuário
        navigation.navigate('TelaHome');
      } else {
        handleMessage(status.message, 'FALHOU');
      }
    } catch (error) {
      console.error(error);
      handleMessage('Email ou senha incorretos!');
    }
  };

  const handleMessage = (message, type = 'FALHOU') => {
    Alert.alert(message);
  };

  const handleNavegarCadastro = () => {
    navigation.navigate('TelaCadastro');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.campos}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.campos}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
        <TouchableHighlight style={styles.botao} onPress={handleLogin} underlayColor="#CFEB0D">
          <Text style={styles.botaoTexto}>Entrar</Text>
        </TouchableHighlight>

        <Text style={styles.cadastroTexto}>
          Não possui uma conta? Faça seu cadastro{' '}
          <TouchableHighlight onPress={handleNavegarCadastro}>
            <Text style={styles.linkCadastro}>aqui</Text>
          </TouchableHighlight>
        </Text>
      </View>
      <View style={styles.sloganContainer}>
        <Image source={slogan} resizeMode="contain" style={styles.slogan} />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#093A2B',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
        width: 1000,
        height: 200,
    },
    logo: {
        width: 200,
        height: 176,
    },
    formContainer: {
        width: 350,
        height: '50%',
        backgroundColor: '#1C7359',
        borderRadius: 40,
        paddingVertical: 15
    },
    campos: {
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginBottom: 30,
        marginTop: 30,
        marginHorizontal: 35,
        width: 280,
        backgroundColor: '#ffffff',
    },
    botao: {
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginBottom: 10,
        marginTop: 30,
        marginHorizontal: 35,
        width: 280,
        backgroundColor: "#CFEB0D",
    },
    botaoTexto: {
        color: '#000000',
        textAlign: 'center',
    },
    cadastroTexto: {
        color: '#ffffff',
        textAlign: 'center',
        marginTop: 20,
    },
    linkCadastro: {
        color: '#CFEB0D',
        textDecorationLine: 'underline',
    },
    sloganContainer: {
        alignItems: 'center',
        height: 50,
        width: 100,
        paddingTop: 80,
    },
    slogan: {
        width: 300,
        height: 50,
    },
});
