import Carousel1 from '../../assets/carousel1.jpeg';
import Carousel2 from '../../assets/carousel2.jpeg';
import Carousel3 from '../../assets/carousel3.jpeg';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel"

const CarouselDemo = () => {
  return ( 
    <div>
      <Carousel className='pr-2 pl-6 mb-16'>
        <CarouselContent className='h-60 w-full'>
          <CarouselItem>
            <img 
              src={Carousel1} 
              alt="Carousel 1"
              className="w-full h-full object-cover" 
            />
          </CarouselItem>
          <CarouselItem>
            <img 
              src={Carousel2} 
              alt="Carousel 2"
              className="w-full h-full object-cover" 
            />
          </CarouselItem>
          <CarouselItem>
            <img 
              src={Carousel3} 
              alt="Carousel 3"
              className="w-full h-full object-cover" 
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className='ml-9'/>
        <CarouselNext className='mr-9'/>
      </Carousel>
    </div>
  )
}

export default CarouselDemo;
