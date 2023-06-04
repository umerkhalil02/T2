import * as React from 'react';
import axios from 'axios';
import { SafeAreaView, Text, View, ScrollView, StyleSheet, Dimensions } from 'react-native';
const {width,height} = Dimensions.get('screen')
const Movies = () => {
    const [movies, setMovies] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const fetchMovies = async () => {
        axios({
            method: 'get',
            url: 'https://reactnative.dev/movies.json',
          }).then((response) => {
            setMovies(response.data.movies)
            setLoading(false);
            console.log(movies);
          }).catch((err) => {console.log(err)});
        };

    React.useEffect(() => {
        fetchMovies()
    },[loading])
    return (
        <SafeAreaView style = {styles.container} >
            {loading && <Text>Loading...</Text>}
            {!loading &&
            <ScrollView 
            contentContainerStyle = {styles.scroll}>
                {movies.map((movie,index) => {
                    return(
                        <View key={index} style = {styles.view}>
                            <Text style={styles.text} >Title: {movie.title}</Text>
                            <Text style={styles.text} >Release Year: {movie.releaseYear}</Text>
                        </View>
                    )
                })}
            </ScrollView>}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor:'pink',
        width:width,
        height:height,
        alignItems:'center',
        flex:1
        
    },
    view:{
        width:width*.9,
        height:height*.3,
        borderRadius:10,
        borderWidth:3,
        borderColor:'white',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10,
        marginBottom:10,
        padding:10,
        
    },scroll:{
        justifyContent:'center',
        alignItems:'center',
    },
    text:{
        fontSize:Dimensions.get('window').width*.06
    }
})
export default Movies;