import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {toastError} from '../helper/toastError';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import api from '../services/api';
const qs = require('querystring');

import {Image, StyleSheet, View, TextInput, Text, TouchableOpacity} from 'react-native';

export default class Login extends Component {
    static navigationOptions = {
        title: ""
    };

    state = {
        academia: {},
        login: {},
        logo: 'https://checkin-datafitness.com.br/img/logo-checkin.png',
        usuario: '',
        senha: '',
        showUser: 1,
        type: 'A'
    };

    componentDidMount () {
        this.getAcademia();
    }

    getAcademia = async () => {
        const { navigation } = this.props;

        let data = {
            request: 'pesquisar-academia-id',
            id: navigation.state.params.academia.id
        };
        
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        const response = await api.post('', qs.stringify(data), config);
        const academia = response.data.elements;
        this.setState({logo: `https://checkin-datafitness.com.br/logos/${academia.imagem}`});
        console.log(academia);
        this.setState({academia});
    }

    userLogin = async () => {
        let data = {
            request: 'login',
            tipo: this.state.type,
            tabela: this.state.academia.tabelas,
            usuario: this.state.usuario,
            senha: this.state.senha
        };

        console.log(data);
        
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        const response = await api.post('', qs.stringify(data), config);
        if (response.data.status == 0) {
            let login = {
                type: this.state.type,
                usuario: this.state.usuario,
                senha: this.state.senha,
                tag: this.state.academia.tag
            };

            // Salva o login
            await AsyncStorage.setItem(
                'checkinDatafitnessLogin',
                JSON.stringify(login)
            );

            // Abre a agenda
            this.props.navigation.navigate('Agenda');
        } else {
            // Show toast
            toastError('Usuário e senha não econtrados ou inativos.');
        }
    }

    changeLoginType () {
        if (this.state.type == 'A')  {
            this.setState({type: 'P'});
            this.setState({showUser: 0});
        }
         else {
            this.setState({type: 'A'});
            this.setState({showUser: 1});
         }

         console.log(this.state.type);
    }

    render() {

        return (
            <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.container}
                scrollEnabled={true}
                enableOnAndroid={true}
                extraScrollHeight={90}
            >
                <Image source={require('../img/logo-datafitness.png')} style={styles.logoDatafitness} />
                <Image source={{uri: this.state.logo}} style={styles.logoCheckin} />
                <View style={styles.formWrapper}>
                    {this.state.showUser == 1 ?
                        <View style={styles.userContainer}>
                            <Text style={styles.label}>Usuário</Text>
                            <TextInput style={styles.input} defaultValue={this.state.usuario} onChangeText={(text) => this.setState({usuario: text})} />
                        </View>
                    : null }
                    <Text style={styles.labelBottom}>Senha</Text>
                    <TextInput style={styles.input} defaultValue={this.state.senha} onChangeText={(text) => this.setState({senha: text})} textContentType="password" />
                    <TouchableOpacity onPress={this.userLogin} style={styles.btnEnviar}>
                        <Text style={styles.labelEnviar}>LOGIN</Text>
                    </TouchableOpacity>
                    {this.state.type == 'A' ?
                        <View style={styles.userContainer}>
                            <TouchableOpacity 
                                onPress={() => {
                                    this.changeLoginType()
                                }} style={styles.btnClique}>
                                <Text style={styles.labelClique}>Login de Professor</Text>
                            </TouchableOpacity>
                        </View>
                    : 
                        <View style={styles.userContainer}>
                            <TouchableOpacity 
                                onPress={() => {
                                    this.changeLoginType()
                                }} style={styles.btnClique}>
                                <Text style={styles.labelClique}>Login de Aluno</Text>
                            </TouchableOpacity>
                        </View> 
                    }
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFF",
        paddingBottom: 80
    },
    imageBackground: {
        width: "100%", 
        height: 500, 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        resizeMode: "contain"
    },
    logoDatafitness: {
        marginTop: 10,
        width: "70%",
        height: 80,
        resizeMode: "contain"
    },
    logoCheckin: {
        marginTop: 20,
        width: "70%",
        height: 260,
        resizeMode: "contain"
    },
    userContainer: {
        width: "100%"
    },
    formWrapper: {
        flex: 1,
        marginTop: 10,
        alignItems: "flex-start",
        width: "80%"
    },
    label: {
        marginTop: 0
    },
    labelBottom: {
        marginTop: 20
    },
    btnEnviar: {
        borderRadius: 3,
        marginTop: 10,
        borderWidth: 1,
        borderColor: "#000000",
        width: "100%",
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: "#000000"
    },
    labelEnviar: {
        color: "#FFF",
        textAlign: "center"
    },
    btnClique: {
        marginTop: 40,
        width: "100%",
        textAlign: "center",
    },
    labelClique: {
        color: "#0257b8",
        fontSize: 16,
        textAlign: "center"
    },
    input: {
        width: "100%",
        padding: 15,
        marginTop: 6,
        backgroundColor: "#DFDFDF",
        borderWidth: 1,
        borderColor: "#aaa",
        borderRadius: 4
    }
});