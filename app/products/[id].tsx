import { ShoppingData } from '@/data/ShoppingData';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { ChevronLeft, ShoppingCart, StarIcon } from 'lucide-react-native';
import React, { useState } from 'react';
import { Dimensions, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const Product = () => {
    
    const [descriptionExpanded, setDescriptionExpanded] = useState(false);

    const screenWidth = Dimensions.get('window').width
    const navigate = useNavigation();

    const { id } = useLocalSearchParams();

    const product: any = ShoppingData.find(prod => prod.id?.toLocaleString() == id);
    const features: any = Object.entries(product?.features?? {}).map(([label, value]) => ({id: label, label, value}))
    
    const addToCart = () => {

        const data = localStorage.getItem('cart');
        let cartData = JSON.parse(data) || [];

        const strId = Array.isArray(id) ? id[0] : id;
        const numId = Number.parseInt(strId);

        if (cartData.includes(numId)) {
            console.log("Product is already in the cart");
            return;
        }

        const newCart = [...cartData, numId];
        localStorage.setItem('cart', JSON.stringify(newCart));
        console.log("Item has been added to cart");
    }

    return (
        <View className='flex-1 bg-black/10'>
            <TouchableOpacity onPress={() => navigate.goBack()} className='flex-row gap-2 items-center absolute z-10 bg-white p-2 rounded-xl aspect-square top-2 left-2 border border-black/50'>
                <ChevronLeft size={28} />
            </TouchableOpacity>
            <ScrollView className='relative' contentContainerStyle={{ paddingBottom: 120 }}>
                <Image source={product?.imagePath} style={{
                    width: screenWidth,
                    height: 600
                }} /> 

                <View className='flex-row p-4 justify-between bg-white shadow-md shadow-black/20'>
                    <Text numberOfLines={3} className='font-semibold w-64 text-xl'>
                        {product?.name}
                    </Text>
                    <View className='flex-col justify-between items-end'>
                        <Text className='font-bold text-black text-xl px-2 py-1 rounded-lg shadow-md shadow-black/15'>
                            ₱ {product?.price}
                        </Text>
                        <View className='flex-row gap-2 items-center'>
                            <Text className='font-semibold text-black/50 text-xl'>
                                {product?.ratings}
                            </Text>
                            <StarIcon size={16} className='ml-auto text-yellow-500'/>
                        </View>
                    </View>
                </View>

                <View className='p-4 bg-main mt-2'>
                    <Text className='text-black/50 font-semibold text-sm'>
                        Description
                    </Text>

                    <Text numberOfLines={(descriptionExpanded ? undefined : 3 )} className='p-2 font-base text-lg'>
                        {product?.description}
                    </Text>
                    <TouchableOpacity className='ml-auto' onPress={() => setDescriptionExpanded(!descriptionExpanded)}><Text className='semibold text-md'>{descriptionExpanded ? 'Read Less' : 'Read More'}</Text></TouchableOpacity>
                </View>

                <View className='p-4 bg-main mt-2'>
                    <Text className='text-black/50 font-semibold text-sm'>
                        Features
                    </Text>

                    <Text className='p-2 text-lg'>
                        {product &&

                            <FlatList data={features} renderItem={({item}) => <View className='flex-row gap-2'>
                                <Text className='font-base text-black/75'>{item.label}:</Text>
                                <Text className='font-semibold'>{item.value}</Text>
                            </View>} />
                        }
                    </Text>
                </View>

                <View className='p-4 bg-main mt-2'>
                    <Text className='text-black/50 font-semibold text-sm'>
                        Condition
                    </Text>

                    <Text className='p-2 font-base text-lg'>
                        {product?.condition}
                    </Text>
                </View>
            </ScrollView>

            <View className='absolute bottom-0 w-full flex-row p-2 gap-2 z-100'> 
                <TouchableOpacity className='p-4 bg-gray-50 rounded-md shadow-md' onPress={addToCart}>
                    <ShoppingCart size={28} className='text-black/75' />
                </TouchableOpacity>

                <TouchableOpacity className='p-4 bg-dark rounded-md flex-1 items-center justify-center'>
                    <Text className='text-white font-bold text-xl'>
                        Buy Now
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Product