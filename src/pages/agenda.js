import React, {Component} from 'react';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';

import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';

export default class Agenda extends Component {
    static navigationOptions = ({ navigation }) => {
        const {state, setParams} = navigation;
        return {
            headerTitle: () => (
                <Text style={styles.labelEnviar}></Text>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={() => (Agenda.logOut(navigation))} style={styles.btnEnviar}>
                    <Text style={styles.labelEnviar}>Logout</Text>
                </TouchableOpacity>
            ),
        };
    };
    
    state = {
        login: {},
        type: '',
        loaded: false,
        url: `https://checkin-datafitness.com.br/index.php`
    };

    async UNSAFE_componentWillMount() {
        const { navigation } = this.props;
        await this.getLogin();
    }

    getLogin = async () => {
        const value = await AsyncStorage.getItem('checkinDatafitnessLogin');
        let login = JSON.parse(value);
        if (login != null) {
            let url = `https://checkin-datafitness.com.br/index.php?src=app&tag=${login.tag}&login=${login.type}&user=${login.usuario}&pass=${login.senha}`;
            this.setState({login: JSON.parse(value), loaded: true, url: url});
        } else {
            this.props.navigation.navigate('Home');
        }
    }

    static logOut = async (navigation) => {
        console.log(navigation);
        await AsyncStorage.removeItem('checkinDatafitnessLogin');
        navigation.navigate('Home');
    }

    render() {
        return (
            <WebView source={{uri: this.state.url}} />
        )
    }

}

const styles = StyleSheet.create({
    btnEnviar: {
        backgroundColor: "#FFFFFF",
        width: "100%",
        paddingTop: 4,
        paddingRight: 10
    },
    labelEnviar: {
        color: "#000000",
        textAlign: "center"
    },
});