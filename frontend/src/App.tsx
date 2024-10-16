import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Game from './components/Game';

const App: React.FC = () => {
  return (
    <>
      <div className="h-[100dvh] flex flex-col">
        <Header />
        <div className="flex justify-center items-center flex-grow">
          <div className="w-1/3 2xl:w-1/2">
            <Game />
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App;
