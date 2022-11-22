import { StyleSheet, Text, TouchableOpacity, Button } from 'react-native';
import { ACTIONS } from './reducer/actions';

export const Todo = ({ todo, dispatch }) => {
  return (
    <>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={todo.complete ? { color: 'grey' } : { color: 'black' }}> {todo.name} </ Text>
        <Button
          title='toggle'
          style={styles.button}
          onPress={() => dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id } })} />
        <Button
          title='delete'
          style={styles.button}
          onPress={() => dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id } })} />
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
