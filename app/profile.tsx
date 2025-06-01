import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { User, Clock, TrendingUp, MapPin, Settings, Info } from 'lucide-react-native';

export default function Profile() {
  // Mock data - will be connected to Supabase later
  const userStats = {
    totalPosts: 12,
    totalViews: 1847,
    lastPost: '2 days ago',
    postsThisWeek: 3,
    canPostToday: true,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View 
          style={styles.header}
          entering={FadeInDown.duration(400)}
        >
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>🎭</Text>
            </View>
          </View>
          <Text style={styles.title}>Your Anonymous Journey</Text>
          <Text style={styles.subtitle}>Every truth matters</Text>
        </Animated.View>

        {/* Today's Status */}
        <Animated.View 
          style={styles.statusCard}
          entering={FadeInDown.duration(400).delay(100)}
        >
          <View style={styles.statusHeader}>
            <Clock size={20} color="#8B5CF6" />
            <Text style={styles.statusTitle}>Today's Status</Text>
          </View>
          <View style={styles.statusContent}>
            {userStats.canPostToday ? (
              <>
                <Text style={styles.statusGood}>✨ Ready to confess</Text>
                <Text style={styles.statusDescription}>
                  You can share one anonymous confession today
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.statusUsed}>⏰ Daily limit reached</Text>
                <Text style={styles.statusDescription}>
                  Come back tomorrow to share again
                </Text>
              </>
            )}
          </View>
        </Animated.View>

        {/* Stats Grid */}
        <Animated.View 
          style={styles.statsContainer}
          entering={FadeInDown.duration(400).delay(200)}
        >
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <User size={20} color="#8B5CF6" />
            </View>
            <Text style={styles.statNumber}>{userStats.totalPosts}</Text>
            <Text style={styles.statLabel}>Total Confessions</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <TrendingUp size={20} color="#FF6B6B" />
            </View>
            <Text style={styles.statNumber}>{userStats.totalViews.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Total Views</Text>
          </View>
        </Animated.View>

        <Animated.View 
          style={styles.statsContainer}
          entering={FadeInDown.duration(400).delay(250)}
        >
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Clock size={20} color="#10B981" />
            </View>
            <Text style={styles.statNumber}>{userStats.postsThisWeek}</Text>
            <Text style={styles.statLabel}>This Week</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <MapPin size={20} color="#F59E0B" />
            </View>
            <Text style={styles.statNumber}>{userStats.lastPost}</Text>
            <Text style={styles.statLabel}>Last Post</Text>
          </View>
        </Animated.View>

        {/* Settings Section */}
        <Animated.View 
          style={styles.settingsContainer}
          entering={FadeInDown.duration(400).delay(300)}
        >
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <MapPin size={20} color="#8B5CF6" />
              <Text style={styles.settingText}>Location Preferences</Text>
            </View>
            <Text style={styles.settingValue}>Auto-detect</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Settings size={20} color="#8B5CF6" />
              <Text style={styles.settingText}>Privacy Settings</Text>
            </View>
            <Text style={styles.settingValue}>Maximum</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* About Section */}
        <Animated.View 
          style={styles.aboutContainer}
          entering={FadeInDown.duration(400).delay(400)}
        >
          <View style={styles.aboutHeader}>
            <Info size={20} color="#8B5CF6" />
            <Text style={styles.sectionTitle}>About Anonymous Confessions</Text>
          </View>
          <Text style={styles.aboutText}>
            This is a safe space for honest expression. Your identity is completely anonymous, 
            and no personal data is stored. The daily limit encourages thoughtful sharing and 
            helps maintain a quality community.
          </Text>
          <Text style={styles.aboutText}>
            Remember: Your confessions can help others feel less alone in their struggles.
          </Text>
        </Animated.View>
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
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1A1A1A',
    borderWidth: 2,
    borderColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#8B8B8B',
    fontStyle: 'italic',
  },
  statusCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  statusContent: {
    alignItems: 'center',
  },
  statusGood: {
    fontSize: 18,
    fontWeight: '600',
    color: '#10B981',
    marginBottom: 4,
  },
  statusUsed: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF6B6B',
    marginBottom: 4,
  },
  statusDescription: {
    fontSize: 14,
    color: '#8B8B8B',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 12,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    alignItems: 'center',
  },
  statIcon: {
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#8B8B8B',
    textAlign: 'center',
  },
  settingsContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    marginBottom: 8,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  settingValue: {
    fontSize: 14,
    color: '#8B8B8B',
  },
  aboutContainer: {
    marginHorizontal: 20,
    marginBottom: 40,
    padding: 20,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  aboutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  aboutText: {
    fontSize: 14,
    color: '#8B8B8B',
    lineHeight: 20,
    marginBottom: 12,
  },
});