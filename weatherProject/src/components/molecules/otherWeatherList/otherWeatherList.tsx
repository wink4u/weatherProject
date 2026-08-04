import { useRecoilState } from 'recoil';
import { contentState } from '../../../recoil/locate';
import OtherWeatherCard from '../otherWeather/otherWeather';

export default function OtherWeatherList() {
  const [currentLocate, setCurrentLocate] = useRecoilState(contentState);

  const regions = [
    { id: 'seoul', title: '서울 강남구', nx: 61, ny: 126 },
    { id: 'busan', title: '부산 해운대구', nx: 99, ny: 75 },
    { id: 'jeju', title: '제주 제주시', nx: 53, ny: 38 },
  ];

  const handleSelectRegion = (region: { title: string; nx: number; ny: number }) => {
    setCurrentLocate({
      location: region.title,
      nx: region.nx,
      ny: region.ny,
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '1.2rem',
        width: '100%',
        justifyContent: 'space-between',
      }}
    >
      {regions.map((region) => (
        <OtherWeatherCard
          key={region.id}
          title={region.title}
          nx={region.nx}
          ny={region.ny}
          isActive={currentLocate.location === region.title}
          onClick={() => handleSelectRegion(region)}
        />
      ))}
    </div>
  );
}