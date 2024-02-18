import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Text, TextInput, Button } from "react-native-paper";
import { useAppTheme } from "../shared/appTheme";
import { useAppDispatch, useAppSelector } from "../shared/hooks";
import { updateSearchValue } from "../shared/redxSlice";
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMugSaucer, faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons'
import { AirbnbRating } from 'react-native-ratings';


export const CardUI = React.memo(({ image, title, desc, id, onAddToFavorites, isFavorite, onToggleFavorite, onToggleWishlist, isWishlist }: any) => {
    const [rating, setRating] = useState<any>(0);

    const handleRating = (rating: any) => {
        setRating(rating);
    };

    const theme = useAppTheme()
    const heartIconColor = isFavorite ? 'red' : 'rgba(255, 255, 255, 0.5)';
    const wishlistColor = isWishlist ? 'blue' : 'rgba(255, 255, 255, 0.5)';

    return (
        <Card style={{ marginBottom: 10 }} >
            <TouchableOpacity onPress={() => onToggleFavorite(id)} style={styles.heartIconContainer}>
                <FontAwesomeIcon icon={faHeart} style={[styles.heartIcon, { color: heartIconColor } as any]} />
            </TouchableOpacity>
            <Card.Cover source={{ uri: image, }} />
            <Card.Content style={{ backgroundColor: theme.appBackground, paddingTop: 10 }}>
                <Text variant="titleLarge" style={{ color: theme.inverseBlack }}>{title}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text variant="bodyMedium" style={{ color: theme.gray }}>Released on : </Text>
                        <Text variant="bodyMedium" style={{ color: theme.gray }}>{desc}</Text>
                    </View>
                    <TouchableOpacity onPress={() => onToggleWishlist(id)} style={styles.heartIconContainer}>
                        <FontAwesomeIcon icon={faBookmark} style={{ color: theme.gray, padding: 10 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: -30 }}>
                    <AirbnbRating
                        count={5}
                        reviews={['', '', '', '', '']}
                        defaultRating={0}
                        size={15}
                        onFinishRating={handleRating}
                    />
                </View>

            </Card.Content>
        </Card>
    )
})

const styles = StyleSheet.create({
    cardContainer: {
        marginBottom: 10,
    },
    heartIconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
    heartIcon: {
        color: 'rgba(255, 255, 255, 0.5)',
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    descContainer: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    descText: {
        fontSize: 14,
    },
    ratingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -30,
    },
});

export const SearchBox = React.memo((props: any) => {
    // const [searchValue, setSearchValue] = React.useState<string>('')
    const theme = useAppTheme()
    const dispatch = useAppDispatch()
    const searchValue = useAppSelector(state => state.main.searchValue)



    return (
        <View style={{ marginBottom: 10 }}>
            <TextInput
                label="Search movies..."
                value={searchValue}
                editable={props.editable == undefined}
                onPressIn={() => props.onPress?.()}
                onChangeText={text => dispatch(updateSearchValue(text))}
                contentStyle={{ backgroundColor: theme.appBackground, color: theme.gray }}
                onSubmitEditing={() => props.onSubmitEditing()}
            />
        </View>
    )
})