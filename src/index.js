import {
    createStackNavigator
} from 'react-navigation-stack';

import {createAppContainer} from 'react-navigation';

import Main from './pages/main'
import ListaAcademias from './pages/listaAcademias'
import Login from './pages/login'
import Agenda from './pages/agenda'

const RootStack = createStackNavigator(
    {
        Home: {
            screen: Main
        },
        ListaAcademias: {
            screen: ListaAcademias
        },
        Login: {
            screen: Login
        },
        Agenda: {
            screen: Agenda
        }
    }
);
  
const App = createAppContainer(RootStack);

export default App;