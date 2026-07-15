import { useEffect, useState } from "react";
import Box from "../../atoms/box/box";
import Text  from "../../atoms/text/text";
import Icons from "../../atoms/icons/icons";
import fetchVilageFcst  from "../../../../utils/api/weather";
import getWeatherStatusText  from "../../../../utils/common/weatherStatus";
import styles from "./otherWeather.module.scss";

interface OtherWeatherProps {
  nx: number;
  ny: number;
  title: string;
  isActive?: boolean;   // 현재 선택 여부
  onClick?: () => void;  // 클릭 이벤트 핸들러
}

export default function OtherWeatherCard({ nx, ny, title, isActive = false, onClick }: OtherWeatherProps) {
  const [temp, setTemp] = useState<number | null>(null);
  const [statusText, setStatusText] = useState<string>("로딩 중...");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getCardWeatherData = async () => {
      try {
        setIsLoading(true);
        
        // 실시간 연월일 데이터 포맷팅 (YYYYMMDD)
        const today = new Date();
        const baseDate = today.toISOString().slice(0, 10).replace(/-/g, "");
        
        const rawData = await fetchVilageFcst({
          nx,
          ny,
          baseDate, 
          baseTime: "0500" // 기상청 단기예보 아침 기준 발표 시각
        });

        // TMP(기온), SKY(하늘상태), PTY(강수형태) 분석
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const firstTmp = rawData.find((item: any) => item.category === "TMP")?.fcstValue;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const firstSky = Number(rawData.find((item: any) => item.category === "SKY")?.fcstValue || 1);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const firstPty = Number(rawData.find((item: any) => item.category === "PTY")?.fcstValue || 0);

        if (firstTmp) setTemp(Number(firstTmp));
        setStatusText(getWeatherStatusText(firstSky, firstPty));
      } catch (error) {
        console.error(`${title} 날씨 갱신 실패:`, error);
        setStatusText("에러");
      } finally {
        setIsLoading(false);
      }
    };

    getCardWeatherData();
  }, [nx, ny, title]);

  // 조건부 클래스 결합
  const cardClassName = `${styles["weather-card"]} ${isActive ? styles["is-active"] : ""}`.trim();

  return (
    <Box 
      variant={isActive ? "gradient" : "default"} 
      clickable={true} 
      onClick={onClick}
      className={cardClassName}
    >
      {/* 1. 아이콘과 지역명 세팅 */}
      <div className={styles["card-header"]}>
        <Icons name="location" size="sm" color={isActive ? "mint" : "gray-light"} />
        <Text variant="label" color={isActive ? "white" : "gray-light"}>
          {title}
        </Text>
      </div>

      {/* 2. 기온 및 구름많음 정도 세팅 */}
      <div className={styles["card-body"]}>
        <Text variant="card-value" color="white">
          {isLoading ? "--" : `${temp}°C`}
        </Text>
        <Text variant="caption" color="gray-dark">
          {statusText}
        </Text>
      </div>
    </Box>
  );
}