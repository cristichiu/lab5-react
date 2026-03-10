import { useState } from 'react'
import colors from "./data/colors.json"
import { Canva } from './components/Canva'

function App() {
  const [color, setColor] = useState('#000000')
  const [grid, setGrid] = useState(
    Array.from({ length: 20 }, () =>
      Array.from({ length: 20 }, () => "#ffffff")
    )
  )
  const [draws, setDraws] = useState([])
  const [isDrawing, setIsDrawing] = useState(false)
  const paint = (x, y) => {
    setGrid(prev => {
      const newGrid = prev.map(row => [...row])
      newGrid[y][x] = color
      return newGrid
    })
  }

  const handleMouseDown = () => {
    setIsDrawing(true)
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
  }

  const resetDraw = () => {
    setGrid(
      Array.from({ length: 20 }, () =>
        Array.from({ length: 20 }, () => "#ffffff"))
      )
  }
  const saveDraw = () => {
    setDraws(prev => [...prev, { id: crypto.randomUUID(), grid }])
    resetDraw()
  }
  const deleteDraw = (id) => {
    setDraws(prev => prev.filter(p => p.id !== id))
  }
  const selectDraw = (id) => {
    setGrid(draws.find(p => p.id === id).grid)
  }
  return (
    <>
    <div className='flex items-center flex-col m-5 gap-5'>
      <div>
        <h1 className='text-3xl font-bold text-center my-5'>Pixel draw</h1>
        <div className='flex gap-8'>
          <div className='flex gap-2'>
            { colors.map(c => {
              return <div key={c.index} onClick={() => setColor(c.color)} className={`w-8 h-8 rounded-full border border-slate-800/20 hover:scale-110 cursor-pointer ${c.color === color && 'outline-2 outline-slate-600 outline-offset-2'}`} style={{ background: c.color }}></div>
            }) }
          </div>
          <div className='flex gap-2'>
            <button className='py-1 px-4 bg-slate-500 rounded-xl text-zinc-100 cursor-pointer' onClick={saveDraw}>save</button>
            <button className='py-1 px-4 bg-slate-500/30 rounded-xl text-slate-700 cursor-pointer' onClick={resetDraw}>reset</button>
          </div>
        </div>
      </div>
      <div className='flex gap-10'>
        <div
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        >
          <Canva grid={grid} paint={paint} isDrawing={isDrawing} />
        </div>
        <div className='flex flex-col gap-5'>
            { draws.map(d => {
              return <div className='flex flex-col gap-1' onClick={() => selectDraw(d.id)}>
                <Canva key={d.id} isMini={true} grid={d.grid} />
                <button onClick={() => deleteDraw(d.id)} className='border cursor-pointer hover:bg-slate-600/50'>delete</button>
                <button onClick={() => selectDraw(d.id)} className='border cursor-pointer hover:bg-slate-600/50'>apply</button>
              </div>
            }) }
        </div>
      </div>
    </div>
    </>
  )
}

export default App
