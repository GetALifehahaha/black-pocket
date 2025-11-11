import { useRouter } from 'expo-router';
import { Search } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ShoppingData } from '../../data/ShoppingData';

const CategoryButtons = ({active, text, onClick}: any) => {
  if (active) return (
    <TouchableOpacity onPress={onClick} className='bg-blue px-4 py-2 rounded-md mr-2'>
      <Text className='text-white/75 font-semibold'>{text}</Text>
    </TouchableOpacity>
  )

  return (
    <TouchableOpacity onPress={onClick} className='bg-dark px-4 py-2 rounded-md mr-2'>
      <Text className='text-white/75 font-semibold'>{text}</Text>
    </TouchableOpacity>
  )
}

export default function Shop() {
  const router = useRouter();
  
  const [activeCategory, setActiveCategory] = useState('');
  const categories = ["Rifles", "Sniper Rifles", "Secondary", "SMG", "LMG", "Utilities", "Attachments", "Knife"]
  const shoppingData = activeCategory ? ShoppingData.filter((item) => (item.category == activeCategory.toLowerCase())) : ShoppingData

  const handleSetCategory = (value: any) => {
    if (value == activeCategory) setActiveCategory('');
    else setActiveCategory(value);
  }

  return (
    <View className="flex-1 bg-gray-100 p-4">
      	{/* Header */}
		<ScrollView showsVerticalScrollIndicator={false}>
		<View className='flex-row justify-between items-center shadow-md shadow-black/20 rounded-md px-2 bg-white'>
			<Text className='font-semibold text-xl text-dark'>
			Black Pocket
			</Text>

			<TouchableOpacity className='shadow-md shadow-dark/10 p-2 rounded-sm w-fit'>
				<Search className='text-dark/75' />
			</TouchableOpacity>
		</View>

		{/* Promotions */}
		<View className='h-60 overflow-hidden rounded-xl mt-12 shadow-md shadow-black/20 bg-white'>
			<ImageBackground source={require('../../assets/images/eminem-sponsor.jpg')} resizeMode='cover' style={{
				height: 160,
				width: "100%",
			}}>
			<Text className='bg-black/2 backdrop-blur-sm h-full w-32 font-bold text-2xl p-2 items-center'>
				Absolute illegal!
			</Text>
			</ImageBackground>
			<Text className='text-center font-semibold text-md mt-2'>
			One of the best I've ever used! - Eminem
			</Text>
		</View>

		<Text className='font-semibold text-black/50 mt-8 text-2xl mb-2'>
			Categories
		</Text>
		
		<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
			<FlatList 
			horizontal
			showsHorizontalScrollIndicator={false}
			data={categories}
			keyExtractor={(item, index) => index.toString()}
			renderItem={({item}) => (
				<CategoryButtons active={item == activeCategory} text={item} onClick={() => handleSetCategory(item)} />
			)}
			/>
		</ScrollView>

		{shoppingData.length > 0 ?
		<FlatList
		className='mt-4'
		numColumns={2}
		data={shoppingData}
		keyExtractor={(item, index) => index.toString()}
		columnWrapperStyle={{
			justifyContent: "space-between",
			marginBottom: 20,
		}}
		renderItem={({item}) => 
			<View className='bg-white rounded-xl overflow-hidden shadow-md shadow-black/20'>
				<TouchableOpacity onPress={() => router.push(`/products/${item.id}`)} className='flex-1 flex-col'>
					<Image source={item.imagePath} resizeMode='cover' style={{
					width: 185, 
					height: 200,
					}}/>
					<View className='px-2 flex-1 flex-col gap-4'>
						<Text numberOfLines={2} className='text-lg font-semibold mt-4 w-40'>{item.name}</Text>

						<Text className='p-2 font-medium rounded-md shadow-md shadow-black/20 mb-2 mt-auto'>
							₱ {item.price}
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		}
		/>
		:
		<Text className='mt-8 text-center font-semibold text-black/50'>No product found, sarge.</Text>
		}

		</ScrollView>
    </View>
  );
}
