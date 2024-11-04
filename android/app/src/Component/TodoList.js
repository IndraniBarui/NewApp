import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity,Text, View, FlatList,Image } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import FallBack from '../screen/FallBack';


const TodoList = () => {

 const [todo,setTodo] = useState("")   
  const [list, setlist] = useState([])  
  const [editList,setEditList]=useState(null)
const handleAdd =()=>{
    setlist([...list, {id: Date.now().toString(), title:todo}])
    setTodo("")
}
const handleDeiete =(id)=>{
    const updatelist = list.filter((todo)=>todo.id !==id)
    setlist(updatelist)

}

const handleEdit =(todo)=>{
    setEditList(todo)
    setTodo(todo.title)
}

const handleEditSave =()=>{
    const updateList = list.map((item)=>{
    if(item.id === editList.id){
        return {...item, title:todo}
    }
    return item
    })
    setlist(updateList)
    setEditList(null)
    setTodo("")
}
const todosRender =({item,index})=>{
return(
    <View style={{backgroundColor:"#6fdbf7",
        paddingHorizontal:16,
        paddingVertical:12,
        borderRadius:4,
        marginTop:10,
        flexDirection:"row",
       alignItems:"center"
    }}>
        {/* <IconButton icon="pencil"/>
        <IconButton icon="trash-can"/> */}
       
        <Text style={{color:"#fff", fontSize:20, fontWeight:"800" , flex: 1}}>{item.title}</Text>
        <Icon name="leftcircle" size={30} color="#fff"
        onPress={()=>handleEdit(item)}/>
        <Icon name="pencil" size={30} color="#fff" 
        onPress={()=>handleDeiete(item.id)}
        />
        {/* <Image source={require('../Assets/DeleR.webp')}
         onPress={()=>handleDeiete(item.id)}/> */}
    </View>
)
}

   
    return (
        <View style={{marginHorizontal:16,
          
            marginVertical: 10,
        }}>
            <TextInput
            style={{borderWidth: 2,
                borderColor:"blue",
                borderRadius:6,
                paddingHorizontal:16,
                paddingVertical:12,
                marginTop:18
               
            }}
            placeholder='add a text'
            value={todo}
            onChangeText={(handleText)=>setTodo(handleText)}
            >

            </TextInput>
            {editList ? (
                <TouchableOpacity style={{backgroundColor:'#000',
                paddingHorizontal: 16,
                paddingVertical:8,
           borderRadius:6,
            marginTop:24,
                alignItems:"center"
            }}
            onPress={handleEditSave}
            >
                <Text style={{color:"#fff",
                    fontWeight:"bold",
                    fontSize:20
                }}>Save</Text>
            </TouchableOpacity>
            ):(
                <TouchableOpacity style={{backgroundColor:'#000',
                    paddingHorizontal: 16,
                    paddingVertical:8,
               borderRadius:6,
                marginTop:24,
                    alignItems:"center"
                }}
                onPress={handleAdd}
                >
                    <Text style={{color:"#fff",
                        fontWeight:"bold",
                        fontSize:20
                    }}>Add</Text>
                </TouchableOpacity>
            )}
            
            <FlatList data={list} renderItem={todosRender}/>
            {
                list.length <=0 && <FallBack/>
            }
           <TouchableOpacity style={{backgroundColor:'#000',
                    paddingHorizontal: 16,
                    paddingVertical:8,
               borderRadius:6,
                marginTop:24,
                    alignItems:"center"
                }}
                onPress={handleAdd}
                >
                    <Text style={{color:"#fff",
                        fontWeight:"bold",
                        fontSize:20
                    }}>Go</Text>
                </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({})

export default TodoList;
