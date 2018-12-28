/**
 * Stub of AmplitudeSDK for React Native
 *
 * @providesModule AmplitudeSDK
 * @flow
 */
'use strict';

// Libraries
import { NativeModules, Platform } from 'react-native';

// Native Modules
const { RNAmplitudeSDK } = NativeModules;
let amplitudeHasInitialized = false;
let initializing = false;
let evPrefix = null;


/**
 * Creates a new Amplitude client
 */
function construct(apiKey, trackSessionEvents, eventPrefix) {
  if (apiKey && typeof apiKey === 'string') {
    if (RNAmplitudeSDK) {
      if (eventPrefix) {
        evPrefix = eventPrefix;
      }
      initializing = true;
      return RNAmplitudeSDK.initialize(apiKey, trackSessionEvents === true).then(() => {
        initializing = false;
        amplitudeHasInitialized = true;
        trackDeferredLogs();
      });
    } else {
      throw new Error('RNAmplitudeSDK: No native client found. Is RNAmplitudeSDK installed in your native code project?');
    }
  } else {
    throw new Error('RNAmplitudeSDK: A client must be constructed with an API key. i.e new Amplitude(key);');
  }
}

// --------------------------------------------------
// Identify
// --------------------------------------------------
function setUserId(userId) {
  if (amplitudeHasInitialized) {
    return RNAmplitudeSDK.setUserId(userId ? userId.toString() : null);
  } else {
    throw new Error('You called Amplitude.setUserId before initializing it. Run new Amplitute(key) first.');
  }
}

function setUserProperties(properties) {
  if (amplitudeHasInitialized) {
    return RNAmplitudeSDK.setUserProperties(properties);
  } else {
    throw new Error('You called Amplitude.setUserProperties before initializing it. Run new Amplitute(key) first.');
  }
}

function setOptOut(optOut) {
  if (amplitudeHasInitialized) {
    return RNAmplitudeSDK.setOptOut(optOut);
  } else {
    throw new Error('You called Amplitude.setOptOut before initializing it. Run new Amplitute(key) first.');
  }
}

function clearUserProperties() {
  if (amplitudeHasInitialized) {
    return RNAmplitudeSDK.clearUserProperties();
  } else {
    throw new Error('You called Amplitude.clearUserProperties before initializing it. Run new Amplitute(key) first.');
  }
}

function getDeviceId() {
  if (amplitudeHasInitialized) {
    return RNAmplitudeSDK.getDeviceId();
  } else {
    throw new Error('You called Amplitude.getDeviceId before initializing it. Run new Amplitude(key) first.')
  }
}

function regenerateDeviceId() {
  if (amplitudeHasInitialized) {
    return RNAmplitudeSDK.regenerateDeviceId();
  } else {
    throw new Error('You called Amplitude.regenerateDeviceId before initializing it. Run new Amplitute(key) first.');
  }
}

function setLogEventPrefix(prefix) {
  if (amplitudeHasInitialized) {
    evPrefix = prefix;
  } else {
    throw new Error('You called Amplitude.setLogEventPrefix before initializing it. Run new Amplitute(key) first.');
  }
}

// --------------------------------------------------
// Track
// --------------------------------------------------
let deferredLogs = [];

function logEvent(name, properties) {
  if (amplitudeHasInitialized) {
    var eventName = evPrefix ? evPrefix + name : name;
    if (properties) {
      return RNAmplitudeSDK.logEventWithProps(eventName, properties);
    } else {
      return RNAmplitudeSDK.logEvent(eventName);
    }
  } else if (initializing) {
    deferredLogs.push({name, properties, timestamp: new Date().valueOf()})
  } else {
    throw new Error('You called Amplitude.logEvent before initializing it. Run new Amplitute(key) first.');
  }
}

function logEventWithTimestamp(name, timestamp, properties = {}) {
  if (amplitudeHasInitialized) {
    var eventName = evPrefix ? evPrefix + name : name;
    return RNAmplitudeSDK.logEventWithTimestamp(eventName, timestamp, properties);
  } else if (initializing) {
    deferredLogs.push({name, properties, timestamp})
  } else {
    throw new Error(
      'You called Amplitude.logEvent before initializing it. Run new Amplitute(key) first.'
    );
  }
}

function trackDeferredLogs() {
  deferredLogs.forEach(({name, properties, timestamp}) => {
    console.tron.debug('deferred');
    logEventWithTimestamp(name, timestamp, properties);
  })
  deferredLogs = [];
}

// --------------------------------------------------
// Revenue
// --------------------------------------------------
function logRevenue(productIdentifier, quantity, amount, receipt) {
  if (amplitudeHasInitialized) {
    if (Platform.OS === 'ios') {
      return RNAmplitudeSDK.logRevenue(productIdentifier, quantity, amount, receipt);
    } else {
      return RNAmplitudeSDK.logRevenue(productIdentifier, quantity, amount);
    }
  } else {
    throw new Error('You called Amplitude.logRevenue before initializing it. Run new Amplitute(key) first.');
  }
}

function addToUserProperty(property, amount) {
  if (amplitudeHasInitialized) {
    return RNAmplitudeSDK.addToUserProperty(property, amount);
  } else {
    throw new Error('You called Amplitude.addToUserPropery before initializing it. Run new Amplitute(key) first.');
  }
}

function setUserPropertyOnce(property, value) {
  if (amplitudeHasInitialized) {
    return RNAmplitudeSDK.setUserPropertyOnce(property, value);
  } else {
    throw new Error('You called Amplitude.setUserPropertyOnce before initializing it. Run new Amplitute(key) first.');
  }
}

export default {
  construct,
  setUserId,
  setUserProperties,
  setOptOut,
  clearUserProperties,
  getDeviceId,
  regenerateDeviceId,
  logEvent,
  logEventWithTimestamp,
  logRevenue,
  addToUserProperty,
  setUserPropertyOnce
}
