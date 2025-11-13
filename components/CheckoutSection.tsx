import { X } from 'lucide-react-native';
import React, { memo, useEffect, useState } from 'react';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface CheckoutItem {
  id: number;
  name: string;
  price: number;
  amount: number;
}

const CheckoutSection = memo(({checkoutItems ,onShow=true, onConfirm}: {checkoutItems: CheckoutItem[], onShow: boolean, onConfirm: (value: boolean) => void}) => {
	
	const [netTotal, setNetTotal] = useState(0);

	const handleConfirm = (value: boolean) => {
		onConfirm(value)
	}

	useEffect(() => {
		setNetTotal(() => {
			let price = 0;
			
			checkoutItems.forEach((item) => price += item.price)

			return price;
		})
	}, [checkoutItems])

	if (onShow) return (
    <View className='absolute bottom-0 left-0 w-full h-4/5 bg-white p-4 border-t-2 border-t-gray-300'>
      <View className='flex-row items-center justify-between'>
		<Text className='text-lg font-semibold text-black/75'>
			Checkout Section
		</Text>
		<TouchableOpacity className='p-1 rounded-md bg-dark' onPress={() => handleConfirm(false)}>
			<X size={18} className='text-white' />
		</TouchableOpacity>
	  </View>

	  <View className='mt-6 h-4/5'>
	  	<Text className='text-black/50 font-medium mb-0.5'>Items</Text>
		<ScrollView>
			<FlatList data={checkoutItems} keyExtractor={item => item.id.toString()} 
			renderItem={({item}) =>
				<View className='p-2 mb-4 rounded-md bg-white border border-gray-300'>
					<Text className='font-medium'>{item.name}</Text>
					<View className='ml-auto flex-row items-center'>
						<Text className='p-2 aspect-square rounded-sm text-black/50'>{item.amount}x</Text>
						<Text className='font-bold text-black/75'>₱ {Number(item.price).toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</Text>
					</View>
					<Text className='text-blue font-semibold ml-auto p-1 rounded-sm border border-gray-300'>₱ {Number(item.price * item.amount).toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</Text>
				</View>
			}/>
		</ScrollView>
	  </View>

	  <View className='border-t border-gray-500'>
		<View className='flex-row gap-2 items-center ml-auto my-2'>
			<Text className='text-black/50 font-semibold'>Net Total:</Text>
			<Text className='text-blue font-bold text-lg'>₱ {Number(netTotal).toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</Text>
		</View>
		<TouchableOpacity onPress={() => handleConfirm(true)} className='p-2 w-full bg-blue rounded-lg'>
			<Text className='text-center font-semibold text-white text-lg'>Proceed to Checkout</Text>
		</TouchableOpacity>
	  </View>
    </View>
  )
});

export default CheckoutSection