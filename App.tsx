import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <View style={styles.overlay} />
      
      <StatusBar style="light" />
      
      {/* Logo Section */}
      <View style={styles.header}>
        {/* Correctly reference the local image */}
        <Image source={require('./assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>TaskBolt.io</Text>
      </View>

      {/* Tagline and Description */}
      <Text style={styles.tagline}>Automate Your Job Scheduling</Text>
      <Text style={styles.description}>
        Streamline your workflow with TaskBolt.io. Assign, track, and complete jobs in real-time. Perfect for businesses looking to optimize field operations.
      </Text>

      {/* Call to Action Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 TaskBolt.io - All rights reserved.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26, 26, 46, 0.85)',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 124,
    height: 124,
    marginBottom: 10,
  },
  title: {
    fontSize: 36,
    color: '#f8f9fa',
    fontWeight: 'bold',
  },
  tagline: {
    fontSize: 24,
    color: '#f8f9fa',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#c5c6c7',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#4ecca3',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
  },
  buttonText: {
    color: '#1a1a2e',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#c5c6c7',
    fontSize: 14,
  },
});