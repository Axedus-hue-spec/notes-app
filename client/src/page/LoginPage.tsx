import { type FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useStore } from '@/store/store';
import { useMutation } from '@apollo/client/react';
import { gql, type TypedDocumentNode } from '@apollo/client';
import type { LoginResponse, LoginMutationVariables } from '@/types/types';


const LoginPage: FC = () => {
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');
  const {auth} = useStore();

  const navigate = useNavigate();

  const REGISTRATION: TypedDocumentNode<LoginResponse, LoginMutationVariables
    > = gql`
    mutation loginUser($user: LoginUserInput!) {
          login(user: $user) {
            token
            user {
              id
              username
            }
      }
    }`

  const [loginUser] = useMutation(REGISTRATION);
  
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
  
      try {
        const {data} = await loginUser({
          variables: {
            user: {
              email,
              password
            }
          }
        })
        
        if (!data) return;
        auth(data.login.token, data.login.user.username);
        navigate('/');
      } catch(e) {
        console.log(e)
      }
    }

  return (
   <div className='min-h-screen text-[#1dbac8] bg-[#292829]'>
        <div className='py-30'>
            <div className="w-3/5 mx-auto mt-3 py-8">
                <h2 className='text-center text-xl'>Вход</h2>
                <form
                onSubmit={onSubmit} 
                className='flex flex-col mx-auto mt-5 gap-4 justify-center w-4/5'>
                    <div className='flex flex-col gap-2'>
                      <label
                        className='text-sm' 
                        htmlFor="email">
                          Введите Email
                      </label>
                      <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        id='email'
                        className='border-2 p-1' 
                        type="text" 
                        placeholder='email'
                      />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label
                        className='text-sm' 
                        htmlFor="password">
                        Введите пароль
                      </label>
                      <input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        id='password'
                        className='border-2 p-1' 
                        type="password"
                        placeholder='password' 
                      />
                    </div>
                    <div className=''>
                      <button type='submit' className='cursor-pointer px-2'
                      >Вход
                      </button>
                      <p className='inline ml-3 text-sm'>Нет аккаунта? 
                      <Link 
                        to={'/registration'}
                        className='ml-2'
                      >Регистрация</Link></p>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default LoginPage
