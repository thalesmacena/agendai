import useUser from '@/lib/useUser';
import { loginApi } from '@/services/api';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { ContainerHeader, Content, NavLink, Profile } from './styles';

const Header = () => {
  const { user } = useUser();

  const Router = useRouter();

  const handleLogout = async () => {
    await loginApi.get('logout');

    Router.reload();
  };

  return (
    <ContainerHeader>
      <Content>
        <nav>
          <img src="/logo-agendai.svg" alt="fast-feet" />

          {user && user.isLoggedIn && (
            <>
              <NavLink active={Router.pathname === '/'}>
                <Link href="/" passHref>
                  CARDAPIO
                </Link>
              </NavLink>
              <NavLink active={Router.pathname === '/agendamento'}>
                <Link href="/agendamento" passHref>
                  AGENDAMENTO
                </Link>
              </NavLink>
            </>
          )}
        </nav>

        <aside>
          <Profile>
            <div>
              {user && user.isLoggedIn ? (
                <>
                  <strong>{user.name}</strong>
                  <Link href="/profile">Meu Perfil</Link>
                  <button type="button" onClick={handleLogout}>
                    Sair
                  </button>
                </>
              ) : (
                <>
                  <Link href="/signin">Login</Link>
                  <Link href="/signup">Cadastrar-se</Link>
                </>
              )}
            </div>
            {user && user.isLoggedIn && (
              <>
                {user.avatar ? (
                  <img src={user.avatar.url} alt={user.name} />
                ) : (
                  <img
                    src={`https://ui-avatars.com/api/?name=${user.name}&background=random&size=50&format=svg`}
                    alt={user.name}
                  />
                )}
              </>
            )}
          </Profile>
        </aside>
      </Content>
    </ContainerHeader>
  );
};

export default Header;
