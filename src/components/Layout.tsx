import { ScrollView } from 'react-native';
import type { LayoutProps } from '../interfaces/Layout.interface';

export default ({ children }: LayoutProps) => {
  return (
    <ScrollView keyboardShouldPersistTaps="always" keyboardDismissMode="none">
      {children}
    </ScrollView>
  );
};
