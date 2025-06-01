import { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { Home, PlusCircle, User } from 'lucide-react-native';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#1A1A1A',
            borderTopColor: '#2A2A2A',
            borderTopWidth: 1,
            height: 80,
            paddingBottom: 20,
            paddingTop: 10,
          },
          tabBarActiveTintColor: '#8B5CF6',
          tabBarInactiveTintColor: '#666666',
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Feed',
            tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: 'Confess',
            tabBarIcon: ({ color, size }) => <PlusCircle size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
          }}
        />
      </Tabs>
      <StatusBar style="light" backgroundColor="#000000" />
    </>
  );
}