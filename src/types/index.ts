import type { ReactNode } from 'react';

export interface NavLinkItem {
  path: string;
  label: string;
}

export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

export interface PageProps extends BaseComponentProps {
  title?: string;
}
