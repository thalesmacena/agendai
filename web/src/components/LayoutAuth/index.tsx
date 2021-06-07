import { ReactElement } from 'react';
import { Content, Wrapper } from './styles';

interface AuthChildren {
  children: ReactElement;
}

const AuthLayout = ({ children }: AuthChildren) => {
  return (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  );
};

export default AuthLayout;
