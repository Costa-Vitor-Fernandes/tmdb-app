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
var apiKey = '3f301be7381a03ad8d352314dcc3ec1d';
let apiKey;
let requestToken;
let username;
let password;
let sessionId;
let listId = '7101979';

let loginButton = document.getElementById('login-button');
let searchButton = document.getElementById('search-button');
let searchContainer = document.getElementById('search-container');

loginButton.addEventListener('click', async () => {
  await criarRequestToken();
  await logar();
  await criarSessao();
})

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

function preencherSenha() {
  password = document.getElementById('senha').value;
  validateLoginButton();
}

function preencherLogin() {
  username =  document.getElementById('login').value;
  validateLoginButton();
}

function preencherApi() {
  apiKey = document.getElementById('api-key').value;
  validateLoginButton();
}

function validateLoginButton() {
  if (password && username && apiKey) {
    loginButton.disabled = false;
  } else {
    loginButton.disabled = true;
  }
}

class HttpClient {
  static async get({url, method, body = null}) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open(method, url, true);

      request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
          resolve(JSON.parse(request.responseText));
        } else {
          reject({
            status: request.status,
            statusText: request.statusText
          })
        }
      }
      request.onerror = () => {
        reject({
          status: request.status,
          statusText: request.statusText
        })
      }

      if (body) {
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        body = JSON.stringify(body);
      }
      request.send(body);
    })
  }
}

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

async function criarRequestToken () {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
    method: "GET"
  })
  requestToken = result.request_token
}

async function logar() {
  await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
    method: "POST",
    body: {
      username: `${username}`,
      password: `${password}`,
      request_token: `${requestToken}`
    }
  })
}

async function criarSessao() {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
    method: "GET"
  })
  sessionId = result.session_id;
}

async function criarLista(nomeDaLista, descricao) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`,
    method: "POST",
    body: {
      name: nomeDaLista,
      description: descricao,
      iso_639_1: "pt"
    }
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

*/
import type { NextPage, NextComponentType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import { useEffect, useState } from 'react'
import { useRouter, withRouter } from 'next/router'
import axios, { AxiosResponse } from 'axios'



const Lista:NextComponentType = () => {
return(
    <div>Lista1</div>
)
}

const Dashboard: NextPage = () => {
    
    const [novoNomeLista, setNovoNomeLista] = useState<string>("")
    const [novoDescricao, setNovoDescricao] = useState<string>("")
    const [listaId, setListaId] = useState<number>()

    

    const router = useRouter()
    const user = router.query.user


    
    if(!user){
        return <div><h1>Voce Precisa Logar</h1></div>
    }
    else{

  
    
const criaLista = () =>{
    console.log('crialista', router.query.sessionId, "session id")


    if(!novoDescricao && !novoNomeLista){
        return alert('Preencha os campos corretamente')
    }
    function postList () {
        axios.post(`https://api.themoviedb.org/3/list?api_key=${router.query.apiKey}&session_id=${router.query.sessionId}`,{
            name: novoNomeLista,
            description: novoDescricao,
            language: 'en',
        }).then((res:AxiosResponse)=>{
            if(!res.data.success){
                return alert('algo deu errado')
            }
            else if (res.data.list_id){
                console.log(res.data, 'resdata')
                setListaId(res.data.list_id)
            }
        })
    }
    postList()
}

    return (
    <div className={styles.container}>
      <Head>
        <title>Dashboard SuaLista</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Bem vindo {user}
        </h1>
        <h3>Crie agora sua primeira lista</h3>
        <input type={'text'} placeholder="Nome da sua lista" onChange={(e)=> setNovoNomeLista(e.target.value)} />
        <input type={'text'} placeholder="Descrição" onChange={(e)=> setNovoDescricao(e.target.value)} />
        <input type={'button'} value="Criar" onClick={()=>criaLista()} />


        <div>
            <h5>Suas Listas</h5>
            {/* aqui retorna um componente de listas cadastradas desse usuário
            , que deve conter um formulário de busca de filmes, e de inserir na Lista */}
            {}
        </div>        
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
}

export default withRouter(Dashboard)
