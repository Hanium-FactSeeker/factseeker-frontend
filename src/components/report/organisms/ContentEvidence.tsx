import ButtonGroup from '../molecules/ButtonGroup';
import ClaimTabs from '../molecules/ClaimTabs';
import { EvidenceList } from '../molecules/EvidenceList';
const ContentEvidence = () => {
  return (
    <div className="mt-12 flex w-full flex-col items-center">
      <ClaimTabs />
      <EvidenceList /> <ButtonGroup />
    </div>
  );
};
export default ContentEvidence;
