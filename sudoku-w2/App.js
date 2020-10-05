import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, Dimensions, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
// import axios from 'axios'

export default function App() {
  const [board, setBoard] = useState([])

  useEffect(() => {
    fetch('https://sugoku.herokuapp.com/board?difficulty=hard')
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
        alert(result.status)
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
        alert('Sudoku Solved!')
      })
  }

  return (
    <View style={styles.container}>
      <Text>Sudoku Board</Text>
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
      <Pressable>
        <Button onPress={checkSolved} title="Submit"></Button>
        <Text></Text>
        <Button onPress={solve} title="Solve"></Button>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const cellWidth = Dimensions.get('window').width / 10

function boardStyle(board, indexRow, indexCol) {
  let style = {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    width: cellWidth,
    height: cellWidth,
    textAlign: 'center'
  }

  if(board[indexRow][indexCol] !== 0){
    style.backgroundColor = 'pink'
  }
  if (indexRow % 3 === 0) {
    style.borderTopWidth = 5,
    style.borderTopColor = 'red'
  }
  if (indexCol % 3 === 0) {
    style.borderLeftWidth = 5,
    style.borderLeftColor = 'red'
  }
  if (indexRow === 8) {
    style.borderBottomWidth = 5,
    style.borderBottomColor = 'red'
  }
  if (indexCol === 8) {
    style.borderRightWidth = 5,
    style.borderRightColor = 'red'
  }
  return style
}
