import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { CheckBox } from "react-native-elements";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
  };

  const saveEdit = (index, newText) => {
    const updatedTodos = [...todos];
    updatedTodos[index].text = newText;
    setTodos(updatedTodos);
    setEditingIndex(null);
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Enter") {
      if (index !== undefined) {
        saveEdit(index, todos[index].text);
      } else {
        addTodo();
      }
    }
  };

  const renderTodoItem = ({ item, index }) => (
    <View style={styles.todoItem}>
      <CheckBox
        checked={item.completed}
        onPress={() => toggleTodo(index)}
        containerStyle={styles.checkbox}
      />
      {editingIndex === index ? (
        <TextInput
          style={styles.editInput}
          value={item.text}
          onChangeText={(text) => {
            const updatedTodos = [...todos];
            updatedTodos[index].text = text;
            setTodos(updatedTodos);
          }}
          onBlur={() => saveEdit(index, item.text)}
          onSubmitEditing={() => saveEdit(index, item.text)}
          autoFocus
        />
      ) : (
        <TouchableOpacity
          onPress={() => startEditing(index)}
          style={styles.todoTextContainer}
        >
          <Text
            style={[styles.todoText, item.completed && styles.completedTodo]}
          >
            {item.text}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTodo}
          onChangeText={setNewTodo}
          placeholder="Add a new todo"
          onSubmitEditing={addTodo}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    padding: 0,
    margin: 0,
    marginRight: 10,
  },
  todoTextContainer: {
    flex: 1,
  },
  todoText: {
    fontSize: 16,
  },
  completedTodo: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  editInput: {
    flex: 1,
    borderWidth: 0,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
});

export default TodoList;
