import {View, Text, Pressable, ScrollView} from 'react-native';
import React, {useState} from 'react';

const Home = () => {
  const [data, setData] = useState([]);

  const handleClick = async () => {
    try {
      const response = await fetch(
        'https://dummy.restapiexample.com/api/v1/employees',
      );
      const result = await response.json();
      setData(result);
      console.log(data);
    } catch (err) {}
  };

  return (
    <>
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 10,
          flexDirection: 'row',
          allignItems: 'center',
          gap: 12,
        }}>
        <Pressable
          style={{
            backgroundColor: 'blue',
            paddingHorizontal: 15,
            paddingVertical: 8,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={handleClick}>
          <Text style={{color: 'white', textAllign: 'center'}}>All</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: 'blue',
            paddingHorizontal: 15,
            paddingVertical: 8,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={handleClick}>
          <Text style={{color: 'white', textAllign: 'center'}}>Work</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: 'blue',
            paddingHorizontal: 15,
            paddingVertical: 8,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', textAllign: 'center'}}>Personal</Text>
        </Pressable>
      </View>

      {data && (
        <ScrollView 
          style={{
            marginTop: 20,
            padding: 10,
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 5,
          }}>
          {/* <Text>{JSON.stringify(data, null, 2)}</Text> */}
          {/* {data.map((employee) => (
            <Text key={employee.id} style={styles.dataText}>
              {employee.employee_name}
            </Text>
          ))} */}
        </ScrollView >
      )}
    </>
  );
};

export default Home;
