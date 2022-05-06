import { View, Text, StyleSheet, Image, FlatList, SafeAreaView, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import axios from 'axios';
import {TMDB_API} from "@env"

export default function TV({navigation}) {

    const [data, setData] = useState({ nowPlaying: null, topRatedShows: null, popularShows: null });
    const [loading, setLoading] = useState(true)
    const apiKey = TMDB_API
    const apiReq = async () => {
        const respNowPlaying = await axios(`https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}&language=en-US&page=1`);
        const respTopRatedShows = await axios(`https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=en-US`);
        const respPopularShows = await axios(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US`);
        setData({nowPlaying: respNowPlaying.data.results, topRatedShows: respTopRatedShows.data.results, popularShows: respPopularShows.data.results})
        if (loading) {
          setLoading(false)
        }
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
      {loading ? 
    <SkeletonPlaceholder
    backgroundColor={'#18181B'}
    highlightColor={'gray'}>
    <View style={{marginTop: 50}}>
    </View>
    <View style={{flexDirection: 'row', marginLeft: 20, marginTop: 20}}>
    <View style={{width: 120, height: 180, resizeMode: 'cover', borderRadius: 5, marginRight: 8}}></View>
    <View style={{width: 120, height: 180, resizeMode: 'cover', borderRadius: 5, marginRight: 8}}></View>
    <View style={{width: 120, height: 180, resizeMode: 'cover', borderRadius: 5, marginRight: 8}}></View>
    <View style={{width: 120, height: 180, resizeMode: 'cover', borderRadius: 5, marginRight: 8}}></View>
    <View style={{width: 120, height: 180, resizeMode: 'cover', borderRadius: 5, marginRight: 8}}></View>
    </View>
    <View style={{marginTop: 50}}>
    </View>
    <View style={{flexDirection: 'row', marginLeft: 20, marginTop: 20}}>
    <View style={{width: 120, height: 180, resizeMode: 'cover', borderRadius: 5, marginRight: 8}}></View>
    <View style={{width: 120, height: 180, resizeMode: 'cover', borderRadius: 5, marginRight: 8}}></View>
    <View style={{width: 120, height: 180, resizeMode: 'cover', borderRadius: 5, marginRight: 8}}></View>
    <View style={{width: 120, height: 180, resizeMode: 'cover', borderRadius: 5, marginRight: 8}}></View>
    <View style={{width: 120, height: 180, resizeMode: 'cover', borderRadius: 5, marginRight: 8}}></View>
    </View>
    <View style={{marginTop: 50}}>
    </View>
    <View style={{flexDirection: 'row', marginLeft: 20, marginTop: 20}}>
    <View style={{width: 120, height: 180, resizeMode: 'cover', borderRadius: 5, marginRight: 8}}></View>
    <View style={{width: 120, height: 180, resizeMode: 'cover', borderRadius: 5, marginRight: 8}}></View>
    <View style={{width: 120, height: 180, resizeMode: 'cover', borderRadius: 5, marginRight: 8}}></View>
    <View style={{width: 120, height: 180, resizeMode: 'cover', borderRadius: 5, marginRight: 8}}></View>
    <View style={{width: 120, height: 180, resizeMode: 'cover', borderRadius: 5, marginRight: 8}}></View>
    </View>
</SkeletonPlaceholder>
      :
      <View>
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
              navigation.navigate('TVid', {
                id: element.item.id,
                first_air_date: element.item.first_air_date,
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
      <Text style={{color: '#7DD329'}}> Shows</Text>
      </Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={{marginTop: 20, marginLeft: 20}}
        data={data.topRatedShows}
        horizontal
        renderItem={(element) => {
          return (
            <TouchableOpacity
            onPress={() => {
              navigation.navigate('TVid', {
                id: element.item.id,
                name: element.item.name,
                poster_path: `https://image.tmdb.org/t/p/w500${element.item.poster_path}`,
                backdrop_path: `https://image.tmdb.org/t/p/w500${element.item.backdrop_path}`,
                overview: element.item.overview,
                first_air_date: element.item.first_air_date,
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
            <TouchableOpacity
            onPress={() => {
              navigation.navigate('TVid', {
                id: element.item.id,
                name: element.item.name,
                poster_path: `https://image.tmdb.org/t/p/w500${element.item.poster_path}`,
                backdrop_path: `https://image.tmdb.org/t/p/w500${element.item.backdrop_path}`,
                overview: element.item.overview,
                first_air_date: element.item.first_air_date,
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
      </View>
    }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    mainBg: {
      backgroundColor: '#18181B',
      height: '100%',
    }
  })