"use client"

import React from "react";
import { useServiceContext } from "@/lib/providers/ServiceProvider";

export default function Sidebar() {
  const { isSidebarVisible, currentService } = useServiceContext();

  return (
    <div style={{ display: isSidebarVisible ? "block" : "none" }}>
      <h1>Sidebar</h1>
      {currentService ? (
        <div>
          <h2>{currentService.title}</h2>
          <p>{currentService.description}</p>
        </div>
      ) : (
        <p>Loading service...</p>
      )}
    </div>
  );
}
