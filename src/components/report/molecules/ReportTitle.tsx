import FactBadge from '@/components/ui/factBadge';

const ReportTitle = () => {
  return (
    <div className="flex h-40 w-[80%] flex-col justify-center md:w-[70%]">
      <div className="flex justify-center">
        <div className="absolute top-[20%] left-[10%] md:top-[26%] md:left-[20%] lg:left-[28%]">
          <FactBadge type={'true1'} percent={'90'} />
        </div>
        <span className="mr-3 text-2xl font-extrabold text-black md:text-4xl">
          FACT
        </span>
        <span className="text-primary-normal text-2xl font-extrabold md:text-4xl">
          REPORT
        </span>
      </div>
      <hr className="mt-10 w-full border-b-2 text-gray-400" />
    </div>
  );
};

export default ReportTitle;
