import React, { ReactNode } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

interface CarouselProps {
  children: ReactNode[];
  onItemPress: (index: number) => void; 
}

const Carousel: React.FC<CarouselProps> = ({ children, onItemPress }) => {
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {children.map((child, index) => (
          <TouchableOpacity key={index} onPress={() => onItemPress(index)}>
            <View style={styles.carouselItem}>
              {child}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselItem: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    padding: 5,
    marginLeft: 30,
    marginRight: 30,
  },
});

export default Carousel;
