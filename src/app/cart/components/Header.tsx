import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function Header() {
  return (
    <div className="flex justify-between items-center align-middle shadow-md pb-2 w-screen bg-pale_dogwood-700 pt-2">
      <Link href="/" className="ml-4">
        <FaArrowLeft />
      </Link>
      <header className="cart-header text-center flex-1">
        <h1 className="text-2xl md:text-3xl">Finalizar Pedido..</h1>
      </header>
    </div>
  );
}
