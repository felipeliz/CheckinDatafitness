import Toast from 'react-native-tiny-toast'

export const toastError= msg => Toast.show(msg,{
    position: Toast.position.center,
    containerStyle:{
     backgroundColor: '#f00',
     borderRadius: 15,
    },
    textStyle:{
     color:'#fff',
    },
    imgStyle:{},
    mask:false,
    maskStyle:{},
    duration: 2000,
    animation: true,
   });