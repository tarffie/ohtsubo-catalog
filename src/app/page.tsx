import HomeButtonRow from "@/app/components/HomeButtonRow";
import Hero from "@/app/components/Hero";
import { ServiceList } from "@/app/components/ServiceList";
import Header from "@/app/components/Header";

export default function Home() {
  /**
   * <row of buttons>
   * items display as grid of selling goods
   */
  return (
    <div>
      <Header />
      <Hero />
      <HomeButtonRow />
      <ServiceList />
    </div>
  );
}
