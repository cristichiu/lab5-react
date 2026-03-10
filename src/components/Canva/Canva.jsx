import { Cell } from "../Cell"
export default function Canva({ grid, isMini = false, paint = null, isDrawing = false }) {
    return (<>
    <div className="border">
        { grid.map((row, y) => {
            return <div className="flex" key={y}>
                { row.map((color, x) => {
                    return <Cell isDrawing={isDrawing} isMini={isMini} key={`${x}-${y}`} color={color} paint={() => paint ? paint(x, y) : () => {}} />
                }) }
            </div>
        }) }
    </div>
    </>)
}