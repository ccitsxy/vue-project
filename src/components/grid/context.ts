import type { ComputedRef, InjectionKey } from 'vue'
import type { Gutter } from './interface'

interface rowContext {
  gutter: ComputedRef<Gutter | [Gutter, Gutter] | undefined>
}

export const rowContextKey = Symbol() as InjectionKey<rowContext>
