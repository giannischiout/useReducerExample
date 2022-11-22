import React, { useState, useReducer } from 'react';
import { StyleSheet, View, TouchableOpacity, Button, TextInput } from 'react-native';
import { Todo } from './Todo';
import { ACTIONS } from './reducer/actions';
import { reducer } from './reducer/reducer';



export default function TodoIndex() {
  const [todos, dispatch] = useReducer(reducer, [])
  const [name, setName] = useState('')

  const handleSubmit = () => {
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } })
  }

  const onChangeName = name => setName(name)



  return (
    <View style={styles.container}>
      <TextInput onChangeText={onChangeName} value={name} style={styles.input} />
      <TouchableOpacity>
        <Button title='Add to do' onPress={handleSubmit}></Button>
      </TouchableOpacity>
      <View>
        {todos.map(todo => {
          return <Todo key={todo.id} todo={todo} dispatch={dispatch} />
        })}
      </View>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignContent: 'center',
    width: 300,
  },
  button: {
    margin: 10,
  }
});

