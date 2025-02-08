import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import type { StepHeaderItemProps } from './interfaces/StepHeaderItem.interface';
import type { StepperProps } from './interfaces/Stepper.interface';
import type { LayoutProps } from './interfaces/Layout.interface';
import type { StepperItemProps } from './interfaces/StepperItem.interface';

const { width } = Dimensions.get('window');

const Layout = ({ children }: LayoutProps) => {
  return (
    <ScrollView keyboardShouldPersistTaps="always" keyboardDismissMode="none">
      {children}
    </ScrollView>
  );
};

const StepHeaderItem = ({
  number,
  isActive = false,
  isLast = false,
  changeActiveStep = null,
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
            stepperStyles.headerItem,
            { backgroundColor: isActive ? '#42B9FF' : 'gray' },
          ]}
        >
          <Text style={stepperStyles.headerItemNumber}>{number}</Text>
        </View>
      </Pressable>
      {!isLast ? <View style={stepperStyles.divider} /> : null}
    </>
  );
};

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

    nextButtonTitle = 'Next',
    previousButtonTitle = 'Previous',
  }: StepperProps,
  ref?: React.Ref<any>
) => {
  const [step, setStep] = useState(1);
  const [items, setItems] = useState<any>([]);

  const goToStep = useCallback(
    (stepNumber: number) => {
      if (stepNumber > items.length && stepNumber < 0) return;
      setStep(stepNumber);
    },
    [items.length]
  );

  useEffect(() => {
    if (onActiveStepChange) {
      onActiveStepChange(step);
    }
  }, [step, onActiveStepChange]);

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

  const numerationWidth = items.length * width * 0.25;

  useImperativeHandle(ref, () => ({
    goToStep,
  }));

  return (
    <View style={[containerStyle, stepperStyles.container]}>
      <View style={[{ paddingVertical: width * 0.05 }, styles.shadow]}>
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
                console.log(typeof item);
                return (
                  <StepHeaderItem
                    isActive={index + 1 === step}
                    key={`STEP_HEADER_ITEM_${index}`}
                    number={index + 1}
                    isLast={index === items.length - 1}
                    changeActiveStep={canClickStepNumber ? setStep : null}
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
      {typeof footer === 'boolean' ? (
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
          ]}
        >
          <>
            <TouchableOpacity
              style={[
                stepperStyles.button,
                step === 1 || backButtonDisabled
                  ? { backgroundColor: 'lightgray' }
                  : null,
              ]}
              disabled={step === 1 || backButtonDisabled}
              onPress={() => goToStep(step - 1)}
            >
              <Text style={stepperStyles.buttonTitle}>
                {previousButtonTitle}
              </Text>
            </TouchableOpacity>

            {step !== items.length ? (
              <TouchableOpacity
                style={[
                  stepperStyles.button,
                  step === items.length || nextButtonDisabled
                    ? { backgroundColor: 'lightgray' }
                    : null,
                ]}
                disabled={step === items.length || nextButtonDisabled}
                onPress={() => goToStep(step + 1)}
              >
                <Text style={stepperStyles.buttonTitle}>{nextButtonTitle}</Text>
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

/**
 * Stepper Item
 * @param {StepperItemProps} props
 * @returns {React.ReactNode}
 */
export const StepperItem = ({
  title,
  children,
  contentContainerStyle = null,
}: StepperItemProps) => {
  return (
    <>
      <Text style={[stepperStyles.headerItemText, { color: 'black' }]}>
        {title}
      </Text>
      <View style={[stepperStyles.content, contentContainerStyle]}>
        {children}
      </View>
    </>
  );
};

const headerItemSize = width * 0.08;
const stepperStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    flex: 1,
  },
  headerItem: {
    borderRadius: headerItemSize / 2,
    width: headerItemSize,
    height: headerItemSize,
    justifyContent: 'center',
  },
  headerItemNumber: {
    fontSize: 15,
    textAlign: 'center',
    color: 'white',
    fontWeight: '500',
  },
  headerItemText: {
    fontSize: width * 0.08,
    textAlign: 'center',
    marginTop: '2%',
    fontWeight: '500',
  },
  divider: {
    width: width * 0.018,
    borderWidth: 1,
    borderColor: '#DBDBDB',
    marginHorizontal: '2%',
    alignSelf: 'center',
  },
  content: {
    marginVertical: '2%',
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

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
  },
  verticalStack: {
    display: 'flex',
    flexDirection: 'column',
  },
  horizontalStack: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default forwardRef(Stepper);
