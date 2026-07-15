/// <reference types="vite/client" />

import { convertLatLngToGrid, type GridResult } from "../common/gridChange";

const KAKAO_MAP_API_KEY = import.meta.env.VITE_KAKAO_MAP_API_KEY;

interface SearchRegionResult extends GridResult {
  addressName: string; // 매칭된 실제 행정구역명 (예: 서울 특별시)
  lat: number;
  lng: number;
}

const searchMapAPI = async (keyword: string): Promise<SearchRegionResult | null> => {
  try {
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(keyword)}`,
      {
        headers: {
          Authorization: `KakaoAK ${KAKAO_MAP_API_KEY}`,
        },
      }
    );

    // 네트워크 응답 자체가 실패(예: 401, 404 등)했을 경우 처리
    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    const data = await response.json();

    // 3. 카카오 검색 결과가 비어있는지 체크
    if (!data.documents || data.documents.length === 0) {
      console.warn("검색된 주소 결과가 없습니다.");
      return null;
    }

    // 4. 첫 번째 매칭 결과에서 위경도(y, x) 추출 및 기상청 격자(nx, ny) 변환
    const firstMatch = data.documents[0];
    const lat = parseFloat(firstMatch.y); // 카카오 y = 위도
    const lng = parseFloat(firstMatch.x); // 카카오 x = 경도
    const addressName = firstMatch.address_name;

    const { nx, ny } = convertLatLngToGrid(lat, lng);

    // 선언한 SearchRegionResult 포맷에 맞춰 리턴
    return {
      addressName,
      lat,
      lng,
      nx,
      ny,
    };
  } catch (error) {
    // 5. 에러 캡처 후 null 반환하여 서비스 안정성 확보
    console.error("지도 검색 API 호출 중 에러 발생:", error);
    return null;
  }
};

export default searchMapAPI