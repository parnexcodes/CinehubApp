import { View, Text, StyleSheet, Image, FlatList, SafeAreaView } from 'react-native'
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {TMDB_API} from "@env"

export default function TV() {

    const [data, setData] = useState({ nowPlaying: null, topRatedShows: null, popularShows: null });
    const apiKey = TMDB_API
    const apiReq = async () => {
        const respNowPlaying = await axios(`https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}&language=en-US&page=1`);
        const respTopRatedShows = await axios(`https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=en-US`);
        const respPopularShows = await axios(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US`);
        setData({nowPlaying: respNowPlaying.data.results, topRatedShows: respTopRatedShows.data.results, popularShows: respPopularShows.data.results})
    }

    useEffect(() => {
        apiReq();
    }, []);

  return (
    <SafeAreaView style={styles.mainBg}>
    <Image
        style={{height: 50 ,width: '100%', resizeMode: 'contain', marginTop: 15}}
        source={{
          uri: 'https://cinehubapk.com/wp-content/uploads/2020/09/cinehub-apk.png',
        }}
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
                <Image
                    style={{width: 120, height: 180, resizeMode: 'cover', borderRadius: 5, marginRight: 8}}
                    source={{
                        uri: `https://image.tmdb.org/t/p/w500${element.item.poster_path}`,
                    }}
                />
            )
        }}
        keyExtractor={item => item.id}
      />
      </View>
      <View style={{marginTop: 15}}>
      <Text style={{fontSize: 20, color: '#f4f4f5', marginLeft: 20, fontWeight: 'bold'}}>Top 
      <Text style={{color: '#7DD329'}}> Shows</Text>
      </Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={{marginTop: 20, marginLeft: 20}}
        data={data.topRatedShows}
        horizontal
        renderItem={(element) => {
            return (
                <Image
                    style={{width: 120, height: 180, resizeMode: 'cover', borderRadius: 5, marginRight: 8}}
                    source={{
                        uri: `https://image.tmdb.org/t/p/w500${element.item.poster_path}`,
                    }}
                />
            )
        }}
        keyExtractor={item => item.id}
      />
      </View>
      <View style={{marginTop: 15}}>
      <Text style={{fontSize: 20, color: '#f4f4f5', marginLeft: 20, fontWeight: 'bold'}}>Popular 
      <Text style={{color: '#7DD329'}}> Shows</Text>
      </Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={{marginTop: 20, marginLeft: 20}}
        data={data.popularShows}
        horizontal
        renderItem={(element) => {
            return (
                <Image
                    style={{width: 120, height: 180, resizeMode: 'cover', borderRadius: 5, marginRight: 8}}
                    source={{
                        uri: `https://image.tmdb.org/t/p/w500${element.item.poster_path}`,
                    }}
                />
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