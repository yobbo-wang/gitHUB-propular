import DeviceInfo from 'react-native-device-info';

const NOTCH_DEVICES = ['iPhone X', 'iPhone XS', 'iPhone XS Max', 'iPhone XR', 'iPhone 11 Pro Max', 'iPhone 11'];
export const isNotch = NOTCH_DEVICES.includes(DeviceInfo.getModel());
