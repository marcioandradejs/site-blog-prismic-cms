import { ReactElement, cloneElement } from 'react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  activeClassName: string;
}

const ActiveLink = ({ children, activeClassName, ...rest}: ActiveLinkProps) => {
  const { asPath } = useRouter(); // reconhece a rota atual

  const className = asPath === rest.href ? activeClassName : '';
  // Se a rota que estamos acessados for igual ao link clicado, então ativamos a const className

  return (
    <Link {...rest}>
      {cloneElement(children, {
        className
      })}
    </Link>
  )
}

export default ActiveLink
