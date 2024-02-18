import React from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";
import { useAppTheme } from "../shared/appTheme";
import { Switch } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../shared/hooks";
import { storage_handler_init } from "../shared/storagehandler";
import { TThemeMode } from "../shared/types";
import { setColorMode, setUserDetails } from "../shared/redxSlice";
import { useNavigation } from "@react-navigation/native";

const SettingsTab = React.memo((props) => {
    const [switchedOn, setSwitchedOn] = React.useState<boolean>(false)
    const theme = useAppTheme('', '')
    const colorMode = useAppSelector(state => state.main.colorMode) as TThemeMode
    const dispatch = useAppDispatch()
    const navigation = useNavigation();

    const handleUpdateThemeMode = React.useCallback((value: boolean) => {
        setSwitchedOn(value)
        const newColorMode = colorMode == 'light' ? 'dark' : 'light'
        storage_handler_init.setItem(storage_handler_init._app_color_mode, JSON.stringify({ mode: newColorMode }))
        dispatch(setColorMode(newColorMode))
    }, [colorMode])

    const handleLogout = () => {
        dispatch(setUserDetails(null));
        navigation.navigate("Login"); // Replace "Login" with your login screen route name
    };

    return (
        <View style={{ flex: 1, backgroundColor: theme.appBackground, padding: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ marginRight: 10, color: theme.inverseBlack }}>Dark mode</Text>
                <Switch value={colorMode == 'dark'} onValueChange={handleUpdateThemeMode} />
            </View>
            <TouchableOpacity onPress={handleLogout} style={{ alignSelf: 'center', width: 100, height: 30, backgroundColor: '#00f', justifyContent: 'center' }}>
                <Text style={{ alignSelf: 'center', justifyContent: 'center' }}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
})

export default SettingsTab