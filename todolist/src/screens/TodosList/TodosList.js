import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image , Modal, TextInput, KeyboardAvoidingView} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
export const TodosList = () => {

    const [data, setData] = useState([{id:1, title: 'Task 1', active:false}]);
    const [isModalVisible, setisModalVisible] = useState(false);
    const [title, setTitle] = useState('');

    const renderItem = ({item,index}) => {
        return (
            <View style={styles.TaskItem}>
                <CheckBox disabled={false} value={item.active} onValueChange={(newValue) => setToggleCheckBox(newValue,index)}/>
                <Text style={styles.SubTitle, 
                {textDecorationLine: item.active ? 'line-through' : 'none'}}>{item.title}</Text>
            </View>
        );
    };

    const openModal = () => {
        setisModalVisible(true);
    };

    const saveTitle = () => {
        let newArr = [...data];
        newArr.push({id:newArr.length+1, title:title, active:false});
        setData(newArr);
    };

    const setToggleCheckBox = (value,index) => {
        let newArr = [...data];
        newArr[index].active = !newArr[index].active;
        setData(newArr);
    };

    return (
        <View style = {styles.container}>
            <SafeAreaView style={styles.contentContainer, {flex:1}}>
                <Text style = {styles.title}>Todos</Text>
                <FlatList data={data} renderItem={renderItem} />
                <TouchableOpacity style={styles.AddBtnWrapper} onPress={openModal}> 
                    <Image style = {styles.addIcon} source={require('./images/add.jpg')} />
                </TouchableOpacity>
            </SafeAreaView>
            <Modal transparent={true} visible={isModalVisible}>
                <View style={styles.modalContentWrapper}>
                    <TouchableOpacity style={styles.closeBtnWrapper} onPress={() => setisModalVisible(false)}>
                        <Image styles={styles.closeIcon} source={require('./images/cross.png')} />
                    </TouchableOpacity>
                    <View style={styles.inputWrapper}>
                        <KeyboardAvoidingView behaviour="padding">
                            <TextInput style={styles.textInput} 
                                placeholder={'Enter task to be done'} 
                                onChangeText={(text) => setTitle(text)}/>
                        </KeyboardAvoidingView>
                        <TouchableOpacity style={styles.btnWrapper} onPress={saveTitle}>
                            <Text style={{textAlign: 'center'}}>SAVE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles =  StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    contentContainer: {
        display: 'flex',
    },

    addIcon: {
        width: 50,
        height: 50,
    },

    AddBtnWrapper: {
        alignItems: 'center',
    },

    modalContentWrapper: {
        height: '50%',
        marginTop: 'auto',
        backgroundColor: 'green',
        padding: 15,
    },

    closeIcon: {
        width: 5,
        height: 5,
    },

    closeBtnWrapper: {
        alignItems: 'flex-end',
    },

    inputWrapper: {
        marginTop: 60,
    },

    textInput: {
        padding: 15,
        backgroundColor: 'white',
        fontSize: 20,
    },

    btnWrapper: {
        backgroundColor: 'white',
        marginTop: 30,
        padding: 15,
    },

    TaskItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        padding: 15,
    },

    SubTitle: {
        fontSize: 20,
        marginLeft: 15,
    }
});