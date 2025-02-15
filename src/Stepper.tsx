import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import type { StepperProps } from './interfaces/Stepper.interface';
import styles from './utils/style';
import Layout from './components/Layout';
import StepHeaderItem from './components/StepHeaderItem';

const { width } = Dimensions.get('window');

const Stepper = (
  {
    children,
    footer = true,
    pagination = true,
    containerStyle = null,
    nextButtonDisabled = false,
    backButtonDisabled = false,
    activeStep = 1,
    onActiveStepChange = null,
    LastStepFooterComponent = null,
    canClickStepNumber = false,
    paginationContainerStyle = null,
    footerContainerStyle = null,
    circleItemStyle = null,
    circleItemTextStyle = null,

    nextButtonContainerStyle = null,
    previousButtonContainerStyle = null,

    nextButtonTextStyle = null,
    previousButtonTextStyle = null,

    nextButtonTitle = 'Next',
    previousButtonTitle = 'Previous',
    dividerColor = '#BABABA',
    dividerSize,
    attachedDivider,

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
    transformActiveCircle = false,
    animated = false,
    completedColor,
  }: StepperProps,
  ref?: React.Ref<any>
) => {
  const [step, setStep] = useState(1);
  const [items, setItems] = useState<any>([]);
  const references = useRef<any>([]);

  const goToStep = useCallback(
    (stepNumber: number) => {
      if (stepNumber > items.length || stepNumber < 0) return;
      setStep(stepNumber);
    },
    [items.length]
  );

  useEffect(() => {
    if (onActiveStepChange) {
      onActiveStepChange(step);
    }

    if (references.current[step - 1])
      references.current[step - 1].animated = false;

    if (
      animated &&
      step - 2 >= 0 &&
      references.current[step - 2] &&
      references.current[step - 2]?.animateColor
    ) {
      const previousStep = references.current[step - 2];

      if (previousStep.animated) return;

      previousStep.animated = true;
      previousStep?.animateColor();
    }
  }, [step, onActiveStepChange, animated]);

  useEffect(() => {
    const length = items.length;
    if (activeStep && length > 0) {
      if (activeStep > length)
        throw new Error('Your step number is out of the array.');
      else {
        goToStep(activeStep);
      }
    }
  }, [activeStep, items.length, goToStep]);

  useEffect(() => {
    if (children) {
      let temporaryItems = [];
      if (Array.isArray(children) && children.length > 0) {
        temporaryItems = children;
      } else {
        temporaryItems.push(children);
      }

      setItems(temporaryItems.filter((item) => !!item));
    }
  }, [children]);

  const numerationWidth = items.length * width * 0.1;

  useImperativeHandle(ref, () => ({
    goToStep,
  }));

  return (
    <View style={[containerStyle, stepperStyles.container]}>
      <View
        style={[
          { paddingVertical: width * 0.05 },
          styles.shadow,
          paginationContainerStyle,
        ]}
      >
        {pagination ? (
          <ScrollView
            horizontal
            contentContainerStyle={[
              numerationWidth < width
                ? {
                    justifyContent: 'center',
                    flex: 1,
                  }
                : null,
            ]}
            showsHorizontalScrollIndicator={false}
          >
            <View style={[styles.horizontalStack, stepperStyles.header]}>
              {items.map((item: any, index: number) => {
                let completed = false;
                if (
                  item.props['completed'] &&
                  typeof item.props['completed'] === 'boolean'
                ) {
                  completed = item.props['completed'];
                }

                completed = completed || index + 1 < step;

                return (
                  <StepHeaderItem
                    ref={(ref) => {
                      if (animated) {
                        const reference = references.current[index];
                        if (!reference) references.current[index] = ref;
                      }
                    }}
                    isActive={index + 1 === step}
                    key={`STEP_HEADER_ITEM_${index}`}
                    number={index + 1}
                    isLast={index === items.length - 1}
                    changeActiveStep={canClickStepNumber ? setStep : null}
                    containerStyle={circleItemStyle}
                    dividerColor={completed ? 'lightgreen' : dividerColor}
                    attachedDivider={attachedDivider}
                    dividerSize={dividerSize}
                    stepHeaderItemTextStyle={circleItemTextStyle}
                    circleOptions={circleOptions}
                    transformActiveCircle={transformActiveCircle}
                    completed={completed}
                    animated={animated}
                    completedColor={completedColor}
                  />
                );
              })}
            </View>
          </ScrollView>
        ) : null}
      </View>
      {items.length > 0 ? (
        <Layout>
          {items.map((item: React.ReactNode, index: number) => {
            if (step === index + 1) {
              return item;
            }

            return false;
          })}
        </Layout>
      ) : null}
      {typeof footer === 'boolean' && footer ? (
        <View
          style={[
            styles.shadow,
            {
              paddingVertical: width * 0.05,
              paddingHorizontal: width * 0.04,
            },
            step !== items.length
              ? stepperStyles.footer
              : { justifyContent: 'space-between' },
            styles.horizontalStack,
            footerContainerStyle,
          ]}
        >
          <>
            <TouchableOpacity
              style={[
                stepperStyles.button,
                previousButtonContainerStyle,
                step === 1 || backButtonDisabled
                  ? { backgroundColor: 'lightgray' }
                  : null,
              ]}
              disabled={step === 1 || backButtonDisabled}
              onPress={() => goToStep(step - 1)}
            >
              <Text
                style={[stepperStyles.buttonTitle, previousButtonTextStyle]}
              >
                {previousButtonTitle}
              </Text>
            </TouchableOpacity>

            {step !== items.length ? (
              <TouchableOpacity
                style={[
                  stepperStyles.button,
                  nextButtonContainerStyle,
                  step === items.length || nextButtonDisabled
                    ? { backgroundColor: 'lightgray' }
                    : null,
                ]}
                disabled={step === items.length || nextButtonDisabled}
                onPress={() => goToStep(step + 1)}
              >
                <Text style={[stepperStyles.buttonTitle, nextButtonTextStyle]}>
                  {nextButtonTitle}
                </Text>
              </TouchableOpacity>
            ) : LastStepFooterComponent ? (
              <LastStepFooterComponent />
            ) : null}
          </>
        </View>
      ) : footer ? (
        footer
      ) : null}
    </View>
  );
};

const stepperStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  footer: {
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'orange',
    justifyContent: 'center',
    padding: '2%',
    borderRadius: 10,
  },
  buttonTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
});

export default forwardRef(Stepper);
