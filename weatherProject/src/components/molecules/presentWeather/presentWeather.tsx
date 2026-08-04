import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { fetchVilageFcst } from '../../../../utils/api/weather';
import { contentState, weatherDataState } from '../../../recoil/locate';
import { FiThermometer, FiCloudRain, FiDroplet, FiWind } from 'react-icons/fi';
import styles from './presentWeather.module.scss';

interface WeatherMetrics {
  tmp: string; // 기온
  pop: string; // 강수확률
  reh: string; // 습도
  wsd: string; // 풍속
}

export default function PresentWeather() {
  const { nx, ny } = useRecoilValue(contentState);
  const setWeatherData = useSetRecoilState(weatherDataState);
  const [metrics, setMetrics] = useState<WeatherMetrics>({
    tmp: '23',
    pop: '55',
    reh: '68',
    wsd: '2.4',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPresentData = async () => {
      try {
        setIsLoading(true);
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const date = String(today.getDate()).padStart(2, '0');
        const baseDate = `${year}${month}${date}`;

        const rawData = await fetchVilageFcst({
          nx,
          ny,
          baseDate,
          baseTime: '0500',
        });

        if (rawData) {
          setWeatherData(rawData);
          setMetrics({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            tmp: rawData.find((i: any) => i.category === 'TMP')?.fcstValue || '23',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            pop: rawData.find((i: any) => i.category === 'POP')?.fcstValue || '55',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            reh: rawData.find((i: any) => i.category === 'REH')?.fcstValue || '68',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            wsd: rawData.find((i: any) => i.category === 'WSD')?.fcstValue || '2.4',
          });
        }
      } catch (error) {
        console.error('우측 날씨 현황 로드 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getPresentData();
  }, [nx, ny, setWeatherData]);

  const cardData = [
    {
      key: 'tmp',
      label: '현재 기온',
      value: `${metrics.tmp}°C`,
      desc: 'TMP category',
      icon: <FiThermometer />,
      color: '#67e8f9',
    },
    {
      key: 'pop',
      label: '강수 확률',
      value: `${metrics.pop}%`,
      desc: 'POP category',
      icon: <FiCloudRain />,
      color: '#c084fc',
    },
    {
      key: 'reh',
      label: '습도',
      value: `${metrics.reh}%`,
      desc: 'REH category',
      icon: <FiDroplet />,
      color: '#60a5fa',
    },
    {
      key: 'wsd',
      label: '풍속',
      value: `${metrics.wsd}m/s`,
      desc: 'WSD category',
      icon: <FiWind />,
      color: '#34d399',
    },
  ];

  return (
    <div className={styles['present-weather-grid']}>
      {cardData.map((card) => (
        <div key={card.key} className={styles['metric-card']}>
          <div className={styles['card-icon']} style={{ color: card.color }}>
            {card.icon}
          </div>
          <div className={styles['card-content']}>
            <span className={styles['label']}>{card.label}</span>
            <span className={styles['value']}>
              {isLoading ? '--' : card.value}
            </span>
            <span className={styles['desc']}>{card.desc}</span>
          </div>
        </div>
      ))}
    </div>
  );
}