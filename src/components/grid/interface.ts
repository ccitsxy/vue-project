import type { CSSProperties } from 'vue'
import { shallowRef } from 'vue'
import { useEventListener } from '@vueuse/core'
import { isNumber, isObject, isArray, isClient, isUndefined } from '@/utils'

export type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'

export type Gutter = number | Partial<Record<Breakpoint, number>>

export interface ColSizeObject {
  span?: number
  order?: number
  offset?: number
  push?: number
  pull?: number
}

export type ColSize = number | ColSizeObject

export const calSize = (width: number): Breakpoint => {
  switch (true) {
    case width < 640:
      return 'xs'
    case width < 768:
      return 'sm'
    case width < 1024:
      return 'md'
    case width < 1280:
      return 'lg'
    case width < 1536:
      return 'xl'
    default:
      return 'xxl'
  }
}

export const useRowSize = () => {
  const size = shallowRef(calSize(isClient ? window.innerWidth : 0))
  const updateSize = () => {
    size.value = calSize(isClient ? window.innerWidth : 0)
  }
  useEventListener('resize', updateSize)
  return size
}

export const calColSizeClass = (sizesVal: (ColSize | undefined)[]) => {
  const classes: string[] = []

  const sizes = ['xxl', 'xl', 'lg', 'sm', 'xs']

  sizesVal.forEach((e) => {
    const size = sizes[sizesVal.indexOf(e)]
    if (isNumber(e)) {
      classes.push(`semi-col-${size}-${e}`)
    } else if (isObject(e)) {
      classes.push(
        e.span ? `semi-col-${size}-${e.span}` : '',
        e.order ? `semi-col-${size}-order-${e.order}` : '',
        e.offset ? `semi-col-${size}-offset-${e.offset}` : '',
        e.push ? `semi-col-${size}-push-${e.push}` : '',
        e.pull ? `semi-col-${size}-pull-${e.pull}` : ''
      )
    }
  })

  return classes
}

export function calGutterStyle(
  gutter: Gutter | [Gutter, Gutter] | undefined,
  currentSize: Breakpoint,
  direction: 'row' | 'col'
) {
  const style: CSSProperties = {}

  const setPaddingX = (gutter: number | undefined) => {
    if (!isUndefined(gutter)) {
      if (direction === 'row') {
        style.paddingInlineStart = style.paddingInlineEnd = `${gutter / -2}px`
      } else if (direction === 'col') {
        style.paddingInlineStart = style.paddingInlineEnd = `${gutter / 2}px`
      }
    }
  }

  const setPaddingY = (gutter: number | undefined) => {
    if (!isUndefined(gutter)) {
      if (direction === 'row') {
        style.paddingTop = style.paddingBottom = `${gutter / -2}px`
      } else if (direction === 'col') {
        style.paddingTop = style.paddingBottom = `${gutter / 2}px`
      }
    }
  }

  if (isNumber(gutter)) {
    setPaddingX(gutter)
  }

  if (!isArray(gutter) && isObject(gutter)) {
    setPaddingX(gutter[currentSize])
  }

  if (isArray(gutter)) {
    const [gutterX, gutterY] = gutter
    if (isNumber(gutterX)) {
      setPaddingX(gutterX)
    } else if (isObject(gutterX)) {
      setPaddingX(gutterX[currentSize])
    }
    if (isNumber(gutterY)) {
      setPaddingY(gutterY)
    } else if (isObject(gutterY)) {
      setPaddingX(gutterY[currentSize])
    }
  }

  return style
}
