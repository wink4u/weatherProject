import React from 'react';
import styles from './text.module.scss'; 

export type TextVariant = 'hero-title' | 'section-title' | 'card-value' | 'body' | 'caption' | 'label';
export type TextColor = 'white' | 'gray-light' | 'gray-dark' | 'mint' | 'purple' | 'blue-accent';

interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: TextVariant;
  color?: TextColor;
  children: React.ReactNode;
  className?: string;
}

export default function Text ({
  variant = 'body',
  color = 'gray-light',
  children,
  className = '',
  ...props
}: TextProps) {
  const combinedClasses = [
    styles.text,
    styles[`variant-${variant}`],
    styles[`color-${color}`],
    className
  ].join(' ').trim();
  
  return (
    <span className={combinedClasses} {...props}>
      {children}
    </span>
  );
}