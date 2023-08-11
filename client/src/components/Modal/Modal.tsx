import React, { ChangeEvent, useContext, useState } from 'react';
import CountryCurrency from './body/CountryCurrency';
import { CountryContext } from '../../context/country';
import { ICountry } from '../../types/country.type';

function Modal({ type }: { type: string }) {
  const { country, setCountry } = useContext(CountryContext);
  const [isModalOpen, setisModlaOpen] = useState<boolean>(false);
  const [tempSelectValue, setTempSelectValue] = useState<ICountry>(country);

  const handleModal = () => setisModlaOpen(!isModalOpen);
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => console.log(event, 'event');
  const handleSaveChanges = () => {};
  console.log(setCountry, '');
  return (
    <>
      <button
        type="button"
        className="btn btn-sm btn-wide me-5 font-marcellus text-blue-secondary text-base bg-transparent border border-blue-secondary rounded-lg hover:bg-blue-secondary hover:text-white hover:border-blue-light"
        onClick={handleModal}
      >
        open modal
      </button>
      <dialog className={`modal text-black ${isModalOpen ? 'modal-open' : ''} `}>
        <form method="dialog" className="modal-box p-5 max-w-sm">
          {
            {
              countryCurrency: (
                <CountryCurrency
                  handleSelectChange={handleSelectChange}
                  defaultValue={tempSelectValue}
                />
              ),
            }[type]
          }
          <div className="mt-10 w-full flex flex-col gap-2">
            <button
              type="submit"
              onClick={handleSaveChanges}
              className="btn btn-sm bg-blue-secondary text-white hover:bg-blue-primary"
            >
              Save
            </button>
            <button type="submit" onClick={handleModal} className="btn btn-sm">
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
