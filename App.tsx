import React from 'react';
import {LogBox} from 'react-native';
import Route from './src/navigation';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

LogBox.ignoreAllLogs();

const App = () => {
  return <Route />;
};

export default App;
