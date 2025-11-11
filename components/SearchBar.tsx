import { SearchIcon } from 'lucide-react-native'
import React from 'react'
import { TextInput, View } from 'react-native'

interface Props {
  onPress: () => void
}

const SearchBar = ({onPress}: Props) => {
  return (
    <View className='flex-1 flex-row bg-white rounded-md items-center gap-2 px-4 py-2'>
        <SearchIcon className='text-platinum-400'/>
        <TextInput placeholder='What do you want?' onPress={onPress} onChange={() => {}} className='text-black font-medium'/>
    </View>
  )
}

export default SearchBar