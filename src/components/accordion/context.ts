import type { WritableComputedRef, ComputedRef, InjectionKey } from 'vue'

interface accordionContext {
  modelValue: WritableComputedRef<string | string[] | null | undefined> | undefined
  disabled: ComputedRef<boolean> | undefined
}

export const accordionContextKey = Symbol() as InjectionKey<accordionContext>
