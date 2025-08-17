import clsx from 'clsx';

interface TagTextProps {
  bold?: boolean;
  children: React.ReactNode;
}

const TagText = ({ bold = false, children }: TagTextProps) => {
  return (
    <span
      className={clsx(
        'border-primary-normal text-black-normal w-max rounded-xl border-1 px-2 py-2 text-center text-xs text-nowrap md:border-2 md:px-3 md:text-base',
        {
          'font-bold': bold,
          'font-medium': !bold,
        },
      )}
    >
      {children}
    </span>
  );
};

export default TagText;
