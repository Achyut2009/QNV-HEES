import * as React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { useUser } from '@clerk/clerk-expo';
import {
  TrendingUp,
  Building2,
  BarChart3,
  Leaf,
  Users,
  Award,
  Globe,
  FileText
} from 'lucide-react-native';

export default function Screen() {
  const { user, isLoaded } = useUser();
  const { colorScheme } = useColorScheme();
  const firstName = user?.firstName ?? '';
  const lastName = user?.lastName ?? '';

  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-lg text-muted-foreground">Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      className="flex-1" 
      contentContainerStyle={{ padding: 24, paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Clean Header */}
      <View className="mb-12">
        <Text className="text-2xl font-semibold text-foreground mb-2">
          Welcome back, {firstName} {lastName}
        </Text>
        <Text className="text-lg text-muted-foreground">
          Qatar National Vision 2030
        </Text>
      </View>

      {/* Executive Summary Cards */}
      <View className="gap-4 mb-12">
        <Text className="text-xl font-semibold mb-6">Executive Summary</Text>
        <View className="gap-4">
          <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-all">
            <View className="flex-row items-start gap-4">
              <View className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl items-center justify-center flex-shrink-0">
                <Icon as={TrendingUp} size={20} className="text-emerald-600 dark:text-emerald-400" />
              </View>
              <View className="flex-1 pt-1">
                <Text className="text-2xl font-bold text-foreground">4.2%</Text>
                <Text className="text-sm font-medium text-muted-foreground mt-1">Economic Growth YTD</Text>
                <Text className="text-xs text-emerald-600 font-medium mt-2">+1.2% vs last quarter</Text>
              </View>
            </View>
          </Card>

          <View className="grid grid-cols-2 gap-4">
            <Card className="p-4 border-0 shadow-sm">
              <View className="flex-row items-center justify-between">
                <Icon as={Building2} size={20} className="text-blue-600" />
                <View className="text-right">
                  <Text className="font-bold text-lg">127</Text>
                  <Text className="text-xs text-muted-foreground">Active Projects</Text>
                </View>
              </View>
            </Card>
            <Card className="p-4 border-0 shadow-sm">
              <View className="flex-row items-center justify-between">
                <Icon as={Leaf} size={20} className="text-green-600" />
                <View className="text-right">
                  <Text className="font-bold text-lg">89%</Text>
                  <Text className="text-xs text-muted-foreground">Sustainability Compliance</Text>
                </View>
              </View>
            </Card>
          </View>
        </View>
      </View>

      {/* Priority Pillars */}
      <View className="gap-4 mb-12">
        <Text className="text-xl font-semibold mb-6">Priority Pillars</Text>
        <View className="gap-4">
          <Pressable 
            className="p-6 rounded-2xl border border-border/50 hover:border-border hover:shadow-md transition-all bg-card"
            onPress={() => router.push('/economical')}
          >
            <View className="flex-row items-center gap-4">
              <View className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl items-center justify-center flex-shrink-0">
                <Icon as={BarChart3} size={24} className="text-white" />
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-lg mb-1">Economic Development</Text>
                <Text className="text-muted-foreground mb-3">
                  Diversification initiatives and private sector growth
                </Text>
                <View className="flex-row items-center gap-2">
                  <View className="w-2 h-2 bg-blue-500 rounded-full" />
                  <Text className="text-sm text-muted-foreground">27 projects • QAR 4.2B</Text>
                </View>
              </View>
              <Icon as={TrendingUp} size={20} className="text-blue-600 ml-auto" />
            </View>
          </Pressable>

          <Pressable className="p-6 rounded-2xl border border-border/50 hover:border-border hover:shadow-md transition-all bg-card">
            <View className="flex-row items-center gap-4">
              <View className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl items-center justify-center flex-shrink-0">
                <Icon as={Leaf} size={24} className="text-white" />
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-lg mb-1">Environmental Sustainability</Text>
                <Text className="text-muted-foreground mb-3">
                  Green initiatives and carbon reduction targets
                </Text>
                <View className="flex-row items-center gap-2">
                  <View className="w-2 h-2 bg-green-500 rounded-full" />
                  <Text className="text-sm text-muted-foreground">15 projects • with 89% compliant</Text>
                </View>
              </View>
              <Icon as={TrendingUp} size={20} className="text-green-600 ml-auto" />
            </View>
          </Pressable>
        </View>
      </View>

      {/* Recent Activity */}
      <View className="gap-4 mb-12">
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-xl font-semibold">Recent Activity</Text>
          <Button variant="ghost" size="sm">
            <Text className="text-sm text-blue-600 font-medium">View all</Text>
          </Button>
        </View>
        <View className="gap-3">
          {[
            { icon: Users, label: 'Human Capital project approved', time: '2h ago', color: 'indigo' },
            { icon: FileText, label: 'Economic diversification report', time: '1d ago', color: 'amber' },
            { icon: Globe, label: 'Sustainability audit completed', time: '3d ago', color: 'green' },
          ].map((item, index) => (
            <Pressable key={index} className="p-4 -m-4 rounded-2xl bg-card hover:bg-muted transition-all flex-row items-center gap-4">
              <View className={`w-10 h-10 bg-${item.color}-100 dark:bg-${item.color}-900/50 rounded-xl items-center justify-center flex-shrink-0`}>
                <Icon as={item.icon} size={20} className={`text-${item.color}-600`} />
              </View>
              <View className="flex-1 min-w-0">
                <Text className="font-medium text-sm mb-1">{item.label}</Text>
                <Text className="text-xs text-muted-foreground">{item.time}</Text>
              </View>
              <Icon as={TrendingUp} size={16} className={`text-${item.color}-600`} />
            </Pressable>
          ))}
        </View>
      </View>

      {/* Clean CTA */}
      <Card className="p-8 rounded-2xl border-0 shadow-sm">
        <View className="items-center">
          <Text className="text-xl font-semibold text-foreground mb-3 text-center">
            Ready to align your project?
          </Text>
          <Button className="w-full max-w-sm">
            <Text className="font-semibold">Start Alignment Process</Text>
          </Button>
        </View>
      </Card>
    </ScrollView>
  );
}
