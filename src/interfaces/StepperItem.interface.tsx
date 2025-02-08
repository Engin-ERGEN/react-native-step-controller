import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface StepperItemProps {
  title: string;
  children: React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle> | null;
}
