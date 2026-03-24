import {create} from 'zustand'


interface IStore {
  isAuth: boolean;
  isEdit: boolean;
  isCreate: boolean;

  username: string;
  
  noteEditId: number | undefined;
  contentEdit: string;
  
  auth: (token: string, username: string) => void;
  authCheck: () => void;
  logout: () => void;
  setIsCreate: (isCreate: boolean) => void;
  setIsEdit: (isEdit: boolean) => void;
  setContentEdit: (content: string) => void;
  setIdEdit: (id: number) => void;
}
        
export const useStore = create<IStore>(set => ({
    isAuth: false,
    isEdit: false,
    isCreate: false,
   
    noteEditId: undefined,
    contentEdit: '',
  

    username: '',

    auth: (token: string, username: string) => {
        localStorage.setItem('token', token);
        localStorage.setItem('username', username)

        set({
          isAuth: true,
          username: username
        })
    },
    
    authCheck: () => {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');

      if(!token || !username) return

      set({
        isAuth: true,
        username: username
      })
    },

    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');

      set({isAuth: false})
    },

    setIsEdit: (isEdit: boolean) => {
      if(isEdit) set({isEdit: isEdit, isCreate:false});
      set({isEdit: isEdit});
    },
    setIsCreate: (isCreate: boolean) => {
      if(isCreate) set({isCreate: isCreate, isEdit:false});
      set({isCreate: isCreate});
    },

    setContentEdit: (content: string) => set({contentEdit: content}),
    setIdEdit: (id: number) => set({noteEditId: id})
}));