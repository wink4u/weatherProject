import React from "react";
import { BsCloudRainHeavy } from "react-icons/bs"; // 강수확률
import { CiTempHigh } from "react-icons/ci"; // 기온
import { IoWaterOutline } from "react-icons/io5"; // 습도
import { MdOutlineLocationOn, MdAccessTime } from "react-icons/md"; // 위치, 시간
import { FiWind } from "react-icons/fi"; // 풍속 (이미지 내 Wind 카드를 위해 임의 추가)

import styles from "./icons.module.scss";

// 사용 가능한 아이콘 이름 정의
export type IconName = "temp" | "rain" | "water" | "location" | "time" | "wind";
export type IconSize = "sm" | "md" | "lg";
export type IconColor = "white" | "gray-light" | "gray-dark" | "mint" | "purple" | "blue-accent";

interface IconsProps extends React.HTMLAttributes<HTMLDivElement> {
  name: IconName;
  size?: IconSize;
  color?: IconColor;
  className?: string;
}

export default function Icons({
  name,
  size = "md",
  color = "gray-light",
  className = '',
  ...props
}: IconsProps) {
  
  // name에 따른 react-icons 컴포넌트 매핑
  const renderIcon = () => {
    switch (name) {
      case "temp":
        return <CiTempHigh />;
      case "rain":
        return <BsCloudRainHeavy />;
      case "water":
        return <IoWaterOutline />;
      case "location":
        return <MdOutlineLocationOn />;
      case "time":
        return <MdAccessTime />;
      case "wind":
        return <FiWind />;
      default:
        return null;
    }
  };

  // SCSS 클래스 조합
  const combinedClasses = [
    styles["icon-wrapper"],
    styles[`size-${size}`],
    styles[`color-${color}`],
    className
  ].join(" ").trim();

  return (
    <div className={combinedClasses} {...props}>
      {renderIcon()}
    </div>
  );
}