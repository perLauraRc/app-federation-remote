export type PartialScore = {
  away: number | null
  home: number | null
}

export type Score = {
  duration: string
  extraTime?: PartialScore
  fullTime: PartialScore
  halfTime: PartialScore
  penalties?: PartialScore
  regularTime?: PartialScore
  winner: string | null
}
