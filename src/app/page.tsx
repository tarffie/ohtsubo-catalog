import React from "react";

import HomeButtonRow from "@/app/components/ui/HomeButtonRow";
import Hero from "@/app/components/ui/Hero";
import { ServiceList } from "@/app/components/ui/ServiceList";
import Header from "@/app/components/ui/Header";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <div className="content-container">
        <HomeButtonRow />
        <ServiceList />
      </div>
    </>
  );
}
