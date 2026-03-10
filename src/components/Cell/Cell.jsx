export default function Cell({ color, isMini = false, paint, isDrawing }) {
    const handleMouseEnter = () => {
        if(isDrawing) paint()
    }
    return (<>
        <div onMouseEnter={handleMouseEnter} onClick={paint} style={{ background: color, width: isMini ? 4 : 24, aspectRatio: 1/1 }} className={`${ !isMini && 'border'} border-slate-800/20 hover:bg-slate-800/20`}></div>
    </>)
}