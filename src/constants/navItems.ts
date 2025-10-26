import type { NavItem } from '@/types/nav';

export const NAV_ITEMS_MAIN: NavItem[] = [
  { label: '인기영상', href: '/videos' },
  { label: 'SNS 분석', href: '/sns' },
  { label: '인물분석', href: '/politician' },
  { label: 'MY 히스토리', href: '/my-history' },
];

export const buildDefaultNavItems = (onOpenUrlModal: () => void): NavItem[] => [
  { label: 'URL 검색하기', onClick: onOpenUrlModal },
  ...NAV_ITEMS_MAIN,
];

export const getNavItems = (onOpenUrlModal: () => void) => ({
  main: NAV_ITEMS_MAIN,
  default: buildDefaultNavItems(onOpenUrlModal),
});
