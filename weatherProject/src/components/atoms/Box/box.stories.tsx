import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Box from './box';

const meta: Meta<typeof Box> = {
  title: 'Atoms/Box',
  component: Box,
  parameters: {
    layout: 'centered',
    // 실제 서비스의 어두운 대시보드 배경색 지정
    backgrounds: {
      default: 'dashboard-dark',
      values: [
        { name: 'dashboard-dark', value: '#1e2235' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'gradient', 'outline'],
      description: '박스의 테마 스타일 (기본 반투명, 그라데이션, 외곽선만 표시)',
    },
    clickable: {
      control: 'boolean',
      description: 'true 설정 시 마우스 호버 효과 및 커서 포인터가 적용됩니다.',
    },
    children: {
      control: 'text',
      description: '박스 내부에 들어갈 콘텐츠 (children)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 대시보드의 다양한 카드 타입을 한눈에 검증하는 메인 스토리
export const DashboardCardsShowcase: Story = {
  args: {
    variant: 'default',
    clickable: false,
    children: 'Box',
  },
  render: () => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      padding: '40px',
      backgroundColor: '#1e2235',
      borderRadius: '20px',
    }}>
      <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '8px' }}>
        <span style={{ color: '#676c7c', fontSize: '12px', fontFamily: 'monospace' }}>Box Component Variants</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 220px)', gap: '20px' }}>
        {/* Default Variant */}
        <Box variant="default">
          <div style={{ color: '#ffffff', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Default Card</div>
          <div style={{ color: '#9fa4b7', fontSize: '12px' }}>우측의 날씨 정보(기온, 습도 등) 카드로 쓰이는 기본 형태입니다.</div>
        </Box>

        {/* Gradient Variant */}
        <Box variant="gradient">
          <div style={{ color: '#ffffff', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Gradient Card</div>
          <div style={{ color: '#9fa4b7', fontSize: '12px' }}>좌측 메인 히어로 섹션처럼 깊이감을 줄 때 사용하는 스타일입니다.</div>
        </Box>

        {/* Outline Variant */}
        <Box variant="outline">
          <div style={{ color: '#ffffff', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Outline Card</div>
          <div style={{ color: '#9fa4b7', fontSize: '12px' }}>맨 하단의 API Flow 정보 라인처럼 선으로 분할된 투명 카드입니다.</div>
        </Box>
      </div>

      {/* Clickable Feature Test */}
      <div style={{ marginTop: '16px' }}>
        <span style={{ color: '#676c7c', fontSize: '12px', display: 'block', marginBottom: '8px', fontFamily: 'monospace' }}>Interactive Feature</span>
        <Box variant="default" clickable={true} style={{ width: '100%', maxWidth: '460px' }}>
          <div style={{ color: '#4ef2be', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Clickable Card (Hover Me!)</div>
          <div style={{ color: '#9fa4b7', fontSize: '12px' }}>
            마우스를 올리면 테두리가 민트색으로 변하고 배경이 약간 더 밝아집니다.
          </div>
        </Box>
      </div>
    </div>
  ),
};

// 2. 단일 컴포넌트 기능 제어용 개별 스토리 프리셋
export const DefaultCard: Story = {
  args: {
    variant: 'default',
    clickable: true,
    children: (
      <div style={{ color: '#fff', width: '200px', height: '100px' }}>
        기본 클릭 가능한 카드 영역
      </div>
    ),
  },
};

export const HeroGradientCard: Story = {
  args: {
    variant: 'gradient',
    children: (
      <div style={{ color: '#fff', width: '300px', height: '150px' }}>
        좌측 메인 대시보드 타이틀 영역 전용
      </div>
    ),
  },
};