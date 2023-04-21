import type { WritableComputedRef, InjectionKey } from 'vue'

interface checkboxGroupContext {
  modelValue: WritableComputedRef<(boolean | string | number)[] | undefined> | undefined
  add: (value: boolean | string | number) => void
  remove: (value: boolean | string | number) => void
}

export const checkboxGroupContextKey = Symbol() as InjectionKey<checkboxGroupContext>
