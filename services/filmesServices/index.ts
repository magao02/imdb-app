const getFilmes = async (token: String) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/filmes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    return null;
  }

  const data = await response.json();

  if (data) {
    return data;
  }

  return null;
};
const getFilmesByNome = async (token: String, nome: String) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/filmes/nome/${nome}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (response.status !== 200) {
    return null;
  }

  const data = await response.json();

  if (data) {
    return data;
  }

  return null;
};

const getFilme = async (token: String, id: String) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/filmes/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (response.status !== 200) {
    return null;
  }

  const data = await response.json();

  console.log(data);

  if (data) {
    return data;
  }

  return null;
};

export { getFilmes, getFilmesByNome, getFilme };
