import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FiClock } from 'react-icons/fi';
import styles from './timeTemperture.module.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TimeTemperatureProps {
  labels: string[];
  tempData: number[];
  popData: number[];
}

export default function TimeTemperature({
  labels,
  tempData,
  popData,
}: TimeTemperatureProps) {
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
        tension: 0.35,
      },
      {
        label: '강수확률',
        data: popData,
        borderColor: '#c084fc',
        backgroundColor: '#ffffff',
        pointBorderColor: '#c084fc',
        pointBackgroundColor: '#ffffff',
        pointBorderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.35,
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
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { display: false },
      },
    },
  };

  return (
    <div className={styles['chart-card']}>
      <div className={styles['card-header']}>
        <div>
          <span className={styles['sub-title']}>시간대별 예보</span>
          <h3 className={styles['main-title']}>기온 & 강수확률</h3>
        </div>
        <div className={styles['icon-button']}>
          <FiClock />
        </div>
      </div>

      <div className={styles['custom-legend']}>
        <div className={styles['legend-item']}>
          <span className={`${styles['legend-dot']} ${styles['dot-temp']}`} />
          <span className={styles['legend-text-temp']}>기온</span>
        </div>
        <div className={styles['legend-item']}>
          <span className={`${styles['legend-dot']} ${styles['dot-pop']}`} />
          <span className={styles['legend-text-pop']}>강수확률</span>
        </div>
      </div>

      <div className={styles['chart-wrapper']}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}