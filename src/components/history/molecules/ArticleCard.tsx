import Image from 'next/image';
import ValidityBadge from '../atoms/ValidityBadge';
import type { ArticleHistoryItem } from '@/types/history';

interface ArticleCardProps {
  article: ArticleHistoryItem;
  className?: string;
}

const ArticleCard = ({ article, className = '' }: ArticleCardProps) => {
  const handleClick = () => {
    if (article.url) {
      window.open(article.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={`border-gray-normal flex h-[240px] w-full cursor-pointer gap-4 rounded-xl border bg-white p-4 transition-shadow hover:shadow-md ${className}`}
      onClick={handleClick}
    >
      <div className="relative flex-shrink-0">
        <Image
          src={article.thumbnail || '/og-image.png'}
          alt={article.title}
          width={120}
          height={120}
          className="h-[120px] w-[120px] rounded-lg object-cover"
        />
        {article.validity && article.validityPercent && (
          <ValidityBadge
            type={article.validity}
            percent={article.validityPercent}
            className="absolute -top-2 -left-2"
          />
        )}
      </div>

      <div className="flex h-full min-w-0 flex-1 flex-col justify-between">
        <div className="flex-1">
          {article.source && (
            <span className="text-gray-strong mb-1 block text-xs">{article.source}</span>
          )}
          <h3 className="text-black-normal mb-2 line-clamp-4 text-sm font-bold">{article.title}</h3>
        </div>

        <div className="text-gray-strong mt-auto text-xs">{article.date}</div>
      </div>
    </div>
  );
};

export default ArticleCard;
