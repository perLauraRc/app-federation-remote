/* eslint-disable no-console */
import { useCallback, useEffect, useRef, useState } from 'react'
import type { FixtureFilter, Match, Team } from '@src/types'
import { MatchStatuses } from '@src/constants/restApi'
import { classNames, formatDateTime } from '@src/utils'
import { FavoriteIcon, IconButton } from '@src/components'

export interface FixturesCarouselProps {
  // Auto-advance interval in ms (disabled if 0)
  autoScrollInterval?: number
  /** Additional class names (Tailwind syntax) */
  className?: string
  /** List of fixture objects (required) */
  fixtures: (Match & FixtureFilter)[]
  /** Callback when fixture clicked */
  onSelect?: (fixture: Match & FixtureFilter) => void
  /** Approximate number of visible cards (default 3) */
  visibleCount?: number
}

const FixturesCarousel = ({
  autoScrollInterval = 0,
  className,
  fixtures,
  onSelect,
  visibleCount = 2
}: FixturesCarouselProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const addToFavoriteRef = useRef<HTMLDivElement[] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dragging, setDragging] = useState(false)

  const cardWidthPercent = 100 / visibleCount

  // Ensure currentIndex is between 0 and the number of fixtures - 1
  const clampCurrentIndex = useCallback(
    (i: number) => Math.max(0, Math.min(fixtures.length - 1, i)),
    [fixtures.length]
  )

  const scrollTo = useCallback(
    (i: number) => {
      if (!containerRef.current) return
      const clamped = clampCurrentIndex(i)
      const fixturesTrack = containerRef.current
      const scrollLeft = (fixturesTrack.scrollWidth * clamped) / fixtures.length
      fixturesTrack.scrollTo({ left: scrollLeft, behavior: 'smooth' })
      setCurrentIndex(clamped)
    },
    [clampCurrentIndex, fixtures.length]
  )

  const showNext = useCallback(
    () => scrollTo(currentIndex + 1),
    [scrollTo, currentIndex]
  )

  const showPrevious = useCallback(
    () => scrollTo(currentIndex - 1),
    [scrollTo, currentIndex]
  )

  // Auto scroll
  useEffect(() => {
    if (!autoScrollInterval) return
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex) => {
        const showNextIdx =
          currentIndex + 1 >= fixtures.length ? 0 : currentIndex + 1
        scrollTo(showNextIdx)
        return showNextIdx
      })
    }, autoScrollInterval)
    return () => clearInterval(interval)
  }, [autoScrollInterval, fixtures.length, scrollTo])

  // Keyboard navigation
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      showNext()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      showPrevious()
    }
  }

  // Horizontal pointer movement (drag) handled as horizontal scroll for desktop
  // Touch devices: overflow-x container scroll works natively
  // Trackpads/magic mouse: two-finger horizontal scroll works natively
  // Mouse wheel: shift+wheel or horizontal wheel works natively
  const dragState = useRef<{
    startX: number
    scrollLeft: number
    isDown: boolean // true when dragging
  }>({ startX: 0, scrollLeft: 0, isDown: false })

  const startScroll = (e: React.PointerEvent) => {
    // Must avoid triggering drag when interacting with an element that should trigger its own events
    if (
      !containerRef.current ||
      (addToFavoriteRef.current &&
        e.target instanceof Element &&
        addToFavoriteRef.current[currentIndex]?.contains(e.target))
    ) {
      return
    }
    setDragging(true)
    dragState.current = {
      startX: e.clientX,
      scrollLeft: containerRef.current.scrollLeft,
      isDown: true
    }
    // Enable pointer capture
    try {
      containerRef.current.setPointerCapture(e.pointerId)
    } catch (error) {
      console.log('setPointerCapture failed:', error)
    }
  }

  const stopScroll = (e: React.PointerEvent) => {
    setDragging(false)
    if (!containerRef.current) return
    dragState.current.isDown = false
    // Release pointer capture
    try {
      containerRef.current.releasePointerCapture(e.pointerId)
    } catch (error) {
      console.log('releasePointerCapture failed:', error)
    }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragState.current.isDown || !containerRef.current) return
    // Compute horizontal movement: measure how far the pointer has moved since the drag began
    const dx = e.clientX - dragState.current.startX
    // Shifts the scroll position relative to where the drag started
    containerRef.current.scrollLeft = dragState.current.scrollLeft - dx
  }

  const fixturesTrackDraggingClassName = `${dragging ? 'cursor-grabbing' : 'cursor-grab'}`

  return (
    <div
      className={`relative flex h-full w-full flex-col gap-4 ${className ?? ''}`}
      data-testid="fixtures-carousel-container"
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      {fixtures.length && (
        <h2 className="flex-[0_0_40px] text-center text-[1.25rem]/[2.5rem]">
          {fixtures[0].competition.name}
        </h2>
      )}
      <div
        className={classNames(
          'relative flex flex-1 items-center justify-between overflow-x-auto select-none',
          // Only apply smooth scrolling and snap when NOT dragging
          // Keep touch-pan-x for native scrolling when not dragging
          !dragging && 'scroll-smooth snap-x snap-mandatory touch-pan-x',
          fixturesTrackDraggingClassName
        )}
        data-testid="fixtures-carousel-track"
        onPointerDown={startScroll}
        onPointerLeave={stopScroll}
        onPointerMove={onPointerMove}
        onPointerUp={stopScroll}
        ref={containerRef}
        role="group"
      >
        {fixtures.length ? (
          <>
            {fixtures.map((fixture: Match & FixtureFilter, i: number) => {
              const {
                // area,
                // competition,
                awayTeam,
                // group,
                homeTeam,
                id,
                isFavorite,
                // lastUpdated,
                // matchday,
                // odds,
                // referees,
                // score,
                // season,
                // stage,
                status,
                utcDate
              } = fixture

              const scheduled =
                status === MatchStatuses.TIMED ||
                status === MatchStatuses.SCHEDULED
              const playing =
                status === MatchStatuses.LIVE ||
                status === MatchStatuses.IN_PLAY ||
                status === MatchStatuses.PAUSED
              const finished = status === MatchStatuses.FINISHED

              return (
                <div
                  className="flex h-full snap-start flex-col gap-4"
                  key={id}
                  style={{
                    width: `${cardWidthPercent}%`,
                    minWidth: `${cardWidthPercent}%`
                  }}
                >
                  <div className="flex flex-1 justify-between overflow-hidden">
                    <TeamBlock team={homeTeam} />
                    <div className="flex flex-col items-center justify-evenly gap-2">
                      <div
                        ref={(node) => {
                          if (!addToFavoriteRef.current) {
                            addToFavoriteRef.current = []
                          }
                          if (node) {
                            addToFavoriteRef.current[i] = node
                          } else {
                            // Clean up the array when DOM node is unmounted
                            delete addToFavoriteRef.current[i]
                          }
                        }}
                        data-testid={`addToFavorite-btn-${id}`}
                      >
                        <IconButton
                          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            e.stopPropagation()
                            onSelect?.(fixture)
                          }}
                          color={
                            isFavorite
                              ? 'var(--color-tiktok-red)'
                              : 'var(--color-white)'
                          }
                          size={24}
                        >
                          <FavoriteIcon />
                        </IconButton>
                      </div>
                      <span className="flex justify-center self-center text-[1rem]/[1rem]">
                        vs
                      </span>
                    </div>
                    <TeamBlock team={awayTeam} />
                  </div>
                  <>
                    {finished && (
                      <div className="flex flex-[0_0_16px] justify-center text-[1rem]/[1rem]">
                        FT
                      </div>
                    )}
                    {scheduled && status === MatchStatuses.TIMED && (
                      <span className="text-[1rem]/[1rem]">
                        {formatDateTime(utcDate)}
                      </span>
                    )}
                    {scheduled && status === MatchStatuses.SCHEDULED && (
                      <span className="text-[1rem]/[1rem]">{`(Pending to confirm) ${formatDateTime(utcDate)}`}</span>
                    )}
                    {playing && (
                      <span className="animate-pulse font-semibold text-red-600">
                        LIVE
                      </span>
                    )}
                  </>
                </div>
              )
            })}
          </>
        ) : (
          <span className="w-full text-[1rem]/[1rem]">
            No fixtures available
          </span>
        )}
      </div>
      {fixtures.length && (
        <div
          className="flex h-[24px] flex-[0_0_24px] items-center justify-between"
          data-testid="fixtures-carousel-previous-navigation"
        >
          <button
            className="cursor-pointer rounded bg-gray-200 px-2 py-1 text-[1rem]/[1rem] disabled:opacity-40 dark:bg-gray-700"
            disabled={currentIndex === 0}
            onClick={showPrevious}
            role="button"
          >
            ◀
          </button>
          <button
            className="cursor-pointer rounded bg-gray-200 px-2 py-1 text-[1rem]/[1rem] disabled:opacity-40 dark:bg-gray-700"
            disabled={currentIndex >= fixtures.length - 1}
            onClick={showNext}
            role="button"
          >
            ▶
          </button>
        </div>
      )}
    </div>
  )
}

interface TeamBlockProps {
  team: Team
}

function TeamBlock({ team }: TeamBlockProps) {
  const crestRef = useRef<HTMLImageElement | null>(null)

  return (
    <div className="flex flex-[0_0_35%] flex-col gap-2">
      <div className="flex h-[calc(100%-(32px))] justify-center">
        <img
          alt={team.shortName ?? undefined}
          className="max-h-full max-w-full object-contain"
          data-testid={`${team.shortName}-crest`}
          loading="lazy"
          ref={crestRef}
          src={team.crest ?? undefined}
        />
      </div>
      <span className="flex flex-[0_0_24px] items-center justify-center text-[0.875rem]/[0.875rem]">
        {team.shortName}
      </span>
    </div>
  )
}

export default FixturesCarousel
