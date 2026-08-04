import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { contentState } from '../../../recoil/locate';
import getRegionGridCoordinates from '../../../../utils/api/kakaoMap';
import { FiSearch } from 'react-icons/fi';
import styles from './searchLocate.module.scss';

export default function SearchLocate() {
  const [keyword, setKeyword] = useState('');
  const setLocation = useSetRecoilState(contentState);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    const result = await getRegionGridCoordinates(keyword);

    if (result) {
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
    <div className={styles['search-box']}>
      <form onSubmit={handleSearch} className={styles['search-form']}>
        <input
          type="text"
          placeholder="지역 검색 (예: 서울시, 제주 제주시)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className={styles['search-input']}
        />
        <button type="submit" className={styles['search-button']} title="검색">
          <FiSearch className={styles['search-icon']} />
        </button>
      </form>
    </div>
  );
}