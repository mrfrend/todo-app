import type { ButtonHTMLAttributes } from 'react';
import styles from './DropdownButton.module.css'
import cn from 'classnames';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface DropdownButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  opened: boolean;
}

export function DropdownButton({children, className, opened, ...props}: DropdownButtonProps) {
  return (
    <button className={cn(className, styles.dropdownButton)} {...props} type='button'>
      {children}
      <span>
        {opened ? <ChevronUp className='size-[16px]'/>
          :   <ChevronDown className='size-[16px]'/>
        }
        
      </span>
    </button>
  );
}