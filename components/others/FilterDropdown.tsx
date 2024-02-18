import React, { useState } from 'react';
import { MultiSelect } from 'react-native-element-dropdown';
import { useAppTheme } from '../shared/appTheme';
import { StyleSheet } from 'react-native';

const MultiSelectDropdown = ({ data, placeholder, selected, setSelected }: any) => {
    const theme = useAppTheme('', '')
    return (
        <MultiSelect
            style={styles.dropdown}
            placeholderStyle={[styles.placeholderStyle, { color: theme.gray }]}
            selectedTextStyle={styles.selectedTextStyle}
            data={data}
            labelField="label"
            valueField="value"
            placeholder={placeholder}
            value={selected}
            onChange={setSelected}
            selectedStyle={styles.selectedStyle}
            itemTextStyle={{ color: theme.gray }}
        />
    );
};

export default MultiSelectDropdown;

const styles = StyleSheet.create({
    container: { padding: 16 },
    dropdown: {
        height: 30,
        width: 120,
        backgroundColor: 'transparent',
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#000'
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    icon: {
        marginRight: 5,
    },
    selectedStyle: {
        borderRadius: 12,
    },
});