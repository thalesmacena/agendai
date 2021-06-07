import Input from '@/components/InputLogin';
import AuthLayout from '@/components/LayoutAuth';
import useUser from '@/lib/useUser';
import { Form } from '@unform/web';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { api, loginApi } from '../services/api';

interface RegisterData {
  name: string;
  email: string;
  dre: string;
  password: string;
}

const SignUp = () => {
  const formRef = useRef(null);

  const [isInvalidRegister, setIsInvalidRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const Router = useRouter();

  useUser({
    redirectTo: '/',
    redirectIfFound: true
  });

  const handleSubmit = async (data: RegisterData) => {
    setIsLoading(true);

    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('O Nome é obrigatório'),
        email: Yup.string()
          .email('Insira um email válido')
          .required('O email é obrigatório'),
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

      await api.post('users', {
        name: data.name,
        email: data.email,
        dre: data.dre,
        password: data.password
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
        setIsInvalidRegister(true);

        toast.error('Cadastro inválido, o DRE já está cadastrado');

        setTimeout(() => {
          setIsInvalidRegister(false);
        }, 2000);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Agendaí - Cadastre-se</title>
      </Head>
      <AuthLayout>
        <>
          <Link href="/">
            <img src="logo-agendai.svg" alt="Agendaí" />
          </Link>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name="name" type="text" placeholder="Nome Completo" />
            <Input name="dre" type="text" placeholder="Seu DRE" />
            <Input name="email" type="email" placeholder="Seu e-mail" />
            <Input name="password" type="password" placeholder="Senha" />

            {isInvalidRegister ? (
              <button disabled type="submit">
                Cadastro Inválido
              </button>
            ) : (
              <button type="submit">
                {isLoading ? 'Carregando...' : 'Cadastrar'}
              </button>
            )}
            <Link href="/signin">Já tenho Login</Link>
            <Link href="/">Ver Cardápio</Link>
          </Form>
        </>
      </AuthLayout>
    </>
  );
};

export default SignUp;
