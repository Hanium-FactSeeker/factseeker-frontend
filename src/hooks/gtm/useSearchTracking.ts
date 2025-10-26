import { gtmPush } from '@/utils/gtm';
import { usePathname } from 'next/navigation';

export function useSearchTracking() {
  const pathname = usePathname();
  function trackSearchSubmit(targetName: string) {
    gtmPush({
      event: 'search_submit',
      page_path: pathname,
      target_name: targetName,
    });
  }

  function trackSearchResultLoaded(reliabilityScore: number) {
    gtmPush({
      event: 'search_result_loaded',
      page_path: pathname,
      reliability: reliabilityScore,
    });
  }

  return {
    trackSearchSubmit,
    trackSearchResultLoaded,
  };
}
