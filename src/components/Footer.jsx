import { FaFacebookF, FaInstagram, FaFacebookMessenger } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="flex flex-col space-y-10 justify-center border-t md:pt-10 pt-5 bg-slate-50">
      <nav className="flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
        <a className="hover:text-blue-600 md:ml-3" href="/">Home</a>
        <a className="hover:text-blue-600 md:ml-3" href="/cars">Cars</a>
        <a className="hover:text-blue-600 md:ml-3" href="/buses">Buses</a>
        <a className="hover:text-blue-600 md:ml-3" href="/vans">Vans</a>
        <a className="hover:text-blue-600 md:ml-3" href="/contact">Contact</a>

      </nav>

      <div className="flex justify-center space-x-5 text-gray-500 bg-slate-50">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF className="text-xl hover:text-blue-500" />
        </a>

        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-xl hover:text-blue-500" />
        </a>
        <a href="https://messenger.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookMessenger className="text-xl hover:text-blue-500" />
        </a>
      </div>

      <p className="text-center bg-slate-200 p-5 text-gray-700 font-medium">&copy; Copurights 2024 OlaBase, All rights reserved.</p>
    </footer>
  );
};

export default Footer;
