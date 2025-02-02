import Navbar from '../components/Navbar';
import bannerImage from "../public/image/bannerImage.jpg"
import carouselImage1 from "../public/image/carousel-image-1.jpg"
import carouselImage2 from "../public/image/carousel-image-2.jpg"
import Image from 'next/image';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import PrimaryButton from '../components/PrimaryButton';
import CountUp from 'react-countup';


export default function Home() {
  return (
    <div className='relative bg-background'>
      <Navbar />
      <div className="min-h-screen flex items-center flex-col-reverse sm:flex-row">
        <div className="sm:pl-32 ">
          <h1 className="text-3xl line-clamp-2 sm:text-5xl leading-snug m-5 sm:mb-16 font-unbounded">Bringing the beauty of nature
            to your doorstep</h1>
          <div className="flex flex-col sm:flex-row items-center ">
            <Image src={bannerImage} alt='banner plant image' className='rounded-xl sm:w-[30vw]' />
            <div className="p-16 flex flex-col gap-10 items-start">
              <p className="font-hanken font-thin text-xl">
                We are your one-stop destination for things related
                to plants gardening, providing you with high-quality
                products and expert advice to help you.</p>
              <PrimaryButton href="#" text="See Collection" />
            </div>
          </div>
          <div className="hidden sm:flex flex-row gap-10 mt-10">
            <div className="">
              <CountUp end={880} className='font-unbounded' /><span>+</span>
              <p className='font-hanken font-thin'>Happy Customer</p>
            </div>
            <div className="">
              <CountUp end={650} className='font-unbounded text-xl'  /><span>+</span>
              <p className='font-hanken font-thin'>Types of Plants</p>
            </div>
            <div className="">
              <CountUp end={320} className='font-unbounded text-xl'  /> <span>+</span>
              <p className='font-hanken font-thin'>Unique Flower Pots</p>
            </div>
          </div>

        </div>
        <div className="sm:w-[70vw]">
          <Carousel showThumbs={false} showIndicators={false} showArrows={false} showStatus={false} infiniteLoop={true} interval={6000} dynamicHeight={true} autoPlay={true}>
            <Image src={carouselImage1} alt='carousel image 1' />
            <Image src={carouselImage2} alt='carousel image 2' />
          </Carousel>
        </div>
      </div>
    </div>
  );
}