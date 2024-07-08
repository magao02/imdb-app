'use client';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

import { title } from '@/components/primitives';

type Inputs = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [loginError, setLoginError] = useState<string | null>(null);

  const onSubmit = async (formdata: Inputs) => {
    const result = await signIn('credentials', {
      redirect: false,
      email: formdata.email,
      password: formdata.password,
    });

    if (result?.error) {
      setLoginError('credenciais inválidas');
    } else {
      window.location.href = '/filmes';
    }
  };
  const searchparams = useSearchParams();

  const error = searchparams.get('error');

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className={title()}>Login</h1>
      <Input
        {...register('email', { required: 'O Email é obrigatório' })}
        placeholder="Email"
        type="email"
      />
      {errors.email && <p>{errors.email.message}</p>}
      <Input
        {...register('password', { required: 'A senha é obrigatória' })}
        placeholder="Password"
        type="password"
      />
      {errors.password && <p>{errors.password.message}</p>}
      {loginError && <p className="text-red">{loginError}</p>}
      {error && <p>Credenciais inválidas</p>}
      <Button color="primary" type="submit" variant="bordered">
        Login
      </Button>
    </form>
  );
}
