import React, {useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import DialogInput from 'react-native-dialog-input'

export default function HomeScreen({ navigation }) {
    const [isDialogVisible, setIsDialogVisible] = useState(false)
    const [level, setLevel] = useState('')

    function startGame(name, level) {
        navigation.navigate('Game', {
            name, level
        })
    }

    function setLevelAndCallDialog(levelChoose) {
        setIsDialogVisible(true)
        setLevel(levelChoose)
    }

    function submitDialog(inputText, level) {
        startGame(inputText, level)
        setIsDialogVisible(false)
    }

    return (
        <>
            <DialogInput 
                isDialogVisible={isDialogVisible}
                title={"Input Your Name First"}
                message={"e.g John Doe"}
                hintInput ={"Your Name Here.."}
                submitInput={(inputText) => {submitDialog(inputText, level)}}
                closeDialog={ () => {setIsDialogVisible(false)}}>
            </DialogInput>

            <View style={style.container}>
                <Text />
                <Image style={style.welcome} source={require('../assets/welcome3.png')} />
                <Image style={style.logo} source={require('../assets/logo.png')} />
                <Image style={style.level} source={require('../assets/level3.png')} />
                <View>
                    <TouchableOpacity style={style.button} onPress={() => {setLevelAndCallDialog('easy')}}>
                        <Text>Easy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.button} onPress={() => {setLevelAndCallDialog('medium')}}>
                        <Text>Medium</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.button} onPress={() => {setLevelAndCallDialog('hard')}}>
                        <Text>Hard</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#90EE90'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#FFDF00',
        marginTop: 10,
        padding: 10
    },
    logo: {
        width: 300,
        height: 300,
        marginBottom: 20
    },
    welcome: {
        height: 150,
        width: 300,
        marginBottom: 15,
        marginTop: 40
    },
    level: {
        width: 150,
        height: 30,
        marginBottom: 10
    }
})