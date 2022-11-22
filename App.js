import React, { useState, useReducer } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, TextInput } from 'react-native';


const ACTIONS = {
  ADD_TODO: 'add-todo',
  TOGGLE_TODO: 'toggle-todo',
  DELETE_TODO: 'delete-todo',
}


function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)]
    case ACTIONS.TOGGLE_TODO:
      return todos.map(todo => {
        if (todo.id === action.payload.id) { return { ...todo, complete: !todo.complete } }
        return todo;
      })
    case ACTIONS.DELETE_TODO:
      return todos.filter(todo => todo.id !== action.payload.id)
    default:
      return todos;
  }

}

function newTodo(name) {
  return { id: Date.now(), name: name, complete: false }
}


export default function App() {
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


const Todo = ({ todo, dispatch }) => {
  return (
    <>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={todo.complete ? { color: 'grey' } : { color: 'black' }}> {todo.name} </ Text>
        <Button title='toggle' style={styles.button} onPress={() => dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id } })} />
        <Button title='delete' style={styles.button} onPress={() => {
          console.log('delete ' + todo.id)
          dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id } })
        }} />
      </TouchableOpacity>
    </>
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
