import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Eye, TrendingUp } from 'lucide-react-native';
import Animated, { FadeIn, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface Confession {
  id: string;
  content: string;
  timestamp: string;
  location?: string | null;
  views: number;
  trending: boolean;
}

interface ConfessionCardProps {
  confession: Confession;
}

export function ConfessionCard({ confession }: ConfessionCardProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.98);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        style={styles.card}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        {/* Mask Icon - Anonymity Indicator */}
        <View style={styles.header}>
          <View style={styles.maskContainer}>
            <View style={styles.mask} />
            <Text style={styles.anonymousText}>Anonymous</Text>
          </View>
          {confession.trending && (
            <View style={styles.trendingBadge}>
              <TrendingUp size={12} color="#FF6B6B" />
              <Text style={styles.trendingText}>Trending</Text>
            </View>
          )}
        </View>

        {/* Confession Content */}
        <Text style={styles.content}>{confession.content}</Text>

        {/* Footer with metadata */}
        <View style={styles.footer}>
          <View style={styles.leftFooter}>
            <Text style={styles.timestamp}>{confession.timestamp}</Text>
            {confession.location && (
              <View style={styles.locationContainer}>
                <MapPin size={12} color="#8B5CF6" />
                <Text style={styles.locationText}>{confession.location}</Text>
              </View>
            )}
          </View>
          <View style={styles.rightFooter}>
            <Eye size={14} color="#666666" />
            <Text style={styles.viewCount}>{confession.views}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  maskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  mask: {
    width: 20,
    height: 20,
    backgroundColor: '#8B5CF6',
    borderRadius: 10,
    opacity: 0.8,
  },
  anonymousText: {
    fontSize: 12,
    color: '#8B8B8B',
    fontWeight: '500',
  },
  trendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#FF6B6B20',
    borderRadius: 12,
  },
  trendingText: {
    fontSize: 10,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  content: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  timestamp: {
    fontSize: 12,
    color: '#666666',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  rightFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewCount: {
    fontSize: 12,
    color: '#666666',
  },
});