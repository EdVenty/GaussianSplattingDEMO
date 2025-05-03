import { useState } from 'react'
import { Viewer } from './components/3DGSViewer'
import InfoPanel from './components/InfoPanel'

function App() {
  const [xr, setXR] = useState(false);

  return (
    <>
      <InfoPanel title="3DGS Viewer" model="Workspace" file='workspace.ksplat' onViewInAR={() => setXR(true)} />
      <Viewer src='table.ksplat' className='w-full h-full' xr={xr}/>
    </>
  )
}

export default App
