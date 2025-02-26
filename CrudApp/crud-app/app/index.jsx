import { 
  View, 
  Text, 
  FlatList, 
  TextInput, 
  Pressable, 
  StyleSheet 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';  
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState,useContext, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { data } from '@/data/todos';
import{inter_500Medium, useFonts} from '@expo-google-fonts/inter';
import Animated,{LinearTransition} from 'react-native-reanimated';
import AsyncStorage
 from '@react-native-async-storage/async-storage';
import { Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
export default function Index() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  const addTodo = () => {
    if (text.trim()) {
      const newId = todos.length > 0 ? todos[0].id + 1 : 1;
      setTodos([{ id: newId, title: text, completed: false }, ...todos]);
      setText('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handlePress = (id) => {
    router.push(`/todos/${id}`);
  }
  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Pressable
          onPress={() => toggleTodo(item.id)}
          onLongPress={() => handlePress(item.id)}>
        <Text
          style={[styles.todoText, item.completed && styles.completedText]}
          
        >
          {item.title}
        </Text>
      </Pressable>
      
      <Pressable onPress={() => deleteTodo(item.id)}>
        <MaterialCommunityIcons name="delete-circle" size={36} color="red" selectable={undefined}/>
      </Pressable>
    </View>
  );

 const{colorScheme,setColorScheme,theme}=useContext(ThemeContext)
 console.log('data:', data);
 console.log('todos:', todos);
 console.log('ThemeContext:', useContext(ThemeContext));
 
  const [loaded,error] =useFonts({
    inter_500Medium,
  })

  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        /* AsyncStorage est une API de stockage local (clé-valeur) asynchrone de React Native.*/

        const jsonValue = await AsyncStorage.getItem('TodoApp')
        const storatgedTodos = jsonValue != null ? JSON.parse(jsonValue) : null;
        if (storatgedTodos && storatgedTodos.length) {
          setTodos(storatgedTodos.sort((a, b) => b.id - a.id));
      } 
      else{
        setTodos(data.sort((a, b) => b.id - a.id));
      }
    }
      catch (e) {
        console.error('Error fetching data:', e);
      }
    }

    fetchData()
  }, [data])
    

  useEffect(() => {
    const storeData = async () => {
        try {
            const jsonValue = JSON.stringify(todos);
            await AsyncStorage.setItem('TodoApp', jsonValue);
        } catch (e) {
            console.error('Error storing data:', e);
        }
    };

    // Exécuter uniquement lorsque 'todos' change
    if (todos) {
        storeData();
    }
}, [todos]);

  if(!loaded && !error){
    return null
  }

  const styles = createStyles(theme,colorScheme);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ajouter une tâche"
          placeholderTextColor="#aaa"
          value={text}
          onChangeText={setText}
        />
        <Pressable onPress={addTodo} style={styles.addButton}>
          <Text style={styles.addButtonText}>Ajouter</Text>
        </Pressable>
        <Pressable onPress={() => setColorScheme(colorScheme === 'light' ? 'dark' : 'light')} style={{marginLeft: 10}}>
          {colorScheme === 'dark'
          ?<Octicons name="moon" size={36} color={theme.text}
          selectable={undefined} style={{width: 36}}/>
          :<Octicons name="sun" size={36} color={theme.text}
          selectable={undefined} style={{width: 36}}/>}
        </Pressable>
      </View>

      <Animated.FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={todo => todo.id.toString()}
        contentContainerStyle={styles.todoList}
        itemLayoutAnimation={LinearTransition}
        keyboardDismissMode="on-drag"
      />

      <StatusBar style={colorScheme==='dark' ? 'light' : 'dark'}></StatusBar>
    </SafeAreaView>
  );
}
function createStyles(theme,colorScheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingTop: 50,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    input: {
      flex: 1,
      color: theme.text,
      backgroundColor: '#fff',
      padding: 15,
      borderRadius: 8,
      borderColor: '#ddd',
      borderWidth: 1,
      marginRight: 10,
      fontSize: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
      fontFamily : 'inter_500Medium',
    },
    addButton: {
      backgroundColor: theme.button,
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    addButtonText: {
      color: colorScheme === 'dark' ? 'black' : 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
    todoList: {
      paddingHorizontal: 20,
    },
    todoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      padding: 15,
      borderRadius: 8,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    todoText: {
      flex: 1,
      fontSize: 16,
      color: theme.text,
      fontFamily : 'inter_500Medium',
    },
    completedText: {
      textDecorationLine: 'line-through',
      color: '#aaa',
    },
  
  });
}

