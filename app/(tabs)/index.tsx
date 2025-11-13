import Footer from '@/components/Footer';
import { useRouter } from 'expo-router';
import { SearchIcon, ShoppingCart, SlidersHorizontal, StarIcon, X } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Filter from '../../components/Filter';
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
  const screenWidth = Dimensions.get('window').width;
  const categories = ["Rifles", "Sniper Rifles", "Secondary", "SMG", "LMG", "Utilities", "Attachments", "Knife"]
  
  const [activeCategory, setActiveCategory] = useState('');
  const [search, setSearch]: any = useState('');
  const [shoppingData, setShoppingData]: any = useState(ShoppingData);
  const [sortType, setSortType] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const [showFilter, setShowFilter]: any = useState(false);

  const handleSetCategory = (value: any) => {
    if (value == activeCategory) setActiveCategory('');
    else setActiveCategory(value);
  }

  const handleSetSort = (params: any) => {
	setSortType(params.sort);
	setSortOrder(params.order);

	setShowFilter(!showFilter)
  }

  useEffect(() => {
	let currentData = [...ShoppingData];

	if (activeCategory) {
		currentData = currentData.filter((item) => item.category === activeCategory.toLowerCase());
	}

	if (search) {
		currentData = currentData.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
	}

	if (sortType === "price") {
		currentData = [...currentData].sort((a, b) => sortOrder === "ascending" ? a.price - b.price : b.price - a.price);
	} else if (sortType === "rating") {
		currentData = [...currentData].sort((a, b) => sortOrder === "ascending" ? a.ratings - b.ratings : b.ratings - a.ratings);
	}

	setShoppingData(currentData);
  }, [activeCategory, search, sortType, sortOrder]);

  const capitalize = (str: String) => str[0].toUpperCase() + str.slice(1);

  return (
    <View className="flex-1 bg-gray-100">
      	{/* Header */}
		<ScrollView showsVerticalScrollIndicator={false}>
			<View className='bg-blue p-2'>
				<View className='flex-row items-start justify-between px-2 py-4'>
					<Text className='font-semibold text-lg text-white text-center'>
					Explore
					</Text>

					<TouchableOpacity onPress={() => router.push('/cart')} className='p-1'><ShoppingCart size={20} className='text-white'/></TouchableOpacity>
				</View>

				<View className='p-2 rounded-lg border border-black/20 bg-white flex-row items-center gap-2'>
					<SearchIcon width={18} className='text-black/50'/>
					<TextInput value={search} onChangeText={(text) => setSearch(text)} className='focus:outline-none border-white border focus:border-b-dark/50 w-full px-2 py-1' placeholder='Search for a weapon...' />
					<TouchableOpacity onPress={() => setShowFilter(!showFilter)} className='p-1 rounded-md bg-dark aspect-square'>
						<SlidersHorizontal width={18} className='text-white' />
					</TouchableOpacity>
				</View>

				<ScrollView horizontal showsHorizontalScrollIndicator={false} className='px-2 mt-2 flex-row gap-2 items-center'>
					{(search) && 
						<TouchableOpacity onPress={() => setSearch('')} className='px-2 py-0.5 rounded-xl border border-white w-fit flex-row gap-2 items-center mr-2'>
							<Text className='text-xs text-white max-w-20 truncate'>Search: {search}</Text><X size={12} className='text-white' />
						</TouchableOpacity>}
					{(activeCategory) && 
						<TouchableOpacity onPress={() => handleSetCategory('')} className='px-2 py-0.5 rounded-xl border border-white w-fit flex-row gap-2 items-center mr-2'>
							<Text className='text-xs text-white'>Category: {activeCategory}</Text><X size={12} className='text-white' />
						</TouchableOpacity>}
					{(sortType) && 
						<TouchableOpacity onPress={() => {setSortType(''); setSortOrder('')}} className='px-2 py-0.5 rounded-xl border border-white w-fit flex-row gap-2 items-center '>
							<Text className='text-xs text-white'>Sort: {capitalize(sortType)} : {capitalize(sortOrder)}</Text><X size={12} className='text-white' />
						</TouchableOpacity>}
				</ScrollView>
			</View>
			

			{/* Promotions */}
			<View className='px-4 mt-4'>
				<ScrollView showsHorizontalScrollIndicator={false} pagingEnabled horizontal className='h-60 rounded-xl shadow-md shadow-black/20 bg-white'>

					<View className='w-full'>
						<ImageBackground source={require('../../assets/images/eminem-sponsor.jpg')} resizeMode='cover' style={{
							height: 200,
							width: screenWidth,
						}}>
						<Text className='mr-auto mt-auto ml-4 mb-4 text-center font-bold text-lg px-4 py-2 items-center bg-white rounded-md'>
							Violence is the solution
						</Text>
						</ImageBackground>
						<Text className='text-center font-semibold text-md mt-2'>
						You got a problem? They got solution here. - Eminem
						</Text>
					</View>

					<View className='w-full'>
						<ImageBackground source={require('../../assets/images/cj-sponsor.jpg')} imageStyle={{ resizeMode: 'cover', top: 0 }} style={{
							height: 200,
							width: screenWidth,
						}}>
						<Text className='ml-auto mt-auto mr-4 mb-4 text-center font-bold text-lg px-4 py-2 items-center bg-white rounded-md'>
							Black pocket. Home.
						</Text>
						</ImageBackground>
						<Text className='text-center font-semibold text-md mt-2'>
						Ah shit, here we go again - Carl Johnson
						</Text>
					</View>

					<View className='w-full'>
						<ImageBackground source={require('../../assets/images/harry-sponsor.jpg')} imageStyle={{ resizeMode: 'cover', top: 0 }} style={{
							height: 200,
							width: screenWidth,
						}}>
						<Text className='ml-auto mt-auto mr-4 mb-4 text-center font-bold text-lg px-4 py-2 items-center bg-white rounded-md'>
							Guns. Guns everywhere.
						</Text>
						</ImageBackground>
						<Text className='text-center font-semibold text-md mt-2'>
						These are the real magic - Harry Potter
						</Text>
					</View>
				</ScrollView>
			</View>

			
			<View className='p-2'>

			<Text className='font-semibold text-black/50 mt-8 text-lg mb-2'>
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
				<View className='bg-white rounded-md overflow-hidden shadow-md shadow-black/20 relative'>
					{item.discount &&
						<Text className='text-xs text-blue-700 bg-white p-1 rounded-sm top-1 right-1 absolute z-10'>
							{item.discount * 100} %
						</Text>
					}
					<TouchableOpacity onPress={() => router.push(`/products/${item.id}`)} className='flex-1 flex-col'>
						<Image source={item.imagePath} resizeMode='cover' style={{
						width: 195, 
						height: 200,
						}}/>
						<View className='px-2 flex-1 flex-col gap-4'>
							<Text numberOfLines={2} className='text-lg font-semibold mt-4 w-40'>{item.name}</Text>

							<View className='flex-row items-center  justify-between p-2 font-medium rounded-md shadow-md shadow-black/20 mb-2 mt-auto'>
								<Text className=''>
									₱ {Number(item.discount ? item.price + item.price * item.discount : item.price).toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
								</Text>
								<View className='flex-row gap-2 items-center'>
									<StarIcon width={16} className='text-yellow-600'/>
									<Text>{item.ratings}</Text>
								</View>
							</View>
						</View>
					</TouchableOpacity>
				</View>
			}
			/>
			:
			<Text className='mt-8 text-center font-semibold text-black/50 h-80'>No product found, sarge.</Text>
			}
			</View>

			<Footer />
		</ScrollView>
		<Filter onShow={showFilter} onChangeShow={() => setShowFilter(!showFilter)} onChangeSort={handleSetSort} />
    </View>
  );
}
