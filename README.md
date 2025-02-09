# react-native-step-controller

A simple and customizable stepper component for React Native applications.

## Installation

You can install `react-native-step-controller` using npm or yarn:

```sh
npm install react-native-step-controller
```

or

```sh
yarn add react-native-step-controller
```

## Usage

Import the `Stepper` and `StepperItem` components into your project:

```tsx
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
```

## Stepper Props

| Prop                           | Type                                 | Description                                                                                                                      |
| ------------------------------ | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `children`                     | `React.ReactNode, React.ReactNode[]` | StepperItem as an array or a single component.                                                                                   |
| `footer`                       | `boolean`                            | Used to determine footer visibility.                                                                                             |
| `currentStep`                  | `number`                             | The index of the current step (starting from 0)                                                                                  |
| `onStepPress`                  | `function`                           | Callback when a step is pressed                                                                                                  |
| `pagination`                   | `boolean`                            | Visibility of top pagination.                                                                                                    |
| `containerStyle`               | `any`                                | Style of main container of Stepper.                                                                                              |
| `paginationContainerStyle`     | `any`                                | Style of pagination header container of Stepper.                                                                                 |
| `footerContainerStyle`         | `any`                                | Style of footer container of Stepper.                                                                                            |
| `nextButtonContainerStyle`     | `any`                                | Next button's container style.                                                                                                   |
| `previousButtonContainerStyle` | `any`                                | Previous button's container style.                                                                                               |
| `nextButtonTextStyle`          | `any`                                | Next button's text style.                                                                                                        |
| `circleOptions`                | `CircleColorProps`                   | The circle options for styling.                                                                                                  |
| `circleItemStyle`              | `any`                                | Style of circle step item header. The style of each circle's container.                                                          |
| `circleItemTextStyle`          | `any`                                | Style of circle step item text. The style of each circle's text.                                                                 |
| `previousButtonTextStyle`      | `any`                                | Previous button's text style.                                                                                                    |
| `nextButtonDisabled`           | `boolean`                            | Disable the next button.                                                                                                         |
| `backButtonDisabled`           | `boolean`                            | Disable the previous button.                                                                                                     |
| `activeStep`                   | `number`                             | Set active step.                                                                                                                 |
| `onActiveStepChange`           | `Function`                           | This function will trigger on active step changed.                                                                               |
| `LastStepFooterComponent`      | `React.ReactNode`                    | Last step footer component. This will automatically applies in the footer. However, in the future it will perhaps be deprecated. |
| `canClickStepNumber`           | `boolean`                            | Normally, user can't click step number as default. But, you can make it clickable.                                               |
| `previousButtonTitle`          | `string`                             | Previous button's title.                                                                                                         |
| `nextButtonTitle`              | `string`                             | Next button's title.                                                                                                             |
| `dividerColor`                 | `string`                             | Divider color of circles.                                                                                                        |

### CircleColorProps

| Prop              | Type         | Description                                     |
| ----------------- | ------------ | ----------------------------------------------- |
| `textColor`       | `ColorProps` | You can change your circle's text style.        |
| `backgroundColor` | `ColorProps` | Background color of active or inactive circles. |

### ColorProps

| Prop            | Type     | Description  |
| --------------- | -------- | ------------ |
| `activeColor`   | `string` | Active Color |
| `inactiveColor` | `string` | Active Color |

## Stepper Item Props

| Prop                    | Type              | Description                                    |
| ----------------------- | ----------------- | ---------------------------------------------- |
| `children`              | `React.ReactNode` | Component that will be inside the StepperItem. |
| `title`                 | `string`          | Every stepper item has a title.                |
| `contentContainerStyle` | `any`             | Container style of the stepper item.           |

## Ref Usage

If you assign a `ref` to the `Stepper` component, you can access the following methods:

| Method       | Parameters             | Description                 |
| ------------ | ---------------------- | --------------------------- |
| `goToStep()` | (stepNumber: `number`) | It goes to a specific step. |

### Example Usage with Ref

```tsx
import React, { useRef } from 'react';
import { View, Button } from 'react-native';
import { Stepper, StepperItem } from 'react-native-step-controller';

export default App = () => {
  const stepperRef = useRef(null);

  return (
    <View>
      <Stepper ref={stepperRef}>
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
      <Button
        title="Go To Step"
        onPress={() => stepperRef.current?.goToStep(1)}
      />
    </View>
  );
};
```

## Customization

You can customize the styles of the stepper using the `containerStyle`, `nextButtonTitle`, `previousButtonTitle` props:

```tsx
<Stepper
  previousButtonTitle="Example Previous"
  nextButtonTitle="Example Next"
  containerStyle={{ backgroundColor: 'red' }}
>
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
```

## License

This project is licensed under the MIT License.
