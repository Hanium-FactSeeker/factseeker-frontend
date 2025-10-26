import ArticleCard from '../molecules/ArticleCard';
import SnsCard from '../molecules/SnsCard';
import PoliticianCard from '../molecules/PoliticianCard';
import type {
  HistoryTabType,
  ArticleHistoryItem,
  SnsHistoryItem,
  PoliticianHistoryItem,
} from '@/types/history';

interface HistoryContentProps {
  activeTab: HistoryTabType;
  articles: ArticleHistoryItem[];
  snsItems: SnsHistoryItem[];
  politicians: PoliticianHistoryItem[];
  className?: string;
}

const HistoryContent = ({
  activeTab,
  articles,
  snsItems,
  politicians,
  className = '',
}: HistoryContentProps) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'articles':
        return (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        );

      case 'sns':
        return (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {snsItems.map((snsItem) => (
              <SnsCard key={snsItem.id} snsItem={snsItem} />
            ))}
          </div>
        );

      case 'politicians':
        return (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {politicians.map((politician) => (
              <PoliticianCard key={politician.id} politician={politician} />
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return <div className={className}>{renderContent()}</div>;
};

export default HistoryContent;
