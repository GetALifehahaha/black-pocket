import { Tabs } from 'expo-router'
import { ShoppingBasket, ShoppingCart, User2 } from 'lucide-react-native'
import React from 'react'
import { Text, View } from 'react-native'

const TabIcon = ({focused, icon: Icon, text}: any) => {
    if (focused) {
        return (
            <View className='flex-row gap-2 items-center px-4 py-2 rounded-full bg-blue'>
                <Icon size={22} className="text-white" />
                <Text className='text-white'>{text}</Text>
            </View>
        )
    }

    return (
        <View className='flex-row gap-2'>
            <Icon size={18} className="text-blue"/>
        </View>
    )
}



const _layout = () => {
  return (
    <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            tabBarItemStyle: {
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'flex-start',
            },
            tabBarStyle: {
                backgroundColor: 'dark',
            },
        }}
    >
        <Tabs.Screen name='index' options={{
            title: "Shop",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
                <>
                    <TabIcon focused={focused} icon={ShoppingBasket} text="Shop"/>
                </>
            )
        }} />
        <Tabs.Screen name='cart' options={{
            title: "Cart",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
                <>
                    <TabIcon focused={focused} icon={ShoppingCart} text="Cart"/>
                </>
            )
        }} />
        <Tabs.Screen name='about' options={{
            title: "About",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
                <>
                    <TabIcon focused={focused} icon={User2} text="About"/>
                </>
            )
        }} />
    </Tabs>
  )
}

export default _layout