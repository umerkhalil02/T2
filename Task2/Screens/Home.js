import * as React from 'react';
import {StyleSheet, View, Dimensions, BackHandler, TouchableHighlight} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import { useOrientation } from './Orientation';
const {width,height} = Dimensions.get('screen')

const Home = () => {
    const orientation = useOrientation();
    console.log(orientation);
    React.useEffect(() => {
        
    },[])
    return (
        <View style = {{alignItems:'center',justifyContent:'center',width:'100%',height:'100%'}}>
            <TouchableHighlight 
            style = {[styles.containter,{width:orientation.width,height:orientation.height*.95}]} 
            >
            <VideoPlayer 
            source = {require('../assets/video.mp4')}
            controlTimeout ={5000}
            disableFullscreen
            onBack = {() => {BackHandler.exitApp();}}
            onShowControls = {console.log("SHOW")}
            onHideControls = {console.log("HIDE")}
            />
        </TouchableHighlight>
        </View>
        
    )
}
const styles = StyleSheet.create({
    containter:{
        height,
        width,
        justifyContent:'center',
    }
});
export default Home;