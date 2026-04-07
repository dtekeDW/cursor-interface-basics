import type { H3Event } from 'h3'
import { createError, defineEventHandler, getQuery } from 'h3'

export class ApiBuilderError extends Error {
  code: string
  statusCode: number

  constructor(code: string, message: string, statusCode = 400) {
    super(message)
    this.code = code
    this.statusCode = statusCode
  }
}

export const withApiBuilder = <T>(handler: (event: H3Event) => Promise<T> | T) => {
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

export const getStringQuery = (event: H3Event, key: string) => {
  const query = getQuery(event)
  const value = query[key]

  if (typeof value !== 'string' || !value.trim())
    throw new ApiBuilderError('BAD_REQUEST', `Missing or invalid query param: ${key}`, 400)

  return value.trim()
}

export const getNumberQuery = (event: H3Event, key: string, options?: { min?: number, max?: number }) => {
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

export const getOptionalNumberQuery = (event: H3Event, key: string, fallback: number, options?: { min?: number, max?: number }) => {
  const query = getQuery(event)
  const value = query[key]

  if (value === undefined)
    return fallback

  return getNumberQuery(event, key, options)
}
