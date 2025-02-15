import React from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import type { CircleOptionsProps } from './StepHeaderItem.interface';

export interface StepperProps {
  children: React.ReactNode | React.ReactNode[];
  footer?: boolean | React.ReactNode;
  pagination?: boolean;
  containerStyle?: StyleProp<ViewStyle> | null;
  paginationContainerStyle?: StyleProp<ViewStyle> | null;
  footerContainerStyle?: StyleProp<ViewStyle> | null;

  nextButtonContainerStyle?: StyleProp<ViewStyle> | null;
  previousButtonContainerStyle?: StyleProp<ViewStyle> | null;

  nextButtonTextStyle?: StyleProp<TextStyle> | null;
  previousButtonTextStyle?: StyleProp<TextStyle> | null;

  nextButtonDisabled?: boolean;
  backButtonDisabled?: boolean;
  activeStep?: number;
  onActiveStepChange?: Function | null;
  LastStepFooterComponent?: React.FC | null;
  canClickStepNumber?: boolean;

  dividerColor?: string;
  dividerSize?: number;
  attachedDivider?: boolean;

  circleItemStyle?: StyleProp<ViewStyle> | null;
  circleItemTextStyle?: StyleProp<TextStyle> | null;
  circleOptions?: CircleOptionsProps;

  previousButtonTitle?: string;
  nextButtonTitle?: string;

  transformActiveCircle?: boolean;
  animated?: boolean;
  completedColor?: string;
}
