import {Pressable, StyleSheet, Text} from 'react-native';
import colors from '../../assets/color';

function RecentSearchItem() {
  return (
    <Pressable style={styles.block}>
      <Text style={styles.text}>필름카메라</Text>
      <Pressable style={styles.delete} onPress={() => console.log('click')}>
        <Text style={styles.x}>x</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    paddingLeft: 13,
    borderColor: colors.text1,
    borderWidth: 1,
    borderRadius: 39,
    marginRight: 6,
    height: 26,
  },
  text: {
    fontSize: 12,
    color: colors.text1,
    lineHeight: 18,
  },
  delete: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 12,
  },
  x: {
    fontSize: 12,
    color: colors.text1,
    marginBottom: 2,
  },
});

export default RecentSearchItem;
