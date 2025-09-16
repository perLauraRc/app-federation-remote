import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import theodore_her from './assets/theodore-her.jpg'
import './App.css'
import { Background, type Size, GalleryCell } from './components'

const widthBySize: Record<Size, string> = {
  small: 'w-16',
  medium: 'w-48',
  large: 'w-64',
  full: 'w-full'
}

const hyperlinkClassName = 'contents'
;('absolute z-gridCellHovered left-0 top-0 flex items-center justify-center pt-6 pr-8 pb-6 pl-8 -inset-1 -skew-y-4 scale-103 font-roboto font-bold text-[1rem]/1 lg:text-[1.5rem]/8 text-gray-900 dark:text-gray-200 -tracking-normal bg-gradient-to-r from-byzantium to-prussian-blue opacity-0 transition duration-300 ease-in-out hover:opacity-100')

const App = () => (
  <>
    <h1 className="max-w-(--breakpoint-md) text-[2.5rem]/11 lg:text-[5rem]/17 text-gray-900 dark:text-powder-blue tracking-tight text-pretty">
      <span className="border-solid border-2 bg-gray-900 dark:bg-powder-blue border-gray-900 dark:border-powder-blue text-white dark:text-black pt-0 pr-2 pb-0 pl-2 -mr-1">
        thex
      </span>
      <span>
        {' '}
        made with Vite + React + TailwindCSS + TypeScript + Module Federation
      </span>
    </h1>
    <div className="w-full flex flex-wrap mt-6 mb-6">
      <GalleryCell>
        <a
          href="https://vite.dev"
          target="_blank"
          className={hyperlinkClassName}
        >
          <img
            src={reactLogo}
            className={`logo react ${widthBySize.small}`}
            alt="React logo"
          />
        </a>
      </GalleryCell>
      <GalleryCell>
        <a
          href="https://vite.dev"
          target="_blank"
          className={hyperlinkClassName}
        >
          <img
            src={reactLogo}
            className={`logo react ${widthBySize.medium}`}
            alt="React logo"
          />
        </a>
      </GalleryCell>
      <GalleryCell>
        <a
          href="https://vite.dev"
          target="_blank"
          className={hyperlinkClassName}
        >
          <img
            src={reactLogo}
            className={`logo react ${widthBySize.large}`}
            alt="React logo"
          />
        </a>
      </GalleryCell>
      <GalleryCell>
        <a
          href="https://vite.dev"
          target="_blank"
          className={hyperlinkClassName}
        >
          <img
            src={reactLogo}
            className={`logo react ${widthBySize.full}`}
            alt="React logo"
          />
        </a>
      </GalleryCell>
      <GalleryCell>
        <a
          href="https://vite.dev"
          target="_blank"
          className={hyperlinkClassName}
        >
          <img
            src={viteLogo}
            className={`logo ${widthBySize.small}`}
            alt="Vite logo"
          />
        </a>
      </GalleryCell>
      <GalleryCell>
        <a
          href="https://vite.dev"
          target="_blank"
          className={hyperlinkClassName}
        >
          <img
            src={viteLogo}
            className={`logo ${widthBySize.medium}`}
            alt="Vite logo"
          />
        </a>
      </GalleryCell>
      <GalleryCell>
        <a
          href="https://vite.dev"
          target="_blank"
          className={hyperlinkClassName}
        >
          <img
            src={viteLogo}
            className={`logo ${widthBySize.large}`}
            alt="Vite logo"
          />
        </a>
      </GalleryCell>
      <GalleryCell>
        <a
          href="https://vite.dev"
          target="_blank"
          className={hyperlinkClassName}
        >
          <img
            src={viteLogo}
            className={`logo ${widthBySize.full}`}
            alt="Vite logo"
          />
        </a>
      </GalleryCell>
      <GalleryCell description="Size small" title="Background">
        <Background src={theodore_her} size="small" />
      </GalleryCell>
      <GalleryCell description="Size medium" title="Background">
        <Background src={theodore_her} size="medium" />
      </GalleryCell>
      <GalleryCell description="Size large" title="Background">
        <Background src={theodore_her} size="large" />
      </GalleryCell>
      <GalleryCell description="Size full" title="Background">
        <Background src={theodore_her} size="full" />
      </GalleryCell>
      <GalleryCell
        description="Size full - Aspect ratio 3/2"
        title="Background"
      >
        <Background aspectRatio="3/2" src={theodore_her} size="full" />
      </GalleryCell>
      <GalleryCell
        description="Size full - Aspect ratio 4/3"
        title="Background"
      >
        <Background aspectRatio="4/3" src={theodore_her} size="full" />
      </GalleryCell>
      <GalleryCell
        description="Size full - Aspect ratio 16/9"
        title="Background"
      >
        <Background aspectRatio="16/9" src={theodore_her} size="full" />
      </GalleryCell>
    </div>
  </>
)

export default App
