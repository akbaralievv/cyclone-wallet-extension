import { FC, ReactNode } from 'react';
import cn from 'classnames';

import styles from './DashBorderedBlock.module.scss';

export type DashBorderedBlockProps = {
  children: ReactNode;
  onClick?(): void;
};

export const DashBorderedBlock: FC<DashBorderedBlockProps> = (props) => {
  const { children, onClick } = props;
  return (
    <div className={cn(styles.root, onClick && styles.clickable)} onClick={onClick}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className={styles.border}>
        <defs>
          <linearGradient
            id="hoverGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
            gradientTransform="rotate(257)"
          >
            <stop offset="0%" stopColor="#32c5ff" />
            <stop offset="49%" stopColor="#b620e0" />
            <stop offset="100%" stopColor="#f7b500" />
          </linearGradient>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="none"
          stroke="rgba(255 255 255 / 0.2)"
          rx="8"
          strokeDasharray="4"
        />
      </svg>
      {children}
    </div>
  );
};
