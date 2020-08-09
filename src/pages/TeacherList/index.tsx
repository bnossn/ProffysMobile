import React, { useState, FormEvent } from 'react';
import { View, ScrollView, Text, TextInput, AsyncStorage } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'
import api from '../../services/api';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import asycStorage from '@react-native-community/async-storage' // Store things in the device


import PageHeader from '../../components/PageHeader';


import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';



function TeacherList(){
    const [teachers, setTeachers] = useState([]);

    // We'll save only the IDs of the favorite teachers.
    // We had to define the type of favorites (Numeric Array). Otherwise there is an error when calling TeacherItem
    const [favorites, setFavorites] = useState<number[]> ([]); 
    const [ istFiltersVisible, setistFiltersVisible ] = useState(false);

    const [ subject, setSubject ] = useState('');
    const [ week_day, setweek_day ] = useState('');
    const [ time, setTime ] = useState('');

    function loadFavorites() {

        // asycStorage stores data as String. Lets use Json
        asycStorage.getItem('favorites').then(response => {

            if (response) {
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                });

                setFavorites(favoritedTeachersIds); 
            }

        });

    }

    function handleToggleFiltersVisible(){
        setistFiltersVisible(!istFiltersVisible);
    }

    async function handleFiltersSubmit() {
        loadFavorites();

        /* Ao inves de usar promise com .then(), também podemos usar o 
        async/await deste modo */
        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });

        setistFiltersVisible(false);
        setTeachers(response.data);
        // console.log(response.data)
        
    }

    return (
        <View style={styles.container}>


            <PageHeader 
                title='Proffys Disponíveis' 
                headerRight={
                    <BorderlessButton onPress={handleToggleFiltersVisible} >
                        <Feather name='filter' size={20} color='#FFF'/>
                    </BorderlessButton>
                } 
            >

                { istFiltersVisible && (

                    <View style={styles.searchForm} >

                        <Text style={styles.label}>Matéria</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="Qual a matéria?"
                            placeholderTextColor='#c1bccc'
                            value={subject}
                            onChangeText={ (text) => setSubject(text) }
                        />


                        <View style={styles.inputGrounp}>
                            
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput 
                                    style={styles.input}
                                    placeholder='Qual o dia?'
                                    placeholderTextColor='#c1bccc'
                                    value={week_day}
                                    onChangeText={ (text) => setweek_day(text) }
                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label} >Horário</Text>
                                <TextInput 
                                    style={styles.input}
                                    placeholder='Qual Horário'
                                    placeholderTextColor='#c1bccc'
                                    value={time}
                                    onChangeText={ (text) => setTime(text) }
                                />
                            </View>

                        </View>

                        <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                        
                    </View>

                )}
            </PageHeader>

            <ScrollView
            style={styles.teacherList}
            contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 16,
            }}
            > 
                {teachers.map( (teacher: Teacher) =>  {
                    return (
                        <TeacherItem 
                            key={teacher.id} 
                            teacher={teacher} 
                            favorited={favorites.includes(teacher.id)}
                        />
                    )
                })}

            </ScrollView>


        </View>
    )
}


export default TeacherList;
