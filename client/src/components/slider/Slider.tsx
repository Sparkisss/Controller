import { useState } from 'react';
import { Button } from 'antd';
import{ CaretLeftOutlined, CaretRightOutlined, BorderOutlined, CheckOutlined} from '@ant-design/icons';
import classes from './Slider.module.scss'

type ImageSliderProps = {
    imagesUrls: string[];
}

const Slider = ({imagesUrls}: ImageSliderProps) => {
    const [imageIndex, setImageIndex] = useState(0);

    const showNextImage = () => {
        setImageIndex(index => {
            if (index === imagesUrls.length - 1) return 0;
            return index + 1;
        })
    }

    const showPrevImage = () => {
        setImageIndex(index => {
            if (index === 0) return imagesUrls.length - 1;
            return index - 1;
        })
    }

    return (
        <div className={classes.slider}>
            <Button onClick={showPrevImage} type='primary' className={classes.btnLeft} size='large' icon={<CaretLeftOutlined />}></Button>
            <img src={imagesUrls[imageIndex]}/>
            <Button onClick={showNextImage} type='primary' className={classes.btnRight} size='large' icon={<CaretRightOutlined />}></Button>
            <div className={classes.navigate}>
                {imagesUrls.map((_, index) => (
                    <Button 
                        size='small' 
                        key={index} 
                        onClick={() => setImageIndex(index)}
                        icon={index === imageIndex ? <CheckOutlined /> : <BorderOutlined />}>                            
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default Slider;