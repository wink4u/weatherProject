import Header from './components/organism/header/header';
import WeatherData from './components/organism/weatherData/weatherData';
import TimeTable from './components/organism/timeTable/timeTable';
import BottomInfo from './components/organism/bottomInfo/bottomInfo';

function App() {
  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#0b0e1b' }}>
      <Header />
      <main>
        <WeatherData />
        <TimeTable />
        <BottomInfo />
      </main>
    </div>
  );
}

export default App;
