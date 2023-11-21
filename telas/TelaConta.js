import React, { useState } from 'react';
import { View, Image, TextInput, StyleSheet, TouchableHighlight, Text, SafeAreaView, TouchableOpacity, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import voltar from '../assets/voltar.png';
import { useAuth } from './Context';
import axios from 'axios';

export default function TelaConta() {
    const { user, login } = useAuth();
    const [editing, setEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(user || {});
    const [modalSairVisible, setModalSairVisible] = useState(false); 
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');


    const navigation = useNavigation();

    const handleNavegarHome = () => {
        navigation.navigate('TelaHome');
        setEditing(false);  
    };

    const handleNavegarLogin = () => {
        navigation.navigate('TelaLogin');
    };

    const handleSairPress = () => {
        setModalSairVisible(true);
    }

    const handleCancelar = () => {
        setModalSairVisible(false);
    }

    const handleSalvar = async () => {
        try {
            const response = await axios.put(`https://apiecollect.onrender.com/usuarios/alterar/${user.id}`, editedUser);
            
            if (response.status === 200) {
                console.log('Dados recebidos da API:', response.data);
            
                Alert.alert('Alterações salvas com sucesso!');
                // Atualize o contexto com as informações alteradas
                login(response.data);
            
                // Atualize os estados com os dados do usuário alterado
                setNome(response.data.nome || '');
                setEmail(response.data.email || '');
                setTelefone(response.data.telefone || '');
            
                // Atualize o estado editedUser se desejar
                setEditedUser(response.data);
            
                setEditing(false);
            } else {
                Alert.alert('Falha ao salvar alterações.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Erro ao salvar alterações.');
        }
    };
    

    return (
        <View style={styles.container} key={editing ? 'edit' : 'view'}>
            <View style={styles.navContainer}>
                <TouchableOpacity onPress={() => { handleNavegarHome(); }}>
                    <Image source={voltar} style={styles.navImage}/>
                </TouchableOpacity>
                <Text style={styles.navText}>Meu Perfil</Text>
                <View style={{width: 60, marginRight: 10}}></View>
            </View>
            <View style={styles.bodyContainer}>
                <View style={styles.formContainer}>
                    <View style={styles.formImage}>

                    </View>
                    <View style={styles.formCampos}>
                        <Text>Nome</Text>
                        <TextInput
                            id='tiNome'
                            style={styles.campos}
                            value={editing ? editedUser.nome : user?.nome || ''}
                            onChangeText={(text) => editing ? setEditedUser({ ...editedUser, nome: text }) : setNome(text)}
                            editable={editing}
                        />
                    </View>
                    <View style={styles.formCampos}>
                        <Text>Email</Text>
                        <TextInput
                            style={styles.campos}
                            value={editing ? editedUser.email : user?.email || ''}
                            onChangeText={(text) => editing ? setEditedUser({ ...editedUser, nome: text }) : setEmail(text)}
                            editable={editing}
                        />
                    </View>
                    <View style={styles.formCampos}>
                        <Text>Telefone</Text>
                        <TextInput
                            style={styles.campos}
                            value={editing ? editedUser.telefone : user?.telefone || ''}
                            onChangeText={(text) => editing ? setEditedUser({ ...editedUser, nome: text }) : setTelefone(text)}
                            editable={editing}
                        />
                    </View>

                    {editing ? (
                        <View style={styles.botoesContainer}>
                            <TouchableOpacity style={styles.botaoSalvar} onPress={handleSalvar}>
                                <Text style={styles.textBotaoSalvar}>Salvar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleNavegarHome}>
                                <Text style={styles.textBotaoSair}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.botoesContainer}>
                            <TouchableOpacity style={styles.botaoSalvar} onPress={() => setEditing(true)}>
                                <Text style={styles.textBotaoSalvar}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleSairPress}>
                                <Text style={styles.textBotaoSair}>Sair da conta</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>

            <Modal animationType='fade' transparent={true} visible={modalSairVisible}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                    <Text style={styles.modalTituloText}>Deseja realemte sair?</Text>

                        <View style={styles.modalSairButtonsContainer}>
                            <TouchableOpacity style={styles.modalSairSairButton} onPress={() => { handleNavegarLogin(); }}>
                                <Text style={styles.modalButtonText}>Sair</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalSairCancelarButton} onPress={handleCancelar}>
                                <Text style={styles.modalButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navContainer: {
        width: '100%',
        height: '11%',
        backgroundColor: '#0C503C',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    navImage: {
        height: 60,
        width: 60,
        marginLeft: 10,
    },
    navText: {
        color: '#CFEB0D',
        fontWeight: 'bold',
        fontSize: 18,
    },
    bodyContainer: {
        backgroundColor: '#D5F2CE',
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainer: {
        backgroundColor: 'white',
        height: 500,
        width: 290,
        borderRadius: 40,
        elevation: 15,
        alignItems: 'center',
        marginTop: 90,
        marginBottom: 40,
    },
    formImage: {
        height: 140,
        width: 140,
        backgroundColor: 'black',
        borderRadius: 200,
        marginTop: -70,
    },
    formCampos: {
        alignItems: 'flex-start',
        width: '85%',
        marginVertical: 25,
    },
    campos: {
        borderBottomColor: 'black',
        width: '100%',
        borderBottomWidth: 1,
        height: 39,
        zIndex: 2,
    },
    botoesContainer: {
        alignItems: 'center',
        height: 100,
    },
    botaoSalvar: {
        backgroundColor: '#0C503C',
        width: 280,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginBottom: 20,
    },
    textBotaoSalvar: {
        color: '#CFEB0D',
        fontWeight: 'bold',
        fontSize: 17,
    },
    textBotaoSair: {
        color: '#FF2E00',
        fontWeight: 'bold',
        fontSize: 17,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalContainer: {
        width: 300,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    modalSairSairButton: {
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: '#FF2E00',
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        height: 25,
        borderRadius: 20,
    },
    modalSairCancelarButton: {
        marginHorizontal: 10,
        backgroundColor: '#7EB902',
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        height: 25,
        borderRadius: 20,
    },
    modalButtonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
    }
})