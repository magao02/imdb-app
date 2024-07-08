'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Input } from '@nextui-org/input';
import { FaSearch } from 'react-icons/fa';
import Link from 'next/link';

import DefaultLayout from '@/layouts/default';
import { getFilmes, getFilmesByNome } from '@/services/filmesServices';
interface Filme {
  id: string;
  nome: string;
  sinopse: string;
  capa: string;
  anoLancamento: string;
  duracao: number;
  classificacao: number;
}
export default function Filmes() {
  const [filmes, setFilmes] = useState([]);
  const { data: session, status } = useSession();
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchFilmes();
  }, [session]);

  const fetchFilmes = async () => {
    if (session) {
      const filmes = await getFilmes(session.user.token);

      if (!filmes) {
        return;
      }
      setFilmes(filmes);
    }
  };
  const searchFilmes = async () => {
    const filmes = await getFilmesByNome(session.user.token, search);

    if (!filmes) {
      setFilmes([]);
    }
    setFilmes(filmes);
  };

  const cardFilme = (filme: Filme) => {
    return (
      <Link href={`/filmes/${filme.id}`}>
        <Card key={filme.id} className="max-w-[200px] cursor-pointer">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">
              {filme.anoLancamento}
            </p>
            <small className="text-default-500">
              {filme.duracao} minutos {filme.classificacao} anos
            </small>
            <h4 className="font-bold text-large">{filme.nome}</h4>
          </CardHeader>
          <CardBody>
            <Image
              alt={filme.nome}
              src={`${process.env.NEXT_PUBLIC_API_URL}/files/${filme.capa}`}
            />
            <p>{filme.sinopse}</p>
          </CardBody>
        </Card>
      </Link>
    );
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  if (!session) {
    window.location.href = `/`;
  }

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className="text-4xl font-bold text-center">Listagem de Filmes</h1>
          <Input
            className="mt-4"
            endContent={<FaSearch onClick={searchFilmes} />}
            labelPlacement="outside"
            placeholder="pesquisar filme"
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filmes.map(filme => cardFilme(filme))}
        </div>
      </div>
    </DefaultLayout>
  );
}
