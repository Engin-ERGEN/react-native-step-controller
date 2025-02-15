import { Dimensions, StyleSheet, Text, View } from 'react-native';
import type { StepperItemProps } from '../interfaces/StepperItem.interface';

const { width } = Dimensions.get('window');

/**
 * Stepper Item
 * @param {StepperItemProps} props
 * @returns {React.ReactNode}
 */
export default ({
  title,
  children,
  contentContainerStyle = null,
  completed = false,
}: StepperItemProps) => {
  return (
    <>
      {title ? (
        <Text
          style={[
            stepperItemStyles.headerItemText,
            { color: completed ? 'green' : 'black' },
          ]}
        >
          {title}
        </Text>
      ) : null}
      <View style={[stepperItemStyles.content, contentContainerStyle]}>
        {children}
      </View>
    </>
  );
};

const stepperItemStyles = StyleSheet.create({
  content: {
    marginBottom: '2%',
  },
  headerItemText: {
    fontSize: width * 0.08,
    textAlign: 'center',
    marginTop: '2%',
    fontWeight: '500',
    marginBottom: '2%',
  },
});
