import { useState } from "react"; //Import do React useState para gerenciar o estado das informações.

type ModalProps = { //Define o tipo das props necessárias para o componente Settings através da interface.
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (initialTime: number, breakTime: number) => void;
  modalClass?: string; // nova prop para a classe do modal
};

//Define o componente Modal,recebendo as props definidas na interface: booleano isOpen, função isClosed e função onConfirm (para enviar os dados).
const Modal = ({ isOpen, onClose, onConfirm }: ModalProps) => {
  const [initialTime, setInitialTime] = useState(25 * 60); //Const para definir o tempo inicial do timer no componente Modal.
  const [breakTime, setBreakTime] = useState(5 * 60); //Const para definir o tempo inicial de pausa do timer no componente Modal.

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => { //Função que faz envio dos dados quando o forms é enviado.
    event.preventDefault();
    onConfirm(initialTime, breakTime);
    onClose();
  };

  //Renderização do componente Modal, com as opções de alterar os timers de pomodoro/pausa, enviar ou cancelar a ação.
  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onClick={onClose}
        >
          <div
            className="modal bg-white rounded-lg p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">Configurações</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="initialTime" className="block font-bold">
                  Tempo de trabalho (minutos)
                </label>
                <input
                  type="number"
                  id="initialTime"
                  className="w-full border rounded py-2 px-3"
                  min="1"
                  max="120"
                  value={initialTime}
                  onChange={(event) =>
                    setInitialTime(parseInt(event.target.value))
                  }
                />
              </div>
              <div className="mb-4">
                <label htmlFor="breakTime" className="block font-bold">
                  Tempo de descanso (minutos)
                </label>
                <input
                  type="number"
                  id="breakTime"
                  className="w-full border rounded py-2 px-3"
                  min="1"
                  max="120"
                  value={breakTime}
                  onChange={(event) =>
                    setBreakTime(parseInt(event.target.value))
                  }
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded mr-2"
                  onClick={onClose}
                >
                  Cancelar
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
