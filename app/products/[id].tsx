import Toast from '@/components/Toast';
import { ShoppingData } from '@/data/ShoppingData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, ShoppingCart, StarIcon } from 'lucide-react-native';
import React, { useState } from 'react';
import { Dimensions, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const Product = () => {
    
    const [descriptionExpanded, setDescriptionExpanded] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const screenWidth = Dimensions.get('window').width

    const { id } = useLocalSearchParams();

    const product: any = ShoppingData.find(prod => prod.id?.toLocaleString() == id);
    const features: any = Object.entries(product?.features?? {}).map(([label, value]) => ({id: label, label, value}))
    
    const addToCart = async () => {
        try {
            const data = await AsyncStorage.getItem('cart');
            let cartData: number[] = JSON.parse(data || '[]');

            const strId = Array.isArray(id) ? id[0] : id;
            const numId = Number.parseInt(strId);

            if (cartData.includes(numId)) {
                handleSetToastMessage('Product is already in the cart');
                return;
            }

            const newCart = [...cartData, numId];
            await AsyncStorage.setItem('cart', JSON.stringify(newCart));

            handleSetToastMessage('Item has been added to cart');
        } catch (error) {
            console.error('Error adding to cart:', error);
            handleSetToastMessage('Failed to add item to cart');
        }
    };

    const handleSetToastMessage = (message: string) => {
        setToastMessage(message);
    }

    return (
        <View className='flex-1 bg-black/10'>
            <TouchableOpacity onPress={() => router.push('/')} className='flex-row gap-2 items-center absolute z-10 bg-white p-2 rounded-xl aspect-square top-2 left-2 border border-black/50'>
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
                        {product?.discount ? 
                            <View className='flex-col items-end px-2 py-1 rounded-lg border border-gray-300 shadow-black/15'>
                                <Text className='font-bold text-black text-xl items-center'>
                                    ₱ {Number(product.price + product.price * product.discount).toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                </Text>
                                <Text className='font-semiboldbold text-black text-md line-through'>
                                    {Number(product.price).toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                </Text>
                            </View> :
                            <Text className='font-bold text-black text-xl px-2 py-1 rounded-lg border border-gray-300 shadow-black/15'>
                                ₱ {Number(product.price).toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                            </Text>
                        }
                        <View className='flex-row gap-2 items-center mt-2'>
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
                {/* <TouchableOpacity className='p-4 bg-gray-50 rounded-md shadow-md' onPress={addToCart}>
                </TouchableOpacity> */}

                <TouchableOpacity className='ml-auto p-4 bg-dark rounded-md items-center justify-center flex-row gap-2' onPress={addToCart}>
                    <ShoppingCart size={28} className='text-white' />
                    <Text className='text-white font-semibold text-xl'>
                        Add to Cart
                    </Text>
                </TouchableOpacity>
            </View>

            <View className='absolute top-2 right-2 z-10'>
                {(toastMessage) &&
                    <Toast message={toastMessage} onClose={() => handleSetToastMessage('')}/>
                }
            </View>
        </View>
    )
}

export default Product