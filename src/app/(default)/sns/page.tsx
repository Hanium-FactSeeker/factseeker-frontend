'use client';

import Desktop from '@/components/sns/Desktop';
import Mobile from '@/components/sns/Mobile';

export default function Page() {
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
