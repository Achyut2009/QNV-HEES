import * as React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { BarChart3, TrendingUp, DollarSign, Factory, Building2 } from 'lucide-react-native';

export default function EconomicalScreen() {
  return (
    <View className="flex-1 bg-background">
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 24,
          paddingBottom: 80, // Clears h-20 footer
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Header */}
        <View className="items-center mb-8">
          <View className="flex-row items-center gap-2 mb-4">
            <Icon as={DollarSign} size={28} className="text-emerald-600" />
            <Text className="text-3xl font-semibold text-foreground tracking-tight">
              Economic Pillars!
            </Text>
          </View>
          <Text className="text-center text-lg text-muted-foreground max-w-md">
            Building a competitive, diversified economy for sustainable prosperity.
          </Text>
        </View>

        {/* Key Stats */}
        <View className="gap-4 mb-8">
          <Card className="p-6 bg-gradient-to-r from-emerald-50 to-blue-50">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-2xl font-bold text-emerald-700">4%</Text>
                <Text className="text-sm text-muted-foreground">Target GDP Growth</Text>
              </View>
              <Icon as={TrendingUp} size={32} className="text-emerald-600" />
            </View>
          </Card>

          <View className="flex-row gap-4">
            <Card className="flex-1 p-4 bg-amber-50">
              <Text className="text-sm font-medium text-amber-800 mb-1">Non-Oil Economy</Text>
              <Text className="text-2xl font-bold text-amber-700">Diversification</Text>
            </Card>
            <Card className="flex-1 p-4 bg-blue-50">
              <Text className="text-sm font-medium text-blue-800 mb-1">Private Sector</Text>
              <Text className="text-2xl font-bold text-blue-700">Empowerment</Text>
            </Card>
          </View>
        </View>

        {/* Strategic Pillars */}
        <View className="mb-8">
          <Text className="text-xl font-semibold mb-6">Core Strategies</Text>
          <View className="gap-4">
            <Pressable className="flex-row items-center p-4 rounded-2xl bg-card/80 border border-border">
              <Icon as={BarChart3} size={24} className="text-emerald-600 mr-4" />
              <View className="flex-1">
                <Text className="font-semibold text-lg mb-1">Sound Economic Management</Text>
                <Text className="text-sm text-muted-foreground">
                  Stable growth, low inflation, attractive business climate
                </Text>
              </View>
            </Pressable>

            <Pressable className="flex-row items-center p-4 rounded-2xl bg-card/80 border border-border">
              <Icon as={Factory} size={24} className="text-amber-600 mr-4" />
              <View className="flex-1">
                <Text className="font-semibold text-lg mb-1">Economic Diversification</Text>
                <Text className="text-sm text-muted-foreground">
                  Reduce hydrocarbon dependency through priority clusters
                </Text>
              </View>
            </Pressable>

            <Pressable className="flex-row items-center p-4 rounded-2xl bg-card/80 border border-border">
              <Icon as={Building2} size={24} className="text-blue-600 mr-4" />
              <View className="flex-1">
                <Text className="font-semibold text-lg mb-1">Private Sector Growth</Text>
                <Text className="text-sm text-muted-foreground">
                  Foster entrepreneurship and attract foreign investment
                </Text>
              </View>
            </Pressable>
          </View>
        </View>

        {/* Call to Action */}
        <Card className="p-6 rounded-3xl bg-gradient-to-r from-emerald-500 to-blue-600">
          <Text className="text-xl font-semibold text-white mb-2 text-center">
            Qatar's Economic Future
          </Text>
          <Text className="text-white/90 text-center mb-6">
            Top-10 global investment destination by 2030
          </Text>
          <Button className="w-full bg-white/20 backdrop-blur-sm border-white/30">
            <Text className="text-white font-semibold">Explore Opportunities</Text>
          </Button>
        </Card>
      </ScrollView>
    </View>
  );
}
