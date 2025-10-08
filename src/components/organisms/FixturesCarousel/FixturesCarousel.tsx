import React, { useCallback, useEffect, useRef, useState } from 'react'
import type { Match, Team } from '@/types'
import { MatchStatuses } from '@/constants/restApi'
import { classNames, formatDateTime } from '@/utils'

export interface FixturesCarouselProps {
  // Auto-advance interval in ms (disabled if 0)
  autoScrollInterval?: number
  /** Additional class names (Tailwind syntax) */
  className?: string
  /** List of fixture objects (required) */
  fixtures: Match[]
  /** Callback when fixture clicked */
  onSelect?: (fixture: Match) => void
  /** Approximate number of visible cards (default 3) */
  visibleCount?: number
}

function FixturesCarousel({
  autoScrollInterval = 0,
  className,
  fixtures,
  onSelect,
  visibleCount = 2
}: FixturesCarouselProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
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
    if (!containerRef.current) return
    setDragging(true)
    dragState.current = {
      startX: e.clientX,
      scrollLeft: containerRef.current.scrollLeft,
      isDown: true
    }
    // Some test environments (e.g., jsdom/happy-dom) may not implement pointer capture
    containerRef.current.setPointerCapture?.(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragState.current.isDown || !containerRef.current) return
    // Compute horizontal movement: measure how far the pointer has moved since the drag began
    const dx = e.clientX - dragState.current.startX
    // Shifts the scroll position relative to where the drag started
    containerRef.current.scrollLeft = dragState.current.scrollLeft - dx
  }
  const stopScroll = (e: React.PointerEvent) => {
    setDragging(false)
    if (!containerRef.current) return
    dragState.current.isDown = false
    containerRef.current.releasePointerCapture?.(e.pointerId)
  }

  const fixturesTrackDraggingClassName = `${dragging ? 'cursor-grabbing' : 'cursor-grab'}`

  return (
    <div
      className={`relative flex flex-col gap-4 w-full h-full ${className ?? ''}`}
      data-testid="fixtures-container"
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      {fixtures.length ? (
        <>
          <div className="absolute right-0 left-0 bottom-0 h-6 flex items-center justify-between">
            <button
              className="cursor-pointer text-[1rem]/[1rem] px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-40"
              disabled={currentIndex === 0}
              onClick={showPrevious}
              role="button"
            >
              ◀
            </button>
            <button
              className="cursor-pointer text-[1rem]/[1rem] px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-40"
              disabled={currentIndex >= fixtures.length - 1}
              onClick={showNext}
              role="button"
            >
              ▶
            </button>
          </div>
          <h2 className="flex-[0_0_40px] text-[1.25rem]/[2.5rem] text-center">
            {fixtures[0].competition.name}
          </h2>
        </>
      ) : null}
      <div
        className={classNames(
          'flex flex-1 items-center justify-between overflow-x-auto scroll-smooth snap-x snap-mandatory touch-pan-x select-none',
          fixturesTrackDraggingClassName
        )}
        data-testid="fixtures-track"
        onPointerDown={startScroll}
        onPointerLeave={stopScroll}
        onPointerMove={onPointerMove}
        onPointerUp={stopScroll}
        ref={containerRef}
        role="group"
      >
        {fixtures.length ? (
          <>
            {fixtures.map((fixture) => {
              const {
                // area,
                // competition,
                awayTeam,
                // group,
                homeTeam,
                id,
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
                  className="flex flex-col gap-4 h-full snap-start"
                  key={id}
                  style={{
                    width: `${cardWidthPercent}%`,
                    minWidth: `${cardWidthPercent}%`
                  }}
                >
                  <div className="flex flex-1 justify-between overflow-hidden">
                    <TeamBlock team={homeTeam} />
                    <span className="flex text-[1rem]/[1rem] self-center justify-center">
                      vs
                    </span>
                    <TeamBlock team={awayTeam} />
                  </div>
                  <>
                    {finished && (
                      <div className="flex flex-[0_0_16px] text-[1rem]/[1rem] justify-center">
                        FT
                      </div>
                    )}
                  </>
                  <div className="flex flex-[0_0_24px] justify-center">
                    <button
                      className="cursor-pointer text-[1rem]/[1rem] px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-40"
                      disabled={currentIndex >= fixtures.length - 1}
                      onClick={() => onSelect?.(fixture)}
                    >
                      Stats
                    </button>
                  </div>

                  {scheduled && status === MatchStatuses.TIMED && (
                    <span className="text-[1rem]/[1rem]">
                      {formatDateTime(utcDate)}
                    </span>
                  )}
                  {scheduled && status === MatchStatuses.SCHEDULED && (
                    <span className="text-[1rem]/[1rem]">{`(Pending to confirm) ${formatDateTime(utcDate)}`}</span>
                  )}
                  {playing && (
                    <span className="text-red-600 font-semibold animate-pulse">
                      LIVE
                    </span>
                  )}
                </div>
              )
            })}
          </>
        ) : (
          <span className="text-[1rem]/[1rem] w-full">
            No fixtures available
          </span>
        )}
      </div>
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
          alt={team.shortName}
          className="max-w-full max-h-full object-contain"
          data-testid={`${team.shortName}-crest`}
          loading="lazy"
          ref={crestRef}
          src={team.crest}
        />
      </div>
      <span className="flex flex-[0_0_24px] text-[0.875rem]/[0.875rem] justify-center items-center">
        {team.shortName}
      </span>
    </div>
  )
}

export default FixturesCarousel
