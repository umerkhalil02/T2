'use strict';
import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity, Linking, Alert,BackHandler} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';


const Home = () => {
    const [torch, setTorch] = React.useState(0);
    const onSuccess = e => {
        Linking.openURL(e.data).catch(err =>
        {Alert.alert('Error',"An error occured" )
          console.log("ERROR",err)}
        );
      };
    return (
        <View style = {{width:'100%',height:'100%'}}>
            <QRCodeScanner
            onRead={onSuccess}
            flashMode={torch}
            reactivate = {true}
            showMarker 
            cameraStyle = {{width:'100%',height:'100%'}}
            markerStyle ={{borderStyle: 'dotted', borderColor:'white',
            borderWidth: 5,
            borderRadius: 1,}}
            />
            <View style = {styles.top}>
                <TouchableOpacity onPress={() => BackHandler.exitApp()}>
                <Image source={require('./assets/arrow.png')} style={styles.back} />
                </TouchableOpacity>
                <View style={{flexDirection:'row'}}>
                    <Text style={{color:'white'}}>LONDON  </Text>
                    <Image source={require('./assets/flag.png')} style ={styles.flag} />
                </View>
                
            </View>
            <View style = {styles.bottom}>
                <Text style={{color:'white'}}>
                    Scan {"\n"}  QR{"\n"}CODE
                </Text>
                <Text style={{color:'white'}}>
                    HISTORY
                </Text>
                <TouchableOpacity onPress={() => 
                {
                    if(torch===0){
                        setTorch(2)
                    }else{
                        setTorch(0)
                    }
                }
                }>
                    <Image source={require('./assets/torch.png')} style = {styles.torch} />
                </TouchableOpacity>
            </View>
        </View>
       
    )
}
const styles = StyleSheet.create({
    top:{
        width:'100%',
        position:'absolute',
        padding:10,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between'

    },
    bottom:{
        width:'100%',
        position:'absolute',
        bottom:0,
        paddingBottom:5,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-around'

    },
    torch:{
        width:25,
        height:50
    },
    flag:{
        width:30,
        height:20
    },
    back:{
        width:20,
        height:15
    }
})
export default Home;