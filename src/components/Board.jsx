import { useState } from "react"
import Tile from "./Tile"

// This component is called in the "Game" component
function Board() {

    // Initializes the state variable tile with an array of length 9 filled with null values. This array represents the state of each tile on the game board
    // tile = [null, null, null, null, null, null, null, null, null]
    const [tile, setTile] = useState(Array(9).fill(null))

    // Initializes the state variable playerTurn with the initial value of "X". This variable keeps track of whose turn it is in the game (either "X" or "O")
    const [playerTurn, setPlayerTurn] = useState("X")


    // Defines a function onTileClick to handle when a tile is clicked, which takes the index of the tile which is clicked (i) as input
    const onTileClick = (i) => {
        // Checks if the tile at index i is already filled or if there is a winner. If either condition is true, the function returns, preventing further execution
        if (tile[i] || winnerCalculation(tile)) return;

        // Copies the tile array using the spread operator to avoid mutating the state directly
        const tileCopy = [...tile];

        // Sets the value of the clicked tile according to the current player's turn
        if (playerTurn === "X") {
            tileCopy[i] = "X"
        } else {
            tileCopy[i] = "O"
        }

        // Updates the tile state with the modified copy
        setTile(tileCopy)

        // Updates the playerTurn state to toggle between "X" and "O"
        setPlayerTurn(prev => prev === "X" ? "O" : "X")
    }


    // Defines a function winnerCalculation to calculate who is the winner of the game, which takes the tile array as input
    function winnerCalculation(tile) {

        // Defines an array winningLines containing arrays representing the indices of all possible winning combinations
        let winningLines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]

        // Iterates through each winning line and checks if any player has won
        // If a player has won, it returns the winning player ("X" or "O"), if not, it returns null
        for (let i = 0; i < winningLines.length; i++) {
            let [a, b, c] = winningLines[i]
            if (tile[a] && tile[a] === tile[b] && tile[b] === tile[c]) {
                return tile[a]
            }
        }
        return null;
    }

    // Calls the winnerCalculation function to determine if there is a winner and stores it in a variable called winner
    const winner = winnerCalculation(tile);

    // Check if all tiles are filled (no null values)
    let allTilesFilled = tile.every(t => t != null)

    // Determines the game status based on whether there is a winner or if it's a player's turn
    let playingStatus;
    let winningStatus;

    if (winner) {
        winningStatus = `${winner} has won the game`;
    }
    else if (allTilesFilled) {
        winningStatus = "Game Draw !"
    }
    else {
        playingStatus = playerTurn + "'s turn"
    }

    // Defines a function 
    function handleResetButton() {
        setTile(Array(9).fill(null))
        setPlayerTurn("X")
    }

    // Starts the JSX content for the Board component
    return (
        <div className="flex flex-col justify-center items-center">
            {/* Renders the playing status if there is no winner */}
            {
                (!winner && !allTilesFilled) &&
                <div className="border-2 rounded-md border-purple-300 text-purple-200 w-fit m-auto px-6 py-2 mt-16 md:mt-0 font-bold text-xl">{playingStatus}</div>
            }
            {/* Renders the Board of the game */}
            <div className="mt-10 m-auto font-bold text-2xl md:text-4xl">

                {/* There are 3 rows. And in each row, there are 3 tiles */}

                {/* In each tile, 
                customClass (border style for each tile according to its index), 
                value (the value of the corresponding tile from the "tile" state (which is an array) to determine if it's "X", "O", or null),
                and handleTileCLick (an onCLick event handler for the tile button, invoking the onTileClick func with their corresponding indices),
                are passed as props to "Tile" component */}

                {/* First row */}
                <div className="flex">
                    <Tile
                        customClass="border-r-4 border-b-4"
                        value={tile[0]}
                        handleTileClick={() => onTileClick(0)}
                    />
                    <Tile
                        customClass="border-r-4 border-b-4"
                        value={tile[1]}
                        handleTileClick={() => onTileClick(1)}
                    />
                    <Tile
                        customClass="border-b-4"
                        value={tile[2]}
                        handleTileClick={() => onTileClick(2)}
                    />
                </div>
                {/* Second row */}
                <div className="flex">
                    <Tile
                        customClass="border-r-4 border-b-4"
                        value={tile[3]}
                        handleTileClick={() => onTileClick(3)}
                    />
                    <Tile
                        customClass="border-r-4 border-b-4"
                        value={tile[4]}
                        handleTileClick={() => onTileClick(4)}
                    />
                    <Tile
                        customClass="border-b-4"
                        value={tile[5]}
                        handleTileClick={() => onTileClick(5)}
                    />
                </div>
                {/* Third row */}
                <div className="flex">
                    <Tile
                        customClass="border-r-4"
                        value={tile[6]}
                        handleTileClick={() => onTileClick(6)}
                    />
                    <Tile
                        customClass="border-r-4"
                        value={tile[7]}
                        handleTileClick={() => onTileClick(7)}
                    />
                    <Tile
                        customClass=""
                        value={tile[8]}
                        handleTileClick={() => onTileClick(8)}
                    />
                </div>
            </div>

            {/* Renders the winning status */}
            <div className="text-center mt-10 font-bold text-3xl">{winningStatus}</div>

            {/* Button to reset the game */}
            <div
                onClick={handleResetButton}
                className="border-4 rounded-md bg-gradient-to-l from-indigo-600 via-purple-600 to-pink-600 mt-5 w-fit m-auto px-6 py-2 font-bold text-xl  cursor-pointer">
                RESET
            </div>
        </div>
    )
}

export default Board
