import * as React from 'react';
import { View, Pressable } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Icon } from '@/components/ui/icon';
import { Home as HomeIcon, User as UserIcon, CandlestickChart } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

export function Footer() {
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  const pathname = usePathname();

  // Determine active tab based on current route
  const isHomeActive = pathname === '/' || pathname === '/index';
  const isEconomicalActive = pathname === '/economical';
  const isProfileActive = pathname === '/profile' || pathname === '/profile/index';

  const handleNavigation = (route: string) => {
    router.navigate(route as any);
  };

  const TabButton = ({ 
    isActive, 
    icon: IconComponent, 
    onPress,
    ariaLabel 
  }: {
    isActive: boolean;
    icon: any;
    onPress: () => void;
    ariaLabel: string;
  }) => (
    <Pressable
      onPress={onPress}
      className="flex-1 items-center justify-start pt-3 h-full"
      aria-label={ariaLabel}
    >
      <Icon
        as={IconComponent}
        size={24}
        className={`
          transition-colors duration-200
          ${isActive
            ? colorScheme === 'dark'
              ? 'text-emerald-400 shadow-lg shadow-emerald-500/25' 
              : 'text-emerald-600 shadow-lg shadow-emerald-300/50'
            : colorScheme === 'dark'
              ? 'text-muted-foreground/60'
              : 'text-muted-foreground/70'
          }
        `}
      />
    </Pressable>
  );

  return (
    <View className="absolute bottom-0 left-0 right-0 flex-row items-center justify-center border-t border-border/40 bg-background h-20 z-50">
      <TabButton
        isActive={isHomeActive}
        icon={HomeIcon}
        onPress={() => handleNavigation('/')}
        ariaLabel="Home"
      />

      <TabButton
        isActive={isEconomicalActive}
        icon={CandlestickChart}
        onPress={() => handleNavigation('/economical')}
        ariaLabel="Economical"
      />

      <TabButton
        isActive={isProfileActive}
        icon={UserIcon}
        onPress={() => handleNavigation('/profile')}
        ariaLabel="Profile"
      />
    </View>
  );
}
