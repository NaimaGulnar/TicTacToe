/* eslint-disable react/prop-types */

// This component is called in the "Board" component
// It receives customClass, value, and handleTileCLick as props from the "Board component"
function Tile({ customClass, value, handleTileClick }) {

    return (
        <>
            {/* Rendering a button, clicking on which handleTileCLick func runs (this func is defined in the Board component) and the content is "X", or "O", or null, depending on the tile and playerTurn state variable defined in the Board component  */}
            <button
                onClick={handleTileClick}
                className={`${customClass} h-20 md:h-32 w-20 md:w-32`}>
                {value}
            </button>
        </>
    )
}

export default Tile
