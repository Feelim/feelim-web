import {Pressable, StyleSheet, Text} from 'react-native';
import colors from '../../assets/color';

export interface ItemProps {
  id: number;
  text: string;
  keywords: any;
  setKeywords: any;
}

function RecentSearchItem({text, id, keywords, setKeywords}: ItemProps) {
  const removeItem = (id: number) => {
    const nextKeyword = keywords.filter((thisKeyword: any) => {
      return thisKeyword.id != id;
    });
    setKeywords(nextKeyword);
  };
  return (
    <Pressable style={styles.block}>
      <Text style={styles.text}>{text}</Text>
      <Pressable
        style={styles.delete}
        onPress={() => removeItem(id)}
        hitSlop={8}>
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
