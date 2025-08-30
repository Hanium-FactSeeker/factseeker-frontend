import { FaRegEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="mx-auto mt-6 min-h-10 w-full bg-white text-xs md:mt-20">
      <div className="mx-auto flex max-w-[1200px] justify-between px-4 py-3">
        <p> © 2025 Fact Seeker</p>
        <span className="flex items-center gap-2">
          <FaRegEnvelope />
          <p>factseeker60@gmail.com</p>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
