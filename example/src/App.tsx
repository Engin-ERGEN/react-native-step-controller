import { Stepper, StepperItem } from 'react-native-step-controller';
import { Text } from 'react-native';

export default function App() {
  return (
    <Stepper>
      <StepperItem title="First Step">
        <Text>This is the first step.</Text>
      </StepperItem>
      <StepperItem title="Second Step">
        <Text>This is the second step.</Text>
      </StepperItem>
      <StepperItem title="Third Step">
        <Text>This is the third step.</Text>
      </StepperItem>
    </Stepper>
  );
}
