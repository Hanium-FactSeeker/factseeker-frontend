import Desktop from './Desktop';
import Mobile from './Mobile';

export default function SNSPage() {
  return (
    <>
      <div className="hidden md:block">
        <Desktop />
      </div>
      <div className="block md:hidden">
        <Mobile />
      </div>
    </>
  );
}
