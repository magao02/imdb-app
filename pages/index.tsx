import { useRouter } from 'next/router';
import { useEffect } from 'react';

import DefaultLayout from '@/layouts/default';

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirecionamento para a tela de login
    router.push('/login');
  }, []);

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className="text-4xl font-bold text-center">Listagem de Filmes</h1>
        </div>
      </div>
    </DefaultLayout>
  );
}
