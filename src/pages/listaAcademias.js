import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import api from '../services/api';
import {toastError} from '../helper/toastError';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const qs = require('querystring');


import {Image, StyleSheet, View, TextInput, Text, TouchableOpacity, FlatList} from 'react-native';

export default class ListaAcademias extends Component {
    static navigationOptions = {
        title: ""
    };

    state = {
        elements: [],
        name: ''
    };

    loadAcademias = async () => {
        let data = {
            request: 'pesquisar-academias',
            name: this.state.name
        };

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        const response = await api.post('', qs.stringify(data), config);
        const {elements} = response.data;

        if (response.data.status == 0) {
            this.setState({elements});
        } else {
            // Show toast
            toastError('Nenhuma academia encontrada.');
        }
        
    }

    renderItem = ({item}) => (
        <View style={styles.itemAcademia}>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('Login', {academia: item})}}>
                <Text style={styles.textAcademia}>{item.nome}</Text>
            </TouchableOpacity>
        </View>
    );

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
                    <Text style={styles.label}>Nome da academia</Text>
                    <TextInput style={styles.input} defaultValue={this.state.name} onChangeText={(text) => this.setState({name: text})} />
                    <TouchableOpacity onPress={this.loadAcademias} style={styles.btnEnviar}>
                        <Text style={styles.labelEnviar}>BUSCAR</Text>
                    </TouchableOpacity>
                </View>
                <FlatList style={styles.listaAcademias}
                    data={this.state.elements}
                    keyExtractor={item => item.id}
                    renderItem={this.renderItem}
                    scrollEnabled={false}
                />
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
        marginTop: 10,
        alignItems: "flex-start",
        width: "80%"
    },
    label: {
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
    },
    listaAcademias: {
        marginTop: 20,
        flexGrow: 1,
        width: "80%"
    },
    itemAcademia: {
        backgroundColor: "#EFEFEF",
        padding: 20,
        margin: 4,
        borderRadius: 4,
        width: "100%"
    },
    textAcademia: {
        
    }
});