import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from "./styles";

const fullAboutText =
  'Our mission is to build a community-driven map of essential services for rural Cameroon. We believe finding a clinic or clean water should be simple, reliable, and available to everyone.\n\nEvery location on this map was added by a neighbor to help keep others safe and informed. Find what you need, and in our next update, you\'ll be able to add what\'s missing!';

const shortAboutText =
  'Our mission is to build a community-driven map of essential services for rural Cameroon. We believe finding a clinic or clean water should be simple, reliable, and available to everyone...';


export default function AboutScreen({ navigation }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>About this app</Text>

        <View>
          <Text style={styles.body}>
            {isExpanded ? fullAboutText : shortAboutText}
          </Text>
          <TouchableOpacity onPress={toggleText}>
            <Text style={styles.link}>
              {isExpanded ? 'show less' : 'read more'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
