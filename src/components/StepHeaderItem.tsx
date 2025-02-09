import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import type { StepHeaderItemProps } from '../interfaces/StepHeaderItem.interface';
import style from '../utils/style';

const { width } = Dimensions.get('window');

export default ({
  number,
  isActive = false,
  isLast = false,
  changeActiveStep = null,
  containerStyle = null,
  dividerColor = '#DBDBDB',
  stepHeaderItemTextStyle = null,

  circleOptions = {
    backgroundColor: {
      activeColor: '#42B9FF',
      inactiveColor: 'gray',
    },
    textColor: {
      activeColor: 'white',
      inactiveColor: 'lightgray',
    },
  },
}: StepHeaderItemProps) => {
  return (
    <>
      <Pressable
        onPress={() => {
          if (changeActiveStep) {
            changeActiveStep(number);
          }
        }}
      >
        <View
          style={[
            stepHeaderItemStyles.headerItem,
            containerStyle,
            {
              backgroundColor: isActive
                ? circleOptions.backgroundColor?.activeColor
                : circleOptions.backgroundColor?.inactiveColor,
            },
          ]}
        >
          <Text
            style={[
              stepHeaderItemTextStyle,
              stepHeaderItemStyles.headerItemNumber,
              {
                color: isActive
                  ? circleOptions.textColor?.activeColor
                  : circleOptions.textColor?.inactiveColor,
              },
            ]}
          >
            {number}
          </Text>
        </View>
      </Pressable>
      {!isLast ? (
        <View
          style={[
            style.divider,
            {
              borderColor: dividerColor,
            },
          ]}
        />
      ) : null}
    </>
  );
};

const headerItemSize = width * 0.08;
const stepHeaderItemStyles = StyleSheet.create({
  headerItem: {
    borderRadius: headerItemSize / 2,
    width: headerItemSize,
    height: headerItemSize,
    justifyContent: 'center',
  },
  headerItemNumber: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '500',
  },
});
