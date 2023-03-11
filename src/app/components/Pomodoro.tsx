import { useState, useEffect, useRef } from "react"; //Imports do React necessários para utilizar os hooks do mesmo.
import ProgressBar from "./CircularProgress"; //Import da barra circular para mostrar o progresso do timer.

type PomodoroProps = { //Define o tipo das props necessárias para o componente Pomodoro através da interface.
  initialTime: number;
  onTimeUp: () => void;
  breakTime: number;
};

//Define o componente Pomodoro, recebendo as props definidas na interface: Tempo inicial para o timer, estado atual do timer (intervalo, pomodoro ou pausa).
const Pomodoro = ({ initialTime, onTimeUp, breakTime }: PomodoroProps) => { 
  const [timeRemaining, setTimeRemaining] = useState(initialTime); //Const que define o tempo restante.
  const [isRunning, setIsRunning] = useState(false); //Const para definir o estado atual, ou seja, se está ou não rodando o timer naquele momento.
  const [isWorkTime, setIsWorkTime] = useState(true); //Const para definir se o timer está em uma contagem de horas de trabalho/pomodoro.
  const [isPaused, setIsPaused] = useState(false); //Const para verificicar se o timer está pausado.
  const totalDuration = isWorkTime ? initialTime : breakTime || 0; //Const que armazena a duração total do timer de Pomodoro.
  const percentage = ((totalDuration - timeRemaining) / totalDuration) * 100; //Const que armazena e faz o cálculo necessário para repassar para o componente ProgressBar.
  const [showPomodoroNotification, setShowPomodoroNotification] = 
    useState(false);
  const alert = "./audio/alertSound.mp3"; //Const que armazena o estado atual das notificações, se estão ou não ativas.

  const [completedPomodoros, setCompletedPomodoros] = useState(0); //Const que armazena a quantidade de vezes na qual foram executados os ciclos do timer de Pomodoro durante 4 ciclos.
  const [totalCompletedPomodoros, setTotalCompletedPomodoros] =
    useState<number>(
      parseInt(localStorage.getItem("totalCompletedPomodoros") ?? "0")
    ); //Const que armazena a quantidade de vezes na qual foram executados os ciclos do timer de Pomodoro, durante todo o período que o usuário utilizou o Pomodoro Timer.

  const handleStart = (isBreak: boolean) => { //Função para iniciar o temporizador, verificando de forma booleana se está ou não na hora da pausa.
    setIsRunning(true);
    setIsWorkTime(!isBreak);
    setTimeRemaining(isBreak ? breakTime : initialTime);
  };

// useEffect utilizado para atualizar o estado das consts definidas anteriormente (tempo restante, iniciar ou pausar o timer, mostrar notificações e soma dos ciclos de pomodoros).
  useEffect(() => { 
    let intervalId: NodeJS.Timeout;

    if (!isRunning) {
      setTimeRemaining(isWorkTime ? initialTime : breakTime || 0);
    }

    if (isRunning && !isPaused) {
      intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (
      completedPomodoros % 4 === 0 &&
      completedPomodoros > 0 &&
      !showPomodoroNotification
    ) {
      setShowPomodoroNotification(true);
      if ("Notification" in window) {
        if (Notification.permission === "granted") {
          const audio = new Audio(alert);
          const notification = new Notification("Pausa de 10 minutos!", {
            body: "Você completou 4 pomodoros! Hora de fazer uma pausa de 10 minutos.",
          });
          notification.addEventListener("show", function () {
            audio.play();
          });
        } else {
          window.alert(
            "Você completou 4 pomodoros! Hora de fazer uma pausa de 10 minutos."
          );
          new Audio(alert).play();
        }
      }

      setCompletedPomodoros(0);
      setIsWorkTime(false);
    }


    if (timeRemaining === 0 && isRunning) {
      setIsRunning(false);
      onTimeUp();
      if (isWorkTime) {
        setTotalCompletedPomodoros((prevTotal) => prevTotal + 1);
        setIsWorkTime(false);
        setTimeRemaining(breakTime || 0);
        
        handleStart(true);
      } else {
        setIsWorkTime(true);
        setTimeRemaining(initialTime);
        setCompletedPomodoros((completedPomodoros) => completedPomodoros + 1);
      }
      setShowPomodoroNotification(false);
      if ("Notification" in window) {
        // pedindo permissão para exibir notificações
        Notification.requestPermission().then(function (permission) {
          if (permission === "granted") {
            const notification = new Notification(
              `O ${isWorkTime ? "tempo de trabalho" : "intervalo"} acabou!`
            );
            // reproduzindo o arquivo de áudio quando a notificação for exibida
            notification.addEventListener("show", function () {
              new Audio('./audio/alertSound.wav').play();
            });
          } else {
            window.alert(
              `O ${isWorkTime ? "tempo de trabalho" : "intervalo"} acabou!`
            );
            new Audio(alert).play();
          }
        });
      }
      
    }
    console.log(completedPomodoros);
    return () => clearInterval(intervalId);
  }, [
    isRunning,
    timeRemaining,
    onTimeUp,
    initialTime,
    breakTime,
    isWorkTime,
    isPaused,
    handleStart,
    completedPomodoros,
    showPomodoroNotification,
  ]);

  useEffect(() => { //useEffect que realiza o gerenciamento da quantidade de ciclos de pomodoro que foram realizados pelo user.
    localStorage.setItem(
      "totalCompletedPomodoros",
      totalCompletedPomodoros.toString()
    );
  }, [totalCompletedPomodoros]);
  const handlePause = () => { //Função que ealiza a pausa no timer.
    setIsPaused(!isPaused);
  };

  const handleReset = () => { //Função que reseta o timer.
    setIsRunning(false);
    setIsWorkTime(true);
    setIsPaused(false);
    setTimeRemaining(initialTime);
  };

  const handleResume = () => { //Função que retoma o timer do pomodoro após uma o usuário clicar em pausa.
    setIsPaused(false);
  };

  //Return do componente, contendo o ProgressBar component, botões de interação para os usuários realizarem as ações necessárias e indicadores do estado atual do timer em forma de títulos.
  return (
    <div className="flex flex-col items-center justify-center bg-slate-200 py-8 px-8 rounded pt-8 mt-8 mb-8 shadow-sm">
      <h1 className="text-4xl font-bold text-center mb-4 text-slate-700">
        {isWorkTime ? "Hora de trabalhar!" : "Hora de descansar!"}
      </h1>
          <h2 className="text-xl font-bold mb-2 text-slate-700">
        Você completou{" "}
        <span className="text-2xl font-bold mb-2 text-slate-900">
          {totalCompletedPomodoros}
        </span>{" "}
        pomodoros hoje!
      </h2>
      <ProgressBar radius={80} progress={percentage} />
      <div className="text-6xl text-white font-bold text-center my-8 bg-slate-700 rounded py-2 px-4">
        {Math.floor(timeRemaining / 60)
          .toString()
          .padStart(2, "0")}
        :{(timeRemaining % 60).toString().padStart(2, "0")}
      </div>
      <div className="flex space-x-4">
        {!isRunning ? (
          <>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-sm"
              onClick={() => handleStart(false)}
            >
              Iniciar Pomodoro
            </button>
            {breakTime && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleStart(true)}
              >
                Iniciar Pausa
              </button>
            )}
          </>
        ) : isPaused ? (
          <>
            <button
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleResume}
            >
              Retomar
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleReset}
            >
              Resetar
            </button>
          </>
        ) : (
          <>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handlePause}
            >
              Pausar
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleReset}
            >
              Resetar
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Pomodoro;
