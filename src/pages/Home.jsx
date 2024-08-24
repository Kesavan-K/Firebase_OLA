// src/pages/Home.js
import MyImageGallery from "../components/Carousel";
import Marquee from "../components/banner";
import FeaturesSection from "../components/FeatureSection";
import Features from "../components/ThreeCards";
import OfferBanner from "../components/OfferBanner";

const Home = () => {
  return <div className="">
      <MyImageGallery/>
      <Marquee/>
      <FeaturesSection/>
      <Features/>
      <OfferBanner/>
  </div>;
};

export default Home;
