import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/main';
import ListaAcademias from './pages/listaAcademias';
import Login from './pages/login'
import Agenda from './pages/agenda';

export default createStackNavigator({
    Main,
    ListaAcademias,
    Login,
    Agenda
});