import React from "react";
import { ScrollView, Text, View } from "react-native";

const about = () => {
  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      {/* App Info */}
      <View className="mb-6">
        <Text className="text-2xl font-bold text-center text-gray-900 mb-2">
          About EFIXXO
        </Text>
        <Text className="text-center text-sm text-gray-600">
          Version 1.0 — Released 2025
        </Text>
      </View>

      {/* Description */}
      <View className="mb-8">
        <Text className="text-base text-gray-700 leading-6 text-justify">
          <Text className="font-semibold">EFIXXO</Text> is a next-generation
          weapon marketplace designed to connect authorized buyers and sellers
          of firearms, tactical gear, and professional-grade equipment.
          Our platform ensures compliance with legal standards while delivering
          a secure, transparent, and efficient user experience.
        </Text>
        <Text className="text-base text-gray-700 leading-6 text-justify mt-3">
          Built with innovation and precision, EFIXXO Version 1.0 lays the
          foundation for a reliable and scalable platform aimed at responsible
          commerce. Future versions will introduce enhanced verification,
          real-time stock updates, and improved accessibility.
        </Text>
      </View>

      {/* Team */}
      <View className="mb-8">
        <Text className="text-xl font-semibold text-gray-900 mb-3 text-center">
          Meet the Team
        </Text>

        <View className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <Text className="text-lg font-semibold text-gray-800">
            Project Manager
          </Text>
          <Text className="text-sm text-gray-600 italic">Mathew Angeles</Text>
          <Text className="text-sm text-gray-700 mt-1">
            Oversees the project’s direction, manages deadlines, and ensures
            the product aligns with EFIXXO’s mission and vision.
          </Text>
        </View>

        <View className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <Text className="text-lg font-semibold text-gray-800">
            Business Analyst
          </Text>
          <Text className="text-sm text-gray-600 italic">[Name Placeholder]</Text>
          <Text className="text-sm text-gray-700 mt-1">
            Analyzes business requirements and ensures technical features align
            with market and user needs.
          </Text>
        </View>

        <View className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <Text className="text-lg font-semibold text-gray-800">
            Lead Developer
          </Text>
          <Text className="text-sm text-gray-600 italic">[Name Placeholder]</Text>
          <Text className="text-sm text-gray-700 mt-1">
            Responsible for the system’s architecture, backend integration, and
            overall code quality.
          </Text>
        </View>

        <View className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <Text className="text-lg font-semibold text-gray-800">
            UI/UX Designer
          </Text>
          <Text className="text-sm text-gray-600 italic">[Name Placeholder]</Text>
          <Text className="text-sm text-gray-700 mt-1">
            Crafts intuitive user interfaces and engaging experiences that
            reflect EFIXXO’s visual identity.
          </Text>
        </View>

        <View className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <Text className="text-lg font-semibold text-gray-800">
            Quality Assurance Engineer
          </Text>
          <Text className="text-sm text-gray-600 italic">[Name Placeholder]</Text>
          <Text className="text-sm text-gray-700 mt-1">
            Ensures stability and reliability through detailed testing and
            performance analysis before every release.
          </Text>
        </View>
      </View>

      {/* Extra Info */}
      <View className="bg-gray-100 rounded-md p-3">
        <Text className="text-base font-semibold text-gray-800 mb-2">
          Our Mission
        </Text>
        <Text className="text-sm text-gray-700 leading-5">
          EFIXXO’s mission is to revolutionize the online arms trade by combining
          security, transparency, and accessibility. We strive to create a
          responsible digital marketplace where trust and compliance come first.
        </Text>

        <Text className="text-base font-semibold text-gray-800 mt-4 mb-2">
          Contact Us
        </Text>
        <Text className="text-sm text-gray-700">
          Email: <Text className="font-medium">support@efixxo.example</Text>
        </Text>
        <Text className="text-sm text-gray-700">
          Website: <Text className="font-medium">www.efixxo.example</Text>
        </Text>
      </View>

      <Text className="text-xs text-gray-500 text-center mt-6 mb-4">
        © {new Date().getFullYear()} EFIXXO — All rights reserved.
      </Text>
    </ScrollView>
  );
}

export default about