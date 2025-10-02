import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import theodore_her from './assets/theodore-her.jpg'
import './App.css'
import {
  Background,
  type Size,
  GalleryCell,
  ErrorPage,
  CircleProgress
} from '@/components'

const widthBySize: Record<Size, string> = {
  small: 'w-16',
  medium: 'w-48',
  large: 'w-64',
  full: 'w-full'
}

const hyperlinkClassName = 'contents'

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
      <GalleryCell description="Valu 9.5238%" title="CircleProgress">
        <CircleProgress value={9.5238} size={200} strokeWidth={32} />
      </GalleryCell>
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
        <Background
          aspectRatio="16/9"
          src={theodore_her}
          size="full"
          position="absolute"
        />
      </GalleryCell>
      <GalleryCell
        description="Status 404 - Title Page Not Found"
        title="ErrorPage"
      >
        <ErrorPage
          action={
            <button className="border-1 pt-1 pr-2 pb-1 pl-2">
              Go back home
            </button>
          }
          status={404}
          title="Page Not Found because the ball didn't want to go in"
        />
      </GalleryCell>
    </div>
  </>
)

export default App
