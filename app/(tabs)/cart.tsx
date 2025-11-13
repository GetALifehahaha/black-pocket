import CheckoutSection from '@/components/CheckoutSection';
import { ShoppingData } from '@/data/ShoppingData';
import Checkbox from 'expo-checkbox';
import { Minus, Plus, X } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface CartItem {
	id: number;
	amount: number;
}

interface CheckoutItem {
  id: number;
  name: string;
  price: number;
  amount: number;
}

const cart = () => {

	const cart = localStorage.getItem('cart');
	const cartData: CartItem[] = JSON.parse(cart || "[]")
	const [cartItems, setCartItems] = useState([...ShoppingData].filter(item => cartData.includes(item.id)).map(item => ({ ...item, amount: 1 })));
	const [addedToCheckout, setAddedToCheckout] = useState<CheckoutItem[]>([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [showCheckout, setShowCheckout] = useState(false);

	const changeItemAmount = (id: any, method: any) => {
		setCartItems(item => {
			let items = [...item];

			items.forEach(item => {if (item.id == id) {
				if (method == "minus" && item.amount - 1 == 0) return items;

				item.amount += (method == "plus") ? 1 : -1
			}});

			return items;
		})
	}

	const removeItemFromCart = (id: number) => {
		const newCart = cartData.filter(item => item != id);

		setCartItems([...cartItems].filter(item => cartData.includes(item.id)).map(item => ({ ...item, amount: 1 })));

		localStorage.setItem('cart', JSON.stringify(newCart));
	};

	const handleSetCheckout = (item: {id: number, name: string, amount: number, price: number}, isChecked: boolean) => {
		if (isChecked) {
			setAddedToCheckout([...addedToCheckout, {id: item.id, name: item.name,  amount: item.amount, price: item.price}]);
		} else {
			setAddedToCheckout(addedToCheckout.filter(ch => ch.id !== item.id));
		}
	} 

	const confirmCheckout = (value: boolean) => {
		if (value) {
			const remainingCart = cartData.filter(cartItem => !addedToCheckout.some(checkoutItem => checkoutItem.id === cartItem));

			localStorage.setItem("cart", JSON.stringify(remainingCart));

			setCartItems([...cartItems].filter(item => remainingCart.includes(item.id)))

			setAddedToCheckout([]);
		}

		setShowCheckout(!showCheckout);
	}

	useEffect(() => {
		setCartItems(ShoppingData.filter(item => cartData.includes(item.id)).map(item => ({ ...item, amount: 1 })))
	}, [])

	useEffect(() => {
		let price = 0;
		addedToCheckout.forEach(item => {
			price += item.price * item.amount
		})
		setTotalPrice(price)
	}, [addedToCheckout])

	return (
		<View className='flex-1 bg-gray-200'>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Text className='font-semibold text-lg text-white text-left bg-blue p-4'>
					Your Cart
				</Text>	

				<View className='rounded-md mt-4 p-2'>
					<FlatList data={cartItems} keyExtractor={({id}) => id.toString()} renderItem={({item}) => 
						<View className='bg-white p-4 mb-4 rounded-md flex-row items-center'>
							<View className='flex-col justify-between h-full py-1'>
								<TouchableOpacity onPress={() => removeItemFromCart(item.id)} className='flex-row gap-1 items-center mr-4 rounded-full text-red-400'><X width={16} /></TouchableOpacity>
								<Checkbox value={addedToCheckout.some(ch => ch.id == item.id)} onValueChange={(isChecked) => handleSetCheckout({id: item.id, name: item.name, amount: item.amount, price: item.discount ? item.price * item.discount : item.price}, isChecked)} color={"#219FE3"} />
							</View>
							<Image source={item.imagePath} resizeMode='cover' style={{height: 85, width: 85}} className='mr-4 rounded-md'/>
							<View className='flex-1'>
								<Text className='mb-2 truncate'>{item.name}</Text>
								<View className='flex-row justify-between items-center'>
									<View className='flex-row gap-2 items-center ml-auto'>
										<TouchableOpacity onPress={() => changeItemAmount(item.id, "minus")} className='p-1 rounded-sm border border-gray-300 aspect-square'><Minus width={18} /></TouchableOpacity>
										<Text className='py-1 px-2.5 rounded-sm border border-dark bg-dark aspect-square text-white'>{item.amount}</Text>
										<TouchableOpacity onPress={() => changeItemAmount(item.id, "plus")} className='p-1 rounded-sm border border-gray-300 aspect-square'><Plus width={18} /></TouchableOpacity>
									</View>
								</View>
								<Text className='text-blue font-semibold text-md mt-4'>₱ {Number(item.discount ? item.price * item.discount : item.price).toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</Text>
							</View>
						</View>} 
					/>
				</View>
			</ScrollView>

			<View className='p-4 bg-white border-t border-t-gray-300'>
				<View className='flex-row gap-2 items-start ml-auto'>
					<View className='items-end flex-col'>
						<Text className='text-dark font-medium'>Total</Text>
						<Text className='text-blue font-semibold text-lg'>₱{Number(totalPrice).toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</Text>
					</View>
					<TouchableOpacity onPress={() => {if (addedToCheckout.length > 0) setShowCheckout(!showCheckout)}} className='px-4 py-2 rounded-md bg-blue'><Text className='font-semibold text-lg text-white'>Check Out ({addedToCheckout.length})</Text></TouchableOpacity>
				</View>
			</View>

			<CheckoutSection checkoutItems={addedToCheckout} onShow={showCheckout} onConfirm={(value: boolean) => confirmCheckout(value)} />
		</View>
	)
}

export default cart