import React, { useState } from 'react';
import { View, Image, TextInput, StyleSheet, TouchableHighlight, Text, SafeAreaView, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import mapa from '../assets/Mapa.png';
import home from '../assets/homeVerdeClaro.png';
import conta from '../assets/pessoa.png';
import denuncia from '../assets/denuncia.png';
import pontoColeta from '../assets/pontoColeta.png';
import opcoes from '../assets/opcoes.png';
import sair from '../assets/sair.png';
import localizacao from '../assets/localizacao.png';
import config from '../assets/config.png'
import ajuda from '../assets/ajuda.png'

export default function TelaPrincipal() {
    const [modalVisible, setModalVisible] = useState(false);

    const navigation = useNavigation();

    const handleNavegarDenuncia = () => {
        navigation.navigate('TelaDenuncia');
    };

    const handleNavegarConta = () => {
        navigation.navigate('TelaConta');
    };

    return (
        <View style={styles.container}>

            <View>
                <Image source={mapa} style={styles.mapa}/>
            </View>

            <TouchableOpacity style={styles.floatingButton} onPress={() => setModalVisible(true)}>
                <Image source={opcoes} style={styles.floatingButtonIcon}/>
            </TouchableOpacity>

            <SafeAreaView style={styles.footer}>

                <View style={styles.iconContainer}>
                    <Image source={home} style={styles.icon}/>
                    <Text style={styles.iconText}>Home</Text>
                </View>

                <TouchableOpacity style={styles.iconContainer} onPress={() => { handleNavegarConta(); }}>
                    <Image source={conta} style={styles.icon}/> 
                    <Text style={styles.iconText}>Conta</Text>
                </TouchableOpacity>

                <View style={styles.iconContainer}>
                    <Image source={pontoColeta} style={styles.icon}/>
                    <Text style={styles.iconText}>Ponto de Coleta</Text>
                </View>

                <TouchableOpacity style={styles.iconContainer} onPress={() => { handleNavegarDenuncia(); }}>
                    <Image source={denuncia} style={styles.icon}/>
                    <Text style={styles.iconText}>Denuncia</Text>
                </TouchableOpacity>
                
            </SafeAreaView>

            <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => {setModalVisible(false);}}>
                <View style={styles.modalContent}>
                    <View style={styles.modalContainer}>

                        <View style={styles.modalTopo}>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Image source={sair} style={styles.modalIcon}/>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.modalFoto}>
                            <Image/> 
                        </View>

                        <View>
                            <Text style={styles.modalNome}>Nome de usuário</Text>
                        </View>
                        <View>

                            <Text style={styles.modalEmail}>Email do usuário</Text>
                        </View>

                        <View style={styles.line}></View>

                        <View style={styles.modalOpcoes}>
                            <Image source={localizacao} style={styles.modalIconOpcoes}/>
                            <Text style={styles.modalTextOpcoes}>PONTOS DE COLETA</Text>
                        </View>

                        <View style={styles.modalOpcoes}>
                            <Image source={config} style={styles.modalIconOpcoes}/>
                            <Text style={styles.modalTextOpcoes}>CONFIGURAÇÕES</Text>
                        </View>

                        <View style={styles.modalOpcoes}>
                            <Image source={ajuda} style={styles.modalIconOpcoes}/>
                            <Text style={styles.modalTextOpcoes}>CENTRAL DE AJUDA</Text>
                        </View>
                    </View>
                </View>
            </Modal>
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
    floatingButton: {
        position: 'absolute',
        top: 40,
        left: 40,
        backgroundColor: '#ffffff',
        width: 70,
        height: 70,
        borderRadius: 45,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 25,
    },
    floatingButtonIcon: {
        height: 50,
        width: 50,
    },
    mapa: {
        height: '95%',
        width: 385,
    },
    icon: {
        height: 55,
        width: 55,
        marginHorizontal: 10,
    },
    iconContainer: {
        alignItems: 'center',
        width: 100,
        height: 100,
        paddingTop: 20
    },
    iconText: {
        color: '#CFEB0D',
        fontSize: 10
    },
    footer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        height: 20,
        paddingBottom: 60,
    },
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        height: 810,
        width: '73%',
        backgroundColor: '#ffffff',
        alignSelf: 'flex-start',
    },
    modalTopo: {    
        alignItems: 'flex-end',
    },
    modalIcon: {
        height: 50,
        width: 50,
    },
    modalFoto: {
        height: 70,
        width: 70,
        borderRadius: 45,
        backgroundColor: '#999999',
        marginTop: 60,
        marginLeft: 20,
    },
    modalNome: {
        fontSize: 17,
        marginLeft: 20,
        marginTop: 10,
        fontWeight: 'bold',
    },
    modalEmail: {
        fontSize: 13,
        marginLeft: 20,
        marginTop: 30,
        fontWeight: 'bold',
    },
    line: {
        width: '100%',
        height: 2,
        backgroundColor: '#0F7356',
        marginTop: 50,
    },
    modalOpcoes: {
        marginLeft: 20,
        marginTop: 65,
        flexDirection: 'row',
    },
    modalIconOpcoes: {
        height: 50,
        width: 50,
    },
    modalTextOpcoes: {
        marginTop: 12,
        marginLeft: 10,
        fontWeight: 'bold'
    }
});
