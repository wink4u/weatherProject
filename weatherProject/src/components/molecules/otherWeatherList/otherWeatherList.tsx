import { useState } from "react";
import OtherWeatherCard from "../otherWeather/otherWeather";

export default function OtherWeatherList() {
  // 현재 대시보드에 선택된 메인 지역 타이틀 관리 (초기값: 제주 제주시)
  const [selectedRegion, setSelectedRegion] = useState<string>("제주 제주시");

  const regions = [
    { id: "seoul", title: "서울 강남구", nx: 61, ny: 126 },
    { id: "busan", title: "부산 해운대구", nx: 99, ny: 75 },
    { id: "jeju", title: "제주 제주시", nx: 53, ny: 38 }
  ];

  return (
    <div style={{ 
      display: "flex", 
      gap: "1.2rem", 
      width: "100%", 
      justifyContent: "space-between" 
    }}>
      {regions.map((region) => (
        <OtherWeatherCard
          key={region.id}
          title={region.title}
          nx={region.nx}
          ny={region.ny}
          isActive={selectedRegion === region.title}
          onClick={() => {
            setSelectedRegion(region.title);
            // 💡 여기서 전역 상태(Context, Redux 등)나 상위 컴포넌트의 좌표를 바꿔주면 
            // 우측 지도와 차트가 이 좌표(nx, ny) 기준으로 함께 연동되어 바뀝니다!
            console.log(`메인 좌표 변경 -> nx: ${region.nx}, ny: ${region.ny}`);
          }}
        />
      ))}
    </div>
  );
}