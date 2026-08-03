// tests/weatherDashboard.spec.ts
import { test, expect } from '@playwright/test';

test.describe('기상청 트렌디 다크 대시보드 E2E 테스트', () => {
  
  // 각 테스트 실행 전, 로컬 서버 페이지로 이동 (포트 번호는 본인의 환경에 맞게 수정)
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173'); 
  });

  test('1. 대시보드가 다크 테마 배경과 함께 정상적으로 초기 렌더링되는지 확인', async ({ page }) => {
    // 메인 타이틀이 올바르게 노출되는지 검증
    const mainTitle = page.locator('h1, h2, .main-title').first();
    await expect(mainTitle).toBeVisible();

    // 우리가 세팅한 글로벌 바디의 어두운 인디고 네이비(#0d0e16) 배경색이 잘 입혀졌는지 스타일 검증
    const body = page.locator('body');
    await expect(body).toHaveCSS('background-color', 'rgb(13, 14, 22)'); // #0d0e16의 RGB 값
  });

  test('2. 비동기 기상청 데이터 로드 완료 후 하단 차트(TimeTable) 레이아웃이 표시되는지 검증', async ({ page }) => {
    // Recoil 데이터가 채워지기 전 초기 "데이터 동기화 중" 텍스트가 안 보일 때까지 대기하거나,
    // 차트 카드 컴포넌트가 DOM에 마운트될 때까지 최대 5초간 대기합니다.
    const chartCard = page.locator('.chart-card').first();
    await expect(chartCard).toBeVisible({ timeout: 5000 });

    // 좌측 기온/강수확률 타이틀과 우측 바람 분석 타이틀이 올바르게 들어왔는지 확인
    await expect(page.getByText('기온 & 강수확률')).toBeVisible();
    await expect(page.getByText('시간대별 풍속')).toBeVisible();
  });

  test('3. 지역 변경(검색) 시 데이터와 차트가 유연하게 리렌더링되는지 검증', async ({ page }) => {
    // 💡 본인 프로젝트의 검색창(input)과 검색 버튼/엔터 셀렉터에 맞게 수정하세요.
    const searchInput = page.locator('input[placeholder*="지역"]');
    
    if (await searchInput.isVisible()) {
      // 새로운 지역 검색 시뮬레이션
      await searchInput.fill('서울시');
      await searchInput.press('Enter');

      // 💡 네트워크 탭에서 기상청 API(getVilageFcst) 호출이 성공적으로 가는지 가로채서 검증
      const responsePromise = page.waitForResponse(response => 
        response.url().includes('getVilageFcst') && response.status() === 200
      );
      
      await responsePromise; // API 응답이 도달할 때까지 대기

      // API 응답 직후 차트가 깨지지 않고 그대로 유지되는지 스냅샷 체크
      const timeTableSection = page.locator('section[class*="timetable-container"]');
      await expect(timeTableSection).toBeVisible();
    }
  });

  test('4. 시안과 완벽하게 일치하는지 비주얼 회귀 테스트 (Visual Regression Test)', async ({ page }) => {
    // 💡 차트 애니메이션 등이 끝날 시간을 벌어주기 위해 디바이스 안정화 대기
    await page.waitForTimeout(2000);

    // 전체 대시보드 컨테이너의 스크린샷을 찍어서 기준(Baseline) 이미지와 픽셀 단위로 비교합니다.
    // 처음 실행하면 기준 이미지가 생성되고, 두 번째 실행부터 디자인 깨짐을 추적합니다.
    const dashboard = page.locator('.dashboard-container');
    if (await dashboard.isVisible()) {
      await expect(dashboard).toHaveScreenshot('weather-dashboard-layout.png', {
        maxDiffPixelRatio: 0.05 // 미세한 차트 폰트 렌더링 차이는 5%까지 허용
      });
    }
  });
});