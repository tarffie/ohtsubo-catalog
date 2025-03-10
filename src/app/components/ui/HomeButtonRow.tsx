import { MenuButton } from "@/app/components/ui/MenuButton";

const categories: string[] = [
  "Leituras",
  "Trabalhos Espirituais",
  "Terapias Holísticas",
  "Pacotes",
];

export default function HomeButtonRow() {
  return (
    <div className="w-full mt-10 mb-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
        {categories.map((item, index) => (
          <MenuButton key={index}>{item}</MenuButton>
        ))}
      </div>
    </div>
  );
}
