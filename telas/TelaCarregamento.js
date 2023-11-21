import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import logo from '../assets/LogoEcollectCompleta.png';
import { useNavigation } from '@react-navigation/native';

export default function Carregamento(props) {

  const navigation = useNavigation();

  const handleNavegarCadastro = () => {
      navigation.navigate('TelaCadastro');
  };

  return (
    <TouchableOpacity onPress={() => { handleNavegarCadastro(); }}>
      <View style={styles.container}>
        <Image source={logo} style={{ width: 250, height: 220 }} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#093A2B',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
