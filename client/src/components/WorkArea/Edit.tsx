import { useStore } from "@/store/store"
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { type FC } from "react"
import {toast} from 'react-hot-toast'


const Edit: FC = () => {
  const {contentEdit, noteEditId, setContentEdit, setIsEdit} = useStore();
  
  const EDIT_NOTE = gql`
    mutation updateNote($noteId: ID!, $content: String!) {
      updateNote(noteId: $noteId, content: $content) 
    }
  `
  
  const [editNote, {error, loading}] = useMutation(EDIT_NOTE)

  console.log(noteEditId)
  async function EditNote() {
    try {
      

      await editNote({
        variables: {
          noteId: noteEditId,
          content: contentEdit
        },
        refetchQueries: ['notesById']
      })

      if(error) {
        console.log(error);
        return
      } 
      toast.success('Изменения сохранены')
    } catch(e) {
      console.log(error);
    }
  }

  return (
     <div className='w-9/10 mx-auto'>
        <textarea
            className='w-full resize-none overflow-hidden min-h-[50vh] max-h-full bg-[#363536] outline-none' 
            name="note"
            value={contentEdit}
            onChange={(e) => setContentEdit(e.target.value)} 
            id="note">
        </textarea>
        <div className='flex justify-end gap-3'>
            <button
              className="cursor-pointer"
              type="button" 
              onClick={EditNote} 
              disabled={loading || noteEditId == null}>Сохранить изменения</button>
            <button className="cursor-pointer" onClick={() => setIsEdit(false)}>Отмена</button>
        </div>
    </div> 
  )
}

export default Edit
