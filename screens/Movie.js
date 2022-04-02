import { View, Text, StyleSheet, Image, FlatList, SafeAreaView, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {TMDB_API} from "@env"

export default function Movie({navigation}) {

    const [data, setData] = useState({ nowPlaying: null, topRatedMovies: null, upcomingMovies: null });
    const apiKey = TMDB_API
    const apiReq = async () => {
        const respNowPlaying = await axios(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`);
        const respTopRatedMovies = await axios(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US`);
        const respUpcomingMovies = await axios(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US`);
        setData({nowPlaying: respNowPlaying.data.results, topRatedMovies: respTopRatedMovies.data.results, upcomingMovies: respUpcomingMovies.data.results})
    }

    useEffect(() => {
        apiReq();
    }, []);

  return (
    <SafeAreaView style={styles.mainBg}>
    <Image
        style={{height: 50 ,width: '100%', resizeMode: 'contain', marginTop: 15}}
        source={require('../assets/img/cinehub-apk.png')}
      />
      <Text style={{fontSize: 20, color: '#f4f4f5', marginTop: 30, marginLeft: 20, fontWeight: 'bold'}}>Now 
      <Text style={{color: '#7DD329'}}> Playing</Text>
      </Text>
      <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={{marginTop: 20, marginLeft: 20}}
        data={data.nowPlaying}
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
      <View style={{marginTop: 15}}>
      <Text style={{fontSize: 20, color: '#f4f4f5', marginLeft: 20, fontWeight: 'bold'}}>Top 
      <Text style={{color: '#7DD329'}}> Movies</Text>
      </Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={{marginTop: 20, marginLeft: 20}}
        data={data.topRatedMovies}
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
      <View style={{marginTop: 15}}>
      <Text style={{fontSize: 20, color: '#f4f4f5', marginLeft: 20, fontWeight: 'bold'}}>Upcoming 
      <Text style={{color: '#7DD329'}}> Movies</Text>
      </Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={{marginTop: 20, marginLeft: 20}}
        data={data.upcomingMovies}
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    mainBg: {
      backgroundColor: '#18181B',
      height: '100%',
    }
  })