import { useRecoilValue } from 'recoil';
import { contentState } from '../../../recoil/locate';
import styles from './presentLocate.module.scss';
import Box from "../../atoms/box/box";
import Icons from "../../atoms/icons/icons";
import Text  from '../../atoms/text/text';


export default function PresentLocate() {
  const { location, nx, ny } = useRecoilValue(contentState);

  return (
    <Box variant="default" className={styles['present-locate-box']}>
      {/* 타이틀 및 네비게이션 아이콘 영역 */}
      <div className={styles['locate-header']}>
        <div className={styles['title-group']}>
          <Text variant="caption" color="gray-light">현재 선택 위치</Text>
          <Text variant="section-title" color="white" className={styles['locate-title']}>
            {location}
          </Text>
        </div>
        <button className={styles['gps-button']}>
          <Icons name="temp" size="md" color="white" />
        </button>
      </div>

      {/* 카카오맵이 그려질 프리뷰 영역 */}
      <div className={styles['map-preview-container']}>
        <div className={styles['map-info-badge']}>
          nx {nx} · ny {ny}
        </div>
        
        {/* 실제 카카오맵 타일이나 Leaflet 맵이 들어갈 공간 Placeholder */}
        <div className={styles['mock-map']}>
          <div className={styles['map-pin-pulse']} />
          <Text variant="body" color="white" className={styles['pin-label']}>{location}</Text>
          <span className={styles['map-caption']}>위경도 클릭 좌표를 기상청 격자 좌표로 변환</span>
        </div>
      </div>
    </Box>
  );
}