export interface RegisterResponse {
    registration: {
        token: string;
        user: {
            id: number;
            username: string;
        }
    }
}

export interface RegisterMutationVariables  {
    user: {
        username: string;
        email: string;
        password: string;
    }
}

export interface LoginResponse {
    login: {
        token: string;
        user: {
            id: number;
            username: string;
        }
    }
}

export interface LoginMutationVariables  {
    user: {
        email: string;
        password: string;
    }
}

export interface Note {
    id: number;
    author: string;
    content: string;
}

export type TCreateResponse = {
    data: {
        createNote: string
    };
}

export interface NotesResponse {
    notesByUser: Note[]
}