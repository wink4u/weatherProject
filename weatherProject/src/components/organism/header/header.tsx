import { useRecoilRefresher_UNSTABLE } from 'recoil';
import { weatherDataState } from '../../../recoil/locate';
import { FiRefreshCw } from 'react-icons/fi';
import { WiDaySunnyOvercast } from 'react-icons/wi';
import styles from './header.module.scss';

export default function Header() {
  const refreshWeatherData = useRecoilRefresher_UNSTABLE(weatherDataState);

  const handleRefresh = () => {
    refreshWeatherData();
    window.location.reload();
  };

  return (
    <header className={styles['header-container']}>
      <div className={styles['brand-group']}>
        <div className={styles['brand-icon']}>
          <WiDaySunnyOvercast />
        </div>
        <div className={styles['brand-titles']}>
          <span className={styles['brand-sub']}>KMA Short-Term Forecast Demo</span>
          <h1 className={styles['brand-main']}>기상청 단기예보 대시보드</h1>
        </div>
      </div>

      <button className={styles['refresh-btn']} onClick={handleRefresh}>
        <span>API 새로고침</span>
        <FiRefreshCw className={styles['refresh-icon']} />
      </button>
    </header>
  );
}
