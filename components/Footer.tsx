import { router } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const Footer = () => {
  return (
    <View className="bg-white border-t border-gray-300 p-4">
      <View className="mb-3">
        <Text className="text-base font-semibold text-gray-900">Black Pocket</Text>
        <Text className="text-sm text-gray-600 mt-1">
          Black Pocket — a weapons marketplace for legally-compliant firearms, accessories,
          and professional-grade equipment. Buyers and sellers must comply with all
          local laws, age requirements, and licensing.
        </Text>
      </View>

      <View className="flex-row justify-between mb-3">
        <View>
            <TouchableOpacity onPress={() => router.push('/about')}>
                <Text className="text-sm text-gray-700 mb-1">About</Text>
            </TouchableOpacity>
            <Text className="text-sm text-gray-700 mb-1">Contact</Text>
            <Text className="text-sm text-gray-700">Terms & Conditions</Text>
        </View>

        <View className="items-end">
          <Text className="text-sm text-gray-700">Support</Text>
          <Text className="text-sm text-gray-600">support@efixxo.example</Text>
          <Text className="text-xs text-gray-500 mt-2">Operates in accordance with applicable laws.</Text>
        </View>
      </View>

      <View className="pt-3 border-t border-gray-100">
        <Text className="text-xs text-gray-500 text-center">
          © 2025 EFIXXO. All rights reserved.
        </Text>
      </View>
    </View>
  )
}

export default Footer