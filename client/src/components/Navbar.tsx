import type { FC } from "react"
import {useStore} from '../store/store'
import { Link } from "react-router-dom";

const Navbar: FC = () => {
    const {isAuth, logout} = useStore();

    return (
    <nav className="w-full min-h-[10vh]">
        <div className="w-4/5 mx-auto py-4 px-2 flex justify-between ">
            <h1>NOTES APP</h1>
            {
            isAuth ? 
            <div>
                <button className="cursor-pointer" onClick={logout}>Выйти</button>
            </div> 
            : 
            <div className="flex gap-3 cursor-pointer">
                <Link to={'/login'}>Войти</Link>
                <Link to={'/registration'}>Регистрация</Link>
            </div>}
        </div>
    </nav>
  )
}

export default Navbar
