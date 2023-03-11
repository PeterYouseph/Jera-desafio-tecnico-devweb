"use client";
import type { NextPage } from "next"; //Imports necessários do NextJs para utilização de recursos.
import dynamic from "next/dynamic";
import { useState } from "react"; //Import do React para utilização do recurso useState.
import NavBar from "./components/Header"; //Import dos componentes NavBar, Modal e Pomodoro.
import Modal from "./components/Settings";

//Import dynamic do componente Pomodoro, para realizar as modificações/atualizações necessárias.
const Pomodoro = dynamic(() => import("./components/Pomodoro"), { ssr: false });

//Define a página Home, inicializando as props necessárias para os componentes nela presentes.
const Home: NextPage = () => {
  const [isPomodoroRunning, setIsPomodoroRunning] = useState(false); //Const que armazena e setta o estado inicial para o componente Pomodoro.
  const [isModalOpen, setIsModalOpen] = useState(false); //Const que armazena e setta o estado inicial para o componente Modal.
  const [initialTime, setInitialTime] = useState(25 * 60); //Const que armazena e setta o timer inicial de trabalho para componente Pomodoro.
  const [breakTime, setBreakTime] = useState(5 * 60); //Const que armazena e setta o timer inicial de pausa para o componente Pomodoro.
  const [isPomodoroCompleted, setIsPomodoroCompleted] = useState(false); //Const que armazena e setta o estado do Pomodoro quando o mesmo é completado.

  //Função que inicializa o timer do componente Pomodoro.
  const handleStart = () => {
    setIsPomodoroRunning(true);
  };

  //Função que pausa o timer do componente Pomodoro.
  const handleStop = () => {
    setIsPomodoroRunning(false);
    setIsPomodoroCompleted(true);
  };

  //Função que abre o modal de configurações.
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  //Função que fecha o modal de configurações.
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  //Função que gerencia as informações enviadas no forms do componente Modal.
  const handleModalConfirm = (initialTime: number, breakTime: number) => {
    setInitialTime(initialTime * 60);
    setBreakTime(breakTime * 60);
    setIsModalOpen(false);
  };

  //Return da Home, que renderiza um botão inicial para abrir o Pomodoro Timer e os demais componentes necessários para sua execução.
  return (
    <main className="bg-slate-100">
      <NavBar />
      <div className="flex flex-col items-center justify-center h-screen w-full">
        {!isPomodoroRunning && !isPomodoroCompleted ? (
          <>
            <h1 className="text-4xl font-bold  text-slate-700 mb-8">
              Seja Bem-vindo(a) ao Pomodoro Timer!
            </h1>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleStart}
            >
              Iniciar Pomodoro
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center mt-8">
            <Pomodoro
              initialTime={initialTime}
              onTimeUp={handleStop}
              breakTime={breakTime}
            />
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded  mb-8"
              onClick={handleOpenModal}
            >
              Configurações
            </button>
          </div>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleModalConfirm}
      />
    </main>
  );
};

export default Home;
