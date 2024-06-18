import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { horizontalScale, moderateScale, verticalScale } from '../../service/Metrics';
import { UserInfo } from '../../user/UserContext';
import GithubAuth from '../../auth/github';
import GitlabAuth from '../../auth/gitlab';
import GiteaAuth from '../../auth/gitea';
import { useTranslation } from "react-i18next"; // A ajouter pour le multi langue

const screenWidth = Dimensions.get('window').width;
const textSize = screenWidth * 0.05;

const LinkAccountView = ({ user }: { user: UserInfo }) => {

  const { t } = useTranslation();

  const [isLinked, setIsLinked] = useState({
    gitlab: false,
    github: false,
    gitea: false,
  });

  const updateLinkStatus = (platform: string, status: boolean) => {
    setIsLinked(prevState => ({ ...prevState, [platform]: status }));
  };

  const platforms = {
    gitlab: {
      component: <GitlabAuth onLinkChange={(status) => updateLinkStatus('gitlab', status)} username={user!.username} />,
      logo: require('../../assets/platforms/gitlab.png'),
      isLinked: isLinked.gitlab,
    },
    github: {
      component: <GithubAuth onLinkChange={(status) => updateLinkStatus('github', status)} username={user!.username} />,
      logo: require('../../assets/platforms/github.png'),
      isLinked: isLinked.github,
    },
    gitea: {
      component: <GiteaAuth onLinkChange={(status) => updateLinkStatus('gitea', status)} username={user!.username} />,
      logo: require('../../assets/platforms/gitea.png'),
      isLinked: isLinked.gitea,
    },
  };

  const renderPlatformSection = (platformKey: string, platform: any) => {
    const statusText = platform.isLinked ? t('settings.linked') : t('settings.notLinked');
    const statusColor = platform.isLinked ? 'green' : 'red';

    return (
      <View style={styles.platformSection} key={platformKey}>
        <Image source={platform.logo} style={styles.logo} />
        <Text style={[styles.text, { color: statusColor }]}>{statusText}</Text>
        {platform.component}
      </View>
    );
  };

  return (
    <View>
      {Object.entries(platforms).map(([key, platform]) =>
        renderPlatformSection(key, platform)
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  platformSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(5),
    marginVertical: verticalScale(5),
    justifyContent: 'space-between',

  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  text: {
    fontSize: moderateScale(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LinkAccountView;