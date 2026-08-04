import { useRecoilState } from 'recoil';
import { contentState } from '../../../recoil/locate';
import { FiNavigation } from 'react-icons/fi';
import { convertLatLngToGrid } from '../../../../utils/common/gridChange';
import styles from './presentLocate.module.scss';

export default function PresentLocate() {
  const [content, setContent] = useRecoilState(contentState);

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const grid = convertLatLngToGrid(lat, lng);
          setContent({
            location: '현재 내 위치',
            nx: grid.nx,
            ny: grid.ny,
          });
        },
        () => {
          alert('현재 위치 정보를 가져올 수 없습니다.');
        }
      );
    } else {
      alert('이 브라우저에서는 위치 서비스를 지원하지 않습니다.');
    }
  };

  return (
    <div className={styles['present-locate-box']}>
      {/* 타이틀 및 네비게이션 아이콘 영역 */}
      <div className={styles['locate-header']}>
        <div className={styles['title-group']}>
          <span className={styles['subtitle']}>현재 선택 위치</span>
          <h2 className={styles['locate-title']}>{content.location}</h2>
        </div>
        <button
          className={styles['gps-button']}
          onClick={handleGetCurrentLocation}
          title="현재 위치 찾기"
        >
          <FiNavigation className={styles['nav-icon']} />
        </button>
      </div>

      {/* 카카오맵이 그려질 프리뷰 영역 */}
      <div className={styles['map-preview-container']}>
        <div className={styles['map-grid-pattern']} />
        <div className={styles['map-info-badge']}>
          nx {content.nx} · ny {content.ny}
        </div>

        <div className={styles['mock-map']}>
          <div className={styles['map-pin-pulse']}>
            <div className={styles['pin-pill']}>{content.location}</div>
            <div className={styles['pin-dot']} />
          </div>
          <span className={styles['map-caption']}>
            위경도 클릭 좌표를 기상청 격자 좌표로 변환
          </span>
        </div>
      </div>
    </div>
  );
}