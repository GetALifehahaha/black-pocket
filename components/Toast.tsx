import { X } from 'lucide-react-native'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const Toast = ({message, onClose}: {message: string, onClose: () => void}) => {
  return (
    <View className='bg-white flex-row gap-2 justify-between items-center p-2 rounded-md min-w-40'>
      <Text>
        {message}
      </Text>
      <TouchableOpacity onPress={onClose}>
        <X size={18} />
      </TouchableOpacity>
    </View>
  )
}

export default Toast