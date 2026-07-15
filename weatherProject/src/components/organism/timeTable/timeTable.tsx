// src/components/organisms/TimeTable/TimeTable.tsx
import { useRecoilValue } from 'recoil';
import { weatherDataState } from '../../../recoil/locate'; // 본인의 atom 경로로 맞추세요
import TimeTemperature from '../../molecules/timeTemperture/timeTemperture';
import TimeWindy from '../../molecules/timeWindy/timeWindy';
import styles from './timeTable.module.scss';

export default function TimeTable() {
  // 💡 기존 컴포넌트가 fetch해온 데이터를 공유받음 (중복 호출 없음)
  const responseItems = useRecoilValue(weatherDataState);

  // 데이터 로딩 전 안전장치 방어선
  if (!responseItems || responseItems.length === 0) {
    return (
      <div className={styles['loading-container']}>
        <p className={styles['loading-text']}>실시간 기상 분석 데이터를 연동 중입니다...</p>
      </div>
    );
  }
  // 기상청 카테고리 필터링 (TMP: 기온, POP: 강수확률, WSD: 풍속)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tmpItems = responseItems.filter((item: any) => item.category === 'TMP');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const popItems = responseItems.filter((item: any) => item.category === 'POP');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wsdItems = responseItems.filter((item: any) => item.category === 'WSD');
  
  console.log(wsdItems)
  const labels: string[] = [];
  const tempData: number[] = [];
  const popData: number[] = [];
  const wsdData: number[] = [];

  // 시안 레이아웃에 최적화된 6개 시간대 추출
  const maxDisplayCount = Math.min(tmpItems.length, 6);
  for (let i = 0; i < maxDisplayCount; i++) {
    const hour = tmpItems[i].fcstTime.substring(0, 2);
    labels.push(`${hour}시`);
    
    tempData.push(Number(tmpItems[i].fcstValue));
    popData.push(Number(popItems[i].fcstValue || 0));
    wsdData.push(Number(wsdItems[i].fcstValue || 0));
  }

  return (
    <section className={styles['timetable-container']}>
      <TimeTemperature labels={labels} tempData={tempData} popData={popData} />
      <TimeWindy labels={labels} wsdData={wsdData} />
    </section>
  );
}