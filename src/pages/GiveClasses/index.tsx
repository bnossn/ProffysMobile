import React from 'react'
import { Text, View, ImageBackground } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import giveClassesbgImage from '../../assets/images/give-classes-background.png'

import styles from './styles';
import { useNavigation } from '@react-navigation/native';


function GiveClasses() {
    const navigation = useNavigation();

    function handleNavigateGoBack() {
        navigation.goBack();
    }


    return (
        <View style={styles.container}>

            <ImageBackground 
                resizeMode='contain' 
                source={giveClassesbgImage} 
                style={styles.content} 
            >

                <Text style={styles.title}>
                    Quer ser um Proffy?
                </Text>

                <Text style={styles.description}>
                    Para começar, você precisa se cadastrar como professor na nossa plataforma web.
                </Text>

            </ImageBackground>

            <RectButton onPress={handleNavigateGoBack} style={styles.okButton}>
                <Text style={styles.okButtonText}>Tudo Bem!</Text>              
            </RectButton>

        </View>
    )
}

export default GiveClasses;