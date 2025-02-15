import { Dimensions, Pressable, StyleSheet, Text } from 'react-native';
import {
  defaultCircleOptions,
  type StepHeaderItemProps,
} from '../interfaces/StepHeaderItem.interface';
import style from '../utils/style';
import type { SizeOptions } from '../interfaces/SizeOptions.interface';

import { forwardRef, useImperativeHandle } from 'react';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const dividerMiniumWidth = width * 0.07;
const dividerMaximumWidth = width * 0.07;

const StepHeaderItem = (
  {
    number,
    isActive = false,
    isLast = false,
    changeActiveStep = null,
    containerStyle = null,

    dividerColor = '#DBDBDB',
    dividerSize = dividerMiniumWidth,
    attachedDivider = true,
    stepHeaderItemTextStyle = null,

    circleOptions,
    transformActiveCircle = false,
    completed = false,
    completedColor = '#05B200',
    animated = false,
  }: StepHeaderItemProps,
  ref?: React.Ref<any>
) => {
  const borderColorValue = useSharedValue(0);

  circleOptions = {
    ...defaultCircleOptions,
    ...circleOptions,
  };

  const startColor = isActive
    ? circleOptions.backgroundColor?.activeColor
    : circleOptions.backgroundColor?.inactiveColor;

  const animateColor = () => {
    borderColorValue.set(0);
    borderColorValue.value = withTiming(1, {
      duration: 500,
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = completed
      ? interpolateColor(
          borderColorValue.value,
          [0, 1],
          [startColor || 'gray', completedColor]
        )
      : startColor;

    return {
      borderColor: completed ? backgroundColor : dividerColor,
      backgroundColor,
    };
  }, [completed, isActive]);

  useImperativeHandle(ref, () => ({
    animateColor,
  }));

  const headerItemSize = width * 0.095;
  let sizeOptions: SizeOptions = {
    width: headerItemSize,
    height: headerItemSize,
    borderRadius: headerItemSize / 2,
  };

  if (isActive && transformActiveCircle) {
    sizeOptions.width = width * 0.1;
    sizeOptions.height = sizeOptions.width;
    sizeOptions.borderRadius = sizeOptions.width / 2;
  }

  return (
    <>
      <Pressable
        onPress={() => {
          if (changeActiveStep) {
            changeActiveStep(number);
          }
        }}
      >
        <Animated.View
          style={[
            stepHeaderItemStyles.headerItem,
            containerStyle,
            animated
              ? animatedStyle
              : { backgroundColor: completed ? completedColor : startColor },
            {
              opacity: completed ? 0.6 : 1,
              borderColor: isActive
                ? circleOptions.borderColor?.activeColor
                : circleOptions.borderColor?.inactiveColor,
              borderWidth: circleOptions.borderColor ? 3 : 0,

              ...sizeOptions,
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

                fontSize: headerItemSize * 0.45,
              },
            ]}
          >
            {number}
          </Text>
        </Animated.View>
      </Pressable>
      {!isLast ? (
        <Animated.View
          style={[
            style.divider,
            animated
              ? animatedStyle
              : { borderColor: completed ? completedColor : dividerColor },
            {
              width: dividerSize,
              maxWidth: dividerMaximumWidth,
              marginHorizontal: attachedDivider ? 0 : '2%',
            },
          ]}
        />
      ) : null}
    </>
  );
};

const stepHeaderItemStyles = StyleSheet.create({
  headerItem: {
    justifyContent: 'center',
  },
  headerItemNumber: {
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default forwardRef(StepHeaderItem);
