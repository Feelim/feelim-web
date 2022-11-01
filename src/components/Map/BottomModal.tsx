import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  useWindowDimensions,
  FlatList,
  View,
  Text,
  Modal,
} from 'react-native';
import {nearbyLaboratories} from '../../api/types';
import colors from '../../assets/color';
import StoreItem from '../Pickup/StoreItem';
import ModalItem from './ModalItem';
import Divider from '../Pickup/Divider';
import {useRecoilState} from 'recoil';
import {mapModalState} from '../../atoms/mapModal';
import {mapModalHeightState} from '../../atoms/mapModalHeight';

type BottomModalType = {
  data: nearbyLaboratories | undefined;
};

function BottomModal({data}: BottomModalType) {
  const {width} = useWindowDimensions();
  const [visible, setVisible] = useRecoilState(mapModalState);
  const [modalHeight, setModalHeight] = useRecoilState(mapModalHeightState);

  console.log(data);
  console.log(visible);

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.wrap} onLayout={}>
        <Pressable
          onPress={() => {
            setVisible(false);
            setModalHeight(100);
          }}>
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
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: 'auto',
    borderTopRightRadius: 13,
    borderTopLeftRadius: 13,
    paddingTop: 13,
    backgroundColor: colors.on_primary,
    position: 'absolute',
    bottom: 0,
  },
});

export default BottomModal;
