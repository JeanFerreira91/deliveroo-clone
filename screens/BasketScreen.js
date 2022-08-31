import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { urlFor } from "../sanity";
import Currency from 'react-currency-formatter';

const BasketScreen = () => {
    // Variable to hold the navigation
    const navigation = useNavigation();
    // To hold what restaurant we are in
    const restaurant = useSelector(selectRestaurant);
    // To hold the Items in the basket
    const items = useSelector(selectBasketItems);
    // Variable that holds the basket total
    const basketTotal = useSelector(selectBasketTotal);
    // State that will turn the items into a grouped items basket
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
    // Dispatch object to access the Redux store
    const dispatch = useDispatch();

    // Grouping the dishes so that one item does not repeat itself
    // in the list displayed in the Basket Screen
    useEffect(() => {
      // Looping through the items in the basket and creating
      // an object. If the key exists then go ahead and push the
      // item into that key's array
      const groupedItems = items.reduce((results, item) => {
        (results[item.id] = results[item.id] || []).push(item);
        return results;
      }, {});
      // Setting the state to the grouped items
      setGroupedItemsInBasket(groupedItems);
    }, [items]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
          {/* View to display "Basket" and the Restaurant's name */}
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>
          {/* Displayin the X button to close the Basket */}
          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <XCircleIcon color="#00CCBB" height={50} width={50} />
          </TouchableOpacity>
        </View>
        {/* Displaying the Delivery information and expected time */}
        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{
              uri: "https://links.papareact.com/wru",
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">
            Deliver in 50-75 mins
          </Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">
              Change
            </Text>
          </TouchableOpacity>
        </View>
        {/* Displaying the list of items */}
        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text className="text-[#00CCBB]">
                {items.length} x
              </Text>
              <Image
                source={{
                  uri: urlFor(items[0]?.image).url()
                }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">
                {items[0]?.name}
              </Text>
              <Text className="text-gray-600">
                <Currency quantity={items[0]?.price} currency="GBP" />
              </Text>
              <TouchableOpacity>
                <Text
                  className="text-[#00CCBB] text-xs"
                  onPress={() => dispatch(removeFromBasket({ id: key}))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        {/* Displaying the subtotal, delivery fee and order total */}
        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">
              <Currency quantity={basketTotal} currency="GBP" />
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <Text className="text-gray-400">
              <Currency quantity={3.99} currency="GBP" />
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text>Order Total</Text>
            <Text className="font-extrabold">
              <Currency quantity={basketTotal + 3.99} currency="GBP" />
            </Text>
          </View>
          <TouchableOpacity className="rounded-lg bg-[#00CCBB] p-4">
            <Text className="text-center text-white text-lg font-bold">Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default BasketScreen