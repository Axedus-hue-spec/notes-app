import { type FC, useState } from 'react'
import { type TypedDocumentNode, gql } from '@apollo/client';
import { type TCreateResponse } from '@/types/types';
import { useMutation } from '@apollo/client/react';
import { useStore } from '@/store/store';



const Create: FC = () => {
    const [content, setContent] = useState('');
    const {setIsCreate} = useStore();

const CREATE_NOTE: TypedDocumentNode<TCreateResponse> = gql`
    mutation createNote($content: String!) {
      createNote(content: $content)
    }
  `
const [createNote] = useMutation(CREATE_NOTE)
    async function createNewNote() {
    try {
      createNote({
        variables: {
          content: content
        },
        refetchQueries: ['notesById']
      })

    } catch(e) {
      console.log(e);
    }
  }

  return (
    <div className='w-9/10 mx-auto'>
        <textarea
            className='w-full resize-none overflow-hidden min-h-[50vh] max-h-full bg-[#363536] outline-none' 
            name="note"
            value={content}
            onChange={(e) => setContent(e.target.value)} 
            id="note">
        </textarea>
        <div className='flex justify-end  gap-2'>
            <button className='cursor-pointer' onClick={createNewNote}>Сохранить</button>
            <button className='cursor-pointer' onClick={() => setIsCreate(false)}>Отмена</button>
        </div>
    </div> 
  )
}

export default Create
