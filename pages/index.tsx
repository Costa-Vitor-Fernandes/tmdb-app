import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import axios, { AxiosResponse } from 'axios'

const Home: NextPage = () => {
  const router = useRouter()

  const [user,setUser] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [apiKey, setApiKey] =  useState<string>("")
  const [requestToken, setRequestToken] = useState<string>("")





  const entrar = async () =>{

    async function criarRequestToken (){
    await axios.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`).then(async(result:AxiosResponse)=>{
        
        console.log(result.data.request_token.length, "req token length") //
        if(result.data.request_token){
          setRequestToken(result.data.request_token)
          await login()
        }
      })
    }
    async function login (){
      

    await axios.post(`https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,{
        username: `${user}`,
        password: `${password}`,
        request_token: `${requestToken}`
      }).then(async(res:AxiosResponse)=>{
        console.log(res.data.success, 'login')
        if(res.data.success){
          await criaSessao()
        }
      })
    }
    async function criaSessao (){
      // cria sessão
    await axios.get(`https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`).then((res:AxiosResponse)=>{
        console.log(res.data, 'session id') //session id
        if(res.data.session_id){
          console.log(res.data.session_id, 'this is the session id')
        
        setTimeout(()=>{

          router.push({
            pathname:'/dashboard',
            query: {user:user,apiKey:apiKey,requestToken: requestToken,sessionId:res.data.session_id}
          })

        },200)
        
        }
      })
    }
    await criarRequestToken()
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>SuaListaDeFilmes Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='flex flex-col sm:flex-row w-screen sm:flex sm:items-center sm:pb-10'>
        <h1 className="text-3xl p-8 text-black sm:text-7xl ">
          Seja bem vindo ao SuaListaDeFilmes by TMDB
        </h1>
        <div className='flex flex-col bg-indigo-100 px-10 py-10 m-10 sm:mr-20'>
        <p className='flex flex-col text-center text-xl'>Login</p>
        <div className='flex flex-col justify-center' >
          
          <input className='flex justify-center my-1 pl-1' type={"text"} placeholder="user" onChange={(e)=> setUser(e.target.value)} />
          <input className='flex justify-center my-1 pl-1' type={"password"} placeholder="password" onChange={(e)=> setPassword(e.target.value)} />
          <input className='flex justify-center my-1 pl-1' type={"text"} placeholder="apiKey" onChange={(e)=> setApiKey(e.target.value)} />  
          <input className='flex justify-center my-1 py-1  bg-indigo-400 rounded hover:bg-indigo-200' type={"button"} value="entrar" onClick={()=>entrar()} />
          <p className='flex pt-4'>powered by TMDB api</p>
        </div>
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

export default Home
