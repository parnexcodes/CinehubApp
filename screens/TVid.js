import { View, Text, StyleSheet, Image, ImageBackground, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, {useState, useEffect, useCallback} from 'react'
import axios from 'axios'
import {TMDB_API} from "@env"

const TVid = ({route, navigation}) => {
    const {id, first_air_date} = route.params

    const [data, setData] = useState({ tvDetails: [], similarTV: [], castCrew: [] });
    const apiKey = TMDB_API
    const apiReq = useCallback(async () => {
        const [resp, similarResp, castCrew] = await Promise.all([
            axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`),
            axios.get(`https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${apiKey}&language=en-US`),
            axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${apiKey}&language=en-US`)
        ])
        setData({ tvDetails: resp.data, similarTV: similarResp.data.results, castCrew: castCrew.data.cast })
    }, [id, apiKey])

    useEffect(() => {
        apiReq();
    }, [apiReq]);

  return (
    <ScrollView style={styles.mainBg}
    showsVerticalScrollIndicator={false}>
        <View>
        <ImageBackground
            style={{width: '100%', height: 240, resizeMode: 'cover', position: 'absolute'}}
            imageStyle={{ opacity: 0.4}}
            source={{
                uri: `https://image.tmdb.org/t/p/w500${data.tvDetails.backdrop_path}`,
            }}
        />
        <View style={{paddingTop: 180}}>
        <Image
            style={{width: 150, height: 200, resizeMode: 'cover', position: 'relative', alignSelf: 'center', borderRadius: 5}}
            source={{
                uri: `https://image.tmdb.org/t/p/w500${data.tvDetails.poster_path}`,
            }}
        /> 
        </View>                 
        </View>
        <View style={{alignSelf: 'center', paddingTop: 20}}>
            <Text style={{fontSize: 22, fontWeight: 'bold'}}>{data.tvDetails.name} 
            <Text style={{fontWeight: 'normal'}}> ({first_air_date.substr(0,4)})</Text>
            </Text>
        </View>
        <View style={{alignSelf: 'center', paddingTop: 5, paddingBottom: 10}}>
            <Text>★ {Number(data.tvDetails.vote_average).toFixed(1)} | {data.tvDetails.first_air_date}</Text>
        </View>
        <View style={{paddingTop: 10, marginLeft: 25, marginRight: 25}}>
            <Text style={{backgroundColor: 'rgba(55, 65, 81, 0.3)', padding: 10, borderRadius: 5}}>{data.tvDetails.overview}</Text>
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
                    navigation.navigate('TVid', {
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
            <Text style={{color: '#7DD329'}}> Shows</Text>
            </Text>
        </View>
        <View style={{paddingBottom: 20}}>
        <FlatList
            showsHorizontalScrollIndicator={false}
            style={{marginTop: 20, marginLeft: 20}}
            data={data.similarTV}
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
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    mainBg: {
      backgroundColor: '#18181B',
      height: '100%',
    }
  })

export default TVid