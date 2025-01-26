import Directory from '../../components/directory/directory';
import AnimatedGallery from '../../components/AnimatedGallery/AnimatedGallery';
import CarouselDemo from '../../components/Carousel/Carousel';
const Home = () => {
    return (
        <div >
            <CarouselDemo/>
            <Directory />
            <AnimatedGallery/>
        </div>
    );
};

export default Home;
