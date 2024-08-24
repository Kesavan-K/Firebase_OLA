
const Banner = () => {
  return (
    <div className="bg-slate-200 md:py-20 py-10 md:my-20 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold uppercase text-black sm:text-4xl">
            Your Ultimate Trip Booking Platform
          </h2>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            Effortlessly book cars, vans, and buses for your next adventure with seamless and reliable service.
          </p>
        </div>
      </div>
      <div className="mt-10 pb-1">
        <div className="relative">
          <div className="absolute inset-0 h-1/2 bg-slate-200"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                    Vehicles Available
                  </dt>
                  <dd className="order-1 text-5xl font-bold text-blue-600">50+</dd>
                </div>
                <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                    Bookings Made
                  </dt>
                  <dd className="order-1 text-5xl font-bold text-blue-600">100+</dd>
                </div>
                <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                    New Bookings/Month
                  </dt>
                  <dd className="order-1 text-5xl font-bold text-blue-600">20+</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
