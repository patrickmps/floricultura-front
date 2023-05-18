import { Link } from 'react-router-dom';
import Logo from '../assets/logo.svg'
import { useState } from 'react';

export const NavMenu = () => {
  const [selected, setSelected] = useState('home')

  return (
    <nav className="flex flex-col h-20 justify-center items-center mt-2">
      <div className="flex flex-row h-full px-36 justify-between w-full items-center">
        <img className="flex h-12" src={Logo} alt="" />
        <ul className="flex flex-row gap-5 font-title font-semibold text-base text-primary ">
          <li><Link onClick={() => setSelected('home')} className={(selected === 'home' ? 'text-pink-600 transition-colors' : 'text-primary transition-colors')} to='/'>Home</Link></li>
          <li><Link onClick={() => setSelected('products')} className={selected === 'products' ? 'text-pink-600 transition-colors' : 'text-primary transition-colors'} to='/produtos'>Produtos</Link></li>
          <li><Link onClick={() => setSelected('suppliers')} className={selected === 'suppliers' ? 'text-pink-600 transition-colors' : 'text-primary transition-colors'} to='/fornecedores'>Fornecedores</Link></li>
          <li><Link onClick={() => setSelected('address')} className={selected === 'address' ? 'text-pink-600 transition-colors' : 'text-primary transition-colors'} to='/enderecos'>Endereços</Link></li>
          <li><Link onClick={() => setSelected('category')} className={selected === 'category' ? 'text-pink-600 transition-colors' : 'text-primary transition-colors'} to='/categorias'>Categoria</Link></li>
        </ul>
        <span className='flex flex-row gap-8 font-title font-bold text-base text-primary'>
          <Link onClick={() => setSelected('orders')} className={selected === 'orders' ? 'text-pink-600 transition-colors' : 'text-primary transition-colors'} to='/pedidos'>Pedidos</Link>
        </span>
      </div>
      <span className="w-4/5 bg-secundary border-2 rounded-xl"></span>
    </nav>
  )
}