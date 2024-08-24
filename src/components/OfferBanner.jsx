import Typewriter from 'typewriter-effect';

const OfferBanner = () => {
  return (
    <section className="px-4 md:mb-20 mb-10">
    <div className="bg-gradient-to-br from-sky-400 via-sky-400 to-violet-400 p-6 sm:p-10 rounded-2xl w-full text-white flex items-center justify-between max-w-2xl mx-auto mt-20">
      <div className="flex flex-col gap-6">
        <div>
          <span className="text-slate-700 uppercase">Special Booking Offer</span>
          <br />
          <span className="text-4xl text-white font-semibold">
            <Typewriter
              options={{
                strings: ['Get 40% off on all vehicle bookings!', 'Limited Time Offer!'],
                autoStart: true,
                loop: true,
              }}
            />
          </span>
        </div>
          <a href="/contact" rel="noreferrer"
            className="text-black bg-white hover:bg-gray-50 px-4 py-2 rounded-lg w-fit ease duration-300 flex gap-1 items-center group">
            <span>Book Now</span>
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="group-hover:translate-x-1 transition-transform ease duration-200" width="1em" height="1em" viewBox="0 0 256 256">
              <path fill="currentColor" d="m221.66 133.66l-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32Z"></path>
            </svg>
          </a>
        </div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-blue-600" viewBox="0 0 15 15">
            <path fill="currentColor" fillRule="evenodd" d="M4.5 0A2.5 2.5 0 0 0 2 2.5v.286c0 .448.133.865.362 1.214H1.5A1.5 1.5 0 0 0 0 5.5v1A1.5 1.5 0 0 0 1.5 8H7V4h1v4h5.5A1.5 1.5 0 0 0 15 6.5v-1A1.5 1.5 0 0 0 13.5 4h-.862c.229-.349.362-.766.362-1.214V2.5A2.5 2.5 0 0 0 10.5 0c-1.273 0-2.388.68-3 1.696A3.498 3.498 0 0 0 4.5 0ZM8 4h2.786C11.456 4 12 3.456 12 2.786V2.5A1.5 1.5 0 0 0 10.5 1A2.5 2.5 0 0 0 8 3.5V4ZM7 4H4.214C3.544 4 3 3.456 3 2.786V2.5A1.5 1.5 0 0 1 4.5 1A2.5 2.5 0 0 1 7 3.5V4Z" clipRule="evenodd"></path>
            <path fill="currentColor" d="M7 9H1v3.5A2.5 2.5 0 0 0 3.5 15H7V9Zm1 6h3.5a2.5 2.5 0 0 0 2.5-2.5V9H8v6Z"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default OfferBanner;


