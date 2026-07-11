import type { Meta, StoryObj } from '@storybook/react-vite';
import Text from './text';

const meta: Meta<typeof Text> = {
  title: 'Atoms/Text',
  component: Text,
  parameters: {
    layout: 'centered',
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
      options: ['hero-title', 'section-title', 'card-value', 'body', 'caption', 'label'],
    },
    color: {
      control: 'select',
      options: ['white', 'gray-light', 'gray-dark', 'mint', 'purple', 'blue-accent'],
    },
    children: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'body',
    color: 'gray-dark',
    children: '설정하신 기상청 변수 기반 텍스트 컴포넌트입니다.',
  },
};

export const DashboardHero: Story = {
  args: {
    variant: 'hero-title',
    color: 'gray-light',
    children: '날씨 데이터를 화려한 시각화로.',
  },
};

export const MintPointValue: Story = {
  args: {
    variant: 'card-value',
    color: 'mint',
    children: '23°C',
  },
};