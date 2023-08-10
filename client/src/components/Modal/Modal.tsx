import React, { useState } from 'react';
import CountryCurrency from './body/CountryCurrency';

function Modal({ type }: { type: string }) {
  const [isModalOpen, setisModlaOpen] = useState<boolean>(false);

  const handleModal = () => setisModlaOpen(!isModalOpen);
  const handleSelectChange = () => {};
  const handleSaveChanges = () => {};

  return (
    <>
      <button
        type="button"
        className="btn h-9 min-h-0 py-1 px-10 me-5 font-marcellus text-blue-secondary text-base bg-transparent border border-blue-secondary rounded-lg hover:bg-blue-secondary hover:text-white hover:border-blue-light"
        onClick={handleModal}
      >
        open modal
      </button>
      <dialog className={`modal text-black ${isModalOpen ? 'modal-open' : ''} `}>
        <form method="dialog" className="modal-box p-5 max-w-sm">
          {
            {
              countryCurrency: <CountryCurrency handleSelectChange={handleSelectChange} />,
            }[type]
          }
          <div className="mt-10 w-full flex flex-col gap-2">
            <button
              type="submit"
              onClick={handleSaveChanges}
              className="btn h-9 min-h-0 bg-blue-secondary text-white"
            >
              Save
            </button>
            <button type="submit" onClick={handleModal} className="btn h-9 min-h-0">
              Close
            </button>
          </div>
        </form>
        {/* close with outside click of modal body */}
        <form method="dialog" className="modal-backdrop">
          <button type="submit" onClick={handleModal}>
            close
          </button>
        </form>
      </dialog>
    </>
  );
}

export default Modal;
