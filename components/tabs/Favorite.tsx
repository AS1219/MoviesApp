import { View, Text } from 'react-native'
import React from 'react'
import { FlashList } from '@shopify/flash-list'
import { CardUI } from '../others/Reusables'
import { useAppSelector } from '../shared/hooks'
import { useAppTheme } from '../shared/appTheme'
import { IMAGE_URL } from '../shared/constants'

const FavoriteTab = () => {
    const favoriteMovies = useAppSelector((state: any) => state.main.favoriteMovies);
    const theme = useAppTheme('', '')
    return (
        <View style={{ flex: 1, backgroundColor: theme.appBackground, marginTop: 0 }}>
            <FlashList
                data={favoriteMovies}
                renderItem={({ item }: { item: any }) =>
                    <CardUI
                        image={IMAGE_URL + item.backdrop_path}
                        movie_id={item.id}
                        title={item.title}
                        desc={item.release_date}
                        isFavorite={favoriteMovies.some((movie: any) => movie.id === item.id)}
                    />}
                estimatedItemSize={200}
                onEndReachedThreshold={0}
                // @ts-ignore
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{ paddingHorizontal: 10 }}
            />
        </View>
    )
}

export default FavoriteTab