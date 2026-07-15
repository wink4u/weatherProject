import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { fetchVilageFcst } from '../../../../utils/api/weather';
import { contentState, weatherDataState } from '../../../recoil/locate';
import Box from "../../atoms/box/box";
import Icons, { type IconName } from "../../atoms/icons/icons";
import Text  from '../../atoms/text/text';
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
  const [metrics, setMetrics] = useState<WeatherMetrics>({ tmp: '--', pop: '--', reh: '--', wsd: '--' });
  const [isLoading, setIsLoading] = useState(true);

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
          baseTime: "0500"
        });

        if (rawData) {
          setWeatherData(rawData);
        }

        // 필요한 카테고리 요소만 매핑
        setMetrics({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          tmp: rawData.find((i: any) => i.category === 'TMP')?.fcstValue || '--',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          pop: rawData.find((i: any) => i.category === 'POP')?.fcstValue || '--',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          reh: rawData.find((i: any) => i.category === 'REH')?.fcstValue || '--',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          wsd: rawData.find((i: any) => i.category === 'WSD')?.fcstValue || '--',
        });
      } catch (error) {
        console.error("우측 날씨 현황 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getPresentData();
  }, [nx, ny]);

  // 반복되는 카드 레이아웃 구조 조립용 데이터 배열
  const cardData: { key: string; label: string; value: string; desc: string; icon: IconName }[] = [
  { key: 'tmp', label: '현재 기온', value: `${metrics.tmp}°C`, desc: 'TMP category', icon: 'temp' },    
  { key: 'pop', label: '강수 확률', value: `${metrics.pop}%`, desc: 'POP category', icon: 'rain' },     
  { key: 'reh', label: '습도', value: `${metrics.reh}%`, desc: 'REH category', icon: 'water' },  
  { key: 'wsd', label: '풍속', value: `${metrics.wsd}m/s`, desc: 'WSD category', icon: 'wind' },   
];

  return (
    <div className={styles['present-weather-grid']}>
      {cardData.map((card) => (
        <Box variant="default" key={card.key} className={styles['metric-card']}>
          <div className={styles['card-icon']}>
            <Icons name={card.icon} size="sm" color="gray-light" />
          </div>
          <div className={styles['card-content']}>
            <Text variant="caption" color="gray-light">{card.label}</Text>
            <Text variant="card-value" color="white" className={styles['metric-value']}>
              {isLoading ? '--' : card.value}
            </Text>
            <Text variant="caption" color="gray-dark">{card.desc}</Text>
          </div>
        </Box>
      ))}
    </div>
  );
}