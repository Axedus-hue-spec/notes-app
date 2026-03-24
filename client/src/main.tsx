import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from 'react-router-dom'
import {ApolloClient, InMemoryCache, HttpLink, ApolloLink} from '@apollo/client';
import {ApolloProvider} from '@apollo/client/react'
import {SetContextLink} from '@apollo/client/link/context'
import { getAccessToken } from './utils/getToken.ts'

const httpLink = new HttpLink({
  uri: "http://localhost:4000/api",
})

const authLink = new SetContextLink((prev, _) => ({
  headers: {
    ...prev.headers,
    Authorization: getAccessToken() ? `Bearer ${getAccessToken()}` : ""
  }
}))

const link = ApolloLink.from([authLink, httpLink])

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>,
)
