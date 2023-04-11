import type { ComputedRef, InjectionKey } from 'vue'

interface radioGroupContext {
  modelValue: ComputedRef<string | number>
}

export const radioGroupContextKey = Symbol() as InjectionKey<radioGroupContext>
