import React from 'react';
import MenuIcon from './MenuIcon';

interface IMenuProps {
  children?: React.ReactNode
}

const Menu = ({ children }: IMenuProps) => {

  return (
    <div className="flex gap-x-1 w-fit rounded-lg shadow-lg border-solid border-2 border-gray-400 p-2 absolute bottom-5 inset-x-0 m-auto">
        <MenuIcon
          iconName="home-variant-outline"
          href="/"
        />
      {children}
    </div>
  );
}

export default Menu