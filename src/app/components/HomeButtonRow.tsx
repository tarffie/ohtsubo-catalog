import { MenuButton } from '@/app/components/MenuButton'

const categories: string[] = ['leituras', 'mesas DNB', 'Terapias Holísticas', 'pacotes']

export default function HomeButtonRow() {
  return (
    <div className='grid grid-cols-4 grid-rows-2 sm:grid-rows-1 gap-2 mt-10'>
      {categories.map((item, index) => (
        <MenuButton key={index}> {item} </MenuButton>
      ))}
    </div>
  )
}
