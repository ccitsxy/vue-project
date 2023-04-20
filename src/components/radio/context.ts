import type { WritableComputedRef, InjectionKey } from 'vue'

interface radioGroupContext {
  modelValue: WritableComputedRef<string | number | null | undefined> | undefined
  update: (value: string | number) => void
}

export const radioGroupContextKey = Symbol() as InjectionKey<radioGroupContext>
