import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { TrendingUp, Clock, MapPin, Eye } from 'lucide-react-native';
import { ConfessionCard } from '@/components/ConfessionCard';

// Mock data for development
const mockConfessions = [
  {
    id: '1',
    content: 'I pretend to be confident at work, but inside I feel like I have no idea what I\'m doing. Everyone thinks I\'m competent, but I\'m just really good at hiding my confusion.',
    timestamp: '2h ago',
    location: 'Downtown',
    views: 234,
    trending: true,
  },
  {
    id: '2',
    content: 'I still sleep with a nightlight at 28 years old. I tell people it\'s for "ambiance" but really I\'m scared of the dark.',
    timestamp: '4h ago',
    location: null,
    views: 156,
    trending: false,
  },
  {
    id: '3',
    content: 'I love my partner deeply, but sometimes I miss being single. Not because I want to date others, but because I miss having complete control over my time and decisions.',
    timestamp: '6h ago',
    location: 'Suburbs',
    views: 445,
    trending: true,
  },
];

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Animated.View 
        style={styles.header}
        entering={FadeInDown.duration(400)}
      >
        <Text style={styles.title}>Anonymous Confessions</Text>
        <Text style={styles.subtitle}>Share your truth, find your peace</Text>
      </Animated.View>

      {/* Filter Tabs */}
      <Animated.View 
        style={styles.filterContainer}
        entering={FadeInDown.duration(400).delay(100)}
      >
        <TouchableOpacity style={[styles.filterTab, styles.activeTab]}>
          <TrendingUp size={16} color="#8B5CF6" />
          <Text style={[styles.filterText, styles.activeFilterText]}>Trending</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterTab}>
          <Clock size={16} color="#666666" />
          <Text style={styles.filterText}>Recent</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Confessions Feed */}
      <ScrollView 
        style={styles.feed}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.feedContent}
      >
        {mockConfessions.map((confession, index) => (
          <Animated.View
            key={confession.id}
            entering={FadeInDown.duration(400).delay(200 + index * 100)}
          >
            <ConfessionCard confession={confession} />
          </Animated.View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#8B8B8B',
    fontStyle: 'italic',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    gap: 6,
  },
  activeTab: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  filterText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  feed: {
    flex: 1,
  },
  feedContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
});