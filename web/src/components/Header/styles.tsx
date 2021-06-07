import styled from 'styled-components';

export const ContainerHeader = styled.div`
  background: ${({ theme }) => theme.colors.backgroundHeader};
  padding: 0 30px;
  box-shadow: 0 0 2px 1px ${({ theme }) => theme.boxShadow};
`;

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      width: 7.8rem;
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid ${({ theme }) => theme.colors.divider};
    }

    a {
      font-weight: bold;
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

interface INavLink {
  active: boolean;
}

export const NavLink = styled.span<INavLink>`
  a {
    font-size: 15px;
    font-weight: bold;
    color: ${({ theme, active }) =>
      active
        ? theme.colors.textUnavaliable
        : theme.colors.textInHeader} !important;
    margin-right: 15px;
    transition: 0.2s;

    &:hover {
      color: ${({ theme }) => theme.colors.textUnavaliable} !important;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid ${({ theme }) => theme.colors.divider};

  div {
    text-align: right;
    margin-right: 10x;

    strong {
      display: block;
      color: ${({ theme }) => theme.colors.strongInHeader};
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: ${({ theme }) => theme.colors.textInHeader};
    }

    button {
      background: none;
      border: 0;
      color: ${({ theme }) => theme.colors.textInHeader};
    }
  }

  img {
    margin-left: 5px;
    height: 50px;
    width: 50px;
    border-radius: 5px;
  }
`;
