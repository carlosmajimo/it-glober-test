import React, { useMemo } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';

interface IMenuIconProps {
  iconName: string;
  href?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const MenuIcon = ({ iconName, onClick, href, disabled = false }: IMenuIconProps) => {
  const icon = `mdi:${iconName}`;

  const props = useMemo(() => ({
    className: "p-2 rounded-lg hover:bg-sky-500 hover:text-white disabled:bg-gray-200 disabled:text-gray-400",
    disabled
  }),[disabled])

  return (
    <>
      {!!href ? (
        <Link {...props} href={href}>
          <Icon icon={icon} />
        </Link>
      ) : (
        <button {...props} onClick={onClick}>
          <Icon icon={icon} />
        </button>
      )}
    </>
  );
}

export default MenuIcon