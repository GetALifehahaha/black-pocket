import { X } from 'lucide-react-native';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const Filter = ({onShow, onChangeShow, onChangeSort}: any) => {

    const [priceActive, setPriceActive] = useState(false);
    const [ratingActive, setRatingActive] = useState(false);
    const [ascendingActive, setAscendingActive] = useState(false);
    const [descendingActive, setDescendingActive] = useState(false);

    const setActiveFilter = (filter: String) => {
        if (filter == "price") {
            setPriceActive(!priceActive);
            setRatingActive(false);
        } else if (filter == "rating") {
            setRatingActive(!ratingActive);
            setPriceActive(false)
        }
    }

    const setOrderFilter = (order: String) => {
        if (!priceActive || !ratingActive) {
            setAscendingActive(false);
            setDescendingActive(false);
        }

        if (order == "ascending") {
            setAscendingActive(true);
            setDescendingActive(false);
        } else if (order == "descending") {
            setDescendingActive(true);
            setAscendingActive(false);
        }
    }
    
    const clearFilter = () => {
        setAscendingActive(false);
        setDescendingActive(false);
        setPriceActive(false);
        setRatingActive(false);

        onChangeSort({sort: '', order: ''});
    }

    const applyFilter = () => {
        let params = {sort: '', order: ''};

        if (!priceActive && !ratingActive) return;

        params.sort = priceActive ? 'price' : 'rating'
        params.order = ascendingActive ? 'ascending' : 'descending'

        onChangeSort(params)
    }

    if (onShow) {
        return (
            <View className='absolute h-fit w-full bg-main right-0 top-0 px-4 py-8 border-b border-gray-600'>
                <View className='flex-row items-center justify-between'>
                    <Text className='text-black/50 font-semibold text-lg'>Filter</Text>
                    <TouchableOpacity onPress={onChangeShow}>
                        <X className='text-black/50'/>
                    </TouchableOpacity>
                </View>

                <View className='flex-col p-4 mt-4 gap-4 rounded-sm bg-white shadow-md shadow-gray-300'>
                    <View className='flex-row items-center gap-2'>
                        <Text className='text-black/50'>Sort by:</Text>
                        <TouchableOpacity className={`px-2 py-0.5 rounded-md border ${priceActive ? 'border-dark bg-dark' : 'border-gray-300'}`} onPress={() => setActiveFilter("price")}><Text className={priceActive ? 'text-white' : 'text-black'}>Price</Text></TouchableOpacity>
                        <TouchableOpacity className={`px-2 py-0.5 rounded-md border ${ratingActive ? 'border-dark bg-dark' : 'border-gray-300'}`} onPress={() => setActiveFilter("rating")}><Text className={ratingActive ? 'text-white' : 'text-black'}>Rating</Text></TouchableOpacity>
                    </View>

                    <View className='flex-row items-center gap-2'>
                        <Text className='text-black/50'>Order by:</Text>
                        <TouchableOpacity className={`px-2 py-0.5 rounded-md border ${ascendingActive ? 'border-dark bg-dark' : 'border-gray-300'}`} onPress={() => setOrderFilter("ascending")}><Text className={ascendingActive ? 'text-white' : 'text-black'}>Ascending</Text></TouchableOpacity>
                        <TouchableOpacity className={`px-2 py-0.5 rounded-md border ${descendingActive ? 'border-dark bg-dark' : 'border-gray-300'}`} onPress={() => setOrderFilter("descending")}><Text className={descendingActive ? 'text-white' : 'text-black'}>Descending</Text></TouchableOpacity>
                    </View>
                </View>

                <View className='flex-row gap-2 items-center mt-2 p-4 rounded-sm bg-white shadow-gray-300 shadow-md justify-end'>
                    <TouchableOpacity onPress={clearFilter} className='border border-gray-300 px-2 py-1 rounded-md'><Text className='text-black/50 font-semidbold'>Clear</Text></TouchableOpacity>
                    <TouchableOpacity onPress={applyFilter} className='border border-dark bg-dark px-2 py-1 rounded-md'><Text className='text-white font-semibold'>Apply Filter</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Filter