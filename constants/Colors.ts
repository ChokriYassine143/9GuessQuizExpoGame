// Color palette for the 9Guess app
export const Colors = {
  primary: {
    50: '#FFF0F0',
    100: '#FFE0E0',
    200: '#FFC2C2',
    300: '#FFA3A3',
    400: '#FF8585',
    500: '#FF6B6B', // Primary color
    600: '#FF4D4D',
    700: '#FF2E2E',
    800: '#FF1010',
    900: '#EB0000',
  },
  secondary: {
    50: '#E8FAF8',
    100: '#D0F5F1',
    200: '#A2EBE3',
    300: '#73E0D4',
    400: '#4ECDC4', // Secondary color
    500: '#2EB8AF',
    600: '#25938C',
    700: '#1C6E68',
    800: '#144A45',
    900: '#0B2522',
  },
  accent: {
    50: '#FFFDF2',
    100: '#FFFBE6',
    200: '#FFF7CC',
    300: '#FFF3B3',
    400: '#FFEF99',
    500: '#FFE66D', // Accent color
    600: '#FFD21A',
    700: '#E6B800',
    800: '#B39000',
    900: '#806700',
  },
  success: {
    50: '#E7F8EF',
    100: '#CFF1DF',
    200: '#9FE3BF',
    300: '#6FD59F',
    400: '#3FC77F',
    500: '#2CA86A', // Success color
    600: '#238755',
    700: '#1A6640',
    800: '#11442A',
    900: '#082215',
  },
  warning: {
    50: '#FFF9EC',
    100: '#FFF3D9',
    200: '#FFE7B3',
    300: '#FFDB8C',
    400: '#FFCF66',
    500: '#FFC341', // Warning color
    600: '#FFB30D',
    700: '#D99000',
    800: '#A66D00',
    900: '#734B00',
  },
  error: {
    50: '#FEE8E8',
    100: '#FDD1D1',
    200: '#FBA3A3',
    300: '#F97575',
    400: '#F74747',
    500: '#F51F1F', // Error color
    600: '#DD0A0A',
    700: '#B00808',
    800: '#830606',
    900: '#560404',
  },
  neutral: {
    50: '#F7F7F7',
    100: '#EFEFEF',
    200: '#DFDFDF',
    300: '#CECECE',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

// Theme configuration
export const Theme = {
  colors: Colors,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
  },
};

export default Colors;