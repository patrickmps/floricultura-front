import FlorHome from '../assets/flower-home.png'
import Plant0 from '../assets/plant-0.png'
import Plant1 from '../assets/plant-1.png'
import Plant2 from '../assets/plant-2.png'
import Plant3 from '../assets/plant-3.png'

export const Home = () => {
  return (
    <div className="flex flex-col w-full items-center px-36 overflow-y-scroll pb-10">
      <div className="mt-8 flex flex-row w-full max-w-screen-xl justify-between items-center">
        <h1 className='w-98 text-4xl font-sans font-semibold'>O colorido do <b className='font-semibold text-pink-600'>Nordeste</b> floresce em cada arranjo.</h1>
        <img src={FlorHome} alt="" className='w-102'/>
      </div>
      <span className='flex flex-row w-full max-w-screen-xl justify-items-start mt-11'>
        <div>
          <h2 className='font-semibold text-xl'>Compre Plantas</h2>
          <p className='w-40 font-normal text-base'>Melhore a qualidade do ar que você respira</p>
        </div>
        <span className='flex flex-row gap-8 ml-24'>
          <img src={Plant0} alt="" />
          <img src={Plant1} alt="" />
          <img src={Plant2} alt="" />
          <img src={Plant3} alt="" />
        </span>
      </span>
    </div>
  )
}