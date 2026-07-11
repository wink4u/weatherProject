import type { Meta, StoryObj } from '@storybook/react-vite';
import Icons, { type IconName, type IconSize, type IconColor } from './icons';
import React from 'react';

const meta: Meta<typeof Icons> = {
  title: 'Atoms/Icons',
  component: Icons,
  parameters: {
    layout: 'centered',
    // 대시보드 다크 테마 배경 고정
    backgrounds: {
      default: 'dashboard-dark',
      values: [
        { name: 'dashboard-dark', value: '#1e2235' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: ['temp', 'rain', 'water', 'location', 'time', 'wind'] as IconName[],
      description: '렌더링할 react-icons 종류 선택',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'] as IconSize[],
      description: '_variable.scss 시스템 기반 아이콘 크기 ($p2, $h3, $h1)',
    },
    color: {
      control: 'select',
      options: ['white', 'gray-light', 'gray-dark', 'mint', 'purple', 'blue-accent'] as IconColor[],
      description: '_variable.scss 에 정의된 전용 컬러 토큰 매핑',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 대시보드에 사용되는 전체 아이콘 에셋 모아보기
export const DashboardIconSet: Story = {
  args: {
    name: 'temp',
    size: 'lg',
    color: 'white',
  },
  render: () => {
    const iconList: { name: IconName; label: string; defaultColor: IconColor }[] = [
      { name: 'location', label: '위치 (지도/검색)', defaultColor: 'blue-accent' },
      { name: 'temp', label: '기온 (TMP)', defaultColor: 'gray-light' },
      { name: 'rain', label: '강수확률 (POP)', defaultColor: 'purple' },
      { name: 'water', label: '습도 (REH)', defaultColor: 'mint' },
      { name: 'wind', label: '풍속 (WSD)', defaultColor: 'gray-light' },
      { name: 'time', label: '시간대별 예보', defaultColor: 'gray-dark' },
    ];

    return (
      <div style={{
        backgroundColor: '#1e2235',
        padding: '32px',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        minWidth: '500px'
      }}>
        <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '12px', marginBottom: '24px' }}>
          <h4 style={{ color: '#ffffff', margin: 0, fontSize: '16px', fontFamily: 'sans-serif' }}>KMA Dashboard Icons List</h4>
          <span style={{ color: '#676c7c', fontSize: '11px', fontFamily: 'monospace' }}>_variable.scss + react-icons</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {iconList.map((item) => (
            <div 
              key={item.name} 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '12px',
                backgroundColor: 'rgba(35, 41, 67, 0.5)',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.02)'
              }}
            >
              {/* 대시보드 카드 형태를 재현하기 위해 큰 사이즈(lg)로 배치 */}
              <Icons name={item.name} size="lg" color={item.defaultColor} />
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ color: '#ffffff', fontSize: '13px', fontWeight: 600 }}>{item.label}</span>
                <span style={{ color: '#676c7c', fontSize: '10px', fontFamily: 'monospace' }}>name: "{item.name}"</span>
              </div>
            </div>
          ))}
        </div>

        {/* 2. 사이즈 프리셋 컴포넌트 검증 가이드 추가 */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', marginTop: '24px', paddingTop: '16px' }}>
          <span style={{ color: '#9fa4b7', fontSize: '12px', display: 'block', marginBottom: '12px' }}>Size Presets (sm / md / lg)</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Icons name="temp" size="sm" color="mint" />
              <span style={{ color: '#676c7c', fontSize: '10px' }}>sm ($p2)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Icons name="temp" size="md" color="mint" />
              <span style={{ color: '#676c7c', fontSize: '10px' }}>md ($h3)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Icons name="temp" size="lg" color="mint" />
              <span style={{ color: '#676c7c', fontSize: '10px' }}>lg ($h1)</span>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// 3. 단일 아이콘 개별 제어 스토리들
export const WeatherGridTemperature: Story = {
  args: {
    name: 'temp',
    size: 'lg',
    color: 'gray-light',
  },
};

export const WeatherGridRainfall: Story = {
  args: {
    name: 'rain',
    size: 'lg',
    color: 'purple',
  },
};

export const MapLocationPin: Story = {
  args: {
    name: 'location',
    size: 'md',
    color: 'blue-accent',
  },
};