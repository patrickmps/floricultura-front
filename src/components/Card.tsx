import { FiPlus, FiShoppingCart } from "react-icons/fi";
import FlorQuiabento from '../assets/flor-quiabento.jpg'

export const Card = () => {
  return (
    <div className="flex flex-col w-60 h-72 bg-white rounded-2xl">
      <img src={FlorQuiabento} alt=""  className="rounded-t-2xl"/>
      <div className="flex flex-col w-60 h-28 mt-6 bg-gradient-to-b from-transparent via-60% via-white/20 to-white rounded-t-2xl absolute"></div>
      <h1 className="text-md font-semibold px-2.5">Flor de Quiabento</h1>
      <p className="text-sm font-normal px-2.5 w-full h-20 overflow-hidden text-ellipsis">Lorem ipsum dolor dddddddddddddddsit amet consectetur. Viverra praesent sit dolor enssssssssssssssssssssssssssssssssssssssssssssssssssssim pellentesque gravida accumsa...</p>
      <span className="flex flex-row px-2.5 w-full justify-between">
        <h2 className="text-lg font-semibold">R$ 95, 00</h2>
        <button className="flex, flex row w-24 h-8 justify-center items-center rounded-md bg-pink-600">
          <FiPlus size='14' className='stroke-white stroke-3'/>
          <FiShoppingCart size='20' className='stroke-white stroke-3'/>
        </button>
      </span>
    </div>
  );
};
