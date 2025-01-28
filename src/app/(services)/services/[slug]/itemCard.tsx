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
  color = "text-prussian_blue-500",
  content,
}: Props) {
  const sizeClass = {
    lg: "text-lg",
    "2xl": "text-2xl",
    "1xl": "text-xl",
    regular: "text-regular",
  }[size];

  const weightClass = {
    bold: "font-bold",
    regular: "font-normal",
  }[weight];

  return (
    <div className={`${weightClass} text-left mb-2`}>
      <p className={`${sizeClass} ${color}`}>{content}</p>
    </div>
  );
}
