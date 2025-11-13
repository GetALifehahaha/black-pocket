import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const ConfirmationModal = ({content, onConfirm}: {content: string, onConfirm: (value: boolean) => void}) => {
  return (
    <View className='absolute top-0 left-0 w-full h-screen justify-center items-center bg-black/10 backdrop-blur-sm'>
      <View className='bg-white w-4/5 p-4 rounded-xl justify-center items-center'>
        <Text className='text-text font-medium text-lg text-center'>
          {content}
        </Text>

        <View className='items-center flex-row gap-2 mt-4'>
          <TouchableOpacity onPress={() => onConfirm(false)} className='border border-gray-500 px-4 py-1 rounded-md'><Text className='text-gray-500 font-semibold'>Cancel</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => onConfirm(true)} className='border border-dark bg-dark px-4 py-1 rounded-md'><Text className='text-white font-semibold'>Confirm</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default ConfirmationModal