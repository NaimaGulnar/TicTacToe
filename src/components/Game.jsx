import Heading from "./Heading"
import Board from "./Board"

// This component is called in the "App" component
function Game() {
  return (
    // Game container
    <div className="h-screen flex flex-col md:flex-row justify-center md:justify-around items-center text-gray-200 bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 py-5 md:px-24">
      {/* Rendering Heading component */}
      <Heading />
      {/* Rendering Board component */}
      <Board />
    </div>
  )
}

export default Game
