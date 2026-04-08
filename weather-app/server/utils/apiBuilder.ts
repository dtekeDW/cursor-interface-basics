import type { H3Event } from 'h3'
import { createError, defineEventHandler, getQuery } from 'h3'

/**
 * Domain error used by server handlers to return client-safe error payloads.
 *
 * Use this when an input or business rule fails and should be surfaced as a
 * structured API response with a deterministic `statusCode` and `code`.
 *
 * @example
 * ```ts
 * throw new ApiBuilderError('BAD_REQUEST', 'lat is required', 400)
 * ```
 */
export class ApiBuilderError extends Error {
  code: string
  statusCode: number

  constructor(code: string, message: string, statusCode = 400) {
    super(message)
    this.code = code
    this.statusCode = statusCode
  }
}

/**
 * Wraps an H3 handler with shared error normalization.
 *
 * - `ApiBuilderError` is mapped to its declared status code and machine code.
 * - Unknown errors are mapped to a generic `UPSTREAM_ERROR` (502), so internal
 *   implementation details are not leaked to clients.
 *
 * @param handler Business handler that returns endpoint payload.
 * @returns A Nuxt/Nitro event handler with consistent error responses.
 *
 * @example
 * ```ts
 * export default withApiBuilder(async (event) => {
 *   const q = getStringQuery(event, 'q')
 *   return { query: q }
 * })
 * ```
 */
export function withApiBuilder<T>(handler: (event: H3Event) => Promise<T> | T) {
  return defineEventHandler(async (event) => {
    try {
      return await handler(event)
    }
    catch (error) {
      if (error instanceof ApiBuilderError) {
        throw createError({
          statusCode: error.statusCode,
          statusMessage: error.code,
          data: {
            error: {
              code: error.code,
              message: error.message,
            },
            status: error.statusCode,
          },
        })
      }

      throw createError({
        statusCode: 502,
        statusMessage: 'UPSTREAM_ERROR',
        data: {
          error: {
            code: 'UPSTREAM_ERROR',
            message: 'Weather provider request failed.',
          },
          status: 502,
        },
      })
    }
  })
}

/**
 * Reads a required string query parameter and validates it.
 *
 * @param event Incoming H3 event.
 * @param key Query parameter key.
 * @returns Trimmed string value.
 * @throws ApiBuilderError When value is missing, empty, or not a string.
 *
 * @example
 * ```ts
 * const timezone = getStringQuery(event, 'tz')
 * ```
 */
export function getStringQuery(event: H3Event, key: string) {
  const query = getQuery(event)
  const value = query[key]

  if (typeof value !== 'string' || !value.trim())
    throw new ApiBuilderError('BAD_REQUEST', `Missing or invalid query param: ${key}`, 400)

  return value.trim()
}

/**
 * Reads a required numeric query parameter with optional min/max checks.
 *
 * @param event Incoming H3 event.
 * @param key Query parameter key.
 * @param options Optional numeric bounds.
 * @returns Parsed finite number.
 * @throws ApiBuilderError When value is not numeric or outside allowed range.
 *
 * @example
 * ```ts
 * const lat = getNumberQuery(event, 'lat', { min: -90, max: 90 })
 * ```
 */
export function getNumberQuery(event: H3Event, key: string, options?: { min?: number, max?: number }) {
  const rawValue = getStringQuery(event, key)
  const numericValue = Number(rawValue)

  if (!Number.isFinite(numericValue))
    throw new ApiBuilderError('BAD_REQUEST', `Query param ${key} must be a number`, 400)

  if (typeof options?.min === 'number' && numericValue < options.min)
    throw new ApiBuilderError('BAD_REQUEST', `Query param ${key} must be >= ${options.min}`, 400)

  if (typeof options?.max === 'number' && numericValue > options.max)
    throw new ApiBuilderError('BAD_REQUEST', `Query param ${key} must be <= ${options.max}`, 400)

  return numericValue
}

/**
 * Reads an optional numeric query parameter and returns a fallback when missing.
 *
 * @param event Incoming H3 event.
 * @param key Query parameter key.
 * @param fallback Value to return when parameter is absent.
 * @param options Optional numeric bounds used when param is present.
 * @returns Parsed number or fallback.
 *
 * @example
 * ```ts
 * const hours = getOptionalNumberQuery(event, 'hours', 24, { min: 24, max: 48 })
 * ```
 */
export function getOptionalNumberQuery(event: H3Event, key: string, fallback: number, options?: { min?: number, max?: number }) {
  const query = getQuery(event)
  const value = query[key]

  if (value === undefined)
    return fallback

  return getNumberQuery(event, key, options)
}
