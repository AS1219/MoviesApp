import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './shared/store';
import { setUserDetails } from './shared/redxSlice';
import { TUserDetails } from './shared/types';
import { useNavigation } from '@react-navigation/native';


const Login = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const userDetails = useSelector((state: RootState) => state.main.userDetails);

    useEffect(() => {
        GoogleSignin.configure()
    }, []);


    const googleLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const scopes = userInfo?.scopes ?? [];
            const userDetails: TUserDetails = {
                idToken: userInfo.idToken,
                scopes,
                serverAuthCode: userInfo.serverAuthCode,
                user: userInfo.user,
            };
            dispatch(setUserDetails(userDetails));
            console.log("user info", userDetails);
            if (userInfo) {
                navigation.navigate('HomeScreen');
            }
        } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log(error)
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log(error)
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log(error)
            } else {
                console.log(error)
            }
        }
    };

    useEffect(() => {
        if (userDetails) {
            navigation.navigate('HomeScreen');
        }
    }, [userDetails, navigation]);

    return (
        <View style={styles.container}>
            <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}>Login</Text>
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={googleLogin}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Login;