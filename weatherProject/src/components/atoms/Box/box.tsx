import React from 'react';
import styles from './box.module.scss'; // 파일명 컨벤션에 맞춰 소문자/대문자 확인 필요

export type BoxVariant = 'default' | 'gradient' | 'outline';

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: BoxVariant;
  clickable?: boolean;
  className?: string;
}

export default function Box({
  children,
  variant = 'default',
  clickable = false,
  className = '',
  ...props
}: BoxProps) {
  
  // SCSS 모듈 클래스 결합
  const combinedClasses = [
    styles.box,
    styles[`variant-${variant}`],
    clickable ? styles.clickable : '',
    className
  ].join(' ').trim();

  return (
    <div className={combinedClasses} {...props}>
      {children}
    </div>
  );
}