import { ShoppingData } from '@/data/ShoppingData';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const Product = () => {
    const { id } = useLocalSearchParams();

    const product = ShoppingData.find(prod => prod.id.toLocaleString() == id);

    return (
        <View>
            <Text>{product?.name}</Text>
        </View>
    )
}

export default Product