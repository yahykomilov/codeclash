/**
 * Socket.io event names shared by server and web.
 * C2S = client → server, S2C = server → client.
 */
export const C2S = {
  HOST_CREATE: "host:create",
  HOST_GENERATE_QUIZ: "host:generateQuiz",
  HOST_START: "host:start",
  HOST_NEXT: "host:next",
  HOST_SKIP: "host:skip",
  HOST_KICK: "host:kick",
  HOST_PAUSE: "host:pause",
  HOST_RESUME: "host:resume",
  PLAYER_JOIN: "player:join",
  PLAYER_ANSWER: "player:answer",
} as const

export const S2C = {
  // Room / lobby
  GAME_CREATED: "game:created",
  PLAYERS: "game:players",
  PLAYER_JOINED: "game:playerJoined",
  // Flow
  STARTED: "game:started",
  QUESTION: "game:question",
  PAUSED: "game:paused",
  RESUMED: "game:resumed",
  ANSWER_COUNT: "game:answerCount",
  REVEAL: "game:reveal",
  LEADERBOARD: "game:leaderboard",
  FINISHED: "game:finished",
  // Player-directed
  JOINED: "player:joined",
  PLAYER_RESULT: "player:result",
  KICKED: "player:kicked",
  // Errors
  ERROR: "game:error",
} as const

export type C2SEvent = (typeof C2S)[keyof typeof C2S]
export type S2CEvent = (typeof S2C)[keyof typeof S2C]
