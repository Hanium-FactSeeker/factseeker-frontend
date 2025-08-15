import { IoDownloadOutline, IoShareOutline } from 'react-icons/io5';
import Kakao from '@/assets/kakao.svg';
const ButtonGroup = () => {
  return (
    <div className="flex gap-10 p-8">
      <button className="bg-gray-normal flex h-12 w-12 items-center justify-center rounded-full md:h-14 md:w-14">
        <IoDownloadOutline size={30} />
      </button>
      <button className="bg-gray-normal flex h-12 w-12 items-center justify-center rounded-full md:h-14 md:w-14">
        <IoShareOutline size={30} />
      </button>
      <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FEE500] md:h-14 md:w-14">
        <Kakao size={30} />
      </button>
    </div>
  );
};
export default ButtonGroup;
