import { FaRocket, FaDollarSign, FaMoneyBillWave, FaClock} from 'react-icons/fa';

const Features = () => {
  return (
    <div className="container mx-auto max-w-5xl flex gap-12 flex-wrap items-start justify-center md:justify-between px-5 md:mb-20 mb-10">
      <div className="grid gap-4 justify-items-center text-center md:flex-1">
        <div className="rounded-full border-8 border-blue-600 p-4">
          <FaRocket className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-3xl font-bold">Reliable Travel Options</h3>
        <p>
          Enjoy peace of mind with our reliable vehicle booking services. We offer real-time updates and top-notch security features to ensure a smooth and secure journey for every traveler.
        </p>
      </div>
      <div className="grid gap-4 justify-items-center text-center md:flex-1">
        <div className="rounded-full border-8 border-blue-600 p-4">
          <FaMoneyBillWave className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-3xl font-bold">Affordable Travel Rates</h3>
        <p>
          Save more with our cost-effective vehicle booking solutions. We balance affordability and quality, ensuring you receive exceptional value without compromising on service excellence.
        </p>
      </div>
      <div className="grid gap-4 justify-items-center text-center md:flex-1">
        <div className="rounded-full border-8 border-blue-600 p-4">
          <FaClock className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-3xl font-bold">Trusted 24/7 Travel Service</h3>
        <p>
          Experience unparalleled trust with our round-the-clock services. We're dedicated to ensuring your travel needs are met anytime, anywhere, with reliable support and innovative solutions.
        </p>
      </div>
    </div>
  );
};

export default Features;
