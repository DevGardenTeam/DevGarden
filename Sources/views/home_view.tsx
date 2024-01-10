import React, { useEffect, useState } from 'react';
import { View, Image, Text } from 'react-native';
import Carousel from '../components/carousel_component';
import IconComponent from '../components/icon_component';
import {Headline} from "react-native-paper";

const HomeView: React.FC = () => {

  const [selectedKey, setSelectedKey] = useState<string>('icon1');
  const handleIconPress = (key: string) => {
    setSelectedKey(key);
  };

  const carouselItems = [
    <IconComponent key="GitLab" iconSource={require('../assets/gitlab.png')} height={75} width={75} />,
    <IconComponent key="GitHub" iconSource={require('../assets/gitlab.png')} height={75} width={75} />,
    <IconComponent key="Gitea" iconSource={require('../assets/gitlab.png')} height={75} width={75}/>,
  ];

  return (
    <View style={{ flex: 1 }}>
      <Headline>
        <Text>{selectedKey}</Text>
      </Headline>
      <Carousel
        onItemPress={(index) => handleIconPress(carouselItems[index].key)}
      >
        {carouselItems.map((item) => (
          <IconComponent
            key={item.key}
            iconSource={item.props.iconSource}
            height={item.props.height}
            width={item.props.width}
          />
        ))}
      </Carousel>    </View>
  );
};

export default HomeView;


