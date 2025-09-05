import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolder: string;
  onClick: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
const Search: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeHolder,
  onClick,
}) => {
  return (
    <div className="border-gray-normal relative mt-4 flex w-full items-center rounded-2xl border-1 bg-white md:max-w-[708px]">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeHolder}
        className="text-black-normal w-[90%] overflow-hidden rounded-full px-6 py-3 text-[10px] text-ellipsis whitespace-nowrap focus:outline-none md:text-lg"
      />
      <button
        className="absolute right-6 transform text-sm text-gray-400 md:text-xl"
        onClick={onClick}
      >
        <FaSearch />
      </button>
    </div>
  );
};

export default Search;
