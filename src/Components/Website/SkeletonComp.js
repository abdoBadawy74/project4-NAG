import React from "react";
import Skeleton from "react-loading-skeleton";

export default function SkeletonComp(props) {
  return Array.from({ length: props.count }, (_, index) => (
    <div
      key={index}
      className={props.style}
    >
      <Skeleton height={props.height} width={props.width} baseColor={props.baseColor} />
    </div>
  ));
}
