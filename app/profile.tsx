import * as React from 'react';
import { View, Alert, ScrollView, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'nativewind';
import { useRouter } from 'expo-router';
import { useUser, useAuth } from '@clerk/clerk-expo';

import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';

export default function ProfileScreen() {
  const { user, isLoaded } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();
  const { colorScheme, setColorScheme } = useColorScheme();

  // Theme state with mounted check
  const [themePreference, setThemePreference] = React.useState<'light' | 'dark' | 'system'>('system');
  const isMountedRef = React.useRef(true);

  React.useEffect(() => {
    isMountedRef.current = true;
    
    loadThemePreference();
    
    return () => {
      isMountedRef.current = false; // Cleanup on unmount
    };
  }, []);

  async function loadThemePreference() {
    try {
      const saved = await AsyncStorage.getItem('themePreference');
      if (saved && isMountedRef.current) {
        const preference = saved as 'light' | 'dark' | 'system';
        setThemePreference(preference);
        if (preference !== 'system') {
          setColorScheme(preference);
        }
      }
    } catch (error) {
      console.error('Failed to load theme:', error);
    }
  }

  async function toggleTheme(value: boolean) {
    const newTheme = value ? 'dark' : 'light';
    if (isMountedRef.current) {
      await saveThemePreference(newTheme);
    }
  }

  async function useSystemTheme() {
    if (isMountedRef.current) {
      await saveThemePreference('system');
    }
  }

  async function saveThemePreference(preference: 'light' | 'dark' | 'system') {
    try {
      await AsyncStorage.setItem('themePreference', preference);
      if (isMountedRef.current) {
        setThemePreference(preference);
        if (preference !== 'system') {
          setColorScheme(preference);
        } else {
          setColorScheme('system');
        }
      }
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  }

  // ... rest of your existing functions (user data, signOut, deleteAccount, etc.) ...

  const firstName = user?.firstName ?? '';
  const lastName = user?.lastName ?? '';
  const fullName = user?.fullName || [firstName, lastName].filter(Boolean).join(' ') || 'User';
  const email = user?.primaryEmailAddress?.emailAddress || user?.emailAddresses?.[0]?.emailAddress || '';
  const imageSource = user?.imageUrl ? { uri: user.imageUrl } : undefined;
  const initials = (firstName + lastName).slice(0, 2).toUpperCase() || 'U';

  async function onSignOut() {
    await signOut();
  }

  async function deleteAccount() {
    try {
      if (!isLoaded || !user) throw new Error('User not loaded');
      await signOut({ redirectUrl: '/(auth)/sign-in' });
      Alert.alert('Success', 'Account session cleared');
      router.replace('/(auth)/sign-in');
    } catch (err) {
      Alert.alert('Error', (err as Error).message || 'Could not delete account');
    }
  }

  function confirmDelete() {
    Alert.alert(
      'Delete account',
      'This will clear your session and sign you out.',
      [{ text: 'Cancel', style: 'cancel' }, { text: 'Clear session', style: 'destructive', onPress: deleteAccount }],
    );
  }

  function onEditAvatar() {
    Alert.alert('Edit avatar', 'Hook this up to your avatar upload UI.');
  }

  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 80 }} showsVerticalScrollIndicator={false}>
        {/* Avatar card - unchanged */}
        <View className="w-full items-center mt-4">
          <Card className="w-full items-center px-6 py-8 rounded-3xl bg-card/90 shadow-lg shadow-black/10">
            <View className="items-center">
              <Avatar alt={`${fullName}'s avatar`} className="size-24 border-4 border-background">
                <AvatarImage source={imageSource} />
                <AvatarFallback><Text className="text-xl font-semibold">{initials}</Text></AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" className="mt-3 rounded-full px-4" onPress={onEditAvatar}>
                <Text className="text-xs font-medium">Edit avatar</Text>
              </Button>
            </View>
            <View className="mt-5 items-center">
              <Text className="text-2xl font-semibold tracking-tight">{fullName}</Text>
              {!!email && <Text className="mt-1 text-sm text-muted-foreground">{email}</Text>}
            </View>
          </Card>
        </View>

        {/* Account & Theme cards */}
        <View className="mt-8 gap-4">
          {/* Account overview - unchanged */}
          <Card className="p-4 rounded-2xl bg-card/80">
            <Text className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Account overview</Text>
            <View className="mt-3 gap-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-sm text-muted-foreground">Email</Text>
                <Text className="text-sm font-medium" numberOfLines={1}>{email}</Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-sm text-muted-foreground">First Name</Text>
                <Text className="text-sm font-medium">{user?.firstName || '-'}</Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-sm text-muted-foreground">Last Name</Text>
                <Text className="text-sm font-medium">{user?.lastName || '-'}</Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-sm text-muted-foreground">Email status</Text>
                <Text className="text-sm font-medium">
                  {user?.primaryEmailAddress?.verification?.status === 'verified' ? 'Verified' : 'Unverified'}
                </Text>
              </View>
            </View>
          </Card>

          {/* FIXED Theme Toggle */}
          <Card className="p-4 rounded-2xl bg-card/80">
            <Text className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Appearance</Text>
            <View className="gap-3">
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="font-medium text-sm">Dark mode</Text>
                  <Text className="text-xs text-muted-foreground mt-1">Toggle app appearance</Text>
                </View>
                <Switch
                  value={themePreference === 'dark'}
                  onValueChange={toggleTheme}
                  thumbColor={colorScheme === 'dark' ? '#9CA3AF' : '#F3F4F6'}
                  trackColor={{ false: '#D1D5DB', true: '#10B981' }}
                />
              </View>
              <Button variant="ghost" className="p-0 h-auto justify-start" onPress={useSystemTheme}>
                <Text className={`text-sm ${themePreference === 'system' ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                  Use system setting
                </Text>
              </Button>
            </View>
          </Card>
        </View>

        {/* Danger zone - unchanged */}
        <View className="mt-10 border border-destructive/20 rounded-2xl p-4 bg-destructive/5">
          <Text className="text-xs font-semibold text-destructive uppercase tracking-wide">Danger zone</Text>
          <Text className="mt-1 text-xs text-muted-foreground">These actions are irreversible.</Text>
          <View className="mt-4 flex-row gap-3">
            <Button className="flex-1 bg-red-600" onPress={confirmDelete}>
              <Text className="text-white font-medium">Delete Account</Text>
            </Button>
            <Button variant="outline" className="flex-1" onPress={onSignOut}>
              <Text className="font-medium">Sign out</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
