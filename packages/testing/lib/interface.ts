type Cons<H, T> = T extends readonly any[]
  ? ((h: H, ...t: T) => void) extends (...r: infer R) => void
    ? R
    : never
  : never;
type Tail<T extends readonly any[]> = ((...t: T) => void) extends (
  h: any,
  ...r: infer R
) => void
  ? R
  : never;
type Head<T extends readonly any[]> = T[0];

export type ExcludeFromTuple<
  T extends readonly any[],
  E
> = T['length'] extends 0
  ? []
  : X0<Tail<T>, E> extends infer X
  ? Head<T> extends E
    ? X
    : Cons<Head<T>, X>
  : never;
type X0<T extends readonly any[], E> = T['length'] extends 0
  ? []
  : X1<Tail<T>, E> extends infer X
  ? Head<T> extends E
    ? X
    : Cons<Head<T>, X>
  : never;
type X1<T extends readonly any[], E> = T['length'] extends 0
  ? []
  : X2<Tail<T>, E> extends infer X
  ? Head<T> extends E
    ? X
    : Cons<Head<T>, X>
  : never;
type X2<T extends readonly any[], E> = T['length'] extends 0
  ? []
  : X3<Tail<T>, E> extends infer X
  ? Head<T> extends E
    ? X
    : Cons<Head<T>, X>
  : never;
type X3<T extends readonly any[], E> = T['length'] extends 0
  ? []
  : X4<Tail<T>, E> extends infer X
  ? Head<T> extends E
    ? X
    : Cons<Head<T>, X>
  : never;
type X4<T extends readonly any[], E> = T['length'] extends 0
  ? []
  : X5<Tail<T>, E> extends infer X
  ? Head<T> extends E
    ? X
    : Cons<Head<T>, X>
  : never;
type X5<T extends readonly any[], E> = T['length'] extends 0
  ? []
  : X6<Tail<T>, E> extends infer X
  ? Head<T> extends E
    ? X
    : Cons<Head<T>, X>
  : never;
type X6<T extends readonly any[], E> = T['length'] extends 0
  ? []
  : X7<Tail<T>, E> extends infer X
  ? Head<T> extends E
    ? X
    : Cons<Head<T>, X>
  : never;
type X7<T extends readonly any[], E> = T['length'] extends 0
  ? []
  : X8<Tail<T>, E> extends infer X
  ? Head<T> extends E
    ? X
    : Cons<Head<T>, X>
  : never;
type X8<T extends readonly any[], E> = T['length'] extends 0
  ? []
  : X9<Tail<T>, E> extends infer X
  ? Head<T> extends E
    ? X
    : Cons<Head<T>, X>
  : never;
type X9<T extends readonly any[], E> = T['length'] extends 0
  ? []
  : XA<Tail<T>, E> extends infer X
  ? Head<T> extends E
    ? X
    : Cons<Head<T>, X>
  : never;
type XA<T extends readonly any[], E> = T['length'] extends 0
  ? []
  : XB<Tail<T>, E> extends infer X
  ? Head<T> extends E
    ? X
    : Cons<Head<T>, X>
  : never;
type XB<T extends readonly any[], E> = T['length'] extends 0
  ? []
  : XC<Tail<T>, E> extends infer X
  ? Head<T> extends E
    ? X
    : Cons<Head<T>, X>
  : never;
type XC<T extends readonly any[], E> = T['length'] extends 0
  ? []
  : XD<Tail<T>, E> extends infer X
  ? Head<T> extends E
    ? X
    : Cons<Head<T>, X>
  : never;
type XD<T extends readonly any[], E> = T['length'] extends 0
  ? []
  : XE<Tail<T>, E> extends infer X
  ? Head<T> extends E
    ? X
    : Cons<Head<T>, X>
  : never;
type XE<T extends readonly any[], E> = T;
