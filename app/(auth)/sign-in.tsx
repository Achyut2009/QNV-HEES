import { SignInForm } from '@/components/sign-in-form';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { router } from 'expo-router';

export default function SignInScreen() {
  const { isSignedIn, isLoaded } = useAuth();

  React.useEffect(() => {
    if (isLoaded && isSignedIn) {
      // If already signed in, send them to the app root (do not show sign-in)
      router.replace('/');
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) return null;

  if (isSignedIn) {
    // While the redirect is happening, render nothing.
    return null;
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerClassName="sm:flex-1 items-center justify-center p-4 py-8 sm:py-4 sm:p-6 mt-safe"
      keyboardDismissMode="interactive">
      <View className="w-full max-w-sm">
        <SignInForm />
      </View>
    </ScrollView>
  );
}
