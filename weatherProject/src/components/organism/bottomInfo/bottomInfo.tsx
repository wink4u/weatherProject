import { FiLayers, FiSearch, FiRefreshCw } from 'react-icons/fi';
import styles from './bottomInfo.module.scss';

export default function BottomInfo() {
  const cards = [
    {
      id: 'api-flow',
      title: 'API Flow',
      icon: <FiLayers />,
      desc: '위치 검색 → 지도 클릭 → 위경도 획득 → nx, ny 변환 → 단기예보 조회 → 카테고리별 데이터 매핑',
    },
    {
      id: 'ux-point',
      title: 'UX 포인트',
      icon: <FiSearch />,
      desc: '지역명 자동완성, 현재 위치 조회, 관심 지역 저장, 모바일 카드형 레이아웃을 넣으면 완성도가 높아집니다.',
    },
    {
      id: 'data-refresh',
      title: '데이터 갱신',
      icon: <FiRefreshCw />,
      desc: 'base_date, base_time을 자동 계산하고 API 실패 시 마지막 성공 데이터를 보여주는 방식이 안정적입니다.',
    },
  ];

  return (
    <section className={styles['bottom-info-container']}>
      {cards.map((card) => (
        <div key={card.id} className={styles['info-card']}>
          <div className={styles['card-header']}>
            <div className={styles['icon-box']}>{card.icon}</div>
            <h3 className={styles['card-title']}>{card.title}</h3>
          </div>
          <p className={styles['card-desc']}>{card.desc}</p>
        </div>
      ))}
    </section>
  );
}
