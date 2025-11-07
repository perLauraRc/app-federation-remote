import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import theodore_her from './assets/theodore-her.jpg'
import './App.css'
import {
  Background,
  type Size,
  GalleryCell,
  ErrorPage,
  CircleProgress,
  ProgressBar,
  FixturesCarousel,
  Sizes,
  AspectRatios,
  IconButton,
  FavoriteIcon,
  DeleteIcon,
  MenuIcon,
  NotificationIcon,
  ArrowLeftIcon,
  ArrowRightIcon
} from '@src/components'

import type { FixtureFilter, Match } from '@src/types'

// import { matchesWithFavoriteFilter, zeroMatches } from '../mocks/fixtures.ts'
import { matchesWithFavoriteFilter } from '@mocks/fixtures.ts'

const widthBySize: Record<Size, string> = {
  small: 'w-16',
  medium: 'w-48',
  large: 'w-64',
  full: 'w-full'
}

const hyperlinkClassName = 'contents'

const onSelectFixture = (fixture: Match & FixtureFilter) => {
  console.log(
    `Fixture selected: ${fixture.id} ${fixture.isFavorite ? '(Favorite)' : ''}`
  )
}

const App = () => (
  <>
    <h1 className="dark:text-powder-blue max-w-(--breakpoint-md) text-[2.5rem]/11 tracking-tight text-pretty text-gray-900 lg:text-[5rem]/17">
      <span className="dark:bg-powder-blue dark:border-powder-blue -mr-1 border-2 border-solid border-gray-900 bg-gray-900 pt-0 pr-2 pb-0 pl-2 text-white dark:text-black">
        thex
      </span>
      <span>
        {' '}
        made with Vite + React + TailwindCSS + TypeScript + Module Federation
      </span>
    </h1>
    <div className="mt-6 mb-6 flex w-full flex-wrap">
      <GalleryCell className="flex-wrap">
        <IconButton
          onClick={() => alert('IconButton clicked')}
          color={'var(--color-byzantium)'}
          size={32}
        >
          <ArrowLeftIcon />
        </IconButton>
        <IconButton
          color={'var(--color-byzantium)'}
          onClick={() => alert('IconButton clicked')}
          size={32}
        >
          <ArrowRightIcon />
        </IconButton>
        <IconButton
          color={'var(--color-byzantium)'}
          onClick={() => alert('IconButton clicked')}
          size={32}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          color={'var(--color-byzantium)'}
          onClick={() => alert('IconButton clicked')}
          notifications={5}
          size={64}
        >
          <FavoriteIcon />
        </IconButton>
        <IconButton
          color={'var(--color-byzantium)'}
          onClick={() => alert('IconButton clicked')}
          size={64}
        >
          <MenuIcon />
        </IconButton>
        <IconButton
          color={'var(--color-byzantium)'}
          notifications={101}
          onClick={() => alert('IconButton clicked')}
          size={64}
        >
          <NotificationIcon />
        </IconButton>
      </GalleryCell>
      <GalleryCell>
        <FixturesCarousel
          fixtures={matchesWithFavoriteFilter as (Match & FixtureFilter)[]}
          visibleCount={1}
          onSelect={onSelectFixture}
        />
      </GalleryCell>
      <GalleryCell>
        <CircleProgress value={9.5238} size={200} strokeWidth={32} />
      </GalleryCell>
      <GalleryCell>
        <ProgressBar
          bgColor="--color-violet"
          color="--color-moonstone"
          value={33.34}
          width="70%"
        />
      </GalleryCell>
      <GalleryCell>
        <a
          href="https://vite.dev"
          target="_blank"
          className={hyperlinkClassName}
          rel="noreferrer"
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
          rel="noreferrer"
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
          rel="noreferrer"
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
          rel="noreferrer"
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
          rel="noreferrer"
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
          rel="noreferrer"
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
          rel="noreferrer"
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
          rel="noreferrer"
        >
          <img
            src={viteLogo}
            className={`logo ${widthBySize.full}`}
            alt="Vite logo"
          />
        </a>
      </GalleryCell>
      <GalleryCell description="Size small" title="Background">
        <Background src={theodore_her} size={Sizes.small} />
      </GalleryCell>
      <GalleryCell description="Size medium" title="Background">
        <Background src={theodore_her} size={Sizes.medium} />
      </GalleryCell>
      <GalleryCell description="Size large" title="Background">
        <Background src={theodore_her} size={Sizes.large} />
      </GalleryCell>
      <GalleryCell description="Size full" title="Background">
        <Background src={theodore_her} size={Sizes.full} />
      </GalleryCell>
      <GalleryCell
        description="Size full - Aspect ratio 3/2"
        title="Background"
      >
        <Background
          aspectRatio={AspectRatios['3/2']}
          src={theodore_her}
          size={Sizes.full}
        />
      </GalleryCell>
      <GalleryCell
        description="Size full - Aspect ratio 4/3"
        title="Background"
      >
        <Background
          aspectRatio={AspectRatios['4/3']}
          src={theodore_her}
          size={Sizes.full}
        />
      </GalleryCell>
      <GalleryCell
        description="Size full - Aspect ratio 16/9"
        title="Background"
      >
        <Background
          aspectRatio={AspectRatios['16/9']}
          src={theodore_her}
          size={Sizes.full}
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
