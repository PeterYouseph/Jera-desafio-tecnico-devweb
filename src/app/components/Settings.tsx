import { useState } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (initialTime: number, breakTime: number) => void;
  modalClass?: string; // nova prop para a classe do modal
};

const Modal = ({ isOpen, onClose, onConfirm }: ModalProps) => {
  const [initialTime, setInitialTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onConfirm(initialTime, breakTime);
    onClose();
  };

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
