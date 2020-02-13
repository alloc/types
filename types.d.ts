export * from './react'

/** For solving generic types */
export type Solve<T> = T

/** Try to simplify `&` out of an object type */
export type Remap<T> = {} & {
  [P in keyof T]: T[P]
}

export type Pick<T, K extends keyof T> = {} & {
  [P in K]: T[P]
}

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

export type Partial<T> = {} & {
  [P in keyof T]?: T[P] | undefined
}

export type Overwrite<T, U> = Solve<U & Omit<T, keyof U>>

export type MergeUnknown<T, U> = Solve<T & Omit<U, keyof T>>

export type MergeDefaults<T extends object, U extends Partial<T>> = Remap<
  Pick<T, Exclude<keyof T, keyof U>> &
    Partial<Pick<T, Extract<keyof U, keyof T>>>
>
