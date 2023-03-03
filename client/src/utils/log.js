const isDevEnv = process.env.NODE_ENV === "development";

export const dev = {
  log: (...message) => { isDevEnv && console.log(...message) },
  error: (...message) => { isDevEnv && console.error(...message) }
}