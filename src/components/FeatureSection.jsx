import { FaCar, FaBus, FaTruck } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link

const FeaturesSection = () => {
  return (
    <div className="relative overflow-hidden md:mb-20 py-10 space-y-24">
      {/* Feature 1 */}
      <div className="relative">
        <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
          <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
            <div>
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                  <FaCar className="h-8 w-8 text-white" />
                </span>
              </div>

              <div className="mt-6">
                <h2 className="text-3xl font-bold tracking-tight text-black">
                  Book Your Dream Car
                </h2>
                <p className="mt-4 text-lg text-gray-800">
                  Discover an extensive selection of high-end luxury and
                  budget-friendly cars tailored for every occasion. Whether
                  you are planning a weekend getaway or a special event, our
                  curated fleet ensures you travel in style and comfort.{" "}
                </p>
                <div className="mt-6">
                  <Link
                    className="inline-flex rounded-lg bg-blue-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-blue-600 hover:bg-pink-700 hover:ring-pink-700"
                    to="/cars"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 sm:mt-16 lg:mt-0 md:px-20 lg:px-0 ">
            <div className="relative overflow-hidden rounded-xl shadow-2xl mx-5 ring-1 ring-black ring-opacity-5">
              <img
                loading="lazy"
                className="w-full h-auto object-cover"
                src="/CarHome.png"
                alt="Car booking"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Feature 2 */}
      <div className="relative">
        <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
          <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0 lg:col-start-2">
            <div>
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                  <FaBus className="h-8 w-8 text-white" />
                </span>
              </div>
              <div className="mt-6">
                <h2 className="text-3xl font-bold tracking-tight text-black">
                  Reliable Bus Rentals
                </h2>
                <p className="mt-4 text-lg text-gray-800">
                  Organize seamless group travel with our reliable bus rental
                  services. Ideal for corporate events, school trips, or family
                  gatherings, our buses come equipped with modern amenities to
                  ensure a pleasant journey.{" "}
                </p>
                <div className="mt-6">
                  <Link
                    className="inline-flex rounded-lg bg-blue-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-blue-600 hover:bg-pink-700 hover:ring-pink-700"
                    to="/buses"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 sm:mt-16 lg:mt-0 md:px-20 lg:px-0">
            <div className="relative overflow-hidden rounded-xl mx-5 shadow-xl ring-1 ring-black ring-opacity-5">
              <img
                alt="Bus rental"
                loading="lazy"
                className="w-full h-96 object-cover"
                src="/BusHome.jpg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Feature 3 */}
      <div className="">
        <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
          <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
            <div>
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                  <FaTruck className="h-8 w-8 text-white" />
                </span>
              </div>
              <div className="mt-6">
                <h2 className="text-3xl font-bold tracking-tight text-black">
                  Convenient Van Bookings
                </h2>
                <p className="mt-4 text-lg text-gray-800">
                  Simplify your travel needs with our versatile van rental
                  services. Perfect for family vacations, business trips, or
                  moving goods, our vans are designed to offer both practicality
                  and comfort.{" "}
                </p>
                <div className="mt-6">
                  <Link
                    className="inline-flex rounded-lg bg-blue-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-blue-600 hover:bg-pink-700 hover:ring-pink-700"
                    to="/vans"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 sm:mt-16 lg:mt-0 md:px-20 lg:px-0">
            <div className="relative overflow-hidden rounded-xl mx-5 shadow-xl">
              <img
                loading="lazy"
                className="w-full h-96 object-cover"
                src="/VanHome.png"
                alt="Van booking"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
