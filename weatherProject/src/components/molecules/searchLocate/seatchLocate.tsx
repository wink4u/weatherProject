import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { contentState } from '../../../recoil/locate'; // 경로에 맞게 수정
import getRegionGridCoordinates  from '../../../../utils/api/kakaoMap'; // 이전에 만든 카카오 주소 검색 함수
import Box from "../../atoms/box/box";
import Icons from "../../atoms/icons/icons";
import styles from './searchLocate.module.scss';

export default function SearchLocate() {
  const [keyword, setKeyword] = useState('');
  const setLocation = useSetRecoilState(contentState);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    // 카카오 API 검색 및 격자 변환 실행
    const result = await getRegionGridCoordinates(keyword);
    
    if (result) {
      // Recoil 상태 전역 업데이트 -> 지도와 날씨 카드가 자동으로 반응함
      setLocation({
        nx: result.nx,
        ny: result.ny,
        location: result.addressName,
      });
      setKeyword('');
    } else {
      alert('해당하는 행정구역을 찾을 수 없습니다.');
    }
  };

  return (
    <Box variant="default" className={styles['search-box']}>
      <form onSubmit={handleSearch} className={styles['search-form']}>
        <input
          type="text"
          placeholder="지역 검색 (예: 서울시, 제주 제주시)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className={styles['search-input']}
        />
        <button type="submit" className={styles['search-button']}>
          <Icons name="location" size="sm" color="mint" />
        </button>
      </form>
    </Box>
  );
}