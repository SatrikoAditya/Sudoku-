import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, Dimensions, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';

export default function GameScreen({navigation : {navigate}, route}) {
  const [board, setBoard] = useState([])
  const [automaticSolve, setAutomaticSolve] = useState(false)
  const {name, level} = route.params

  useEffect(() => {
    fetch(`https://sugoku.herokuapp.com/board?difficulty=${level}`)
    .then((r) => r.json())
    .then((data) => {
      setBoard(data.board)
    })
  }, [])

  function handleInput(value, rowIdx, colIdx) {
    let copyBoard = [...board]
    copyBoard[rowIdx][colIdx] = Number(value)
    setBoard(copyBoard)
  }

  function checkSolved() {
    const data = {board}

    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')
    const encodeParams = (params) => 
      Object.keys(params)
      .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
      .join('&');

    fetch('https://sugoku.herokuapp.com/validate', {
      method: 'POST',
      body: encodeParams(data),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(res => res.json())
      .then(result => {
        if(!automaticSolve) {
            result.status === 'solved' ? navigate('Finish', {name, level}) : alert('unfortunately the answer is still wrong ☹️')
        } else {
            alert(`sorry you can't submit the answer because you completed it automatically, Please back to home!`)
        }
      })
  }

  function solve() {
    const data = {board}

    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')
    const encodeParams = (params) => 
      Object.keys(params)
      .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
      .join('&');

    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      body: encodeParams(data),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(res => res.json())
      .then(result => {
        setBoard(result.solution)
        setAutomaticSolve(true)
        alert('Sudoku Solved!')
      })
  }

  let editBoard = [...board]
  for(let i = 0; i < editBoard.length; i++) {
      for(let j = 0; j < editBoard[i].length; j++) {
          if(editBoard[i][j] === 0) {
              editBoard[i][j] = ' '
          }
      }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome {name}! </Text>
      <StatusBar style="auto" />
      <View style={{marginBottom: 20, marginTop: 10}}>
        {
          board && board.map((rowArr, rowIdx) => {
            return (
              <View style={{flexDirection: "row"}} key={rowIdx}>
                {
                  rowArr.map((colCell, colIdx) => {
                    return (
                      <TextInput 
                        style={boardStyle(board, rowIdx, colIdx)}
                        value={String(colCell)}
                        keyboardType='number-pad'
                        onChangeText={(val) => handleInput(val, rowIdx, colIdx)}
                        key={colIdx}
                        // editable={disabledInput(board, rowIdx, colIdx)}
                        >
                      </TextInput>
                    )
                  })
                }
              </View>
            )
          })
        }
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={styles.button} onPress={checkSolved}>
            <Text style={styles.textButton}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{alignItems: 'center', backgroundColor: '#00BFFF', marginTop: 30, padding: 15, marginLeft: 20}} onPress={solve}>
            <Text style={styles.textButton}>Solve</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFDFD3',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
      fontSize: 30,
      fontWeight: 'bold',
      fontFamily: 'notoserif',
      marginBottom: 30
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#00BFFF',
    marginTop: 30,
    padding: 15
  },
  textButton: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'notoserif'
  }
  
});

const cellWidth = Dimensions.get('window').width / 10

function boardStyle(board, rowIdx, colIdx) {
  let style = {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    width: cellWidth,
    height: cellWidth,
    textAlign: 'center',
    color: 'black'
  }

  if(board[rowIdx][colIdx] !== 0 && board[rowIdx][colIdx] !== ' '){
    style.backgroundColor = 'pink'
  }
  if (rowIdx % 3 === 0) {
    style.borderTopWidth = 5,
    style.borderTopColor = 'red'
  }
  if (colIdx % 3 === 0) {
    style.borderLeftWidth = 5,
    style.borderLeftColor = 'red'
  }
  if (rowIdx === 8) {
    style.borderBottomWidth = 5,
    style.borderBottomColor = 'red'
  }
  if (colIdx === 8) {
    style.borderRightWidth = 5,
    style.borderRightColor = 'red'
  }
  return style
}

// function disabledInput(board, rowIdx, colIdx) {
//     if(board[rowIdx][colIdx] === ' ') {
//         return true
//     } else {
//         return false
//     }
// }