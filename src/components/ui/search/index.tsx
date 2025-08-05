interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolder: string;
  onClick: () => void;
}
const Search: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeHolder,
  onClick,
}) => {
  return (
    <div className="border-gray-normal relative mt-4 w-full rounded-2xl border-1 bg-white md:max-w-[708px]">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeHolder}
        className="w-full rounded-full px-6 py-3 text-[10px] text-gray-800 md:w-[708px] md:text-lg"
      />
      <button
        className="absolute top-1/2 right-4 -translate-y-1/2 transform text-sm md:text-xl"
        onClick={onClick}
      >
        🔍
      </button>
    </div>
  );
};

export default Search;
