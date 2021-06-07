import Input from '@/components/InputLogin';
import AuthLayout from '@/components/LayoutAuth';
import useUser from '@/lib/useUser';
import { api, loginApi } from '@/services/api';
import { Form } from '@unform/web';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

interface LoginData {
  dre: string;
  password: string;
}

const SingIn = () => {
  const formRef = useRef(null);
  const [isInvalidLogin, setIsInvalidLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const Router = useRouter();

  useUser({
    redirectTo: '/',
    redirectIfFound: true
  });

  const handleSubmit = async (data: LoginData) => {
    setIsLoading(true);

    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        dre: Yup.string()
          .matches(/^\d+$/)
          .length(9, 'DRE deve ter 9 caracteres'),
        password: Yup.string()
          .min(6, 'A senha precisa ter no minimo 6 caracteres')
          .required('A senha é obrigatória')
      });

      await schema.validate(data, {
        abortEarly: false
      });

      const response = await loginApi.post('login', {
        dre: data.dre,
        password: data.password
      });

      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

      Router.push('/');
    } catch (err) {
      setIsLoading(false);

      if (err instanceof Yup.ValidationError) {
        const validationErrors = {};

        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      } else {
        setIsInvalidLogin(true);
        toast.error('Login inválido, verifique seus dados');

        setTimeout(() => {
          setIsInvalidLogin(false);
        }, 2000);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Agendaí - Entre ou cadastre-se</title>
      </Head>
      <AuthLayout>
        <>
          <Link href="/">
            <img src="logo-agendai.svg" alt="Agendaí" />
          </Link>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name="dre" type="text" placeholder="Seu DRE" />
            <Input name="password" type="password" placeholder="Senha" />

            {isInvalidLogin ? (
              <button disabled type="submit">
                Login Inválido
              </button>
            ) : (
              <button type="submit">
                {isLoading ? 'Carregando...' : 'Acessar'}
              </button>
            )}
            <Link href="/signup">Criar conta gratuita</Link>
            <Link href="/">Ver Cardápio</Link>
          </Form>
        </>
      </AuthLayout>
    </>
  );
};

export default SingIn;
