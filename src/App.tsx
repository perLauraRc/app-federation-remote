import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import theodore_her from './assets/theodore-her.jpg'
import './App.css'
import Background from './components/Background/Background'
import { classNames } from './utils'

type Size = 'small' | 'medium' | 'large' | 'full'

const sizes: Record<Size, string> = {
  small: 'w-16',
  medium: 'w-48',
  large: 'w-64',
  full: 'w-full',
}

const gridCellClassName = 'relative w-1/3 aspect-3/2 flex items-center justify-center border-1 border-gray-900 dark:border-powder-blue pt-6 pr-8 pb-6 pl-8'
const hyperlinkClassName = 'contents'
const gridCellHoveredClassName = 'absolute z-gridCellHovered left-0 top-0 flex items-center justify-center pt-6 pr-8 pb-6 pl-8 -inset-1 -skew-y-4 scale-103 font-roboto font-bold text-[1rem]/1 lg:text-[1.5rem]/8 text-gray-900 dark:text-gray-200 -tracking-normal bg-gradient-to-r from-byzantium to-prussian-blue opacity-0 transition duration-300 ease-in-out hover:opacity-100'

const App = () => (
  <>
    <h1 className='max-w-(--breakpoint-md) text-[2.5rem]/11 lg:text-[5rem]/17 text-gray-900 dark:text-powder-blue tracking-tight text-pretty'>
      <span className='border-solid border-2 bg-gray-900 dark:bg-powder-blue border-gray-900 dark:border-powder-blue text-white dark:text-black pt-0 pr-2 pb-0 pl-2 -mr-1'>thex</span>
      <span> made with Vite + React + TailwindCSS + TypeScript + Module Federation</span>
    </h1>
    <div className='w-full flex flex-wrap mt-6 mb-6'>
      <div className={gridCellClassName}>
        <a href="https://vite.dev" target="_blank" className={hyperlinkClassName}>
          <img src={reactLogo} className={`logo react ${sizes.small}`} alt="React logo" />
        </a>
      </div>
      <div className={gridCellClassName}>
        <a href="https://vite.dev" target="_blank" className={hyperlinkClassName}>
          <img src={reactLogo} className={`logo react ${sizes.medium}`} alt="React logo" />
        </a>
      </div>
      <div className={gridCellClassName}>
        <a href="https://vite.dev" target="_blank" className={hyperlinkClassName}>
          <img src={viteLogo} className={`logo ${sizes.large}`} alt="Vite logo" />
        </a>
      </div>
      <div className={gridCellClassName}>
        <a href="https://vite.dev" target="_blank" className={hyperlinkClassName}>
          <img src={viteLogo} className={`logo ${sizes.full}`} alt="Vite logo" />
        </a>
      </div>
      <div className={classNames(gridCellClassName, 'relative')}>
        <div className={gridCellHoveredClassName}>Background component / Size small</div>
        <Background src={theodore_her} size='small' />
      </div>
      <div className={gridCellClassName}>
        <div className={gridCellHoveredClassName}>Background component / Size medium</div>
        <Background src={theodore_her} size='medium' />
      </div>
      <div className={gridCellClassName}>
        <div className={gridCellHoveredClassName}>Background component / Size large</div>
        <Background src={theodore_her} size='large' />
      </div>
      <div className={gridCellClassName}>
        <div className={gridCellHoveredClassName}>Background component / Size full</div>
        <Background src={theodore_her} size='full' />
      </div>
      <div className={gridCellClassName}>
        <div className={gridCellHoveredClassName}>Background component / Size full / Aspect ratio 3/2</div>
        <Background aspectRatio='3/2' src={theodore_her} size='full' />
      </div>
      <div className={gridCellClassName}>
        <div className={gridCellHoveredClassName}>Background component / Size full / Aspect ratio 4/3</div>
        <Background aspectRatio='4/3' src={theodore_her} size='full' />
      </div>
      <div className={gridCellClassName}>
        <div className={gridCellHoveredClassName}>Background component / Size full / Aspect ratio 16/9/3</div>
        <Background aspectRatio='16/9' src={theodore_her} size='full' />
      </div>
    </div>
  </>
)

export default App
