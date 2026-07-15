// src/components/molecules/TimeWindy/TimeWindy.tsx
import { useRef, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartData
} from 'chart.js';
import styles from './timeWindy.module.scss';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface TimeWindyProps {
  labels: string[];
  wsdData: number[];
}

export default function TimeWindy({ labels, wsdData }: TimeWindyProps) {
  const chartRef = useRef<ChartJS<"bar"> | null>(null);
  const [gradientBg, setGradientBg] = useState<CanvasGradient | string>('#34d399');

  // 💡 컴포넌트 마운트 후 혹은 데이터가 들어왔을 때 딱 한 번만 캔버스 그라데이션 객체를 생성합니다.
  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 240);
      gradient.addColorStop(0, '#34d399'); // 상단 네온 민트
      gradient.addColorStop(1, 'rgba(52, 211, 153, 0.05)'); // 하단 페이드 아웃
      setGradientBg(gradient);
    }
  }, [wsdData]); // 데이터가 들어와서 실제로 Bar가 렌더링된 직후 그라데이션을 입힙니다.

  // 🎯 로컬 state로 따로 관리하지 않고, 넘겨받은 Props 그대로 차트 데이터 규격을 실시간 매핑합니다.
  const data: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        data: wsdData.map(val => Number(val)),
        backgroundColor: gradientBg,
        borderRadius: 16,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: 'rgba(20, 22, 37, 0.9)' }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: 'rgba(255, 255, 255, 0.4)', font: { size: 12 } }
      },
      y: {
        grid: { display: false },
        ticks: { display: false }
      }
    }
  };

  return (
    <div className={styles['chart-card']}>
      <div className={styles['card-header']}>
        <div>
          <span className={styles['sub-title']}>바람 분석</span>
          <h3 className={styles['main-title']}>시간대별 풍속</h3>
        </div>
        <span className={styles['icon-windy']}>💨</span>
      </div>

      <div className={styles['chart-wrapper']}>
        {/* 💡 조건부 렌더링으로 감싸지 않고 항상 컴포넌트를 유지하여 ref가 유실되지 않도록 보장합니다. */}
        <Bar ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
}