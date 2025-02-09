import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface ColorProps {
  activeColor?: string;
  inactiveColor?: string;
}
export interface CircleOptionsProps {
  textColor?: ColorProps;
  backgroundColor?: ColorProps;
}

export interface StepHeaderItemProps {
  number: number;
  isActive?: boolean;
  isLast?: boolean;
  changeActiveStep?: Function | null;
  containerStyle?: StyleProp<ViewStyle> | null;
  stepHeaderItemTextStyle?: StyleProp<TextStyle> | null;
  dividerColor?: string;
  circleOptions?: CircleOptionsProps;
}
