export * from './react'

/** @deprecated For solving generic types */
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

export type Overwrite<T, U> = Remap<Omit<T, keyof U> & U>

export type MergeUnknown<T, U> = Remap<T & Omit<U, keyof T>>

export type MergeDefaults<T extends object, U extends Partial<T>> = Remap<
  Omit<T, keyof U> & Partial<Pick<T, Extract<keyof U, keyof T>>>
>

export type OneOrMore<T> = T | readonly T[]

export type Falsy = false | null | undefined

export type StaticProps<T> = Omit<T, keyof T & 'prototype'>

export interface UniformProps<T = any> {
  [key: string]: T
}

export interface UnknownProps extends UniformProps<unknown> {}

/** Use `[T] extends [Any]` to know if a type parameter is `any` */
export class Any {
  private _: never
}
