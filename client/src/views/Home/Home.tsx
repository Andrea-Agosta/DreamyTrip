import React from 'react';
import SearchControl from '../../components/SearchControl/SearchControl';
import '../../styles/Home.css';

function Home() {
  return (
    <section className="bg-image min-h-screen flex flex-col">
      <h1 className="py-10 md:py-28 font-lato font-bold text-3xl md:text-7xl text-center text-white text-stroke">
        EXPLORE YOUR DREAM!
      </h1>
      <SearchControl />
    </section>
  );
}

export default Home;
