import { SocialConnections } from '@/components/social-connections';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { useSignUp } from '@clerk/clerk-expo';
import { Link, router } from 'expo-router';
import * as React from 'react';
import { TextInput, View } from 'react-native';

export function SignUpForm() {
  const { signUp, isLoaded } = useSignUp();
  const [email, setEmail] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const firstNameInputRef = React.useRef<TextInput>(null);
  const lastNameInputRef = React.useRef<TextInput>(null);
  const passwordInputRef = React.useRef<TextInput>(null);
  const [error, setError] = React.useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
  }>({});

  async function onSubmit() {
    if (!isLoaded) return;

    // Simple front-end validation for required fields
    if (!firstName.trim()) {
      setError({ firstName: 'First name is required' });
      return;
    }
    if (!lastName.trim()) {
      setError({ lastName: 'Last name is required' });
      return;
    }
    if (!email.trim()) {
      setError({ email: 'Email is required' });
      return;
    }
    if (!password) {
      setError({ password: 'Password is required' });
      return;
    }

    // Start sign-up process using email, password and names provided
    try {
      await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      router.push(`/(auth)/sign-up/verify-email?email=${email}`);
    } catch (err) {
      // See https://go.clerk.com/mRUDrIe for more info on error handling
      if (err instanceof Error) {
        const isEmailMessage =
          err.message.toLowerCase().includes('identifier') ||
          err.message.toLowerCase().includes('email');
        setError(isEmailMessage ? { email: err.message } : { password: err.message });
        return;
      }
      console.error(JSON.stringify(err, null, 2));
    }
  }

  function onEmailSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  return (
    <View className="gap-6">
      <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">Create your account</CardTitle>
          <CardDescription className="text-center sm:text-left">
            Welcome! Please fill in the details to get started.
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <View className="gap-6">
            <View className="gap-1.5">
              <Label htmlFor="firstName">First name</Label>
              <Input
                ref={firstNameInputRef}
                id="firstName"
                placeholder="John"
                autoCapitalize="words"
                onChangeText={(t) => {
                  setFirstName(t);
                  if (error.firstName) setError((prev) => ({ ...prev, firstName: undefined }));
                }}
                returnKeyType="next"
                onSubmitEditing={() => lastNameInputRef.current?.focus()}
              />
              {error.firstName ? (
                <Text className="text-sm font-medium text-destructive">{error.firstName}</Text>
              ) : null}
            </View>
            <View className="gap-1.5">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                ref={lastNameInputRef}
                id="lastName"
                placeholder="Doe"
                autoCapitalize="words"
                onChangeText={(t) => {
                  setLastName(t);
                  if (error.lastName) setError((prev) => ({ ...prev, lastName: undefined }));
                }}
                returnKeyType="next"
                onSubmitEditing={() => {
                  // focus email next (email input uses submitBehavior to move focus)
                }}
              />
              {error.lastName ? (
                <Text className="text-sm font-medium text-destructive">{error.lastName}</Text>
              ) : null}
            </View>
            <View className="gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                keyboardType="email-address"
                autoComplete="email"
                autoCapitalize="none"
                onChangeText={(t) => {
                  setEmail(t);
                  if (error.email) setError((prev) => ({ ...prev, email: undefined }));
                }}
                onSubmitEditing={onEmailSubmitEditing}
                returnKeyType="next"
                submitBehavior="submit"
              />
              {error.email ? (
                <Text className="text-sm font-medium text-destructive">{error.email}</Text>
              ) : null}
            </View>
            <View className="gap-1.5">
              <View className="flex-row items-center">
                <Label htmlFor="password">Password</Label>
              </View>
              <Input
                ref={passwordInputRef}
                id="password"
                secureTextEntry
                onChangeText={setPassword}
                returnKeyType="send"
                onSubmitEditing={onSubmit}
              />
              {error.password ? (
                <Text className="text-sm font-medium text-destructive">{error.password}</Text>
              ) : null}
            </View>
            <Button className="w-full" onPress={onSubmit}>
              <Text>Continue</Text>
            </Button>
          </View>
          <Text className="text-center text-sm">
            Already have an account?{' '}
            <Link href="/(auth)/sign-in" dismissTo className="text-sm underline underline-offset-4">
              Sign in
            </Link>
          </Text>
          <View className="flex-row items-center">
            <Separator className="flex-1" />
            <Text className="px-4 text-sm text-muted-foreground">or</Text>
            <Separator className="flex-1" />
          </View>
          <SocialConnections />
        </CardContent>
      </Card>
    </View>
  );
}
