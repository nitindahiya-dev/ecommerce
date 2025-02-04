import Navbar from '../components/Navbar';
import bannerImage from "../public/image/bannerImage.jpg";
import carouselImage1 from "../public/image/carousel-image-1.jpg";
import carouselImage2 from "../public/image/carousel-image-2.jpg";
import beforeImage from "../public/image/before.jpg";
import afterImage from "../public/image/after.jpg";
import latestImage1 from "../public/image/latest-image-1.jpg";
import latestImage2 from "../public/image/latest-image-2.jpg";
import Image from 'next/image';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import PrimaryButton from '../components/PrimaryButton';
import CountUp from 'react-countup';
import { Compare } from '../components/ui/compare';

export default function Home() {
  return (
    <div className='relative bg-background'>
      {/* Navbar Start */}
      <Navbar />
      {/* Navbar End */}

      {/* Banner Start */}
      <div className="min-h-screen flex  flex-col-reverse sm:flex-row">
        <div className="sm:pl-32 ">
          <h1 className="text-3xl line-clamp-2 sm:text-5xl leading-snug m-5 sm:mb-16 font-unbounded">
            Bringing the beauty of nature to your doorstep
          </h1>
          <div className="flex flex-col sm:flex-row items-center ">
            <Image
              src={bannerImage}
              alt='banner plant image'
              className='rounded-xl sm:w-[30vw]'
            />
            <div className="p-16 flex flex-col gap-10 items-start">
              <p className="font-hanken font-thin text-xl">
                We are your one-stop destination for things related to plants gardening, providing you with high-quality products and expert advice to help you.
              </p>
              <PrimaryButton href="#" text="See Collection" />
            </div>
          </div>
          <div className="hidden sm:flex flex-row gap-10 mt-10">
            <div>
              <CountUp end={880} className='font-unbounded' /><span>+</span>
              <p className='font-hanken font-thin'>Happy Customer</p>
            </div>
            <div>
              <CountUp end={650} className='font-unbounded text-xl' /><span>+</span>
              <p className='font-hanken font-thin'>Types of Plants</p>
            </div>
            <div>
              <CountUp end={320} className='font-unbounded text-xl' /><span>+</span>
              <p className='font-hanken font-thin'>Unique Flower Pots</p>
            </div>
          </div>
        </div>
        <div className="sm:w-[70vw]">
          <Carousel
            showThumbs={false}
            showIndicators={false}
            showArrows={false}
            showStatus={false}
            infiniteLoop={true}
            interval={6000}
            dynamicHeight={true}
            autoPlay={true}
          >
            <Image src={carouselImage1} alt='carousel image 1' />
            <Image src={carouselImage2} alt='carousel image 2' />
          </Carousel>
        </div>
      </div>
      {/* Banner End */}

      {/* BeforeAfter Start */}
      <div className="flex items-center mb-32 flex-col  justify-center gap-10 max-w-[85vw] mx-auto ">
        <h2 className='text-3xl sm:text-5xl font-unbounded mb-10'>The Pruning Scissors</h2>
        <div className="w-full relative">
          <Compare
            firstImage={beforeImage}
            secondImage={afterImage}
            firstImageClassName="object-cover object-left-top"
            secondImageClassname="object-cover object-left-top"
            className="h-[250px] w-[200px] md:h-[600px] md:w-full"
            slideMode="hover"
          />
          <div className="flex justify-between  bottom-5 left-10 right-10 absolute z-20">
            <p className='bg-[var(--background)] font-unbounded font-bold px-5 py-2 tracking-widest text-lg'>Before</p>
            <p className='bg-[var(--background)] font-unbounded font-bold px-5 py-2 tracking-widest text-lg'>After</p>
          </div>
        </div>
      </div>
      {/* BeforeAfter End */}

      {/* Latest Collection Start */}
      <div className="flex items-center flex-col  mb-32 justify-center gap-10 max-w-[85vw] mx-auto ">
        <h2 className='text-3xl sm:text-5xl font-unbounded mb-10'>Our Latest Collection</h2>
        <div className="flex gap-10">
          <div className="flex w-full gap-10">
            <div className="flex items-center flex-col gap-5">
              <Image src={latestImage1} alt='Plant Image' className='w-full rounded-full' />
              <p className='font-unbounded font-semi  text-2xl pt-5'>Air Purifying Plants</p>
              <span className='font-hanken font-thin text-xl text-center '>Breathe easy with houseplants that clean the air in your house.</span>
            </div>
            <div className="flex items-center flex-col gap-5">
              <Image src={latestImage2} alt='Plant Image' className='w-full rounded-full' />
              <p className='font-unbounded font-semi  text-2xl pt-5'>Air Purifying Plants</p>
              <span className='font-hanken font-thin text-xl text-center '>Breathe easy with houseplants that clean the air in your house.</span>
            </div>
            <div className="flex items-center flex-col gap-5">
              <Image src={latestImage1} alt='Plant Image' className='w-full rounded-full' />
              <p className='font-unbounded font-semi  text-2xl pt-5'>Air Purifying Plants</p>
              <span className='font-hanken font-thin text-xl text-center '>Breathe easy with houseplants that clean the air in your house.</span>
            </div>
          </div>
        </div>
      </div>
      {/* Latest Collection End */}


    </div>
  );
}
