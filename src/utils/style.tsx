import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
  },
  verticalStack: {
    display: 'flex',
    flexDirection: 'column',
  },
  horizontalStack: {
    display: 'flex',
    flexDirection: 'row',
  },

  divider: {
    width: width * 0.018,
    borderWidth: 1,
    marginHorizontal: '2%',
    alignSelf: 'center',
  },
});
