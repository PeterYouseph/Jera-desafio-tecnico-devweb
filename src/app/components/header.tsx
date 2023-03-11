import React from "react"; //Import do React para utilizar o pacote do React-Icons.
import { GiTomato } from "react-icons/gi"; //Import do React-Icons e o ícone utilizado no header.

//Export do componente Header para ser utilizado na página principal do projeto.
export default function Header() {
  return (
    <nav className="pt-4 pb-4 flex x justify-between bg-slate-200 bg-opacity-75 mx-auto shadow">
      <div className="flex items-center gap-2 mx-auto cursor-pointer">
        <GiTomato className="text-4xl text-red-500" />
        <h1 className="text-red-500 text-4xl font-bold">Pomodoro Timer</h1>
        <GiTomato className="text-4xl text-red-500" />
      </div>
    </nav>
  );
}
