/** Try to simplify `&` out of an object type */
export type Remap<T> = {} & {
  [P in keyof Extract<T, object>]: Extract<T, object>[P]
}

export type LoosePick<T, K> = {} & Pick<T, K & keyof T>

export type LooseAccess<T, K> = K extends keyof T ? T[K] : never

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

// https://github.com/microsoft/TypeScript/issues/14829#issuecomment-504042546
export type NoInfer<T> = [T][T extends any ? 0 : never]

export type StaticProps<T> = Omit<T, keyof T & 'prototype'>

export interface Lookup<T = any> {
  [key: string]: T
}

/** Intersected with other object types to allow for unknown properties */
export interface UnknownProps extends Lookup<unknown> {}

/** Use `[T] extends [Any]` to know if a type parameter is `any` */
export class Any {
  private _: never
}

export type AnyFn<In extends ReadonlyArray<any> = any[], Out = any> = (
  ...args: In
) => Out

/** Ensure the given type is an object type */
export type ObjectType<T> = T extends object ? T : {}

/** Pick keys from a union of objects */
export type UnionPick<T, K> = Pick<
  T extends any
    ? Intersect<K extends keyof T ? T : { [P in K & keyof any]?: undefined }>
    : never,
  // @ts-ignore
  K
> extends infer Result
  ? Result & object
  : never

export type StringKeys<T> = string & keyof T

/** Get the keys of each object type in a given union */
export type AllKeys<T> = T extends any ? keyof T : never

/** Merge all object types in a given union. Property types are unioned. */
// export type CombineObjects<T> = UnionPick<T, AllKeys<T>>
export type CombineObjects<T> = UnionPick<T, AllKeys<T>> extends infer Result
  ? Result & object
  : never

/**
 * Given a union of object types, find which ones contain the given
 * property and merge their types with a union.
 */
export type CombineProp<T, P extends string> = T extends any
  ? P extends keyof T
    ? T[P]
    : never
  : never

/** Convert a union to an intersection */
export type Intersect<U> = (U extends any
? (k: U) => void
: never) extends (k: infer I) => void
  ? I
  : never

export type Exclusive<T> = AllKeys<T> extends infer K
  ? T extends any
    ? Remap<
        LoosePick<T, K> & { [P in Exclude<K & keyof any, keyof T>]?: undefined }
      >
    : never
  : never

/** An object that needs to be manually disposed of */
export interface Disposable {
  dispose(): void
}
