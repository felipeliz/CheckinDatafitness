import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {toastError} from '../helper/toastError';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import api from '../services/api';
const qs = require('querystring');

import {Image, StyleSheet, View, TextInput, Text, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';

export default class Main extends Component {
    static navigationOptions = {
        title: ""
    };

    state = {
        tag: '',
        academia: {}
    };

    componentDidMount () {
        this.getLogin();
    }

    async getLogin () {
        const value = await AsyncStorage.getItem('checkinDatafitnessLogin');
        let login = JSON.parse(value);

        if (login != null) {
            if (login.type != "" && login.tag != "" && login.senha !== "") {
                // Abre a agenda
                this.props.navigation.navigate('Agenda');
            }
        }
    }

    pesquisarTag = async () => {
        let data = {
            request: 'pesquisar-academia-tag',
            tag: this.state.tag
        };
        console.log(data);
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        const response = await api.post('', qs.stringify(data), config);
        console.log(response.data);
        if (response.data.status == 0) {
            const academia = response.data.elements;
            console.log(academia);
            this.setState({academia});
            this.props.navigation.navigate('Login', {academia: academia})
        } else {
            // Show toast
            toastError('Academia não encontrada.');
        }
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
                <Image source={require('../img/background.png')} style={styles.imageBackground} />
                <Image source={require('../img/logo-datafitness.png')} style={styles.logoDatafitness} />
                <Image source={require('../img/logo-checkin.png')} style={styles.logoCheckin} />
                <View style={styles.formWrapper}>
                    <Text style={styles.label}>Tag da academia</Text>
                    <TextInput style={styles.input} defaultValue={this.state.tag} onChangeText={(text) => this.setState({tag: text})} />
                    <TouchableOpacity onPress={this.pesquisarTag} style={styles.btnEnviar}>
                        <Text style={styles.labelEnviar}>ENVIAR</Text>
                    </TouchableOpacity>
                    <Text style={styles.naoSabe}>Não sabe a tag da sua academia?</Text>
                    <TouchableOpacity 
                        onPress={() => {
                            this.props.navigation.navigate('ListaAcademias');
                        }} style={styles.btnClique}>
                        <Text style={styles.labelClique}>Clique aqui!</Text>
                    </TouchableOpacity>
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
    formWrapper: {
        flex: 1,
        marginTop: 30,
        alignItems: "flex-start",
        width: "80%"
    },
    label: {
        marginBottom: 4
    },
    naoSabe: {
        marginTop: 40,
        width: "100%",
        textAlign: "center",
    },
    btnClique: {
        marginTop: 4,
        width: "100%",
        textAlign: "center",
    },
    labelClique: {
        color: "#0257b8",
        textAlign: "center"
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