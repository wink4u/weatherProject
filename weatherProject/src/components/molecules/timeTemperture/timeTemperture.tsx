// src/components/molecules/TimeTemperature/TimeTemperature.tsx
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import styles from './timeTemperture.module.scss';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface TimeTemperatureProps {
  labels: string[];
  tempData: number[];
  popData: number[];
}

export default function TimeTemperature({ labels, tempData, popData }: TimeTemperatureProps) {
  const data = {
    labels,
    datasets: [
      {
        label: '기온',
        data: tempData,
        borderColor: '#67e8f9',
        backgroundColor: '#ffffff',
        pointBorderColor: '#67e8f9',
        pointBackgroundColor: '#ffffff',
        pointBorderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.3,
      },
      {
        label: '강수확률',
        data: popData,
        borderColor: '#a855f7',
        backgroundColor: '#ffffff',
        pointBorderColor: '#a855f7',
        pointBackgroundColor: '#ffffff',
        pointBorderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.3,
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
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { display: false }
      }
    }
  };

  return (
    <div className={styles['chart-card']}>
      <div className={styles['card-header']}>
        <div>
          <span className={styles['sub-title']}>시간대별 예보</span>
          <h3 className={styles['main-title']}>기온 & 강수확률</h3>
        </div>
        <span className={styles['icon-clock']}>🕒</span>
      </div>
      
      <div className={styles['custom-legend']}>
        <span className={styles['legend-temp']}>기온</span>
        <span className={styles['legend-pop']}>강수확률</span>
      </div>

      <div className={styles['chart-wrapper']}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}