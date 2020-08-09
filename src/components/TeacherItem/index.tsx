import React, { useState } from 'react'
import { View, Image, Text, Linking } from 'react-native'; // Linking is used for deep liking to other applications
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';


import styles from './styles'
import api from '../../services/api';

// Como voce usa obj teacher, typeScript pede para declarar o tipo atŕavés da interface. Teacher é usado na TeacherList, por isso exportamos
export interface Teacher {
    id: number;
    subject: string;
    cost: number;
    user_id: number;
    name: string;
    avatar: string;
    whatsapp: string;
    bio: string;
}

interface TeacherItemProps {
    teacher: Teacher;
    favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ( { teacher, favorited } ) => {
    // You have to use state whenvener the user can change anything
    const [isFavorited, setIsFavorited] = useState(favorited) // initial value is: favorited

    function handleLinkToWhatsapp() {

        api.post('connection', {
            user_id: teacher.id
        })

        // Linking is used for deep liking to other applications
        Linking.openURL(`whatsapp://send?text=Hello World!&phone=${teacher.whatsapp}`);
    };

    async function handleToggleFavorite(){
        const favorites = await AsyncStorage.getItem('favorites');
        let favoritesArray = []; // to handle the fact that initially the array will be empty

        if (favorites){
            favoritesArray = JSON.parse(favorites);
        }

        if (isFavorited){
            // Remover dos favoritos

            // Achar index do item que queremos remover
            const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
                return teacherItem.id === teacher.id;
            });

            favoritesArray.splice(favoriteIndex, 1);
            
            setIsFavorited(false);

        } else {
            // Adicionar aos favoritos
            
            favoritesArray.push(teacher);

            setIsFavorited(true);

        }

        // Save result
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
        
    }

    return (
        <View style={styles.container} >

            <View style={styles.profile} >

                <Image 
                    style={styles.avatar} 
                    source={ { uri: teacher.avatar } } 
                />

                <View style={styles.profileInfo}>

                    <Text style={styles.name} >{teacher.name}</Text>
                    <Text style={styles.subject} >{teacher.subject}</Text>

                </View>

            </View>

            <Text style={styles.bio}>{teacher.bio}</Text>
            
            <View style={styles.footer} >

                <Text style={styles.price}>
                    Preço/hora {'   '}
                    <Text style={styles.priceValue} >R$ {teacher.cost}</Text>
                </Text>

                <View style={styles.buttonsContainer} > 

                    <RectButton 
                        onPress={handleToggleFavorite}
                        style={[
                            styles.favoriteButton,
                            isFavorited ? styles.favorited : {} // Style is only set when Favorited
                            ]}>

                        { isFavorited
                            ?  <Image source={heartOutlineIcon} />
                            : <Image source={unfavoriteIcon} />
                        }

                    </RectButton>

                    <RectButton onPress={handleLinkToWhatsapp} style={styles.contactButton}>
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>


                </View>

            </View>
            
        </View>
    );

}

export default TeacherItem;