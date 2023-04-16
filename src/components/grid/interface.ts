import type { CSSProperties } from 'vue'
import { shallowRef } from 'vue'
import { useEventListener } from '@vueuse/core'

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

export const useSize = (width: number): Breakpoint => {
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
  const size = shallowRef(useSize(window === undefined ? 0 : window.innerWidth))
  const updateSize = () => {
    size.value = useSize(window === undefined ? 0 : window.innerWidth)
  }
  useEventListener('resize', updateSize)
  return size
}

export const useColSizeClass = (sizesVal: (ColSize | undefined)[]) => {
  const classes: string[] = []

  const sizes = ['xxl', 'xl', 'lg', 'sm', 'xs']

  sizesVal.forEach((element) => {
    const size = sizes[sizesVal.indexOf(element)]
    if (typeof element === 'number') {
      classes.push(`c-col-${size}-${element}`)
    } else if (typeof element === 'object') {
      classes.push(
        element.span ? `c-col-${size}-${element.span}` : '',
        element.order ? `c-col-${size}-order-${element.order}` : '',
        element.offset ? `c-col-${size}-offset-${element.offset}` : '',
        element.push ? `c-col-${size}-push-${element.push}` : '',
        element.pull ? `c-col-${size}-pull-${element.pull}` : ''
      )
    }
  })

  return classes
}

export function useGutterStyle(
  gutter: Gutter | [Gutter, Gutter] | undefined,
  currentSize: Breakpoint,
  direction: 'row' | 'col'
) {
  const style: CSSProperties = {}

  const setPaddingX = (gutter: number | undefined) => {
    if (gutter !== undefined) {
      if (direction === 'row') {
        style.paddingInlineStart = style.paddingInlineEnd = `${gutter / -2}px`
      } else if (direction === 'col') {
        style.paddingInlineStart = style.paddingInlineEnd = `${gutter / 2}px`
      }
    }
  }

  const setPaddingY = (gutter: number | undefined) => {
    if (gutter !== undefined) {
      if (direction === 'row') {
        style.paddingTop = style.paddingBottom = `${gutter / -2}px`
      } else if (direction === 'col') {
        style.paddingTop = style.paddingBottom = `${gutter / 2}px`
      }
    }
  }

  if (typeof gutter === 'number') {
    setPaddingX(gutter)
  }

  if (!Array.isArray(gutter) && typeof gutter === 'object') {
    setPaddingX(gutter[currentSize])
  }

  if (Array.isArray(gutter)) {
    const [gutterX, gutterY] = gutter
    if (typeof gutterX === 'number') {
      setPaddingX(gutterX)
    } else if (typeof gutterX === 'object') {
      setPaddingX(gutterX[currentSize])
    }
    if (typeof gutterY === 'number') {
      setPaddingY(gutterY)
    } else if (typeof gutterY === 'object') {
      setPaddingX(gutterY[currentSize])
    }
  }

  return style
}
