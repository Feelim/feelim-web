import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import ModalItem from './ModalItem';
import {useRecoilState} from 'recoil';
import {mapModalState} from '../../atoms/mapModal';
import {nearbyLaboratories} from '../../api/types';
import Divider from '../Pickup/Divider';

type BottomSheetType = {
  data: nearbyLaboratories | undefined;
};

const MapBottomSheet = ({data}: BottomSheetType) => {
  const [visible, setVisible] = useRecoilState(mapModalState);
  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          closeModal();
        } else {
          resetBottomSheet.start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (visible) {
      resetBottomSheet.start();
    }
  }, [visible]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setVisible(false);
    });
  };

  return (
    <>
      <Modal
        visible={visible}
        animationType={'fade'}
        transparent
        statusBarTranslucent>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.background} />
          </TouchableWithoutFeedback>
          <Animated.ScrollView
            style={{
              ...styles.bottomSheetContainer,
              transform: [{translateY: translateY}],
            }}
            {...panResponders.panHandlers}>
            <>
              <FlatList
                data={data?.result}
                renderItem={({item}) => (
                  <ModalItem
                    address={item.address}
                    images={item.images}
                    distance={item.distance}
                    reviewNum={item.reviewNum}
                    star={item.star}
                    name={item.name}
                    id={item.id}
                  />
                )}
                keyExtractor={item => item.id.toString()}
                ItemSeparatorComponent={() => <Divider />}
              />
            </>
          </Animated.ScrollView>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  background: {
    flex: 1,
  },
  bottomSheetContainer: {
    flex: 1,
    height: 300,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingTop: 10,
    overflow: 'scroll',
  },
  item: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
});

export default MapBottomSheet;
