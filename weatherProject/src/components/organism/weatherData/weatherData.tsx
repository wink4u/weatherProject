// src/components/organisms/WeatherDashboard/WeatherDashboard.tsx
import SearchLocate from "../../molecules/searchLocate/seatchLocate";
import PresentLocate from "../../molecules/presentLocate/presentLocate";
import PresentWeather from "../../molecules/presentWeather/presentWeather";
import OtherWeatherList from "../../molecules/otherWeatherList/otherWeatherList";
// import Text  from "../../atoms/text/text";
import styles from "./weatherData.module.scss";

export default function WeatherDashboard() {
  return (
    <div className={styles["dashboard-container"]}>
      
      {/* ⬅️ LEFT CONTENT AREA : 날씨 메인 안내 및 관심 지역 카드 */}
      <section className={styles["left-content-card"]}>
        {/* 상단 배지 및 헤드라인 타이틀 */}
        <div className={styles["title-group"]}>
          <div className={styles["info-badge"]}>
            지도 좌표 → nx, ny 변환 → 단기예보 조회
          </div>
          
          <h1 className={styles["main-title"]}>
            날씨 데이터를<br />
            <span className={styles["gradient-highlight"]}>화려한 시각화로.</span>
          </h1>
          
          <p className={styles["sub-text"]}>
            사용자가 지도에서 위치를 선택하면 위경도를 기상청 격자 좌표로 변환하고,<br />
            단기예보 API 데이터를 Chart.js 기반 대시보드로 표현합니다.
          </p>
        </div>

        {/* 하단: 하위 관심 지역 카드 섹션 (서울, 부산, 제주) */}
        <div className={styles["other-cards-wrapper"]}>
          <OtherWeatherList />
        </div>

        {/* 배경에 깔리는 레이더 디자인 원형 데코 */}
        <div className={styles["bg-radar-deco"]}>
          <div className={styles["radar-center-dot"]} />
        </div>
      </section>

      {/* ➡️ RIGHT CONTENT AREA : 검색 및 현재 지역 정보 & 2x2 메트릭 */}
      <aside className={styles["right-content-column"]}>
        {/* 1. 최상단 작은 검색 박스 컴포넌트 */}
        <div className={styles["row-item"]}>
          <SearchLocate />
        </div>

        {/* 2. 중간 현재 선택 위치 정보 & 카카오맵 프리뷰 */}
        <div className={styles["row-item"]}>
          <PresentLocate />
        </div>

        {/* 3. 최하단 2x2 메트릭 날씨 현황 카드 */}
        <div className={styles["row-item"]}>
          <PresentWeather />
        </div>
      </aside>

    </div>
  );
}