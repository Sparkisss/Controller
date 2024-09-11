import Slider from "../components/slider/Slider";
import slide1 from '../assets/slider/1.jpg.jpg'
import slide2 from '../assets/slider/2.jpg.jpg'
import slide3 from '../assets/slider/3.jpg.jpg'
import slide4 from '../assets/slider/4.jpg.jpg'
import slide5 from '../assets/slider/5.jpg.jpg'

const IMAGES = [slide1, slide2, slide3, slide4, slide5];

const SliderPage = () => {
    return (        
        <Slider imagesUrls={IMAGES}/>
    );
};

export default SliderPage;