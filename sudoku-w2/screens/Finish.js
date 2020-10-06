import React from 'react'
import {View, Text, Button, StyleSheet, Pressable, Image} from 'react-native'

export default function FinishScreen( {navigation, route} ) {
    const {name, level} = route.params
    return (
        <View style={style.container}>
            <Image style={{width: 400, height: 280, marginTop: 25}} source={{uri: 'http://pngimg.com/uploads/confetti/confetti_PNG87045.png'}} />
            <Text style={style.text}>Congratulations {name}!</Text>
            <View style={style.popper}>
                <Image style={{width: 100, height: 100}} source={require('../assets/popper.png')}></Image>
                <Image style={{width: 100, height: 100, marginLeft: 190}} source={require('../assets/popper.png')}></Image>
            </View>
            <Pressable style={{marginTop: 180}}>
                <Button onPress={() => navigation.navigate('Home', {name, level})} title="Back To Home"/>
                <Text />
                <Button onPress={() => navigation.navigate('Game')} title="Play Again" />
            </Pressable>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFF33'
    },
    popper: {
        flexDirection: 'row'
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 30
    }
})

