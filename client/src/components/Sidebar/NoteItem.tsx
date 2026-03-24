import React, { type FC } from 'react';
import { createTitle } from '@/utils/createTitle';

interface NoteItemProps extends React.LiHTMLAttributes<HTMLElement>{
    content: string;
} 

const NoteItem: FC<NoteItemProps> = ({content, ...props}) => {
    let title = createTitle(content);

  return (
    <li className='w-4/5' {...props}>
        <div className='p-1 bg-[#424142] rounded-lg shadow-lg cursor-pointer'>
        <div className='flex'>
            <p>{title}</p>
        </div>
        </div>
    </li>
  )
}

export default NoteItem
