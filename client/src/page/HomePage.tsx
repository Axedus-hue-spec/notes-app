import { useEffect, useState, type FC } from 'react'
import { CgAddR } from 'react-icons/cg'
import { VscLayoutSidebarLeft, VscLayoutSidebarLeftOff } from 'react-icons/vsc'
import { useStore } from '../store/store';
import Navbar from '../components/Navbar';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import type { NotesResponse } from '@/types/types';
import type { TypedDocumentNode } from '@apollo/client';
import WorkArea from '@/components/WorkArea/WorkArea';
import Sidebar from '@/components/Sidebar/Sidebar';

const HomePage: FC = () => {
  const {isAuth, setIsCreate, authCheck} = useStore();
  const [isOpen, setIsOpen] = useState(false);
  
  const NOTES_BY_ID: TypedDocumentNode<NotesResponse> = gql`
    query notesById {
      notesByUser {
        id
        content
        author
      }
    }
  `

  const {data} = useQuery(NOTES_BY_ID);

  useEffect(() => {
    authCheck();
  }, [])

  return (
    <main className='w-full bg-[#292829] min-h-screen text-[#1dbac8]'>
      <Navbar />
        <div className='flex justify-end mr-25'>   
          {isAuth && 
            <div className={`w-100 py-5 gap-2 flex items-center justify-end`}>
              <CgAddR 
                size={20}
                className='cursor-pointer' 
                onClick={() => setIsCreate(true)} 
              />
              {isOpen ? 
              <VscLayoutSidebarLeft
                size={20}
                className='cursor-pointer'
                onClick={() => setIsOpen(!isOpen)} /> :
              <VscLayoutSidebarLeftOff
                className='cursor-pointer'
                size={20} 
                onClick={() => setIsOpen(!isOpen)} />
              }
            </div>
          }
        </div>
     
      {isAuth ? 
        <div className='flex'>
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} notes={data?.notesByUser} />
          <WorkArea isOpen={isOpen}/> 
        </div>
        :
        <h1 className='text-center text-xl'>Авторизуйтесь</h1>
      }
    </main>
  )
}

export default HomePage;