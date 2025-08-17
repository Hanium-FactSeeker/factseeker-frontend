import { ClaimTabs } from '../molecules/ClaimTabs';
import { EvidenceList } from '../molecules/EvidenceList';

const ContentEvidence = () => {
  return (
    <div className="mt-4 flex w-full flex-col items-center">
      <ClaimTabs />
      <EvidenceList />
    </div>
  );
};

export default ContentEvidence;
