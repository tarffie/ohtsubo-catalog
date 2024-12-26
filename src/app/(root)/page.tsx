import HomeButtonRow from "@/app/components/homeButtonRow";
import Hero from "@/app/components/Hero";
import { ServiceList } from "@/app/components/ServiceList";

export default function Home() {
  /**
   * <row of buttons>
   * items display as grid of selling goods
   */
  return (
    <div>
      <Hero />
      <HomeButtonRow />
      <ServiceList />
    </div>
  );
}
