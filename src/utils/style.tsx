import { StyleSheet } from 'react-native';

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
    borderWidth: 1,
    alignSelf: 'center',
  },
});
