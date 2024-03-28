import { GestureResponderEvent } from 'react-native';

export interface IIconProps {
  focussed: boolean;
  size: number;
  color: string;
  onLongPress?: (event: GestureResponderEvent) => void; 
  onPressOut?: (event: GestureResponderEvent) => void;
}

