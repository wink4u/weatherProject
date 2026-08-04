import { useRecoilValue } from 'recoil';
import { weatherDataState } from '../../../recoil/locate';
import TimeTemperature from '../../molecules/timeTemperture/timeTemperture';
import TimeWindy from '../../molecules/timeWindy/timeWindy';
import styles from './timeTable.module.scss';

export default function TimeTable() {
  const responseItems = useRecoilValue(weatherDataState);

  //기상청 카테고리 필터링 (TMP: 기온, POP: 강수확률, WSD: 풍속)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tmpItems = (responseItems || []).filter((item: any) => item.category === 'TMP');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const popItems = (responseItems || []).filter((item: any) => item.category === 'POP');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wsdItems = (responseItems || []).filter((item: any) => item.category === 'WSD');

  let labels: string[] = [];
  let tempData: number[] = [];
  let popData: number[] = [];
  let wsdData: number[] = [];

  if (tmpItems.length > 0) {
    const maxDisplayCount = Math.min(tmpItems.length, 6);
    for (let i = 0; i < maxDisplayCount; i++) {
      const hour = tmpItems[i].fcstTime ? tmpItems[i].fcstTime.substring(0, 2) : `${i * 3 + 9}`;
      labels.push(`${hour}시`);
      tempData.push(Number(tmpItems[i].fcstValue));
      popData.push(Number(popItems[i]?.fcstValue || 0));
      wsdData.push(Number(wsdItems[i]?.fcstValue || 0));
    }
  } else {
    // Default fallback values matching mockup.png
    labels = ['09시', '12시', '15시', '18시', '21시', '24시'];
    tempData = [22, 24, 25, 23, 21, 19];
    popData = [20, 35, 45, 60, 50, 35];
    wsdData = [2.1, 2.8, 3.2, 2.4, 1.9, 1.4];
  }

  return (
    <section className={styles['timetable-container']}>
      <TimeTemperature labels={labels} tempData={tempData} popData={popData} />
      <TimeWindy labels={labels} wsdData={wsdData} />
    </section>
  );
}