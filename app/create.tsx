import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { MapPin, Send, AlertCircle } from 'lucide-react-native';

export default function Create() {
  const [confession, setConfession] = useState('');
  const [includeLocation, setIncludeLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mock: Check if user has posted today
  const hasPostedToday = false; // This will be connected to Supabase later
  
  const maxLength = 500;
  const remainingChars = maxLength - confession.length;

  const handleSubmit = async () => {
    if (!confession.trim()) {
      Alert.alert('Error', 'Please write your confession first.');
      return;
    }

    if (hasPostedToday) {
      Alert.alert('Daily Limit Reached', 'You can only post one confession per day. Come back tomorrow!');
      return;
    }

    setIsSubmitting(true);
    
    // TODO: Connect to Supabase
    setTimeout(() => {
      setIsSubmitting(false);
      setConfession('');
      setIncludeLocation(false);
      Alert.alert('Posted!', 'Your anonymous confession has been shared.');
    }, 1500);
  };

  if (hasPostedToday) {
    return (
      <SafeAreaView style={styles.container}>
        <Animated.View 
          style={styles.limitReachedContainer}
          entering={FadeInUp.duration(400)}
        >
          <View style={styles.limitIcon}>
            <AlertCircle size={48} color="#FF6B6B" />
          </View>
          <Text style={styles.limitTitle}>Daily Limit Reached</Text>
          <Text style={styles.limitSubtitle}>
            You've already shared your truth today. Return tomorrow to confess again.
          </Text>
          <Text style={styles.limitNote}>
            This limit helps maintain quality and prevents spam.
          </Text>
        </Animated.View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Animated.View 
        style={styles.header}
        entering={FadeInDown.duration(400)}
      >
        <Text style={styles.title}>Share Your Truth</Text>
        <Text style={styles.subtitle}>Anonymous • Safe • Judgment-free</Text>
      </Animated.View>

      {/* Confession Input */}
      <Animated.View 
        style={styles.inputContainer}
        entering={FadeInDown.duration(400).delay(100)}
      >
        <TextInput
          style={styles.textInput}
          placeholder="What's weighing on your mind? Share your truth..."
          placeholderTextColor="#666666"
          multiline
          value={confession}
          onChangeText={setConfession}
          maxLength={maxLength}
          textAlignVertical="top"
        />
        <View style={styles.inputFooter}>
          <Text style={[
            styles.charCount,
            remainingChars < 50 ? styles.charCountWarning : {}
          ]}>
            {remainingChars} characters remaining
          </Text>
        </View>
      </Animated.View>

      {/* Location Toggle */}
      <Animated.View 
        style={styles.optionContainer}
        entering={FadeInDown.duration(400).delay(200)}
      >
        <View style={styles.optionHeader}>
          <MapPin size={20} color="#8B5CF6" />
          <Text style={styles.optionTitle}>Include general location</Text>
        </View>
        <Switch
          value={includeLocation}
          onValueChange={setIncludeLocation}
          trackColor={{ false: '#2A2A2A', true: '#8B5CF6' }}
          thumbColor="#FFFFFF"
        />
      </Animated.View>

      {includeLocation && (
        <Animated.View 
          style={styles.locationNote}
          entering={FadeInDown.duration(300)}
        >
          <Text style={styles.locationNoteText}>
            Only your general area (like "Downtown" or "Suburbs") will be shown. Your exact location stays private.
          </Text>
        </Animated.View>
      )}

      {/* Submit Button */}
      <Animated.View 
        style={styles.submitContainer}
        entering={FadeInDown.duration(400).delay(300)}
      >
        <TouchableOpacity
          style={[
            styles.submitButton,
            (!confession.trim() || isSubmitting) ? styles.submitButtonDisabled : {}
          ]}
          onPress={handleSubmit}
          disabled={!confession.trim() || isSubmitting}
        >
          <Send size={20} color={(!confession.trim() || isSubmitting) ? "#666666" : "#FFFFFF"} />
          <Text style={[
            styles.submitButtonText,
            (!confession.trim() || isSubmitting) ? styles.submitButtonTextDisabled : {}
          ]}>
            {isSubmitting ? 'Sharing...' : 'Share Anonymously'}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Privacy Note */}
      <Animated.View 
        style={styles.privacyNote}
        entering={FadeInDown.duration(400).delay(400)}
      >
        <Text style={styles.privacyText}>
          🎭 Your identity is completely anonymous. No personal information is stored or shared.
        </Text>
      </Animated.View>
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
  inputContainer: {
    margin: 20,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    overflow: 'hidden',
  },
  textInput: {
    padding: 20,
    fontSize: 16,
    color: '#FFFFFF',
    minHeight: 200,
    fontFamily: 'System',
  },
  inputFooter: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    alignItems: 'flex-end',
  },
  charCount: {
    fontSize: 12,
    color: '#666666',
  },
  charCountWarning: {
    color: '#FF6B6B',
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  optionTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  locationNote: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#8B5CF620',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#8B5CF640',
  },
  locationNoteText: {
    fontSize: 12,
    color: '#8B5CF6',
    textAlign: 'center',
  },
  submitContainer: {
    marginHorizontal: 20,
    marginTop: 'auto',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#8B5CF6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#2A2A2A',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  submitButtonTextDisabled: {
    color: '#666666',
  },
  privacyNote: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  privacyText: {
    fontSize: 14,
    color: '#8B8B8B',
    textAlign: 'center',
    lineHeight: 20,
  },
  limitReachedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  limitIcon: {
    marginBottom: 24,
  },
  limitTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  limitSubtitle: {
    fontSize: 16,
    color: '#8B8B8B',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  limitNote: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});