import { useState, type HTMLAttributes } from 'react';
import { DropdownButton } from './DropdownButton/DropdownButton';
import { DropdownContent } from './DropdownContent/DropdownContent';
import { DropdownItem } from './DropdownItem/DropdownItem';
import cn from 'classnames';
export interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
  buttonText: string;
  options: string[];
}

  export function Dropdown({buttonText, options, className, ...props}: DropdownProps) {
    const [text, setText] = useState(buttonText);
    const [opened, setOpened] = useState(false);

    const handleButtonClick = () => {
      setOpened(o => !o);
    };

    const handleOptionClick = (text: string) => {
      return () => {
        setText(text);
        setOpened(false);
      }
    }
    return (
      <div className={cn(className, "relative z-10 opacity-[.99]")} {...props}>
          <DropdownButton opened={opened} onClick={handleButtonClick}>{text}</DropdownButton>
          <DropdownContent opened={opened}>
            {options.map(option => <DropdownItem onClick={handleOptionClick(option)} key={option}>{option}</DropdownItem>)}
          </DropdownContent>
      </div>
    );
  }