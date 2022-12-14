import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
  Button,
  StatusBar,
} from 'react-native';
import colors from '../../assets/color';
import CommunityFeed from '../../components/Community/CommunityFeed';
import CommunityHeader from '../../components/Community/CommunityHeader';
import PageFilter from '../../components/Community/PageFilter';

function CommunityScreen() {
  return (
    <>
      <StatusBar backgroundColor={colors.on_primary} barStyle="dark-content" />
      <SafeAreaView style={styles.fullScreen}>
        <CommunityHeader />
        <PageFilter />
        <CommunityFeed />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default CommunityScreen;
