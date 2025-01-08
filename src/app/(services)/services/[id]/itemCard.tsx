"use client"
import React from "react";

interface Props {
  content: string;
}

export default function ItemCard({ content }: Props) {
  return (
    <div className="font-bold text-left">
      <p className="text-lg">{content}</p>
    </div>
  );
}
