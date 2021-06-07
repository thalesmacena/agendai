import Header from '@/components/Header';
import { ReactElement } from 'react';
import { Wrapper } from './styles';

interface DefaultChildren {
  children: ReactElement;
}

const DefaultLayout = ({ children }: DefaultChildren) => {
  return (
    <Wrapper>
      <Header />
      {children}
    </Wrapper>
  );
};

export default DefaultLayout;
