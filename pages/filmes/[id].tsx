import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { useRouter } from 'next/router';
import { Chip } from '@nextui-org/chip';

import { getFilme } from '@/services/filmesServices';
import DefaultLayout from '@/layouts/default';
interface Filme {
  id: string;
  nome: string;
  sinopse: string;
  capa: string;
  anoLancamento: string;
  duracao: number;
  classificacao: number;
  atores: Ator[];
  diretor: string;
  generos: Genero[];
}
interface Ator {
  id: string;
  nome: string;
}
interface Genero {
  id: string;
  nome: string;
}
export default function Filme() {
  const router = useRouter();
  const { id } = router.query;
  const [filme, setFilme] = useState<Filme | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    fetchFilme();
  }, [session]);

  const fetchFilme = async () => {
    if (session) {
      const filme = await getFilme(session.user.token, id);

      if (!filme) {
        return;
      }
      setFilme(filme);
    }
  };

  if (status === 'loading') {
    return <div>Carregando...</div>;
  }

  if (!session) {
    window.location.href = `/`;
  }

  return (
    <DefaultLayout>
      <div className="flex justify-center px-2 mt-10 w-full ">
        <Card>
          <CardBody>
            <div className="flex flex-col justify-center">
              <div className="flex  justify-center">
                <h1 className="text-3xl font-bold">{filme?.nome}</h1>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <Image
                  alt={filme?.nome}
                  className="max-w-full max-h-96"
                  src={`${process.env.NEXT_PUBLIC_API_URL}/files/${filme?.capa}`}
                />
                <p>{filme?.sinopse}</p>
                <p>
                  <strong>Diretor: </strong>
                  {filme?.diretor}
                </p>
                <p>
                  <strong>Lancamento: </strong>
                  {filme?.anoLancamento}
                </p>
                <p>
                  <strong>Atores: </strong>
                  {filme?.atores.map(ator => (
                    <Chip key={ator.id} color="primary" size="md">
                      {ator.nome}
                    </Chip>
                  ))}
                </p>
                <p>
                  <strong>Gêneros: </strong>
                  {filme?.generos.map(genero => (
                    <Chip key={genero.id} color="success" size="md">
                      {genero.nome}
                    </Chip>
                  ))}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </DefaultLayout>
  );
}
