import * as React from 'react';
import { Text, View, useColorScheme } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTab from './tabs/HomeTab';
import FavoriteTab from './tabs/Favorite';
import SettingsTab from './tabs/SettingsTab';
import WishlistTab from './tabs/Wishlist';
import { storage_handler_init } from './shared/storagehandler';
import { useAppDispatch } from './shared/hooks';
import { setColorMode } from './shared/redxSlice';
import { useAppTheme } from './shared/appTheme';

import { faHome, faHeart, faBookmark, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const Tab = createBottomTabNavigator();

const Home = React.memo(() => {
    const deviceMode = useColorScheme()
    const dispatch = useAppDispatch()
    const theme = useAppTheme()

    const handleSetColorMode = React.useCallback(() => {
        storage_handler_init.getItem(storage_handler_init._app_color_mode)
            .then(data => {
                if (data == null) {
                    dispatch(setColorMode(deviceMode ?? 'light'))
                } else {
                    dispatch(setColorMode(JSON.parse(data).mode))
                }
            })
    }, [])

    React.useLayoutEffect(() => {
        handleSetColorMode()
    }, [])


    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: {
                backgroundColor: theme.appBackground
            },
            headerStyle: {
                backgroundColor: theme.appBackground,
            },
            headerTitleStyle: {
                color: theme.inverseBlack
            }

        }}>
            <Tab.Screen name="Home" component={HomeTab}
                options={{
                    tabBarIcon: (props) => <FontAwesomeIcon icon={faHome} style={{ width: 20, height: 20, color: theme.gray }} />,
                    headerTitle: 'Movies'
                }}
            />
            <Tab.Screen name="Favorite" component={FavoriteTab}
                options={{
                    headerTitle: 'Favorites',
                    tabBarIcon: (props) => <FontAwesomeIcon icon={faHeart} style={{ width: 20, height: 20, color: theme.gray }} />,
                }}
            />
            <Tab.Screen name="Wishlist" component={WishlistTab}
                options={{
                    headerTitle: 'Wishlist',
                    tabBarIcon: (props) => <FontAwesomeIcon icon={faBookmark} style={{ width: 20, height: 20, color: theme.gray }} />,
                }}
            />
            <Tab.Screen name="Profile" component={SettingsTab}
                options={{
                    tabBarIcon: (props) => <FontAwesomeIcon icon={faUser} style={{ width: 20, height: 20, color: theme.gray }} />,
                }}
            />
        </Tab.Navigator>
    );
})

export default Home