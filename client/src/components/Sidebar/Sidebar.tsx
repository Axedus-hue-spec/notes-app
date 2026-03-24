import type { Note } from '@/types/types';
import { type FC } from 'react'
import { useStore } from '@/store/store';
import NoteItem from './NoteItem';
import {VscChromeClose} from 'react-icons/vsc'

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    notes: Note[] | undefined;
}

const Sidebar: FC<SidebarProps> = ({isOpen, setIsOpen, notes}) => {
    const {username, setIdEdit, setIsEdit, setContentEdit} = useStore();

  return (
    <aside 
        className={`fixed bg-[#363536] h-full z-0 top-0 w-64 ${isOpen ? 'translate-x-0': '-translate-x-full'}`}>
          <div>
            <div className='flex items-center mt-3 w-9/10 mx-auto justify-between gap-3'>
              <h2 className='uppercase font-semibold'>{username}</h2>
              <VscChromeClose 
                className='cursor-pointer'
                onClick={() => setIsOpen(false)} />
            </div>
            <ul className='flex flex-col gap-4 mt-5 items-center'>
              {notes && 
              notes.length > 0 && 
              notes.map(note => (
                <NoteItem
                    key={note.id} 
                    content={note.content}
                    onClick={() => {
                        console.log(note.id)
                        setIdEdit(note.id)
                        setIsEdit(true)
                        setContentEdit(note.content)
                    }} 
                />
              ))}
            </ul>
          </div>
    </aside>
  )
}

export default Sidebar
