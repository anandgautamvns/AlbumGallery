import React from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';

interface RoundButtonProps {
  title?: string;
  onPress: () => void;
  color?: string;
  textColor?: string;
  border?: number;
  borderColor?: string;
  backgroundColor?: string;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold' | '600' | '700';
  fontFamily?: string;
  textAlign?: 'left' | 'center' | 'right';
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize';
  style?: object;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  iconSize?: number;
  iconColor?: string;
}

const StyledButton = styled.TouchableOpacity<RoundButtonProps>`
  background-color: ${({backgroundColor, disabled}) =>
    disabled ? '#d3d3d3' : backgroundColor || '#3498db'};
  border-width: ${({border}) => (border ? `${border}px` : '0px')};
  border-color: ${({borderColor}) => borderColor || 'transparent'};
  width: ${({width}) =>
    typeof width === 'number' ? `${width}px` : width || 'auto'};
  height: ${({height}) =>
    typeof height === 'number' ? `${height}px` : height || 'auto'};
  border-radius: ${({borderRadius}) => borderRadius || 50}px;
  justify-content: center;
  align-items: center;
  flex-direction: ${({iconPosition}) =>
    iconPosition === 'right' ? 'row-reverse' : 'row'};
  padding: 10px;
  opacity: ${({disabled}) => (disabled ? 0.6 : 1)};
`;

interface ButtonTextProps {
  textColor?: string;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold' | '600' | '700';
  fontFamily?: string;
  textAlign?: 'left' | 'center' | 'right';
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize';
  icon?: React.ReactNode;
}

const ButtonText = styled.Text<ButtonTextProps>`
  color: ${({textColor}) => textColor || '#fff'};
  font-size: ${({fontSize}) => fontSize || 16}px;
  font-weight: ${({fontWeight}) => fontWeight || 'bold'};
  font-family: ${({fontFamily}) => fontFamily || 'System'};
  text-align: ${({textAlign}) => textAlign || 'center'};
  text-transform: ${({textTransform}) => textTransform || 'none'};
  margin-left: ${({icon}) => (icon ? '8px' : '0px')};
  margin-right: ${({icon}) => (icon ? '8px' : '0px')};
`;

const RoundButton: React.FC<RoundButtonProps> = ({
  title,
  onPress,
  // color,
  textColor,
  border,
  borderColor,
  backgroundColor,
  width,
  height,
  borderRadius,
  fontSize,
  fontWeight,
  fontFamily,
  textAlign,
  textTransform,
  style,
  disabled,
  loading,
  icon,
  iconPosition,
  iconSize,
  iconColor,
}) => {
  return (
    <StyledButton
      onPress={onPress}
      backgroundColor={backgroundColor}
      border={border}
      borderColor={borderColor}
      width={width}
      height={height}
      borderRadius={borderRadius}
      disabled={disabled}
      iconPosition={iconPosition}
      style={style}>
      {loading ? (
        <ActivityIndicator size="small" color={textColor || '#fff'} />
      ) : (
        <>
          {icon &&
            React.isValidElement(icon) &&
            React.cloneElement(icon, {
              ...(iconSize && {size: iconSize}),
              ...(iconColor || textColor
                ? {color: iconColor || textColor || '#fff'}
                : {}),
            })}
          <ButtonText
            textColor={textColor}
            fontSize={fontSize}
            fontWeight={fontWeight}
            fontFamily={fontFamily}
            textAlign={textAlign}
            textTransform={textTransform}
            icon={icon}>
            {title}
          </ButtonText>
        </>
      )}
    </StyledButton>
  );
};

export default RoundButton;
