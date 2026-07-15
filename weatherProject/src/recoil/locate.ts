import { atom } from 'recoil';

export interface locateTypes {
    nx: number;
    ny: number;
    location: string;
}

//recoil state 생성
export const contentState = atom<locateTypes>({
    key: 'content',
    default: {
        nx: 60,
        ny: 121,
        location: '수원시'
    }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const weatherDataState = atom<any[]>({
  key: 'weatherDataState',
  default: [] // 초기값은 빈 배열
});