import React, { useState } from 'react';
import { View, Image, TextInput, StyleSheet, TouchableHighlight, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo from '../assets/LogoEcollect.png';
import slogan from '../assets/SloganEcollect.png';
import axios from 'axios';

export default function TelaCadastro() {
    const linkCadastro = 'https://apiecollect.onrender.com/usuarios/cadastrar';
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');

    const navigation = useNavigation();

    const handleCadastro = async () => {
        if (!nome || !email || !telefone || !senha) {
            handleMessage("Por favor, preencha todos os campos.", 'FALHOU');
            return;
        }

        try {
            const response = await axios.post(linkCadastro, {
                nome: nome,
                email: email,
                telefone: telefone,
                senha: senha,
            });

            const status = response.status;

            if (status === 201) {
                handleMessage("Cadastro realizado com sucesso!", 'SUCESSO');
                navigation.navigate('TelaHome');
            } else {
                handleMessage(status.message, 'FALHOU');
            }
        } catch (error) {
            console.error(error);
            handleMessage("Erro ao cadastrar usuário");
        }
    };

    const handleMessage = (message, type = 'FALHOU') => {
        Alert.alert(message);
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo} />
            </View>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.campos}
                    placeholder="Nome"
                    autoCapitalize="words"
                    value={nome}
                    onChangeText={setNome}
                />
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
                    placeholder="Telefone"
                    keyboardType="phone-pad"
                    value={telefone}
                    onChangeText={setTelefone}
                />
                <TextInput
                    style={styles.campos}
                    placeholder="Senha"
                    secureTextEntry
                    value={senha}
                    onChangeText={setSenha}
                />
                <TouchableHighlight
                    style={styles.botao}
                    onPress={handleCadastro}
                    underlayColor="#CFEB0D"
                >
                    <Text style={styles.botaoTexto}>Cadastrar</Text>
                </TouchableHighlight>

                <Text style={styles.cadastroTexto}>
                    Já possui uma conta? clique {' '}
                    <TouchableHighlight onPress={() => { navigation.navigate('TelaLogin'); }}>
                        <Text style={styles.linkCadastro}>aqui</Text>
                    </TouchableHighlight>
                </Text>
            </View>
            <View style={styles.sloganContainer}>
                <Image source={slogan} resizeMode='contain' style={styles.slogan} />
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
        marginBottom: 0,
        width: 1000,
        height: 200,
    },
    logo: {
        width: 200,
        height: 176,
    },
    formContainer: {
        width: 350,
        height: '60%',
        backgroundColor: '#1C7359',
        borderRadius: 40,
        paddingBottom: 10,
        marginVertical: 15,
        paddingVertical: 20
    },
    campos: {
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginBottom: 20,
        marginTop: 20,
        marginHorizontal: 35,
        width: 280,
        backgroundColor: '#ffffff',
    },
    botao: {
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginBottom: 10,
        marginTop: 20,
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
    },
    slogan: {
        width: 300,
        height: 50,
    },
});
