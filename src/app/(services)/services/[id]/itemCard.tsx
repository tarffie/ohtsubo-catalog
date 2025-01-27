import React from "react";

interface Props {
  size: string;
  weight: string;
  color?: string;
  content: string;
}

export default function ItemCard({
  size,
  weight,
  color = "prussian_blue-500",
  content,
}: Props) {
  return (
    <div className={`font-${weight} text-left mb-2`}>
      <p className={`text-${size} text-${color}`}>{content}</p>
    </div>
  );
}
