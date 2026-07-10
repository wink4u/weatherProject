import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "./box";

const meta = {
  title: "Atoms/Box",
  component: Box,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "selected", "dark"],
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950 p-10">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    children: (
      <>
        <p className="text-sm text-white/60">현재 기온</p>
        <p className="mt-2 text-2xl font-bold">23°C</p>
        <p className="mt-1 text-xs text-white/50">TMP category</p>
      </>
    ),
  },
};

export const Selected: Story = {
  args: {
    variant: "selected",
    children: (
      <>
        <p className="text-sm text-white/60">제주 제주시</p>
        <p className="mt-2 text-2xl font-bold">23°C</p>
        <p className="mt-1 text-sm text-white/70">약한 비</p>
      </>
    ),
  },
};

export const Dark: Story = {
  args: {
    variant: "dark",
    children: (
      <>
        <p className="text-sm text-white/60">시간대별 예보</p>
        <h3 className="mt-1 text-xl font-bold">기온 & 강수확률</h3>
      </>
    ),
  },
};