// Um desenvolvedor tentou criar um projeto que consome a base de dados de filme do TMDB para criar um organizador de filmes, mas desistiu
// pois considerou o seu código inviável. Você consegue usar typescript para organizar esse código e a partir daí aprimorar o que foi feito?

// A ideia dessa atividade é criar um aplicativo que:
//    - Busca filmes
//    - Apresenta uma lista com os resultados pesquisados
//    - Permite a criação de listas de filmes e a posterior adição de filmes nela

// Todas as requisições necessárias para as atividades acima já estão prontas, mas a implementação delas ficou pela metade (não vou dar tudo de graça).
// Atenção para o listener do botão login-button que devolve o sessionID do usuário
// É necessário fazer um cadastro no https://www.themoviedb.org/ e seguir a documentação do site para entender como gera uma API key https://developers.themoviedb.org/3/getting-started/introduction
/*


searchButton.addEventListener('click', async () => {
  let lista = document.getElementById("lista");
  if (lista) {
    lista.outerHTML = "";
  }
  let query = document.getElementById('search').value;
  let listaDeFilmes = await procurarFilme(query);
  let ul = document.createElement('ul');
  ul.id = "lista"
  for (const item of listaDeFilmes.results) {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(item.original_title))
    ul.appendChild(li)
  }
  console.log(listaDeFilmes);
  searchContainer.appendChild(ul);
})

async function procurarFilme(query) {
  query = encodeURI(query)
  console.log(query)
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
    method: "GET"
  })
  return result
}

async function adicionarFilme(filmeId) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
    method: "GET"
  })
  console.log(result);
}


async function adicionarFilmeNaLista(filmeId, listaId) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
    method: "POST",
    body: {
      media_id: filmeId
    }
  })
  console.log(result);
}

async function pegarLista() {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`,
    method: "GET"
  })
  console.log(result);
}

5648df06ead43a7e9f9ec286c54d8f5f
PNWT@cPahT!785M


*/
import type { NextPage, NextComponentType } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { useEffect, useState } from "react";
import { useRouter, withRouter } from "next/router";
import axios, { AxiosResponse } from "axios";

interface ListaItemProps {
  queryRes: {
    original_title: string;
    id: number;
    overview: string;
  };
}

interface ListaProps {
  apiKey: any;
  listaId:any;
}

const PesquisaItem: React.FC<ListaItemProps> = (props: ListaItemProps) => {
  //falta colocar ternario pra esconder antes de pesquisar, com estado bool no componente pai

  const adicionaFilme = () => {
    console.log("adiciona filme", props.queryRes.original_title);
  };

  return (
    <div className="flex flex-col bg-indigo-500 mt-2">
      <h5 className="text-center text-xl py-3">Resultado</h5>
      <div className="flex flex-row">
        <p className="text-lg leading-3 py-3 pl-3">Titulo:</p>
        <p className="text-md leading-3 py-3">
          {props.queryRes.original_title}
        </p>
      </div>
      <p className="text-sm pl-4">id:{props.queryRes.id}</p>
      <p className="text-md pl-7 pr-3">overview: {props.queryRes.overview}</p>
      <input
        type={"button"}
        className="bg-indigo-200 text-center rounded"
        value="Adicionar na lista"
        onClick={() => adicionaFilme()}
      />
    </div>
  );
};

