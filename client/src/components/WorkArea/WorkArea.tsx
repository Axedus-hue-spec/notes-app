import { type FC } from 'react'
import { useStore } from '@/store/store';
import  Create from './Create';
import Edit from './Edit'

interface WorkAreaProps {
    isOpen: boolean
}

const WorkArea: FC<WorkAreaProps> = ({isOpen}) => {
    const {isCreate, isEdit} = useStore();
    

  return (
    <div className={`w-4/5 ${isOpen ? "ml-64": ""} mx-auto flex justify-center`}>
        {isCreate ?
            <Create /> : isEdit
            ?
            <Edit />
            :
            <div className='w-9/10 mx-auto h-[50vh] bg-[#363536]'>
              <h1 className='text-center mt-5 font-semibold'>Выберите заметку или создайте новую</h1>
            </div>

          }
    </div>
  )
}

export default WorkArea
