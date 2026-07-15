import axios from 'axios'

interface WeatherParam {
  nx: number;
  ny: number;
  baseDate: string; // YYYYMMDD 형식 (예: '20260712')
  baseTime: string; // HHMM 형식 (기상청 발표 시간 예: '0500')
}

export const fetchVilageFcst = async ({ nx, ny, baseDate, baseTime }: WeatherParam) => {
  const SERVICE_KEY = import.meta.env.VITE_KMA_SERVICE_KEY; // 공공데이터포털 인증키
  const cleanNx = Math.floor(Number(nx));
  const cleanNy = Math.floor(Number(ny));

  // 💡 [안전장치 2] 날짜와 시간이 빈 값으로 올 경우를 대비한 하드코딩 디폴트 방어막
  const cleanDate = baseDate ? String(baseDate).trim() : "20260711";
  const cleanTime = baseTime ? String(baseTime).trim() : "0500";

  console.log("기상청 요청 전송 파라미터 확인:", {
    base_date: cleanDate,
    base_time: cleanTime,
    nx: cleanNx,
    ny: cleanNy
  });

  try {
    const response = await axios.get('http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst', {
      params: {
        pageNo: 1,
        numOfRows: 200,
        dataType: 'JSON',
        base_date: cleanDate,
        base_time: cleanTime,
        nx: cleanNx,
        ny: cleanNy,
      },
      // 💡 핵심: 서비스키만 인코딩되지 않은 날것 그대로 주소창에 결합하도록 강제합니다.
      paramsSerializer: (params) => {
        const queryParams = new URLSearchParams(params).toString();
        return `serviceKey=${SERVICE_KEY}&${queryParams}`;
      }
    });

    if (response.data?.response?.header?.resultCode !== '00') {
      throw new Error(response.data?.response?.header?.resultMsg || '기상청 API 에러');
    }

    return response.data.response.body.items.item;
  } catch (error) {
    console.error('기상청 대시보드 데이터 로드 실패:', error);
    throw error;
  }
};

export default fetchVilageFcst