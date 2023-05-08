import Logo from '../assets/logo.svg'
import { FiShoppingCart, FiUser } from "react-icons/fi";

export const NavMenu = () => {
  return (
    <nav className="flex flex-col h-20 justify-center items-center mt-2">
      <div className="flex flex-row h-full px-36 justify-between w-full items-center">
        <img className="flex h-12" src={Logo} alt="" />
        <ul className="flex flex-row gap-5 font-sans font-semibold text-base text-primary">
          <li><a href="">Plantas</a></li>
          <li><a href="">Insumos</a></li>
          <li><a href="">Presentes</a></li>
          <li><a href="">Sobre</a></li>
        </ul>
        <span className='flex flex-row gap-8'>
          <FiShoppingCart size='22' className='stroke-primary cursor-pointer hover:scale-150 transition-all'/>
          <FiUser size='22' className='stroke-primary cursor-pointer hover:scale-150 transition-all'/>
        </span>
      </div>
      <span className="w-4/5 bg-secundary border-2 rounded-xl"></span>
    </nav>
  )
}