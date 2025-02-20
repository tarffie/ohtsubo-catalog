import HomeButtonRow from "@/app/components/ui/HomeButtonRow";
import Hero from "@/app/components/ui/Hero";
import { ServiceList } from "@/app/components/ui/ServiceList";
import Header from "@/app/components/ui/Header";

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
