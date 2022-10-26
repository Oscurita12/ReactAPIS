import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, FlatList, Text, View, TouchableOpacity, TextInput } from 'react-native';

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [idsearch, seIdsearch] = useState('');
  const [name, setName] = useState('');
  const [userName, setuserName] = useState('');
  const [data, setData] = useState([]);

  const getUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const getUsersById = async (id) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users${id}`);
      const json = await response.json();
      setData(json);
      //Chequear si encuentra el id
      if(json.name != null){
        setName(json.name);
        setuserName(json.username)
      }else {
        alert("Identificación No existe ... Inténtelo con otro")
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    //getUsers(); //Al cargar el componente por primera vez 
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <TouchableOpacity
        style={[styles.buttons, { backgroundColor: '#DC2D94' }]}
        onPress={getUsers}
      >
        <Text style={{ color: 'white', fontSize: 20 }}>Listado de Usuarios</Text>
      </TouchableOpacity>
      <View>
        <Text>Usuarios</Text>
        <TextInput
          placeholder='Ingrese id a buscar'
          style={[styles.inputs]}
          onChangeText={idsearch => seIdsearch(idsearch)}
          value={idsearch}
        >
        </TextInput>
        <TextInput
          style={[styles.inputs]}
          value={name}
        >
        </TextInput>
        <TextInput
          style={[styles.inputs]}
          value={userName}
        >
        </TextInput>
      </View>
      <TouchableOpacity
        style={[styles.buttons, { backgroundColor: '#DC2E94' }]}
        onPress={getUsersById}
      >
        <Text style={{ color: 'white', fontSize: 20 }}>Buscar</Text>
      </TouchableOpacity>
      {isLoading ? <ActivityIndicator size="large" color="#DE79EE" /> : (
        <FlatList
          data={data}

          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.buttons, { backgroundColor: '#DE79EE'/* , borderRadius:10,padding: 10, alignItems:'center', marginTop: 10 */ }]}
              onPress={() => {
                alert(item.email)
              }}
            >
              <Text style={{ color: 'white' }}>{item.name}, {item.username}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginTop: 10
  },
  inputs: {
    borderRadius: 8,
    textAlign: 'center',
    height: 50,
    width: 250,
    borderWidth: 2,
    borderColor: '#C12BDC',
    marginTop: 5
  }
});
