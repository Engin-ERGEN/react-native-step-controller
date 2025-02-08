import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface StepperProps {
  children: React.ReactNode | React.ReactNode[];
  footer?: boolean;
  pagination?: boolean;
  containerStyle?: StyleProp<ViewStyle> | null;
  nextButtonDisabled?: boolean;
  backButtonDisabled?: boolean;
  activeStep?: number;
  onActiveStepChange?: Function | null;
  LastStepFooterComponent?: React.FC | null;
  canClickStepNumber?: boolean;

  previousButtonTitle?: string;
  nextButtonTitle?: string;
}