const Lista: React.FC<ListaProps> = (props: ListaProps) => {
  // falta pegar os ids das listas do usuário com useEffect e axios
  // add botao pra trocar de lista
  // setar estado pra id da lista

  const [novoFilme, setNovoFilme] = useState<string>("");
  const [procurando, setProcurando] = useState<boolean>(false);
  const [queryRes, setQueryRes] = useState<any>([]);

  let id = 10;

  const deleteLista = (id: number) => {
    console.log("deleta lista");
  };
  // isso aqui deu bug no typescript
  // const retornoDaPesquisa = queryRes.map((r:any)=><PesquisaItem idd={r.id} overview={r.overview} original_title={r.original_title} />)

  const procuraFilme = () => {
    function procurar() {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${props.apiKey}&query=${novoFilme}`
        )
        .then((res) => {
          if (res.data.total_results === 0) {
            return alert("não tem nada aqui com esse titulo");
          } else {
            console.log(res.data.results);
            setQueryRes(res.data.results);
          }
        });
    }

    if (novoFilme !== "") {
      setProcurando(true)
      procurar();
    }
    return;
  };

  return (
    <div className="bg-indigo-100">
      <div className='flex flex-row around'>
      <h1>Lista id:{props.listaId}</h1>
      <input
        className="bg-red-500 rounded p-2 ml-5 hover:bg-red-300 focus:bg-red-300 pointer-events-auto"
        type={"button"}
        value="delete"
        onClick={() => deleteLista(id)}
        />
        </div>
      {/* isso aqui é um mockup pra um componente que ainda vai vir, que é o ItemDaLista, que vai ser feito no ternario */}
      <p>Lorem, ipsum.</p>
      <p>Lorem, ipsum.</p>
      <p>Lorem, ipsum.</p>
      <p>Lorem, ipsum.</p>
      {/* isso aqui é um mockup pra um componente que ainda vai vir, que é o ItemDaLista */}
      <div className="bg-red-200 pb-4 mt-2">
        <p className="text-center pt-4">Adicione Mais Filmes !</p>
        <input
          type={"text"}
          placeholder="Adicione um filme"
          onChange={(e) => setNovoFilme(e.target.value)}
        />
        <input
          className="bg-gray-100 rounded mx-2 px-2"
          type={"button"}
          value="procurar"
          onClick={() => procuraFilme()}
        />
      </div>
      {/* {retornoDaPesquisa? retornoDaPesquisa :null} */}
     {procurando ? <PesquisaItem queryRes={queryRes} /> :null} 
    </div>
  );
};

const Dashboard: NextPage = () => {
  const [novoNomeLista, setNovoNomeLista] = useState<string>("");
  const [novoDescricao, setNovoDescricao] = useState<string>("");
  const [arrListaId, setArrListaId] = useState<number[]>();
  const [hasList, setHasList] = useState<boolean>(false);

  const router = useRouter();
  const user = router.query.user;
  const apiKey = router.query.apiKey;
  const sessionId = router.query.sessionId;

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/account/{account_id}/lists?api_key=${apiKey}&language=en-US`,
        {
          params: {
            api_key: apiKey,
            session_id: sessionId,
          },
        }
      )
      .then((res) => {
        if (res.data.results) {
          setHasList(true);
          setArrListaId(res.data.results.map((r: any) => r.id));
        }
        console.log(
          res.data.results.map((r: any) => r.id),
          "res do useEff"
        );
      });
  }, []);

  if (!user) {
    return (
      <div>
        <h1>Voce Precisa Logar</h1>
      </div>
    );
  } else {
    const criaLista = () => {
      console.log("crialista", router.query.sessionId, "session id");
      if (!novoDescricao || !novoNomeLista) {
        return alert("Preencha os campos corretamente");
      }
      function postList() {
        setHasList(true);
        axios
          .post(
            `https://api.themoviedb.org/3/list?api_key=${router.query.apiKey}&session_id=${router.query.sessionId}`,
            {
              name: novoNomeLista,
              description: novoDescricao,
              language: "en",
            }
          )
          .then((res: AxiosResponse) => {
            if (!res.data.success) {
              return alert("algo deu errado");
            } else if (res.data.list_id) {
              console.log(res.data, "resdata");
            }
          });
      }
      postList();
    };

    return (
      <div className={styles.container}>
        <Head>
          <title>Dashboard SuaLista</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex flex-col items-center">
          <h1 className="flex text-5xl p-10 ">Bem vindo {user}</h1>
          <section className="flex flex-col p-10 bg-indigo-100">
            <h3 className="text-2xl">Crie uma lista</h3>
            <input
              className="mb-1"
              type={"text"}
              placeholder="Nome da sua lista"
              onChange={(e) => setNovoNomeLista(e.target.value)}
            />
            <input
              className="mb-1 pb-10"
              type={"text"}
              placeholder="Descrição"
              onChange={(e) => setNovoDescricao(e.target.value)}
            />
            <input
              className="bg-green-400 rounded p-1"
              type={"button"}
              value="Criar"
              onClick={() => criaLista()}
            />
          </section>
          <section className="flex flex-col mt-1 w-full p-10">
            <div className="bg-red-300">
              <h5 className="text-xl">Suas Listas</h5>
              {/* aqui retorna um componente de listas cadastradas desse usuário
            , que deve conter um formulário de busca de filmes, e de inserir na Lista */}
              
              {/* esse aqui tem que fazer com map ou dar um jeito com botao */}
              {hasList ? (
                <Lista listaId={arrListaId} apiKey={apiKey} />
              ) : (
                <p>Voce ainda não tem nenhuma lista</p>
              )}
            </div>
          </section>
        </main>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <span className={styles.logo}>
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </a>
        </footer>
      </div>
    );
  }
};

export default withRouter(Dashboard);
