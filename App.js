import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, FlatList, Text, View, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [idsearch, seIdsearch] = useState('');
  const [name, setName] = useState('');
  const [userName, setuserName] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [data, setData] = useState([]);

  /* const getUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  } */

  /* const getUsersById = async (id) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${idsearch}`);
      const json = await response.json();
      setData(json);
      //Chequear si encuentra el id
      if(json.name != null){
        setName(json.name); //actualizar el estado name 
        setuserName(json.username); //Actualizar el estado username
      }else {
        alert("Identificación No existe ... Inténtelo con otro")
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  } */

  const getClientes = async () => {
    try {
      const url = `http://172.16.62.220:3000/api/clientes`;
      const response = await axios.get(url);
      setData(response.data)

    }
    catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  };

  const getClientePorId = async (id) => {
    try {
      const url = `http://172.16.62.220:3000/api/clientes/${id}`;
      const response = await axios.get(url);
      //setData(response.data)
      setNombre(response.data.nombre);
      setApellidos(response.data.apellidos);
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  };

  const saveCliente = async () => {
    if (!nombre.trim() || !apellidos.trim()) {
      alert("Nombre y apellidos inválido (s)");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`http://172.16.62.220:3000/api/clientes`, {
        nombre,
        apellidos,
      });
      alert("Cliente agregado correctamente ...")
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false);
    }
  };

  const updateCliente = async (id) => {
    if (!nombre.trim() || !apellidos.trim()) {
      alert("Nombre y apellidos inválido (s)");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.put(`http://172.16.62.220:3000/api/clientes/${id}`, {
        nombre,
        apellidos,
      });
      alert("Cliente actualizado correctamente ...")
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false);
    }
  };

  const deleteCliente = async (id) => {
    try {
      if (confirm("¿Está seguro de borrar este cliente?")) {
        const response = await axios.delete(`http://172.16.62.220:3000/api/clientes/${id}`, {
          nombre,
          apellidos,
        });
        alert("Cliente eliminado exitosamente ...")
      }
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    //getUsers(); //Al cargar el componente por primera vez 
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <TouchableOpacity
        style={[styles.buttons, { backgroundColor: '#DC2D94' }]}
        onPress={getClientes}
      >
        <Text style={{ color: 'white', fontSize: 20 }}>Listado de Clientes</Text>
      </TouchableOpacity>
      <View>
        <Text>Clientes</Text>
        <TextInput
          placeholder='Ingrese id a buscar'
          style={[styles.inputs]}
          onChangeText={idsearch => seIdsearch(idsearch)}
          value={idsearch}
        >
        </TextInput>
        <TextInput
          style={[styles.inputs]}
          value={nombre}
          onChangeText={nombre => setNombre(nombre)}
        >
        </TextInput>
        <TextInput
          style={[styles.inputs]}
          value={apellidos}
          onChangeText={apellidos => setApellidos(apellidos)}
        >
        </TextInput>
      </View>
      <TouchableOpacity
        style={[styles.buttons, { backgroundColor: '#CC0099' }]}
        onPress={() => saveCliente()}
      >
        <Text style={{ color: 'white', fontSize: 20 }}>Guardar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttons, { backgroundColor: '#CC0099' }]}
        onPress={() => updateCliente(idsearch)}
      >
        <Text style={{ color: 'white', fontSize: 20 }}>Actualizar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttons, { backgroundColor: '#CC0099' }]}
        onPress={() => deleteCliente(idsearch)}
      >
        <Text style={{ color: 'white', fontSize: 20 }}>Eliminar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttons, { backgroundColor: '#DC2E94' }]}
        onPress={() => getClientePorId(idsearch)}
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
                alert(item.nombre)
              }}
            >
              <Text style={{ color: 'white' }}>{item._id} - {item.nombre} - {item.apellidos}</Text>
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
