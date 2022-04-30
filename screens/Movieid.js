import { View, Text, StyleSheet, Image, ImageBackground, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {TMDB_API} from "@env"

const Movieid = ({route, navigation}) => {
    const {id, title, poster_path, backdrop_path, overview, release_date, vote_average} = route.params

    const [data, setData] = useState({ movieDetails: null, similarMovies: null, castCrew: null });
    const apiKey = TMDB_API
    const apiReq = async () => {
        const [resp, similarResp, castCrew] = await Promise.all([
            axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`),
            axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey}&language=en-US`),
            axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`)
        ])
        setData({ movieDetails: resp.data, similarMovies: similarResp.data.results, castCrew: castCrew.data.cast })
    }

    useEffect(() => {
        apiReq();
    }, [id]);

  return (
    <ScrollView style={styles.mainBg}
    showsVerticalScrollIndicator={false}>
        <View>
        <ImageBackground
            style={{width: '100%', height: 240, resizeMode: 'cover', position: 'absolute'}}
            imageStyle={{ opacity: 0.4}}
            source={{
                uri: backdrop_path,
            }}
        />
        <View style={{paddingTop: 180}}>
        <Image
            style={{width: 150, height: 200, resizeMode: 'cover', position: 'relative', alignSelf: 'center', borderRadius: 5}}
            source={{
                uri: poster_path,
            }}
        /> 
        </View>                 
        </View>
        <View style={{alignSelf: 'center', paddingTop: 20}}>
            <Text style={{fontSize: 22, fontWeight: 'bold'}}>{title} 
            <Text style={{fontWeight: 'normal'}}> ({release_date.substr(0,4)})</Text>
            </Text>
        </View>
        <View style={{alignSelf: 'center', paddingTop: 5, paddingBottom: 10}}>
            <Text>★ {Number(vote_average).toFixed(1)} | {release_date}</Text>
        </View>
        <View style={{paddingTop: 10, marginLeft: 25, marginRight: 25}}>
            <Text style={{backgroundColor: 'rgba(55, 65, 81, 0.3)', padding: 10, borderRadius: 5}}>{overview}</Text>
        </View>
        <View style={{marginTop: 20, marginBottom: 10}}>
            <Text style={{fontSize: 20, color: '#7DD329', marginLeft: 20, fontWeight: 'bold'}}>Cast</Text>
        </View>
        <View>
        <FlatList
            showsHorizontalScrollIndicator={false}
            style={{marginTop: 10, marginLeft: 20}}
            data={data.castCrew}
            horizontal
            renderItem={(element) => {
                return (
                    <TouchableOpacity
                    onPress={() => {
                    navigation.navigate('Movieid', {
                        id: element.item.id,
                        cast_id: element.item.cast_id,
                        name: element.item.name,
                        profile_path: `https://image.tmdb.org/t/p/w500${element.item.profile_path}`,
                        credit_id: element.item.credit_id
                    });
                    }}>
                    <Image
                        style={{width: 120, height: 180, resizeMode: 'cover', borderRadius: 5, marginRight: 8}}
                        source={{
                            uri: `https://image.tmdb.org/t/p/w500${element.item.profile_path}`,
                        }}
                    />
                    </TouchableOpacity>
                )
            }}
            keyExtractor={item => item.id}
        />
      </View>
        <View style={{marginTop: 30, marginBottom: 10}}>
            <Text style={{fontSize: 20, color: '#f4f4f5', marginLeft: 20, fontWeight: 'bold'}}>Recommended 
            <Text style={{color: '#7DD329'}}> Movies</Text>
            </Text>
        </View>
        <View style={{paddingBottom: 20}}>
        <FlatList
            showsHorizontalScrollIndicator={false}
            style={{marginTop: 10, marginLeft: 20}}
            data={data.similarMovies}
            horizontal
            renderItem={(element) => {
                return (
                    <TouchableOpacity
                    onPress={() => {
                    navigation.navigate('Movieid', {
                        id: element.item.id,
                        title: element.item.title,
                        poster_path: `https://image.tmdb.org/t/p/w500${element.item.poster_path}`,
                        backdrop_path: `https://image.tmdb.org/t/p/w500${element.item.backdrop_path}`,
                        overview: element.item.overview,
                        release_date: element.item.release_date,
                        vote_average: element.item.vote_average
                    });
                    }}>
                    <Image
                        style={{width: 120, height: 180, resizeMode: 'cover', borderRadius: 5, marginRight: 8}}
                        source={{
                            uri: `https://image.tmdb.org/t/p/w500${element.item.poster_path}`,
                        }}
                    />
                    </TouchableOpacity>
                )
            }}
            keyExtractor={item => item.id}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    mainBg: {
      backgroundColor: '#18181B',
      height: '100%',
    }
  })

export default Movieid