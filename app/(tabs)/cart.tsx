import CheckoutSection from '@/components/CheckoutSection';
import ConfirmationModal from '@/components/ConfirmationModal';
import { ShoppingData } from '@/data/ShoppingData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from 'expo-checkbox';
import { router } from 'expo-router';
import { ChevronLeft, Minus, Plus, ShoppingCart, X } from 'lucide-react-native';
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

	const [cartData, setCartData] = useState<CartItem[]>([]);
	const [cartItems, setCartItems] = useState<CheckoutItem[]>();
	const [addedToCheckout, setAddedToCheckout] = useState<CheckoutItem[]>([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [showCheckout, setShowCheckout] = useState(false);
	const [confirmationContent, setConfirmationContent] = useState('');
	const [removeItemId, setRemoveItemId] = useState(-1);
	const [showCheckoutModal, setShowCheckoutModal] = useState(false);
	const [showSuccessModal, setShowSuccessModal] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				const cart = await AsyncStorage.getItem('cart');
				const parsedCart: CartItem[] = JSON.parse(cart || '[]');
				setCartData(parsedCart);

				const filteredItems = [...ShoppingData]
					.filter(item => parsedCart.some(c => c.id === item.id))
					.map(item => {
						const found = parsedCart.find(c => c.id === item.id);
						return { ...item, amount: found?.amount || 1 };
					});
				setCartItems(filteredItems);
			} catch (error) {
				console.error('Error loading cart:', error);
			}
		})();
	}, []);

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

	const handleRemoveItem = (id: number) => {
		setRemoveItemId(id);
		setConfirmationContent('Are you sure you want to remove this item from your cart?')
	}

	const removeItemFromCart = async (value: boolean) => {
		if (value) {
			try {
				const newCart = cartData.filter(item => item.id !== removeItemId);
				await AsyncStorage.setItem('cart', JSON.stringify(newCart));
				setCartData(newCart);
				setCartItems(prevItems => prevItems.filter(item => item.id !== removeItemId));
			} catch (error) {
				console.error('Error removing item:', error);
			}
		}
		setRemoveItemId(-1);
		setConfirmationContent('');
	};

	const handleSetCheckout = (item: {id: number, name: string, amount: number, price: number}, isChecked: boolean) => {
		if (isChecked) {
			setAddedToCheckout([...addedToCheckout, {id: item.id, name: item.name,  amount: item.amount, price: item.price}]);
		} else {
			setAddedToCheckout(addedToCheckout.filter(ch => ch.id !== item.id));
		}
	} 

	const handleCheckout = (value: boolean) => {
		if (value) {
			setShowCheckoutModal(true);
		} else {
			confirmCheckout(false);
		}
	}

	const confirmCheckout = async (value: boolean) => {
		if (value) {
			try {
				const remainingCart = cartData.filter(cartItem => !addedToCheckout.some(checkoutItem => checkoutItem.id === cartItem.id));

				await AsyncStorage.setItem('cart', JSON.stringify(remainingCart));
				setCartData(remainingCart);
				setCartItems(cartItems.filter(item => remainingCart.some(r => r.id === item.id)));

				setAddedToCheckout([]);
				setShowSuccessModal(true);
			} catch (error) {
				console.error('Error confirming checkout:', error);
			}
		}

		setShowCheckoutModal(false);
		setShowCheckout(!showCheckout);
	};


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
				<View className='bg-blue p-4 items-center flex-row justify-between'>
					<Text className='font-semibold text-lg text-white text-left'>
						Your Cart
					</Text>

					<TouchableOpacity onPress={() => router.push('/')} className='p-1 flex-row gap-1'>
						<ChevronLeft size={20} className='text-white'/>
						<Text className='text-white'>Back to Home</Text>
					</TouchableOpacity>
				</View>

				<View className='rounded-md mt-4 p-2'>
					{cartData.length > 0 ?
					<FlatList data={cartItems} keyExtractor={({id}) => id.toString()} renderItem={({item}) => 
						<View className='bg-white p-4 mb-4 rounded-md flex-row items-center'>
							<View className='flex-col justify-between h-full py-1'>
								<TouchableOpacity onPress={() => handleRemoveItem(item.id)} className='flex-row gap-1 items-center mr-4 rounded-full text-red-400'><X width={16} /></TouchableOpacity>
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
					/> :
					<View className='h-80 w-full justify-center items-center gap-2'>
						<ShoppingCart className='text-black/50' size={40} />
						<Text className='text-text/75 font-semibold text-lg'>Cart is empty</Text>
					</View>
					}
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

			<CheckoutSection checkoutItems={addedToCheckout} onShow={showCheckout} onConfirm={(value: boolean) => handleCheckout(value)} />

			{confirmationContent &&
				<ConfirmationModal content={confirmationContent} onConfirm={(value) => removeItemFromCart(value)}/>
			}

			{showCheckoutModal &&
				<ConfirmationModal content="Proceed to Checkout?" onConfirm={(value) => confirmCheckout(value)}/>
			}

			{showSuccessModal && 
				<SuccessModal />
			}
		</View>
	)
}

export default cart