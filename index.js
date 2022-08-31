/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
AppRegistry.registerComponent(
  Platform.OS === 'android' ? appName : 'FrontEnd',
  () => App,
);
