/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { TfiWorld } from 'react-icons/tfi';
import { BsCurrencyExchange } from 'react-icons/bs';
import Select from '../Select/Select';

function Modal() {
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
          <h3 className="font-bold text-lg font-lato">Regional Setting</h3>
          <ul>
            <li>
              <label htmlFor="country" className="mt-10 pb-1 flex flex-row gap-3 md:text-xl">
                <TfiWorld className="mt-1" />
                Country / Region
              </label>
              <p className="text-xs font-medium mb-2">
                Selecting the country you’re in will give you local deals and information.
              </p>
              <Select
                handleSelectChange={handleSelectChange}
                componentName="country"
                selected="I am an amazing Country!"
              />
            </li>
            <li>
              <label htmlFor="country" className="mt-10 pb-1 flex flex-row gap-3 md:text-xl">
                <BsCurrencyExchange className="mt-1" />
                Currency
              </label>
              <Select
                handleSelectChange={handleSelectChange}
                componentName="currency"
                selected="EUR"
              />
            </li>
          </ul>
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
