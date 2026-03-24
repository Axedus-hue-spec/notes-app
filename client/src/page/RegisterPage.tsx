import {useStore} from '../store/store'
import  React, { useState,  type FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client';
import type { TypedDocumentNode } from '@apollo/client';
import type { RegisterResponse, RegisterMutationVariables } from '@/types/types';


const RegisterPage: FC = () => {
  const [username, setUsername] = useState('');  
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const REGISTRATION: TypedDocumentNode<RegisterResponse, RegisterMutationVariables
  > = gql`
  mutation RegUser($user: UserInput!) {
        registration(user: $user) {
          token
          user {
            id
            username
          }
    }
  }`
  const [regUser] = useMutation(REGISTRATION);

  const {auth} = useStore();

  
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const {data} = await regUser({
        variables: {
          user: {
            username,
            email,
            password
          }
        }
      })
      
      if (!data) return;
      auth(data.registration.token, data.registration.user.username);
      navigate('/');
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <div className='min-h-screen text-[#1dbac8] bg-[#292829]'>
        <div className='py-30'>
            <div className="w-3/5 mx-auto mt-3 py-8">
                <h2 className='text-center text-xl'>Регистрация</h2>
                <form
                onSubmit={onSubmit} 
                className='flex flex-col mx-auto mt-5 gap-4 justify-center w-4/5'>
                    <div className='flex flex-col gap-2'>
                      <label
                        className='text-sm' 
                        htmlFor="username">
                          Введите username
                      </label>
                      <input 
                        id='username'
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                        className='border-2 p-1'
                        placeholder='username'
                      />
                    </div>
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
                      >Регистрация
                      </button>
                      <p className='inline ml-3 text-sm'>Есть аккаунт? 
                      <Link 
                        to={'/login'}
                        className='ml-2'
                      >Вход</Link></p>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default RegisterPage
