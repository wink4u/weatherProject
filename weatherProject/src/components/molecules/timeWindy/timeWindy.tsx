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
  type ChartData,
  type Plugin,
} from 'chart.js';
import { FiWind } from 'react-icons/fi';
import styles from './timeWindy.module.scss';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Custom plugin to render value labels above bars matching mockup.png
const valueLabelsPlugin: Plugin<'bar'> = {
  id: 'valueLabels',
  afterDatasetsDraw(chart) {
    const { ctx } = chart;
    chart.data.datasets.forEach((dataset, i) => {
      const meta = chart.getDatasetMeta(i);
      meta.data.forEach((bar, index) => {
        const value = dataset.data[index];
        if (value !== null && value !== undefined) {
          ctx.save();
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 12px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          ctx.fillText(String(value), bar.x, bar.y - 6);
          ctx.restore();
        }
      });
    });
  },
};

interface TimeWindyProps {
  labels: string[];
  wsdData: number[];
}

export default function TimeWindy({ labels, wsdData }: TimeWindyProps) {
  const chartRef = useRef<ChartJS<'bar'> | null>(null);
  const [gradientBg, setGradientBg] = useState<CanvasGradient | string>('#34d399');

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 240);
      gradient.addColorStop(0, '#67e8f9'); // Mint/Cyan top glow
      gradient.addColorStop(0.5, '#34d399'); // Neon mint
      gradient.addColorStop(1, 'rgba(52, 211, 153, 0.15)'); // Bottom fade
      setGradientBg(gradient);
    }
  }, [wsdData]);

  const data: ChartData<'bar'> = {
    labels,
    datasets: [
      {
        data: wsdData.map((val) => Number(val)),
        backgroundColor: gradientBg,
        borderRadius: 14,
        borderSkipped: false,
        barPercentage: 0.55,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#ffffff',
        bodyColor: '#94a3b8',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: 'rgba(255, 255, 255, 0.5)', font: { size: 12 } },
      },
      y: {
        grid: { display: false },
        ticks: { display: false },
      },
    },
  };

  return (
    <div className={styles['chart-card']}>
      <div className={styles['card-header']}>
        <div>
          <span className={styles['sub-title']}>바람 분석</span>
          <h3 className={styles['main-title']}>시간대별 풍속</h3>
        </div>
        <div className={styles['icon-button']}>
          <FiWind />
        </div>
      </div>

      <div className={styles['chart-wrapper']}>
        <Bar
          ref={chartRef}
          data={data}
          options={options}
          plugins={[valueLabelsPlugin]}
        />
      </div>
    </div>
  );
}