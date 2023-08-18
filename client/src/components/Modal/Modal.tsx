import React, {
  ChangeEvent, useContext, useEffect, useState,
} from 'react';
import CountryCurrency from './body/CountryCurrency';
import { CountriesContext } from '../../context/countries.context';
import { ICountry } from '../../types/country.type';

function Modal({ type }: { type: string }) {
  const { country, setCountry } = useContext(CountriesContext);
  const [isModalOpen, setisModlaOpen] = useState<boolean>(false);
  const [tempSelectValue, setTempSelectValue] = useState<ICountry>(country);

  const handleModal = () => {
    setisModlaOpen(!isModalOpen);
    setTempSelectValue(country);
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.name === 'country') {
      return setTempSelectValue({
        ...tempSelectValue,
        country_name: event.target.value,
        country_flag: event.target.selectedOptions[0]?.getAttribute('data-emoji') ?? '',
      });
    }
    return setTempSelectValue({ ...tempSelectValue, country_currency: event.target.value });
  };

  const handleSaveChanges = () => {
    setCountry(tempSelectValue);
    setisModlaOpen(!isModalOpen);
  };

  useEffect(() => {
    setTempSelectValue(country);
  }, [country]);

  return (
    <>
      <button
        type="button"
        className="btn btn-sm me-5 font-marcellus text-blue-secondary text-base bg-transparent border border-blue-secondary rounded-lg hover:bg-blue-secondary hover:text-white hover:border-blue-light"
        onClick={handleModal}
      >
        {`${country.country_flag} ${country.country_name} - ${country.country_currency}`}
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
