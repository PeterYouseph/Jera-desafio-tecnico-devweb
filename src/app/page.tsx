"use client";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useState } from "react";
import useClient from "next-suspense";
import NavBar from "./components/Header";
import Modal from "./components/Settings";

const Pomodoro = dynamic(() => import("./components/Pomodoro"), { ssr: false });

const Home: NextPage = () => {
  const [isPomodoroRunning, setIsPomodoroRunning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialTime, setInitialTime] = useState(5);
  const [breakTime, setBreakTime] = useState(5);
  const [isPomodoroCompleted, setIsPomodoroCompleted] = useState(false);

  const handleStart = () => {
    setIsPomodoroRunning(true);
  };

  const handleStop = () => {
    setIsPomodoroRunning(false);
    setIsPomodoroCompleted(true);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = (initialTime: number, breakTime: number) => {
    setInitialTime(initialTime * 60);
    setBreakTime(breakTime * 60);
    setIsModalOpen(false);
  };

  return (
    <main className="bg-slate-100">
      <NavBar />
      <div className="flex flex-col items-center justify-center h-screen w-full">
        {!isPomodoroRunning && !isPomodoroCompleted ? (
          <>
            <h1 className="text-4xl font-bold  text-slate-700 mb-8">
              Seja bem-vindo ao Pomodoro Timer!
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
