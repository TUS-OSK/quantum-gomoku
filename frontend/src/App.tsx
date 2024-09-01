import Header from './components/Header'
import Footer from './components/Footer'
import Game from './components/Game'

function App() {
  return (
    <>
      <div className="h-[100dvh] flex flex-col">
        <Header />
        <div>
          <h1 className="text-4xl font-bold text-center">Welcome to Gomoku</h1>
          <Game />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
