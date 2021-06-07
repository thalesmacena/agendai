/* eslint-disable camelcase */
import InputAvatar from '@/components/InputAvatar';
import Input from '@/components/InputLogin';
import AuthLayout from '@/components/LayoutAuth';
import DefaultLayout from '@/components/LayoutDefault';
import useUser from '@/lib/useUser';
import { api, loginApi } from '@/services/api';
import { Container } from '@/styles/pages/Profile';
import { Form } from '@unform/web';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

interface UpdateData {
  name: string;
  email: string;
  dre: string;
  oldPassword: string;
  avatar_id: number;
  password: string;
  confirmPassword: string;
}

const Profile = () => {
  const Router = useRouter();

  const { user } = useUser({ redirectTo: '/signin' });

  const [loading, setLoading] = useState(false);
  const [isInvalidUpdateData, setIsInvalidUpdateData] = useState(false);

  const formRef = useRef(null);

  if (!user || user.isLoggedIn === false) {
    return (
      <AuthLayout>
        <h1>loading...</h1>
      </AuthLayout>
    );
  }

  api.defaults.headers.Authorization = `Bearer ${user.token}`;

  const handleSubmit = async (data: UpdateData) => {
    setLoading(true);

    try {
      const { name, email, dre, oldPassword, avatar_id, ...rest } = data;

      const profile = {
        name,
        email,
        dre,
        avatar_id,
        ...(rest.password ? { oldPassword, ...rest } : {})
      };

      if (!oldPassword) {
        toast.error('É preciso entrar com sua senha atual');
      } else {
        await api.put('users', profile);

        const response = await loginApi.post('login', {
          email,
          password: rest.password ? rest.password : oldPassword
        });

        api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

        Router.replace('/');
        Router.replace('profile');

        toast.success('Perfil Atualizado com sucesso');
      }
    } catch {
      toast.error('Erro ao atualizar o perfil, confira seus dados!');
      setIsInvalidUpdateData(true);

      setTimeout(() => {
        setIsInvalidUpdateData(false);
      }, 2000);
    }

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>{user.name} | Agendaí</title>
      </Head>
      <DefaultLayout>
        <Container>
          <Form initialData={user} ref={formRef} onSubmit={handleSubmit}>
            <InputAvatar name="avatar_id" />

            <Input name="name" placeholder="Nome completo" />
            <Input name="dre" placeholder="Seu DRE" />
            <Input name="email" type="email" placeholder="Seu e-mail" />

            <hr />

            <Input
              name="oldPassword"
              type="password"
              placeholder="Sua senha atual"
            />
            <Input name="password" type="password" placeholder="Nova senha" />
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirme a senha"
            />
            {isInvalidUpdateData ? (
              <button disabled type="submit">
                Houve um erro ao atualizar o perfil
              </button>
            ) : (
              <button type="submit">
                {loading ? 'Carregando...' : 'Atualizar o perfil'}
              </button>
            )}
          </Form>
        </Container>
      </DefaultLayout>
    </>
  );
};

export default Profile;
