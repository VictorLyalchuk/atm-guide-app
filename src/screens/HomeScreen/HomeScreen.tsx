import React from 'react';
import { View, Text, Button } from 'react-native';
import { Tabs, TabScreen, TabsProvider } from 'react-native-paper-tabs';

import Instruction from '../../components/Instruction/Instruction';
import Diagnostic from '../../components/Diagnostic/Diagnostic';
import ErrorCodes from '../../components/ErrorCodes/ErrorCodes';
import Support from '../../components/Support/Support';

export default function HomeScreen() {
  return (
    <View>
      <View style={{ width: '100%', minHeight: '75%' }}>
        <TabsProvider defaultIndex={0}>
          <Tabs theme={{ colors: { primary: '#059c75' } }}>
            <TabScreen label="Інструкція">
              <Instruction />
            </TabScreen>
            <TabScreen label="Діагностика">
              <Diagnostic />
            </TabScreen>
            <TabScreen label="Коди помилок">
              <ErrorCodes />
            </TabScreen>
          </Tabs>
        </TabsProvider>
      </View>
      <View style={{ backgroundColor: '#f0f0f0', height: '25%' }}>
        <Support />
      </View>
    </View>
  );
}
