/**
 * Client
 **/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types; // general types
import $Public = runtime.Types.Public;
import $Utils = runtime.Types.Utils;
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;

export type PrismaPromise<T> = $Public.PrismaPromise<T>;

/**
 * Model Order
 *
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>;
/**
 * Model OrderItem
 *
 */
export type OrderItem = $Result.DefaultSelection<Prisma.$OrderItemPayload>;
/**
 * Model Payment
 *
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>;
/**
 * Model Shipment
 *
 */
export type Shipment = $Result.DefaultSelection<Prisma.$ShipmentPayload>;
/**
 * Model OrderEvent
 *
 */
export type OrderEvent = $Result.DefaultSelection<Prisma.$OrderEventPayload>;
/**
 * Model OutboxMessage
 *
 */
export type OutboxMessage = $Result.DefaultSelection<Prisma.$OutboxMessagePayload>;

/**
 * Enums
 */
export namespace $Enums {
  export const OrderStatus: {
    PENDING: 'PENDING';
    PAYMENT_PENDING: 'PAYMENT_PENDING';
    PAID: 'PAID';
    PROCESSING: 'PROCESSING';
    SHIPPED: 'SHIPPED';
    DELIVERED: 'DELIVERED';
    CANCELLED: 'CANCELLED';
    REFUNDED: 'REFUNDED';
  };

  export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

  export const ItemStatus: {
    PENDING: 'PENDING';
    PROCESSING: 'PROCESSING';
    SHIPPED: 'SHIPPED';
    DELIVERED: 'DELIVERED';
    CANCELLED: 'CANCELLED';
    REFUNDED: 'REFUNDED';
  };

  export type ItemStatus = (typeof ItemStatus)[keyof typeof ItemStatus];

  export const PaymentProvider: {
    STRIPE: 'STRIPE';
    PAYPAL: 'PAYPAL';
    WALLET: 'WALLET';
  };

  export type PaymentProvider = (typeof PaymentProvider)[keyof typeof PaymentProvider];

  export const PaymentStatus: {
    PENDING: 'PENDING';
    PROCESSING: 'PROCESSING';
    SUCCEEDED: 'SUCCEEDED';
    FAILED: 'FAILED';
    REFUNDED: 'REFUNDED';
    PARTIALLY_REFUNDED: 'PARTIALLY_REFUNDED';
  };

  export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

  export const ShipmentStatus: {
    PENDING: 'PENDING';
    PROCESSING: 'PROCESSING';
    SHIPPED: 'SHIPPED';
    IN_TRANSIT: 'IN_TRANSIT';
    OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY';
    DELIVERED: 'DELIVERED';
    FAILED: 'FAILED';
  };

  export type ShipmentStatus = (typeof ShipmentStatus)[keyof typeof ShipmentStatus];

  export const OutboxStatus: {
    PENDING: 'PENDING';
    PROCESSED: 'PROCESSED';
    FAILED: 'FAILED';
  };

  export type OutboxStatus = (typeof OutboxStatus)[keyof typeof OutboxStatus];
}

export type OrderStatus = $Enums.OrderStatus;

export const OrderStatus: typeof $Enums.OrderStatus;

export type ItemStatus = $Enums.ItemStatus;

export const ItemStatus: typeof $Enums.ItemStatus;

export type PaymentProvider = $Enums.PaymentProvider;

export const PaymentProvider: typeof $Enums.PaymentProvider;

export type PaymentStatus = $Enums.PaymentStatus;

export const PaymentStatus: typeof $Enums.PaymentStatus;

export type ShipmentStatus = $Enums.ShipmentStatus;

export const ShipmentStatus: typeof $Enums.ShipmentStatus;

export type OutboxStatus = $Enums.OutboxStatus;

export const OutboxStatus: typeof $Enums.OutboxStatus;

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Orders
 * const orders = await prisma.order.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions
    ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<ClientOptions['log']>
      : never
    : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] };

  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Orders
   * const orders = await prisma.order.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(
    eventType: V,
    callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void,
  ): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void;

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(
    arg: [...P],
    options?: { isolationLevel?: Prisma.TransactionIsolationLevel },
  ): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;

  $transaction<R>(
    fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    },
  ): $Utils.JsPromise<R>;

  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Orders
   * const orders = await prisma.order.findMany()
   * ```
   */
  get order(): Prisma.OrderDelegate<ExtArgs>;

  /**
   * `prisma.orderItem`: Exposes CRUD operations for the **OrderItem** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more OrderItems
   * const orderItems = await prisma.orderItem.findMany()
   * ```
   */
  get orderItem(): Prisma.OrderItemDelegate<ExtArgs>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Payments
   * const payments = await prisma.payment.findMany()
   * ```
   */
  get payment(): Prisma.PaymentDelegate<ExtArgs>;

  /**
   * `prisma.shipment`: Exposes CRUD operations for the **Shipment** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Shipments
   * const shipments = await prisma.shipment.findMany()
   * ```
   */
  get shipment(): Prisma.ShipmentDelegate<ExtArgs>;

  /**
   * `prisma.orderEvent`: Exposes CRUD operations for the **OrderEvent** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more OrderEvents
   * const orderEvents = await prisma.orderEvent.findMany()
   * ```
   */
  get orderEvent(): Prisma.OrderEventDelegate<ExtArgs>;

  /**
   * `prisma.outboxMessage`: Exposes CRUD operations for the **OutboxMessage** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more OutboxMessages
   * const outboxMessages = await prisma.outboxMessage.findMany()
   * ```
   */
  get outboxMessage(): Prisma.OutboxMessageDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF;

  export type PrismaPromise<T> = $Public.PrismaPromise<T>;

  /**
   * Validator
   */
  export import validator = runtime.Public.validator;

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
  export import PrismaClientValidationError = runtime.PrismaClientValidationError;
  export import NotFoundError = runtime.NotFoundError;

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag;
  export import empty = runtime.empty;
  export import join = runtime.join;
  export import raw = runtime.raw;
  export import Sql = runtime.Sql;

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal;

  export type DecimalJsLike = runtime.DecimalJsLike;

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics;
  export type Metric<T> = runtime.Metric<T>;
  export type MetricHistogram = runtime.MetricHistogram;
  export type MetricHistogramBucket = runtime.MetricHistogramBucket;

  /**
   * Extensions
   */
  export import Extension = $Extensions.UserArgs;
  export import getExtensionContext = runtime.Extensions.getExtensionContext;
  export import Args = $Public.Args;
  export import Payload = $Public.Payload;
  export import Result = $Public.Result;
  export import Exact = $Public.Exact;

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string;
  };

  export const prismaVersion: PrismaVersion;

  /**
   * Utility Types
   */

  export import JsonObject = runtime.JsonObject;
  export import JsonArray = runtime.JsonArray;
  export import JsonValue = runtime.JsonValue;
  export import InputJsonObject = runtime.InputJsonObject;
  export import InputJsonArray = runtime.InputJsonArray;
  export import InputJsonValue = runtime.InputJsonValue;

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
     * Type of `Prisma.DbNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class DbNull {
      private DbNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.JsonNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class JsonNull {
      private JsonNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.AnyNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class AnyNull {
      private AnyNull: never;
      private constructor();
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull;

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull;

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull;

  type SelectAndInclude = {
    select: any;
    include: any;
  };

  type SelectAndOmit = {
    select: any;
    omit: any;
  };

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<
    ReturnType<T>
  >;

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
  }[keyof T];

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K;
  };

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & (T extends SelectAndInclude
    ? 'Please either choose `select` or `include`.'
    : T extends SelectAndOmit
      ? 'Please either choose `select` or `omit`.'
      : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & K;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T extends object
    ? U extends object
      ? (Without<T, U> & U) | (Without<U, T> & T)
      : U
    : T;

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> =
    T extends Array<any>
      ? False
      : T extends Date
        ? False
        : T extends Uint8Array
          ? False
          : T extends BigInt
            ? False
            : T extends object
              ? True
              : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
    }[K];

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;

  type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
  }[strict];

  type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown
    ? _Either<O, K, strict>
    : never;

  export type Union = any;

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
  } & {};

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (
    k: infer I,
  ) => void
    ? I
    : never;

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>;
      }
    >
  >;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function
    ? A
    : {
        [K in keyof A]: A[K];
      } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
      ?
          | (K extends keyof O ? { [P in K]: O[P] } & O : O)
          | ({ [P in keyof O as P extends K ? K : never]-?: O[P] } & O)
      : never
  >;

  type _Strict<U, _U = U> = U extends unknown
    ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
    : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False;

  // /**
  // 1
  // */
  export type True = 1;

  /**
  0
  */
  export type False = 0;

  export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
      ? 1
      : 0;

  export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never;
      }
    : never;

  type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> =
    IsObject<T> extends True ? U : T;

  type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
        ? never
        : K;
  }[keyof T];

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<
    T,
    MaybeTupleToUnion<K>
  >;

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;

  type FieldRefInputType<Model, FieldType> = Model extends never
    ? never
    : FieldRef<Model, FieldType>;

  export const ModelName: {
    Order: 'Order';
    OrderItem: 'OrderItem';
    Payment: 'Payment';
    Shipment: 'Shipment';
    OrderEvent: 'OrderEvent';
    OutboxMessage: 'OutboxMessage';
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName];

  export type Datasources = {
    db?: Datasource;
  };

  interface TypeMapCb extends $Utils.Fn<
    { extArgs: $Extensions.InternalArgs; clientOptions: PrismaClientOptions },
    $Utils.Record<string, any>
  > {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>;
  }

  export type TypeMap<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    ClientOptions = {},
  > = {
    meta: {
      modelProps: 'order' | 'orderItem' | 'payment' | 'shipment' | 'orderEvent' | 'outboxMessage';
      txIsolationLevel: Prisma.TransactionIsolationLevel;
    };
    model: {
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>;
        fields: Prisma.OrderFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>;
          };
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>;
          };
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[];
          };
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>;
          };
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.OrderCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[];
          };
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>;
          };
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>;
          };
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>;
          };
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateOrder>;
          };
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>;
            result: $Utils.Optional<OrderGroupByOutputType>[];
          };
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>;
            result: $Utils.Optional<OrderCountAggregateOutputType> | number;
          };
        };
      };
      OrderItem: {
        payload: Prisma.$OrderItemPayload<ExtArgs>;
        fields: Prisma.OrderItemFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.OrderItemFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.OrderItemFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>;
          };
          findFirst: {
            args: Prisma.OrderItemFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.OrderItemFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>;
          };
          findMany: {
            args: Prisma.OrderItemFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[];
          };
          create: {
            args: Prisma.OrderItemCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>;
          };
          createMany: {
            args: Prisma.OrderItemCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.OrderItemCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[];
          };
          delete: {
            args: Prisma.OrderItemDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>;
          };
          update: {
            args: Prisma.OrderItemUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>;
          };
          deleteMany: {
            args: Prisma.OrderItemDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.OrderItemUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.OrderItemUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>;
          };
          aggregate: {
            args: Prisma.OrderItemAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateOrderItem>;
          };
          groupBy: {
            args: Prisma.OrderItemGroupByArgs<ExtArgs>;
            result: $Utils.Optional<OrderItemGroupByOutputType>[];
          };
          count: {
            args: Prisma.OrderItemCountArgs<ExtArgs>;
            result: $Utils.Optional<OrderItemCountAggregateOutputType> | number;
          };
        };
      };
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>;
        fields: Prisma.PaymentFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>;
          };
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>;
          };
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[];
          };
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>;
          };
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[];
          };
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>;
          };
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>;
          };
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>;
          };
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregatePayment>;
          };
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>;
            result: $Utils.Optional<PaymentGroupByOutputType>[];
          };
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>;
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number;
          };
        };
      };
      Shipment: {
        payload: Prisma.$ShipmentPayload<ExtArgs>;
        fields: Prisma.ShipmentFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ShipmentFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ShipmentFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>;
          };
          findFirst: {
            args: Prisma.ShipmentFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ShipmentFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>;
          };
          findMany: {
            args: Prisma.ShipmentFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>[];
          };
          create: {
            args: Prisma.ShipmentCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>;
          };
          createMany: {
            args: Prisma.ShipmentCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ShipmentCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>[];
          };
          delete: {
            args: Prisma.ShipmentDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>;
          };
          update: {
            args: Prisma.ShipmentUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>;
          };
          deleteMany: {
            args: Prisma.ShipmentDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ShipmentUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.ShipmentUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>;
          };
          aggregate: {
            args: Prisma.ShipmentAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateShipment>;
          };
          groupBy: {
            args: Prisma.ShipmentGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ShipmentGroupByOutputType>[];
          };
          count: {
            args: Prisma.ShipmentCountArgs<ExtArgs>;
            result: $Utils.Optional<ShipmentCountAggregateOutputType> | number;
          };
        };
      };
      OrderEvent: {
        payload: Prisma.$OrderEventPayload<ExtArgs>;
        fields: Prisma.OrderEventFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.OrderEventFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderEventPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.OrderEventFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderEventPayload>;
          };
          findFirst: {
            args: Prisma.OrderEventFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderEventPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.OrderEventFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderEventPayload>;
          };
          findMany: {
            args: Prisma.OrderEventFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderEventPayload>[];
          };
          create: {
            args: Prisma.OrderEventCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderEventPayload>;
          };
          createMany: {
            args: Prisma.OrderEventCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.OrderEventCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderEventPayload>[];
          };
          delete: {
            args: Prisma.OrderEventDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderEventPayload>;
          };
          update: {
            args: Prisma.OrderEventUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderEventPayload>;
          };
          deleteMany: {
            args: Prisma.OrderEventDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.OrderEventUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.OrderEventUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderEventPayload>;
          };
          aggregate: {
            args: Prisma.OrderEventAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateOrderEvent>;
          };
          groupBy: {
            args: Prisma.OrderEventGroupByArgs<ExtArgs>;
            result: $Utils.Optional<OrderEventGroupByOutputType>[];
          };
          count: {
            args: Prisma.OrderEventCountArgs<ExtArgs>;
            result: $Utils.Optional<OrderEventCountAggregateOutputType> | number;
          };
        };
      };
      OutboxMessage: {
        payload: Prisma.$OutboxMessagePayload<ExtArgs>;
        fields: Prisma.OutboxMessageFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.OutboxMessageFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OutboxMessagePayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.OutboxMessageFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OutboxMessagePayload>;
          };
          findFirst: {
            args: Prisma.OutboxMessageFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OutboxMessagePayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.OutboxMessageFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OutboxMessagePayload>;
          };
          findMany: {
            args: Prisma.OutboxMessageFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OutboxMessagePayload>[];
          };
          create: {
            args: Prisma.OutboxMessageCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OutboxMessagePayload>;
          };
          createMany: {
            args: Prisma.OutboxMessageCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.OutboxMessageCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OutboxMessagePayload>[];
          };
          delete: {
            args: Prisma.OutboxMessageDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OutboxMessagePayload>;
          };
          update: {
            args: Prisma.OutboxMessageUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OutboxMessagePayload>;
          };
          deleteMany: {
            args: Prisma.OutboxMessageDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.OutboxMessageUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.OutboxMessageUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OutboxMessagePayload>;
          };
          aggregate: {
            args: Prisma.OutboxMessageAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateOutboxMessage>;
          };
          groupBy: {
            args: Prisma.OutboxMessageGroupByArgs<ExtArgs>;
            result: $Utils.Optional<OutboxMessageGroupByOutputType>[];
          };
          count: {
            args: Prisma.OutboxMessageCountArgs<ExtArgs>;
            result: $Utils.Optional<OutboxMessageCountAggregateOutputType> | number;
          };
        };
      };
    };
  } & {
    other: {
      payload: any;
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
      };
    };
  };
  export const defineExtension: $Extensions.ExtendsHook<
    'define',
    Prisma.TypeMapCb,
    $Extensions.DefaultArgs
  >;
  export type DefaultPrismaClient = PrismaClient;
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources;
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string;
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    };
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error';
  export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
  };

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition
    ? T['emit'] extends 'event'
      ? T['level']
      : never
    : never;
  export type GetEvents<T extends any> =
    T extends Array<LogLevel | LogDefinition>
      ? GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
      : never;

  export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  };

  export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
  };
  /* End Types for Logging */

  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy';

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName;
    action: PrismaAction;
    args: any;
    dataPath: string[];
    runInTransaction: boolean;
  };

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>;

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>;

  export type Datasource = {
    url?: string;
  };

  /**
   * Count Types
   */

  /**
   * Count Type OrderCountOutputType
   */

  export type OrderCountOutputType = {
    items: number;
    payments: number;
    shipments: number;
    timeline: number;
  };

  export type OrderCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    items?: boolean | OrderCountOutputTypeCountItemsArgs;
    payments?: boolean | OrderCountOutputTypeCountPaymentsArgs;
    shipments?: boolean | OrderCountOutputTypeCountShipmentsArgs;
    timeline?: boolean | OrderCountOutputTypeCountTimelineArgs;
  };

  // Custom InputTypes
  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderCountOutputType
     */
    select?: OrderCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountItemsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: OrderItemWhereInput;
  };

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountPaymentsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: PaymentWhereInput;
  };

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountShipmentsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ShipmentWhereInput;
  };

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountTimelineArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: OrderEventWhereInput;
  };

  /**
   * Models
   */

  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null;
    _avg: OrderAvgAggregateOutputType | null;
    _sum: OrderSumAggregateOutputType | null;
    _min: OrderMinAggregateOutputType | null;
    _max: OrderMaxAggregateOutputType | null;
  };

  export type OrderAvgAggregateOutputType = {
    subtotal: Decimal | null;
    shipping: Decimal | null;
    tax: Decimal | null;
    discount: Decimal | null;
    total: Decimal | null;
  };

  export type OrderSumAggregateOutputType = {
    subtotal: Decimal | null;
    shipping: Decimal | null;
    tax: Decimal | null;
    discount: Decimal | null;
    total: Decimal | null;
  };

  export type OrderMinAggregateOutputType = {
    id: string | null;
    number: string | null;
    userId: string | null;
    status: $Enums.OrderStatus | null;
    currency: string | null;
    subtotal: Decimal | null;
    shipping: Decimal | null;
    tax: Decimal | null;
    discount: Decimal | null;
    total: Decimal | null;
    notes: string | null;
    placedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type OrderMaxAggregateOutputType = {
    id: string | null;
    number: string | null;
    userId: string | null;
    status: $Enums.OrderStatus | null;
    currency: string | null;
    subtotal: Decimal | null;
    shipping: Decimal | null;
    tax: Decimal | null;
    discount: Decimal | null;
    total: Decimal | null;
    notes: string | null;
    placedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type OrderCountAggregateOutputType = {
    id: number;
    number: number;
    userId: number;
    status: number;
    currency: number;
    subtotal: number;
    shipping: number;
    tax: number;
    discount: number;
    total: number;
    shippingAddress: number;
    billingAddress: number;
    notes: number;
    metadata: number;
    placedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type OrderAvgAggregateInputType = {
    subtotal?: true;
    shipping?: true;
    tax?: true;
    discount?: true;
    total?: true;
  };

  export type OrderSumAggregateInputType = {
    subtotal?: true;
    shipping?: true;
    tax?: true;
    discount?: true;
    total?: true;
  };

  export type OrderMinAggregateInputType = {
    id?: true;
    number?: true;
    userId?: true;
    status?: true;
    currency?: true;
    subtotal?: true;
    shipping?: true;
    tax?: true;
    discount?: true;
    total?: true;
    notes?: true;
    placedAt?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type OrderMaxAggregateInputType = {
    id?: true;
    number?: true;
    userId?: true;
    status?: true;
    currency?: true;
    subtotal?: true;
    shipping?: true;
    tax?: true;
    discount?: true;
    total?: true;
    notes?: true;
    placedAt?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type OrderCountAggregateInputType = {
    id?: true;
    number?: true;
    userId?: true;
    status?: true;
    currency?: true;
    subtotal?: true;
    shipping?: true;
    tax?: true;
    discount?: true;
    total?: true;
    shippingAddress?: true;
    billingAddress?: true;
    notes?: true;
    metadata?: true;
    placedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type OrderAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Orders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Orders
     **/
    _count?: true | OrderCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: OrderAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: OrderSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: OrderMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: OrderMaxAggregateInputType;
  };

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
    [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>;
  };

  export type OrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      where?: OrderWhereInput;
      orderBy?: OrderOrderByWithAggregationInput | OrderOrderByWithAggregationInput[];
      by: OrderScalarFieldEnum[] | OrderScalarFieldEnum;
      having?: OrderScalarWhereWithAggregatesInput;
      take?: number;
      skip?: number;
      _count?: OrderCountAggregateInputType | true;
      _avg?: OrderAvgAggregateInputType;
      _sum?: OrderSumAggregateInputType;
      _min?: OrderMinAggregateInputType;
      _max?: OrderMaxAggregateInputType;
    };

  export type OrderGroupByOutputType = {
    id: string;
    number: string;
    userId: string;
    status: $Enums.OrderStatus;
    currency: string;
    subtotal: Decimal;
    shipping: Decimal;
    tax: Decimal;
    discount: Decimal;
    total: Decimal;
    shippingAddress: JsonValue;
    billingAddress: JsonValue | null;
    notes: string | null;
    metadata: JsonValue | null;
    placedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: OrderCountAggregateOutputType | null;
    _avg: OrderAvgAggregateOutputType | null;
    _sum: OrderSumAggregateOutputType | null;
    _min: OrderMinAggregateOutputType | null;
    _max: OrderMaxAggregateOutputType | null;
  };

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderGroupByOutputType, T['by']> & {
        [P in keyof T & keyof OrderGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
          : GetScalarType<T[P], OrderGroupByOutputType[P]>;
      }
    >
  >;

  export type OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        number?: boolean;
        userId?: boolean;
        status?: boolean;
        currency?: boolean;
        subtotal?: boolean;
        shipping?: boolean;
        tax?: boolean;
        discount?: boolean;
        total?: boolean;
        shippingAddress?: boolean;
        billingAddress?: boolean;
        notes?: boolean;
        metadata?: boolean;
        placedAt?: boolean;
        createdAt?: boolean;
        updatedAt?: boolean;
        items?: boolean | Order$itemsArgs<ExtArgs>;
        payments?: boolean | Order$paymentsArgs<ExtArgs>;
        shipments?: boolean | Order$shipmentsArgs<ExtArgs>;
        timeline?: boolean | Order$timelineArgs<ExtArgs>;
        _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['order']
    >;

  export type OrderSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      number?: boolean;
      userId?: boolean;
      status?: boolean;
      currency?: boolean;
      subtotal?: boolean;
      shipping?: boolean;
      tax?: boolean;
      discount?: boolean;
      total?: boolean;
      shippingAddress?: boolean;
      billingAddress?: boolean;
      notes?: boolean;
      metadata?: boolean;
      placedAt?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['order']
  >;

  export type OrderSelectScalar = {
    id?: boolean;
    number?: boolean;
    userId?: boolean;
    status?: boolean;
    currency?: boolean;
    subtotal?: boolean;
    shipping?: boolean;
    tax?: boolean;
    discount?: boolean;
    total?: boolean;
    shippingAddress?: boolean;
    billingAddress?: boolean;
    notes?: boolean;
    metadata?: boolean;
    placedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | Order$itemsArgs<ExtArgs>;
    payments?: boolean | Order$paymentsArgs<ExtArgs>;
    shipments?: boolean | Order$shipmentsArgs<ExtArgs>;
    timeline?: boolean | Order$timelineArgs<ExtArgs>;
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type OrderIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: 'Order';
    objects: {
      items: Prisma.$OrderItemPayload<ExtArgs>[];
      payments: Prisma.$PaymentPayload<ExtArgs>[];
      shipments: Prisma.$ShipmentPayload<ExtArgs>[];
      timeline: Prisma.$OrderEventPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        number: string;
        userId: string;
        status: $Enums.OrderStatus;
        currency: string;
        subtotal: Prisma.Decimal;
        shipping: Prisma.Decimal;
        tax: Prisma.Decimal;
        discount: Prisma.Decimal;
        total: Prisma.Decimal;
        shippingAddress: Prisma.JsonValue;
        billingAddress: Prisma.JsonValue | null;
        notes: string | null;
        metadata: Prisma.JsonValue | null;
        placedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['order']
    >;
    composites: {};
  };

  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<
    Prisma.$OrderPayload,
    S
  >;

  type OrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    OrderFindManyArgs,
    'select' | 'include' | 'distinct'
  > & {
    select?: OrderCountAggregateInputType | true;
  };

  export interface OrderDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Order']; meta: { name: 'Order' } };
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(
      args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(
      args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(
      args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(
      args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     *
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     *
     */
    findMany<T extends OrderFindManyArgs>(
      args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'findMany'>>;

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     *
     */
    create<T extends OrderCreateArgs>(
      args: SelectSubset<T, OrderCreateArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends OrderCreateManyArgs>(
      args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Orders and returns the data saved in the database.
     * @param {OrderCreateManyAndReturnArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends OrderCreateManyAndReturnArgs>(
      args?: SelectSubset<T, OrderCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     *
     */
    delete<T extends OrderDeleteArgs>(
      args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends OrderUpdateArgs>(
      args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends OrderDeleteManyArgs>(
      args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends OrderUpdateManyArgs>(
      args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(
      args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
     **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends OrderAggregateArgs>(
      args: Subset<T, OrderAggregateArgs>,
    ): Prisma.PrismaPromise<GetOrderAggregateType<T>>;

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Order model
     */
    readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    items<T extends Order$itemsArgs<ExtArgs> = {}>(
      args?: Subset<T, Order$itemsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, 'findMany'> | Null
    >;
    payments<T extends Order$paymentsArgs<ExtArgs> = {}>(
      args?: Subset<T, Order$paymentsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, 'findMany'> | Null
    >;
    shipments<T extends Order$shipmentsArgs<ExtArgs> = {}>(
      args?: Subset<T, Order$shipmentsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, 'findMany'> | Null
    >;
    timeline<T extends Order$timelineArgs<ExtArgs> = {}>(
      args?: Subset<T, Order$timelineArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$OrderEventPayload<ExtArgs>, T, 'findMany'> | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Order model
   */
  interface OrderFieldRefs {
    readonly id: FieldRef<'Order', 'String'>;
    readonly number: FieldRef<'Order', 'String'>;
    readonly userId: FieldRef<'Order', 'String'>;
    readonly status: FieldRef<'Order', 'OrderStatus'>;
    readonly currency: FieldRef<'Order', 'String'>;
    readonly subtotal: FieldRef<'Order', 'Decimal'>;
    readonly shipping: FieldRef<'Order', 'Decimal'>;
    readonly tax: FieldRef<'Order', 'Decimal'>;
    readonly discount: FieldRef<'Order', 'Decimal'>;
    readonly total: FieldRef<'Order', 'Decimal'>;
    readonly shippingAddress: FieldRef<'Order', 'Json'>;
    readonly billingAddress: FieldRef<'Order', 'Json'>;
    readonly notes: FieldRef<'Order', 'String'>;
    readonly metadata: FieldRef<'Order', 'Json'>;
    readonly placedAt: FieldRef<'Order', 'DateTime'>;
    readonly createdAt: FieldRef<'Order', 'DateTime'>;
    readonly updatedAt: FieldRef<'Order', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput;
  };

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput;
  };

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Orders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[];
  };

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Orders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[];
  };

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Orders.
     */
    skip?: number;
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[];
  };

  /**
   * Order create
   */
  export type OrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Order
       */
      select?: OrderSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: OrderInclude<ExtArgs> | null;
      /**
       * The data needed to create a Order.
       */
      data: XOR<OrderCreateInput, OrderUncheckedCreateInput>;
    };

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Order createManyAndReturn
   */
  export type OrderCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Order update
   */
  export type OrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Order
       */
      select?: OrderSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: OrderInclude<ExtArgs> | null;
      /**
       * The data needed to update a Order.
       */
      data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>;
      /**
       * Choose, which Order to update.
       */
      where: OrderWhereUniqueInput;
    };

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>;
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput;
  };

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Order
       */
      select?: OrderSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: OrderInclude<ExtArgs> | null;
      /**
       * The filter to search for the Order to update in case it exists.
       */
      where: OrderWhereUniqueInput;
      /**
       * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
       */
      create: XOR<OrderCreateInput, OrderUncheckedCreateInput>;
      /**
       * In case the Order was found with the provided `where` argument, update it with this data.
       */
      update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>;
    };

  /**
   * Order delete
   */
  export type OrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Order
       */
      select?: OrderSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: OrderInclude<ExtArgs> | null;
      /**
       * Filter which Order to delete.
       */
      where: OrderWhereUniqueInput;
    };

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput;
  };

  /**
   * Order.items
   */
  export type Order$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the OrderItem
       */
      select?: OrderItemSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: OrderItemInclude<ExtArgs> | null;
      where?: OrderItemWhereInput;
      orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[];
      cursor?: OrderItemWhereUniqueInput;
      take?: number;
      skip?: number;
      distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[];
    };

  /**
   * Order.payments
   */
  export type Order$paymentsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null;
    where?: PaymentWhereInput;
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[];
    cursor?: PaymentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[];
  };

  /**
   * Order.shipments
   */
  export type Order$shipmentsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShipmentInclude<ExtArgs> | null;
    where?: ShipmentWhereInput;
    orderBy?: ShipmentOrderByWithRelationInput | ShipmentOrderByWithRelationInput[];
    cursor?: ShipmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ShipmentScalarFieldEnum | ShipmentScalarFieldEnum[];
  };

  /**
   * Order.timeline
   */
  export type Order$timelineArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderEvent
     */
    select?: OrderEventSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderEventInclude<ExtArgs> | null;
    where?: OrderEventWhereInput;
    orderBy?: OrderEventOrderByWithRelationInput | OrderEventOrderByWithRelationInput[];
    cursor?: OrderEventWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: OrderEventScalarFieldEnum | OrderEventScalarFieldEnum[];
  };

  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Order
       */
      select?: OrderSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: OrderInclude<ExtArgs> | null;
    };

  /**
   * Model OrderItem
   */

  export type AggregateOrderItem = {
    _count: OrderItemCountAggregateOutputType | null;
    _avg: OrderItemAvgAggregateOutputType | null;
    _sum: OrderItemSumAggregateOutputType | null;
    _min: OrderItemMinAggregateOutputType | null;
    _max: OrderItemMaxAggregateOutputType | null;
  };

  export type OrderItemAvgAggregateOutputType = {
    quantity: number | null;
    unitPrice: Decimal | null;
    totalPrice: Decimal | null;
  };

  export type OrderItemSumAggregateOutputType = {
    quantity: number | null;
    unitPrice: Decimal | null;
    totalPrice: Decimal | null;
  };

  export type OrderItemMinAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    productId: string | null;
    variantId: string | null;
    sellerId: string | null;
    title: string | null;
    sku: string | null;
    imageUrl: string | null;
    quantity: number | null;
    unitPrice: Decimal | null;
    totalPrice: Decimal | null;
    status: $Enums.ItemStatus | null;
    createdAt: Date | null;
  };

  export type OrderItemMaxAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    productId: string | null;
    variantId: string | null;
    sellerId: string | null;
    title: string | null;
    sku: string | null;
    imageUrl: string | null;
    quantity: number | null;
    unitPrice: Decimal | null;
    totalPrice: Decimal | null;
    status: $Enums.ItemStatus | null;
    createdAt: Date | null;
  };

  export type OrderItemCountAggregateOutputType = {
    id: number;
    orderId: number;
    productId: number;
    variantId: number;
    sellerId: number;
    title: number;
    sku: number;
    imageUrl: number;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    status: number;
    createdAt: number;
    _all: number;
  };

  export type OrderItemAvgAggregateInputType = {
    quantity?: true;
    unitPrice?: true;
    totalPrice?: true;
  };

  export type OrderItemSumAggregateInputType = {
    quantity?: true;
    unitPrice?: true;
    totalPrice?: true;
  };

  export type OrderItemMinAggregateInputType = {
    id?: true;
    orderId?: true;
    productId?: true;
    variantId?: true;
    sellerId?: true;
    title?: true;
    sku?: true;
    imageUrl?: true;
    quantity?: true;
    unitPrice?: true;
    totalPrice?: true;
    status?: true;
    createdAt?: true;
  };

  export type OrderItemMaxAggregateInputType = {
    id?: true;
    orderId?: true;
    productId?: true;
    variantId?: true;
    sellerId?: true;
    title?: true;
    sku?: true;
    imageUrl?: true;
    quantity?: true;
    unitPrice?: true;
    totalPrice?: true;
    status?: true;
    createdAt?: true;
  };

  export type OrderItemCountAggregateInputType = {
    id?: true;
    orderId?: true;
    productId?: true;
    variantId?: true;
    sellerId?: true;
    title?: true;
    sku?: true;
    imageUrl?: true;
    quantity?: true;
    unitPrice?: true;
    totalPrice?: true;
    status?: true;
    createdAt?: true;
    _all?: true;
  };

  export type OrderItemAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which OrderItem to aggregate.
     */
    where?: OrderItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: OrderItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrderItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned OrderItems
     **/
    _count?: true | OrderItemCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: OrderItemAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: OrderItemSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: OrderItemMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: OrderItemMaxAggregateInputType;
  };

  export type GetOrderItemAggregateType<T extends OrderItemAggregateArgs> = {
    [P in keyof T & keyof AggregateOrderItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderItem[P]>
      : GetScalarType<T[P], AggregateOrderItem[P]>;
  };

  export type OrderItemGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: OrderItemWhereInput;
    orderBy?: OrderItemOrderByWithAggregationInput | OrderItemOrderByWithAggregationInput[];
    by: OrderItemScalarFieldEnum[] | OrderItemScalarFieldEnum;
    having?: OrderItemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OrderItemCountAggregateInputType | true;
    _avg?: OrderItemAvgAggregateInputType;
    _sum?: OrderItemSumAggregateInputType;
    _min?: OrderItemMinAggregateInputType;
    _max?: OrderItemMaxAggregateInputType;
  };

  export type OrderItemGroupByOutputType = {
    id: string;
    orderId: string;
    productId: string;
    variantId: string | null;
    sellerId: string;
    title: string;
    sku: string | null;
    imageUrl: string | null;
    quantity: number;
    unitPrice: Decimal;
    totalPrice: Decimal;
    status: $Enums.ItemStatus;
    createdAt: Date;
    _count: OrderItemCountAggregateOutputType | null;
    _avg: OrderItemAvgAggregateOutputType | null;
    _sum: OrderItemSumAggregateOutputType | null;
    _min: OrderItemMinAggregateOutputType | null;
    _max: OrderItemMaxAggregateOutputType | null;
  };

  type GetOrderItemGroupByPayload<T extends OrderItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderItemGroupByOutputType, T['by']> & {
        [P in keyof T & keyof OrderItemGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
          : GetScalarType<T[P], OrderItemGroupByOutputType[P]>;
      }
    >
  >;

  export type OrderItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        orderId?: boolean;
        productId?: boolean;
        variantId?: boolean;
        sellerId?: boolean;
        title?: boolean;
        sku?: boolean;
        imageUrl?: boolean;
        quantity?: boolean;
        unitPrice?: boolean;
        totalPrice?: boolean;
        status?: boolean;
        createdAt?: boolean;
        order?: boolean | OrderDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['orderItem']
    >;

  export type OrderItemSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      orderId?: boolean;
      productId?: boolean;
      variantId?: boolean;
      sellerId?: boolean;
      title?: boolean;
      sku?: boolean;
      imageUrl?: boolean;
      quantity?: boolean;
      unitPrice?: boolean;
      totalPrice?: boolean;
      status?: boolean;
      createdAt?: boolean;
      order?: boolean | OrderDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['orderItem']
  >;

  export type OrderItemSelectScalar = {
    id?: boolean;
    orderId?: boolean;
    productId?: boolean;
    variantId?: boolean;
    sellerId?: boolean;
    title?: boolean;
    sku?: boolean;
    imageUrl?: boolean;
    quantity?: boolean;
    unitPrice?: boolean;
    totalPrice?: boolean;
    status?: boolean;
    createdAt?: boolean;
  };

  export type OrderItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      order?: boolean | OrderDefaultArgs<ExtArgs>;
    };
  export type OrderItemIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    order?: boolean | OrderDefaultArgs<ExtArgs>;
  };

  export type $OrderItemPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'OrderItem';
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        orderId: string;
        productId: string;
        variantId: string | null;
        sellerId: string;
        title: string;
        sku: string | null;
        imageUrl: string | null;
        quantity: number;
        unitPrice: Prisma.Decimal;
        totalPrice: Prisma.Decimal;
        status: $Enums.ItemStatus;
        createdAt: Date;
      },
      ExtArgs['result']['orderItem']
    >;
    composites: {};
  };

  type OrderItemGetPayload<S extends boolean | null | undefined | OrderItemDefaultArgs> =
    $Result.GetResult<Prisma.$OrderItemPayload, S>;

  type OrderItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: OrderItemCountAggregateInputType | true;
    };

  export interface OrderItemDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['OrderItem'];
      meta: { name: 'OrderItem' };
    };
    /**
     * Find zero or one OrderItem that matches the filter.
     * @param {OrderItemFindUniqueArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderItemFindUniqueArgs>(
      args: SelectSubset<T, OrderItemFindUniqueArgs<ExtArgs>>,
    ): Prisma__OrderItemClient<
      $Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one OrderItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderItemFindUniqueOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderItemFindUniqueOrThrowArgs>(
      args: SelectSubset<T, OrderItemFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__OrderItemClient<
      $Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first OrderItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderItemFindFirstArgs>(
      args?: SelectSubset<T, OrderItemFindFirstArgs<ExtArgs>>,
    ): Prisma__OrderItemClient<
      $Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first OrderItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderItemFindFirstOrThrowArgs>(
      args?: SelectSubset<T, OrderItemFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__OrderItemClient<
      $Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more OrderItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderItems
     * const orderItems = await prisma.orderItem.findMany()
     *
     * // Get first 10 OrderItems
     * const orderItems = await prisma.orderItem.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.findMany({ select: { id: true } })
     *
     */
    findMany<T extends OrderItemFindManyArgs>(
      args?: SelectSubset<T, OrderItemFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, 'findMany'>>;

    /**
     * Create a OrderItem.
     * @param {OrderItemCreateArgs} args - Arguments to create a OrderItem.
     * @example
     * // Create one OrderItem
     * const OrderItem = await prisma.orderItem.create({
     *   data: {
     *     // ... data to create a OrderItem
     *   }
     * })
     *
     */
    create<T extends OrderItemCreateArgs>(
      args: SelectSubset<T, OrderItemCreateArgs<ExtArgs>>,
    ): Prisma__OrderItemClient<
      $Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many OrderItems.
     * @param {OrderItemCreateManyArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends OrderItemCreateManyArgs>(
      args?: SelectSubset<T, OrderItemCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many OrderItems and returns the data saved in the database.
     * @param {OrderItemCreateManyAndReturnArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many OrderItems and only return the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends OrderItemCreateManyAndReturnArgs>(
      args?: SelectSubset<T, OrderItemCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

    /**
     * Delete a OrderItem.
     * @param {OrderItemDeleteArgs} args - Arguments to delete one OrderItem.
     * @example
     * // Delete one OrderItem
     * const OrderItem = await prisma.orderItem.delete({
     *   where: {
     *     // ... filter to delete one OrderItem
     *   }
     * })
     *
     */
    delete<T extends OrderItemDeleteArgs>(
      args: SelectSubset<T, OrderItemDeleteArgs<ExtArgs>>,
    ): Prisma__OrderItemClient<
      $Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one OrderItem.
     * @param {OrderItemUpdateArgs} args - Arguments to update one OrderItem.
     * @example
     * // Update one OrderItem
     * const orderItem = await prisma.orderItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends OrderItemUpdateArgs>(
      args: SelectSubset<T, OrderItemUpdateArgs<ExtArgs>>,
    ): Prisma__OrderItemClient<
      $Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more OrderItems.
     * @param {OrderItemDeleteManyArgs} args - Arguments to filter OrderItems to delete.
     * @example
     * // Delete a few OrderItems
     * const { count } = await prisma.orderItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends OrderItemDeleteManyArgs>(
      args?: SelectSubset<T, OrderItemDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends OrderItemUpdateManyArgs>(
      args: SelectSubset<T, OrderItemUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one OrderItem.
     * @param {OrderItemUpsertArgs} args - Arguments to update or create a OrderItem.
     * @example
     * // Update or create a OrderItem
     * const orderItem = await prisma.orderItem.upsert({
     *   create: {
     *     // ... data to create a OrderItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderItem we want to update
     *   }
     * })
     */
    upsert<T extends OrderItemUpsertArgs>(
      args: SelectSubset<T, OrderItemUpsertArgs<ExtArgs>>,
    ): Prisma__OrderItemClient<
      $Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemCountArgs} args - Arguments to filter OrderItems to count.
     * @example
     * // Count the number of OrderItems
     * const count = await prisma.orderItem.count({
     *   where: {
     *     // ... the filter for the OrderItems we want to count
     *   }
     * })
     **/
    count<T extends OrderItemCountArgs>(
      args?: Subset<T, OrderItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderItemCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends OrderItemAggregateArgs>(
      args: Subset<T, OrderItemAggregateArgs>,
    ): Prisma.PrismaPromise<GetOrderItemAggregateType<T>>;

    /**
     * Group by OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends OrderItemGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderItemGroupByArgs['orderBy'] }
        : { orderBy?: OrderItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, OrderItemGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetOrderItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the OrderItem model
     */
    readonly fields: OrderItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderItemClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, OrderDefaultArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null,
      Null,
      ExtArgs
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the OrderItem model
   */
  interface OrderItemFieldRefs {
    readonly id: FieldRef<'OrderItem', 'String'>;
    readonly orderId: FieldRef<'OrderItem', 'String'>;
    readonly productId: FieldRef<'OrderItem', 'String'>;
    readonly variantId: FieldRef<'OrderItem', 'String'>;
    readonly sellerId: FieldRef<'OrderItem', 'String'>;
    readonly title: FieldRef<'OrderItem', 'String'>;
    readonly sku: FieldRef<'OrderItem', 'String'>;
    readonly imageUrl: FieldRef<'OrderItem', 'String'>;
    readonly quantity: FieldRef<'OrderItem', 'Int'>;
    readonly unitPrice: FieldRef<'OrderItem', 'Decimal'>;
    readonly totalPrice: FieldRef<'OrderItem', 'Decimal'>;
    readonly status: FieldRef<'OrderItem', 'ItemStatus'>;
    readonly createdAt: FieldRef<'OrderItem', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * OrderItem findUnique
   */
  export type OrderItemFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput;
  };

  /**
   * OrderItem findUniqueOrThrow
   */
  export type OrderItemFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput;
  };

  /**
   * OrderItem findFirst
   */
  export type OrderItemFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrderItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[];
  };

  /**
   * OrderItem findFirstOrThrow
   */
  export type OrderItemFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrderItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[];
  };

  /**
   * OrderItem findMany
   */
  export type OrderItemFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    /**
     * Filter, which OrderItems to fetch.
     */
    where?: OrderItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrderItems.
     */
    skip?: number;
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[];
  };

  /**
   * OrderItem create
   */
  export type OrderItemCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    /**
     * The data needed to create a OrderItem.
     */
    data: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>;
  };

  /**
   * OrderItem createMany
   */
  export type OrderItemCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * OrderItem createManyAndReturn
   */
  export type OrderItemCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * OrderItem update
   */
  export type OrderItemUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    /**
     * The data needed to update a OrderItem.
     */
    data: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>;
    /**
     * Choose, which OrderItem to update.
     */
    where: OrderItemWhereUniqueInput;
  };

  /**
   * OrderItem updateMany
   */
  export type OrderItemUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update OrderItems.
     */
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyInput>;
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput;
  };

  /**
   * OrderItem upsert
   */
  export type OrderItemUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    /**
     * The filter to search for the OrderItem to update in case it exists.
     */
    where: OrderItemWhereUniqueInput;
    /**
     * In case the OrderItem found by the `where` argument doesn't exist, create a new OrderItem with this data.
     */
    create: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>;
    /**
     * In case the OrderItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>;
  };

  /**
   * OrderItem delete
   */
  export type OrderItemDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    /**
     * Filter which OrderItem to delete.
     */
    where: OrderItemWhereUniqueInput;
  };

  /**
   * OrderItem deleteMany
   */
  export type OrderItemDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which OrderItems to delete
     */
    where?: OrderItemWhereInput;
  };

  /**
   * OrderItem without action
   */
  export type OrderItemDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
  };

  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null;
    _avg: PaymentAvgAggregateOutputType | null;
    _sum: PaymentSumAggregateOutputType | null;
    _min: PaymentMinAggregateOutputType | null;
    _max: PaymentMaxAggregateOutputType | null;
  };

  export type PaymentAvgAggregateOutputType = {
    amount: Decimal | null;
  };

  export type PaymentSumAggregateOutputType = {
    amount: Decimal | null;
  };

  export type PaymentMinAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    provider: $Enums.PaymentProvider | null;
    providerRef: string | null;
    amount: Decimal | null;
    currency: string | null;
    status: $Enums.PaymentStatus | null;
    method: string | null;
    failureReason: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type PaymentMaxAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    provider: $Enums.PaymentProvider | null;
    providerRef: string | null;
    amount: Decimal | null;
    currency: string | null;
    status: $Enums.PaymentStatus | null;
    method: string | null;
    failureReason: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type PaymentCountAggregateOutputType = {
    id: number;
    orderId: number;
    provider: number;
    providerRef: number;
    amount: number;
    currency: number;
    status: number;
    method: number;
    failureReason: number;
    metadata: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type PaymentAvgAggregateInputType = {
    amount?: true;
  };

  export type PaymentSumAggregateInputType = {
    amount?: true;
  };

  export type PaymentMinAggregateInputType = {
    id?: true;
    orderId?: true;
    provider?: true;
    providerRef?: true;
    amount?: true;
    currency?: true;
    status?: true;
    method?: true;
    failureReason?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type PaymentMaxAggregateInputType = {
    id?: true;
    orderId?: true;
    provider?: true;
    providerRef?: true;
    amount?: true;
    currency?: true;
    status?: true;
    method?: true;
    failureReason?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type PaymentCountAggregateInputType = {
    id?: true;
    orderId?: true;
    provider?: true;
    providerRef?: true;
    amount?: true;
    currency?: true;
    status?: true;
    method?: true;
    failureReason?: true;
    metadata?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type PaymentAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Payments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Payments
     **/
    _count?: true | PaymentCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: PaymentAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: PaymentSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: PaymentMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: PaymentMaxAggregateInputType;
  };

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
    [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>;
  };

  export type PaymentGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: PaymentWhereInput;
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[];
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum;
    having?: PaymentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PaymentCountAggregateInputType | true;
    _avg?: PaymentAvgAggregateInputType;
    _sum?: PaymentSumAggregateInputType;
    _min?: PaymentMinAggregateInputType;
    _max?: PaymentMaxAggregateInputType;
  };

  export type PaymentGroupByOutputType = {
    id: string;
    orderId: string;
    provider: $Enums.PaymentProvider;
    providerRef: string | null;
    amount: Decimal;
    currency: string;
    status: $Enums.PaymentStatus;
    method: string | null;
    failureReason: string | null;
    metadata: JsonValue | null;
    createdAt: Date;
    updatedAt: Date;
    _count: PaymentCountAggregateOutputType | null;
    _avg: PaymentAvgAggregateOutputType | null;
    _sum: PaymentSumAggregateOutputType | null;
    _min: PaymentMinAggregateOutputType | null;
    _max: PaymentMaxAggregateOutputType | null;
  };

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> & {
        [P in keyof T & keyof PaymentGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
          : GetScalarType<T[P], PaymentGroupByOutputType[P]>;
      }
    >
  >;

  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        orderId?: boolean;
        provider?: boolean;
        providerRef?: boolean;
        amount?: boolean;
        currency?: boolean;
        status?: boolean;
        method?: boolean;
        failureReason?: boolean;
        metadata?: boolean;
        createdAt?: boolean;
        updatedAt?: boolean;
        order?: boolean | OrderDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['payment']
    >;

  export type PaymentSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      orderId?: boolean;
      provider?: boolean;
      providerRef?: boolean;
      amount?: boolean;
      currency?: boolean;
      status?: boolean;
      method?: boolean;
      failureReason?: boolean;
      metadata?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      order?: boolean | OrderDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['payment']
  >;

  export type PaymentSelectScalar = {
    id?: boolean;
    orderId?: boolean;
    provider?: boolean;
    providerRef?: boolean;
    amount?: boolean;
    currency?: boolean;
    status?: boolean;
    method?: boolean;
    failureReason?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>;
  };
  export type PaymentIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    order?: boolean | OrderDefaultArgs<ExtArgs>;
  };

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      name: 'Payment';
      objects: {
        order: Prisma.$OrderPayload<ExtArgs>;
      };
      scalars: $Extensions.GetPayloadResult<
        {
          id: string;
          orderId: string;
          provider: $Enums.PaymentProvider;
          providerRef: string | null;
          amount: Prisma.Decimal;
          currency: string;
          status: $Enums.PaymentStatus;
          method: string | null;
          failureReason: string | null;
          metadata: Prisma.JsonValue | null;
          createdAt: Date;
          updatedAt: Date;
        },
        ExtArgs['result']['payment']
      >;
      composites: {};
    };

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> =
    $Result.GetResult<Prisma.$PaymentPayload, S>;

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    PaymentFindManyArgs,
    'select' | 'include' | 'distinct'
  > & {
    select?: PaymentCountAggregateInputType | true;
  };

  export interface PaymentDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment']; meta: { name: 'Payment' } };
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(
      args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>,
    ): Prisma__PaymentClient<
      $Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(
      args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__PaymentClient<
      $Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(
      args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>,
    ): Prisma__PaymentClient<
      $Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(
      args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__PaymentClient<
      $Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     *
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     *
     */
    findMany<T extends PaymentFindManyArgs>(
      args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, 'findMany'>>;

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     *
     */
    create<T extends PaymentCreateArgs>(
      args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>,
    ): Prisma__PaymentClient<
      $Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends PaymentCreateManyArgs>(
      args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(
      args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     *
     */
    delete<T extends PaymentDeleteArgs>(
      args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>,
    ): Prisma__PaymentClient<
      $Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends PaymentUpdateArgs>(
      args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>,
    ): Prisma__PaymentClient<
      $Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends PaymentDeleteManyArgs>(
      args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends PaymentUpdateManyArgs>(
      args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(
      args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>,
    ): Prisma__PaymentClient<
      $Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
     **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends PaymentAggregateArgs>(
      args: Subset<T, PaymentAggregateArgs>,
    ): Prisma.PrismaPromise<GetPaymentAggregateType<T>>;

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Payment model
     */
    readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, OrderDefaultArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null,
      Null,
      ExtArgs
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Payment model
   */
  interface PaymentFieldRefs {
    readonly id: FieldRef<'Payment', 'String'>;
    readonly orderId: FieldRef<'Payment', 'String'>;
    readonly provider: FieldRef<'Payment', 'PaymentProvider'>;
    readonly providerRef: FieldRef<'Payment', 'String'>;
    readonly amount: FieldRef<'Payment', 'Decimal'>;
    readonly currency: FieldRef<'Payment', 'String'>;
    readonly status: FieldRef<'Payment', 'PaymentStatus'>;
    readonly method: FieldRef<'Payment', 'String'>;
    readonly failureReason: FieldRef<'Payment', 'String'>;
    readonly metadata: FieldRef<'Payment', 'Json'>;
    readonly createdAt: FieldRef<'Payment', 'DateTime'>;
    readonly updatedAt: FieldRef<'Payment', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null;
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput;
  };

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null;
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput;
  };

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null;
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Payments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[];
  };

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null;
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Payments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[];
  };

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null;
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Payments.
     */
    skip?: number;
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[];
  };

  /**
   * Payment create
   */
  export type PaymentCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null;
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>;
  };

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null;
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>;
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput;
  };

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>;
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput;
  };

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null;
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput;
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>;
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>;
  };

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null;
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput;
  };

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput;
  };

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null;
  };

  /**
   * Model Shipment
   */

  export type AggregateShipment = {
    _count: ShipmentCountAggregateOutputType | null;
    _min: ShipmentMinAggregateOutputType | null;
    _max: ShipmentMaxAggregateOutputType | null;
  };

  export type ShipmentMinAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    trackingNumber: string | null;
    carrier: string | null;
    status: $Enums.ShipmentStatus | null;
    estimatedAt: Date | null;
    shippedAt: Date | null;
    deliveredAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ShipmentMaxAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    trackingNumber: string | null;
    carrier: string | null;
    status: $Enums.ShipmentStatus | null;
    estimatedAt: Date | null;
    shippedAt: Date | null;
    deliveredAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ShipmentCountAggregateOutputType = {
    id: number;
    orderId: number;
    trackingNumber: number;
    carrier: number;
    status: number;
    estimatedAt: number;
    shippedAt: number;
    deliveredAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type ShipmentMinAggregateInputType = {
    id?: true;
    orderId?: true;
    trackingNumber?: true;
    carrier?: true;
    status?: true;
    estimatedAt?: true;
    shippedAt?: true;
    deliveredAt?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ShipmentMaxAggregateInputType = {
    id?: true;
    orderId?: true;
    trackingNumber?: true;
    carrier?: true;
    status?: true;
    estimatedAt?: true;
    shippedAt?: true;
    deliveredAt?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ShipmentCountAggregateInputType = {
    id?: true;
    orderId?: true;
    trackingNumber?: true;
    carrier?: true;
    status?: true;
    estimatedAt?: true;
    shippedAt?: true;
    deliveredAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type ShipmentAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Shipment to aggregate.
     */
    where?: ShipmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Shipments to fetch.
     */
    orderBy?: ShipmentOrderByWithRelationInput | ShipmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ShipmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Shipments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Shipments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Shipments
     **/
    _count?: true | ShipmentCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ShipmentMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ShipmentMaxAggregateInputType;
  };

  export type GetShipmentAggregateType<T extends ShipmentAggregateArgs> = {
    [P in keyof T & keyof AggregateShipment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateShipment[P]>
      : GetScalarType<T[P], AggregateShipment[P]>;
  };

  export type ShipmentGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ShipmentWhereInput;
    orderBy?: ShipmentOrderByWithAggregationInput | ShipmentOrderByWithAggregationInput[];
    by: ShipmentScalarFieldEnum[] | ShipmentScalarFieldEnum;
    having?: ShipmentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ShipmentCountAggregateInputType | true;
    _min?: ShipmentMinAggregateInputType;
    _max?: ShipmentMaxAggregateInputType;
  };

  export type ShipmentGroupByOutputType = {
    id: string;
    orderId: string;
    trackingNumber: string | null;
    carrier: string | null;
    status: $Enums.ShipmentStatus;
    estimatedAt: Date | null;
    shippedAt: Date | null;
    deliveredAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: ShipmentCountAggregateOutputType | null;
    _min: ShipmentMinAggregateOutputType | null;
    _max: ShipmentMaxAggregateOutputType | null;
  };

  type GetShipmentGroupByPayload<T extends ShipmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ShipmentGroupByOutputType, T['by']> & {
        [P in keyof T & keyof ShipmentGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], ShipmentGroupByOutputType[P]>
          : GetScalarType<T[P], ShipmentGroupByOutputType[P]>;
      }
    >
  >;

  export type ShipmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        orderId?: boolean;
        trackingNumber?: boolean;
        carrier?: boolean;
        status?: boolean;
        estimatedAt?: boolean;
        shippedAt?: boolean;
        deliveredAt?: boolean;
        createdAt?: boolean;
        updatedAt?: boolean;
        order?: boolean | OrderDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['shipment']
    >;

  export type ShipmentSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      orderId?: boolean;
      trackingNumber?: boolean;
      carrier?: boolean;
      status?: boolean;
      estimatedAt?: boolean;
      shippedAt?: boolean;
      deliveredAt?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      order?: boolean | OrderDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['shipment']
  >;

  export type ShipmentSelectScalar = {
    id?: boolean;
    orderId?: boolean;
    trackingNumber?: boolean;
    carrier?: boolean;
    status?: boolean;
    estimatedAt?: boolean;
    shippedAt?: boolean;
    deliveredAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type ShipmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      order?: boolean | OrderDefaultArgs<ExtArgs>;
    };
  export type ShipmentIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    order?: boolean | OrderDefaultArgs<ExtArgs>;
  };

  export type $ShipmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      name: 'Shipment';
      objects: {
        order: Prisma.$OrderPayload<ExtArgs>;
      };
      scalars: $Extensions.GetPayloadResult<
        {
          id: string;
          orderId: string;
          trackingNumber: string | null;
          carrier: string | null;
          status: $Enums.ShipmentStatus;
          estimatedAt: Date | null;
          shippedAt: Date | null;
          deliveredAt: Date | null;
          createdAt: Date;
          updatedAt: Date;
        },
        ExtArgs['result']['shipment']
      >;
      composites: {};
    };

  type ShipmentGetPayload<S extends boolean | null | undefined | ShipmentDefaultArgs> =
    $Result.GetResult<Prisma.$ShipmentPayload, S>;

  type ShipmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    ShipmentFindManyArgs,
    'select' | 'include' | 'distinct'
  > & {
    select?: ShipmentCountAggregateInputType | true;
  };

  export interface ShipmentDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Shipment'];
      meta: { name: 'Shipment' };
    };
    /**
     * Find zero or one Shipment that matches the filter.
     * @param {ShipmentFindUniqueArgs} args - Arguments to find a Shipment
     * @example
     * // Get one Shipment
     * const shipment = await prisma.shipment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ShipmentFindUniqueArgs>(
      args: SelectSubset<T, ShipmentFindUniqueArgs<ExtArgs>>,
    ): Prisma__ShipmentClient<
      $Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one Shipment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ShipmentFindUniqueOrThrowArgs} args - Arguments to find a Shipment
     * @example
     * // Get one Shipment
     * const shipment = await prisma.shipment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ShipmentFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ShipmentFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__ShipmentClient<
      $Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first Shipment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShipmentFindFirstArgs} args - Arguments to find a Shipment
     * @example
     * // Get one Shipment
     * const shipment = await prisma.shipment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ShipmentFindFirstArgs>(
      args?: SelectSubset<T, ShipmentFindFirstArgs<ExtArgs>>,
    ): Prisma__ShipmentClient<
      $Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first Shipment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShipmentFindFirstOrThrowArgs} args - Arguments to find a Shipment
     * @example
     * // Get one Shipment
     * const shipment = await prisma.shipment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ShipmentFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ShipmentFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__ShipmentClient<
      $Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Shipments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShipmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Shipments
     * const shipments = await prisma.shipment.findMany()
     *
     * // Get first 10 Shipments
     * const shipments = await prisma.shipment.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const shipmentWithIdOnly = await prisma.shipment.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ShipmentFindManyArgs>(
      args?: SelectSubset<T, ShipmentFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, 'findMany'>>;

    /**
     * Create a Shipment.
     * @param {ShipmentCreateArgs} args - Arguments to create a Shipment.
     * @example
     * // Create one Shipment
     * const Shipment = await prisma.shipment.create({
     *   data: {
     *     // ... data to create a Shipment
     *   }
     * })
     *
     */
    create<T extends ShipmentCreateArgs>(
      args: SelectSubset<T, ShipmentCreateArgs<ExtArgs>>,
    ): Prisma__ShipmentClient<
      $Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many Shipments.
     * @param {ShipmentCreateManyArgs} args - Arguments to create many Shipments.
     * @example
     * // Create many Shipments
     * const shipment = await prisma.shipment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ShipmentCreateManyArgs>(
      args?: SelectSubset<T, ShipmentCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Shipments and returns the data saved in the database.
     * @param {ShipmentCreateManyAndReturnArgs} args - Arguments to create many Shipments.
     * @example
     * // Create many Shipments
     * const shipment = await prisma.shipment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Shipments and only return the `id`
     * const shipmentWithIdOnly = await prisma.shipment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ShipmentCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ShipmentCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

    /**
     * Delete a Shipment.
     * @param {ShipmentDeleteArgs} args - Arguments to delete one Shipment.
     * @example
     * // Delete one Shipment
     * const Shipment = await prisma.shipment.delete({
     *   where: {
     *     // ... filter to delete one Shipment
     *   }
     * })
     *
     */
    delete<T extends ShipmentDeleteArgs>(
      args: SelectSubset<T, ShipmentDeleteArgs<ExtArgs>>,
    ): Prisma__ShipmentClient<
      $Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one Shipment.
     * @param {ShipmentUpdateArgs} args - Arguments to update one Shipment.
     * @example
     * // Update one Shipment
     * const shipment = await prisma.shipment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ShipmentUpdateArgs>(
      args: SelectSubset<T, ShipmentUpdateArgs<ExtArgs>>,
    ): Prisma__ShipmentClient<
      $Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Shipments.
     * @param {ShipmentDeleteManyArgs} args - Arguments to filter Shipments to delete.
     * @example
     * // Delete a few Shipments
     * const { count } = await prisma.shipment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ShipmentDeleteManyArgs>(
      args?: SelectSubset<T, ShipmentDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Shipments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShipmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Shipments
     * const shipment = await prisma.shipment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ShipmentUpdateManyArgs>(
      args: SelectSubset<T, ShipmentUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Shipment.
     * @param {ShipmentUpsertArgs} args - Arguments to update or create a Shipment.
     * @example
     * // Update or create a Shipment
     * const shipment = await prisma.shipment.upsert({
     *   create: {
     *     // ... data to create a Shipment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Shipment we want to update
     *   }
     * })
     */
    upsert<T extends ShipmentUpsertArgs>(
      args: SelectSubset<T, ShipmentUpsertArgs<ExtArgs>>,
    ): Prisma__ShipmentClient<
      $Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Shipments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShipmentCountArgs} args - Arguments to filter Shipments to count.
     * @example
     * // Count the number of Shipments
     * const count = await prisma.shipment.count({
     *   where: {
     *     // ... the filter for the Shipments we want to count
     *   }
     * })
     **/
    count<T extends ShipmentCountArgs>(
      args?: Subset<T, ShipmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ShipmentCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Shipment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShipmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ShipmentAggregateArgs>(
      args: Subset<T, ShipmentAggregateArgs>,
    ): Prisma.PrismaPromise<GetShipmentAggregateType<T>>;

    /**
     * Group by Shipment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShipmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ShipmentGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ShipmentGroupByArgs['orderBy'] }
        : { orderBy?: ShipmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, ShipmentGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetShipmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Shipment model
     */
    readonly fields: ShipmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Shipment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ShipmentClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, OrderDefaultArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null,
      Null,
      ExtArgs
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Shipment model
   */
  interface ShipmentFieldRefs {
    readonly id: FieldRef<'Shipment', 'String'>;
    readonly orderId: FieldRef<'Shipment', 'String'>;
    readonly trackingNumber: FieldRef<'Shipment', 'String'>;
    readonly carrier: FieldRef<'Shipment', 'String'>;
    readonly status: FieldRef<'Shipment', 'ShipmentStatus'>;
    readonly estimatedAt: FieldRef<'Shipment', 'DateTime'>;
    readonly shippedAt: FieldRef<'Shipment', 'DateTime'>;
    readonly deliveredAt: FieldRef<'Shipment', 'DateTime'>;
    readonly createdAt: FieldRef<'Shipment', 'DateTime'>;
    readonly updatedAt: FieldRef<'Shipment', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Shipment findUnique
   */
  export type ShipmentFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShipmentInclude<ExtArgs> | null;
    /**
     * Filter, which Shipment to fetch.
     */
    where: ShipmentWhereUniqueInput;
  };

  /**
   * Shipment findUniqueOrThrow
   */
  export type ShipmentFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShipmentInclude<ExtArgs> | null;
    /**
     * Filter, which Shipment to fetch.
     */
    where: ShipmentWhereUniqueInput;
  };

  /**
   * Shipment findFirst
   */
  export type ShipmentFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShipmentInclude<ExtArgs> | null;
    /**
     * Filter, which Shipment to fetch.
     */
    where?: ShipmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Shipments to fetch.
     */
    orderBy?: ShipmentOrderByWithRelationInput | ShipmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Shipments.
     */
    cursor?: ShipmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Shipments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Shipments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Shipments.
     */
    distinct?: ShipmentScalarFieldEnum | ShipmentScalarFieldEnum[];
  };

  /**
   * Shipment findFirstOrThrow
   */
  export type ShipmentFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShipmentInclude<ExtArgs> | null;
    /**
     * Filter, which Shipment to fetch.
     */
    where?: ShipmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Shipments to fetch.
     */
    orderBy?: ShipmentOrderByWithRelationInput | ShipmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Shipments.
     */
    cursor?: ShipmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Shipments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Shipments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Shipments.
     */
    distinct?: ShipmentScalarFieldEnum | ShipmentScalarFieldEnum[];
  };

  /**
   * Shipment findMany
   */
  export type ShipmentFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShipmentInclude<ExtArgs> | null;
    /**
     * Filter, which Shipments to fetch.
     */
    where?: ShipmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Shipments to fetch.
     */
    orderBy?: ShipmentOrderByWithRelationInput | ShipmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Shipments.
     */
    cursor?: ShipmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Shipments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Shipments.
     */
    skip?: number;
    distinct?: ShipmentScalarFieldEnum | ShipmentScalarFieldEnum[];
  };

  /**
   * Shipment create
   */
  export type ShipmentCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShipmentInclude<ExtArgs> | null;
    /**
     * The data needed to create a Shipment.
     */
    data: XOR<ShipmentCreateInput, ShipmentUncheckedCreateInput>;
  };

  /**
   * Shipment createMany
   */
  export type ShipmentCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Shipments.
     */
    data: ShipmentCreateManyInput | ShipmentCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Shipment createManyAndReturn
   */
  export type ShipmentCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many Shipments.
     */
    data: ShipmentCreateManyInput | ShipmentCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShipmentIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Shipment update
   */
  export type ShipmentUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShipmentInclude<ExtArgs> | null;
    /**
     * The data needed to update a Shipment.
     */
    data: XOR<ShipmentUpdateInput, ShipmentUncheckedUpdateInput>;
    /**
     * Choose, which Shipment to update.
     */
    where: ShipmentWhereUniqueInput;
  };

  /**
   * Shipment updateMany
   */
  export type ShipmentUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Shipments.
     */
    data: XOR<ShipmentUpdateManyMutationInput, ShipmentUncheckedUpdateManyInput>;
    /**
     * Filter which Shipments to update
     */
    where?: ShipmentWhereInput;
  };

  /**
   * Shipment upsert
   */
  export type ShipmentUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShipmentInclude<ExtArgs> | null;
    /**
     * The filter to search for the Shipment to update in case it exists.
     */
    where: ShipmentWhereUniqueInput;
    /**
     * In case the Shipment found by the `where` argument doesn't exist, create a new Shipment with this data.
     */
    create: XOR<ShipmentCreateInput, ShipmentUncheckedCreateInput>;
    /**
     * In case the Shipment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ShipmentUpdateInput, ShipmentUncheckedUpdateInput>;
  };

  /**
   * Shipment delete
   */
  export type ShipmentDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShipmentInclude<ExtArgs> | null;
    /**
     * Filter which Shipment to delete.
     */
    where: ShipmentWhereUniqueInput;
  };

  /**
   * Shipment deleteMany
   */
  export type ShipmentDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Shipments to delete
     */
    where?: ShipmentWhereInput;
  };

  /**
   * Shipment without action
   */
  export type ShipmentDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShipmentInclude<ExtArgs> | null;
  };

  /**
   * Model OrderEvent
   */

  export type AggregateOrderEvent = {
    _count: OrderEventCountAggregateOutputType | null;
    _min: OrderEventMinAggregateOutputType | null;
    _max: OrderEventMaxAggregateOutputType | null;
  };

  export type OrderEventMinAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    actor: string | null;
    event: string | null;
    createdAt: Date | null;
  };

  export type OrderEventMaxAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    actor: string | null;
    event: string | null;
    createdAt: Date | null;
  };

  export type OrderEventCountAggregateOutputType = {
    id: number;
    orderId: number;
    actor: number;
    event: number;
    data: number;
    createdAt: number;
    _all: number;
  };

  export type OrderEventMinAggregateInputType = {
    id?: true;
    orderId?: true;
    actor?: true;
    event?: true;
    createdAt?: true;
  };

  export type OrderEventMaxAggregateInputType = {
    id?: true;
    orderId?: true;
    actor?: true;
    event?: true;
    createdAt?: true;
  };

  export type OrderEventCountAggregateInputType = {
    id?: true;
    orderId?: true;
    actor?: true;
    event?: true;
    data?: true;
    createdAt?: true;
    _all?: true;
  };

  export type OrderEventAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which OrderEvent to aggregate.
     */
    where?: OrderEventWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrderEvents to fetch.
     */
    orderBy?: OrderEventOrderByWithRelationInput | OrderEventOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: OrderEventWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrderEvents from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrderEvents.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned OrderEvents
     **/
    _count?: true | OrderEventCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: OrderEventMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: OrderEventMaxAggregateInputType;
  };

  export type GetOrderEventAggregateType<T extends OrderEventAggregateArgs> = {
    [P in keyof T & keyof AggregateOrderEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderEvent[P]>
      : GetScalarType<T[P], AggregateOrderEvent[P]>;
  };

  export type OrderEventGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: OrderEventWhereInput;
    orderBy?: OrderEventOrderByWithAggregationInput | OrderEventOrderByWithAggregationInput[];
    by: OrderEventScalarFieldEnum[] | OrderEventScalarFieldEnum;
    having?: OrderEventScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OrderEventCountAggregateInputType | true;
    _min?: OrderEventMinAggregateInputType;
    _max?: OrderEventMaxAggregateInputType;
  };

  export type OrderEventGroupByOutputType = {
    id: string;
    orderId: string;
    actor: string;
    event: string;
    data: JsonValue | null;
    createdAt: Date;
    _count: OrderEventCountAggregateOutputType | null;
    _min: OrderEventMinAggregateOutputType | null;
    _max: OrderEventMaxAggregateOutputType | null;
  };

  type GetOrderEventGroupByPayload<T extends OrderEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderEventGroupByOutputType, T['by']> & {
        [P in keyof T & keyof OrderEventGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], OrderEventGroupByOutputType[P]>
          : GetScalarType<T[P], OrderEventGroupByOutputType[P]>;
      }
    >
  >;

  export type OrderEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        orderId?: boolean;
        actor?: boolean;
        event?: boolean;
        data?: boolean;
        createdAt?: boolean;
        order?: boolean | OrderDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['orderEvent']
    >;

  export type OrderEventSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      orderId?: boolean;
      actor?: boolean;
      event?: boolean;
      data?: boolean;
      createdAt?: boolean;
      order?: boolean | OrderDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['orderEvent']
  >;

  export type OrderEventSelectScalar = {
    id?: boolean;
    orderId?: boolean;
    actor?: boolean;
    event?: boolean;
    data?: boolean;
    createdAt?: boolean;
  };

  export type OrderEventInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    order?: boolean | OrderDefaultArgs<ExtArgs>;
  };
  export type OrderEventIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    order?: boolean | OrderDefaultArgs<ExtArgs>;
  };

  export type $OrderEventPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'OrderEvent';
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        orderId: string;
        actor: string;
        event: string;
        data: Prisma.JsonValue | null;
        createdAt: Date;
      },
      ExtArgs['result']['orderEvent']
    >;
    composites: {};
  };

  type OrderEventGetPayload<S extends boolean | null | undefined | OrderEventDefaultArgs> =
    $Result.GetResult<Prisma.$OrderEventPayload, S>;

  type OrderEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderEventFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: OrderEventCountAggregateInputType | true;
    };

  export interface OrderEventDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['OrderEvent'];
      meta: { name: 'OrderEvent' };
    };
    /**
     * Find zero or one OrderEvent that matches the filter.
     * @param {OrderEventFindUniqueArgs} args - Arguments to find a OrderEvent
     * @example
     * // Get one OrderEvent
     * const orderEvent = await prisma.orderEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderEventFindUniqueArgs>(
      args: SelectSubset<T, OrderEventFindUniqueArgs<ExtArgs>>,
    ): Prisma__OrderEventClient<
      $Result.GetResult<Prisma.$OrderEventPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one OrderEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderEventFindUniqueOrThrowArgs} args - Arguments to find a OrderEvent
     * @example
     * // Get one OrderEvent
     * const orderEvent = await prisma.orderEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderEventFindUniqueOrThrowArgs>(
      args: SelectSubset<T, OrderEventFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__OrderEventClient<
      $Result.GetResult<Prisma.$OrderEventPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first OrderEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderEventFindFirstArgs} args - Arguments to find a OrderEvent
     * @example
     * // Get one OrderEvent
     * const orderEvent = await prisma.orderEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderEventFindFirstArgs>(
      args?: SelectSubset<T, OrderEventFindFirstArgs<ExtArgs>>,
    ): Prisma__OrderEventClient<
      $Result.GetResult<Prisma.$OrderEventPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first OrderEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderEventFindFirstOrThrowArgs} args - Arguments to find a OrderEvent
     * @example
     * // Get one OrderEvent
     * const orderEvent = await prisma.orderEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderEventFindFirstOrThrowArgs>(
      args?: SelectSubset<T, OrderEventFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__OrderEventClient<
      $Result.GetResult<Prisma.$OrderEventPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more OrderEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderEvents
     * const orderEvents = await prisma.orderEvent.findMany()
     *
     * // Get first 10 OrderEvents
     * const orderEvents = await prisma.orderEvent.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const orderEventWithIdOnly = await prisma.orderEvent.findMany({ select: { id: true } })
     *
     */
    findMany<T extends OrderEventFindManyArgs>(
      args?: SelectSubset<T, OrderEventFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderEventPayload<ExtArgs>, T, 'findMany'>>;

    /**
     * Create a OrderEvent.
     * @param {OrderEventCreateArgs} args - Arguments to create a OrderEvent.
     * @example
     * // Create one OrderEvent
     * const OrderEvent = await prisma.orderEvent.create({
     *   data: {
     *     // ... data to create a OrderEvent
     *   }
     * })
     *
     */
    create<T extends OrderEventCreateArgs>(
      args: SelectSubset<T, OrderEventCreateArgs<ExtArgs>>,
    ): Prisma__OrderEventClient<
      $Result.GetResult<Prisma.$OrderEventPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many OrderEvents.
     * @param {OrderEventCreateManyArgs} args - Arguments to create many OrderEvents.
     * @example
     * // Create many OrderEvents
     * const orderEvent = await prisma.orderEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends OrderEventCreateManyArgs>(
      args?: SelectSubset<T, OrderEventCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many OrderEvents and returns the data saved in the database.
     * @param {OrderEventCreateManyAndReturnArgs} args - Arguments to create many OrderEvents.
     * @example
     * // Create many OrderEvents
     * const orderEvent = await prisma.orderEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many OrderEvents and only return the `id`
     * const orderEventWithIdOnly = await prisma.orderEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends OrderEventCreateManyAndReturnArgs>(
      args?: SelectSubset<T, OrderEventCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$OrderEventPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

    /**
     * Delete a OrderEvent.
     * @param {OrderEventDeleteArgs} args - Arguments to delete one OrderEvent.
     * @example
     * // Delete one OrderEvent
     * const OrderEvent = await prisma.orderEvent.delete({
     *   where: {
     *     // ... filter to delete one OrderEvent
     *   }
     * })
     *
     */
    delete<T extends OrderEventDeleteArgs>(
      args: SelectSubset<T, OrderEventDeleteArgs<ExtArgs>>,
    ): Prisma__OrderEventClient<
      $Result.GetResult<Prisma.$OrderEventPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one OrderEvent.
     * @param {OrderEventUpdateArgs} args - Arguments to update one OrderEvent.
     * @example
     * // Update one OrderEvent
     * const orderEvent = await prisma.orderEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends OrderEventUpdateArgs>(
      args: SelectSubset<T, OrderEventUpdateArgs<ExtArgs>>,
    ): Prisma__OrderEventClient<
      $Result.GetResult<Prisma.$OrderEventPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more OrderEvents.
     * @param {OrderEventDeleteManyArgs} args - Arguments to filter OrderEvents to delete.
     * @example
     * // Delete a few OrderEvents
     * const { count } = await prisma.orderEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends OrderEventDeleteManyArgs>(
      args?: SelectSubset<T, OrderEventDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more OrderEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderEvents
     * const orderEvent = await prisma.orderEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends OrderEventUpdateManyArgs>(
      args: SelectSubset<T, OrderEventUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one OrderEvent.
     * @param {OrderEventUpsertArgs} args - Arguments to update or create a OrderEvent.
     * @example
     * // Update or create a OrderEvent
     * const orderEvent = await prisma.orderEvent.upsert({
     *   create: {
     *     // ... data to create a OrderEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderEvent we want to update
     *   }
     * })
     */
    upsert<T extends OrderEventUpsertArgs>(
      args: SelectSubset<T, OrderEventUpsertArgs<ExtArgs>>,
    ): Prisma__OrderEventClient<
      $Result.GetResult<Prisma.$OrderEventPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of OrderEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderEventCountArgs} args - Arguments to filter OrderEvents to count.
     * @example
     * // Count the number of OrderEvents
     * const count = await prisma.orderEvent.count({
     *   where: {
     *     // ... the filter for the OrderEvents we want to count
     *   }
     * })
     **/
    count<T extends OrderEventCountArgs>(
      args?: Subset<T, OrderEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderEventCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a OrderEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends OrderEventAggregateArgs>(
      args: Subset<T, OrderEventAggregateArgs>,
    ): Prisma.PrismaPromise<GetOrderEventAggregateType<T>>;

    /**
     * Group by OrderEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends OrderEventGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderEventGroupByArgs['orderBy'] }
        : { orderBy?: OrderEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, OrderEventGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetOrderEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the OrderEvent model
     */
    readonly fields: OrderEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderEventClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, OrderDefaultArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null,
      Null,
      ExtArgs
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the OrderEvent model
   */
  interface OrderEventFieldRefs {
    readonly id: FieldRef<'OrderEvent', 'String'>;
    readonly orderId: FieldRef<'OrderEvent', 'String'>;
    readonly actor: FieldRef<'OrderEvent', 'String'>;
    readonly event: FieldRef<'OrderEvent', 'String'>;
    readonly data: FieldRef<'OrderEvent', 'Json'>;
    readonly createdAt: FieldRef<'OrderEvent', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * OrderEvent findUnique
   */
  export type OrderEventFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderEvent
     */
    select?: OrderEventSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderEventInclude<ExtArgs> | null;
    /**
     * Filter, which OrderEvent to fetch.
     */
    where: OrderEventWhereUniqueInput;
  };

  /**
   * OrderEvent findUniqueOrThrow
   */
  export type OrderEventFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderEvent
     */
    select?: OrderEventSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderEventInclude<ExtArgs> | null;
    /**
     * Filter, which OrderEvent to fetch.
     */
    where: OrderEventWhereUniqueInput;
  };

  /**
   * OrderEvent findFirst
   */
  export type OrderEventFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderEvent
     */
    select?: OrderEventSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderEventInclude<ExtArgs> | null;
    /**
     * Filter, which OrderEvent to fetch.
     */
    where?: OrderEventWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrderEvents to fetch.
     */
    orderBy?: OrderEventOrderByWithRelationInput | OrderEventOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for OrderEvents.
     */
    cursor?: OrderEventWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrderEvents from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrderEvents.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OrderEvents.
     */
    distinct?: OrderEventScalarFieldEnum | OrderEventScalarFieldEnum[];
  };

  /**
   * OrderEvent findFirstOrThrow
   */
  export type OrderEventFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderEvent
     */
    select?: OrderEventSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderEventInclude<ExtArgs> | null;
    /**
     * Filter, which OrderEvent to fetch.
     */
    where?: OrderEventWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrderEvents to fetch.
     */
    orderBy?: OrderEventOrderByWithRelationInput | OrderEventOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for OrderEvents.
     */
    cursor?: OrderEventWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrderEvents from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrderEvents.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OrderEvents.
     */
    distinct?: OrderEventScalarFieldEnum | OrderEventScalarFieldEnum[];
  };

  /**
   * OrderEvent findMany
   */
  export type OrderEventFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderEvent
     */
    select?: OrderEventSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderEventInclude<ExtArgs> | null;
    /**
     * Filter, which OrderEvents to fetch.
     */
    where?: OrderEventWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrderEvents to fetch.
     */
    orderBy?: OrderEventOrderByWithRelationInput | OrderEventOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing OrderEvents.
     */
    cursor?: OrderEventWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrderEvents from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrderEvents.
     */
    skip?: number;
    distinct?: OrderEventScalarFieldEnum | OrderEventScalarFieldEnum[];
  };

  /**
   * OrderEvent create
   */
  export type OrderEventCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderEvent
     */
    select?: OrderEventSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderEventInclude<ExtArgs> | null;
    /**
     * The data needed to create a OrderEvent.
     */
    data: XOR<OrderEventCreateInput, OrderEventUncheckedCreateInput>;
  };

  /**
   * OrderEvent createMany
   */
  export type OrderEventCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many OrderEvents.
     */
    data: OrderEventCreateManyInput | OrderEventCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * OrderEvent createManyAndReturn
   */
  export type OrderEventCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderEvent
     */
    select?: OrderEventSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many OrderEvents.
     */
    data: OrderEventCreateManyInput | OrderEventCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderEventIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * OrderEvent update
   */
  export type OrderEventUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderEvent
     */
    select?: OrderEventSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderEventInclude<ExtArgs> | null;
    /**
     * The data needed to update a OrderEvent.
     */
    data: XOR<OrderEventUpdateInput, OrderEventUncheckedUpdateInput>;
    /**
     * Choose, which OrderEvent to update.
     */
    where: OrderEventWhereUniqueInput;
  };

  /**
   * OrderEvent updateMany
   */
  export type OrderEventUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update OrderEvents.
     */
    data: XOR<OrderEventUpdateManyMutationInput, OrderEventUncheckedUpdateManyInput>;
    /**
     * Filter which OrderEvents to update
     */
    where?: OrderEventWhereInput;
  };

  /**
   * OrderEvent upsert
   */
  export type OrderEventUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderEvent
     */
    select?: OrderEventSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderEventInclude<ExtArgs> | null;
    /**
     * The filter to search for the OrderEvent to update in case it exists.
     */
    where: OrderEventWhereUniqueInput;
    /**
     * In case the OrderEvent found by the `where` argument doesn't exist, create a new OrderEvent with this data.
     */
    create: XOR<OrderEventCreateInput, OrderEventUncheckedCreateInput>;
    /**
     * In case the OrderEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderEventUpdateInput, OrderEventUncheckedUpdateInput>;
  };

  /**
   * OrderEvent delete
   */
  export type OrderEventDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderEvent
     */
    select?: OrderEventSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderEventInclude<ExtArgs> | null;
    /**
     * Filter which OrderEvent to delete.
     */
    where: OrderEventWhereUniqueInput;
  };

  /**
   * OrderEvent deleteMany
   */
  export type OrderEventDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which OrderEvents to delete
     */
    where?: OrderEventWhereInput;
  };

  /**
   * OrderEvent without action
   */
  export type OrderEventDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderEvent
     */
    select?: OrderEventSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderEventInclude<ExtArgs> | null;
  };

  /**
   * Model OutboxMessage
   */

  export type AggregateOutboxMessage = {
    _count: OutboxMessageCountAggregateOutputType | null;
    _min: OutboxMessageMinAggregateOutputType | null;
    _max: OutboxMessageMaxAggregateOutputType | null;
  };

  export type OutboxMessageMinAggregateOutputType = {
    id: string | null;
    topic: string | null;
    type: string | null;
    status: $Enums.OutboxStatus | null;
    error: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type OutboxMessageMaxAggregateOutputType = {
    id: string | null;
    topic: string | null;
    type: string | null;
    status: $Enums.OutboxStatus | null;
    error: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type OutboxMessageCountAggregateOutputType = {
    id: number;
    topic: number;
    type: number;
    payload: number;
    status: number;
    error: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type OutboxMessageMinAggregateInputType = {
    id?: true;
    topic?: true;
    type?: true;
    status?: true;
    error?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type OutboxMessageMaxAggregateInputType = {
    id?: true;
    topic?: true;
    type?: true;
    status?: true;
    error?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type OutboxMessageCountAggregateInputType = {
    id?: true;
    topic?: true;
    type?: true;
    payload?: true;
    status?: true;
    error?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type OutboxMessageAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which OutboxMessage to aggregate.
     */
    where?: OutboxMessageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OutboxMessages to fetch.
     */
    orderBy?: OutboxMessageOrderByWithRelationInput | OutboxMessageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: OutboxMessageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OutboxMessages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OutboxMessages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned OutboxMessages
     **/
    _count?: true | OutboxMessageCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: OutboxMessageMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: OutboxMessageMaxAggregateInputType;
  };

  export type GetOutboxMessageAggregateType<T extends OutboxMessageAggregateArgs> = {
    [P in keyof T & keyof AggregateOutboxMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOutboxMessage[P]>
      : GetScalarType<T[P], AggregateOutboxMessage[P]>;
  };

  export type OutboxMessageGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: OutboxMessageWhereInput;
    orderBy?: OutboxMessageOrderByWithAggregationInput | OutboxMessageOrderByWithAggregationInput[];
    by: OutboxMessageScalarFieldEnum[] | OutboxMessageScalarFieldEnum;
    having?: OutboxMessageScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OutboxMessageCountAggregateInputType | true;
    _min?: OutboxMessageMinAggregateInputType;
    _max?: OutboxMessageMaxAggregateInputType;
  };

  export type OutboxMessageGroupByOutputType = {
    id: string;
    topic: string;
    type: string;
    payload: JsonValue;
    status: $Enums.OutboxStatus;
    error: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: OutboxMessageCountAggregateOutputType | null;
    _min: OutboxMessageMinAggregateOutputType | null;
    _max: OutboxMessageMaxAggregateOutputType | null;
  };

  type GetOutboxMessageGroupByPayload<T extends OutboxMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OutboxMessageGroupByOutputType, T['by']> & {
        [P in keyof T & keyof OutboxMessageGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], OutboxMessageGroupByOutputType[P]>
          : GetScalarType<T[P], OutboxMessageGroupByOutputType[P]>;
      }
    >
  >;

  export type OutboxMessageSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      topic?: boolean;
      type?: boolean;
      payload?: boolean;
      status?: boolean;
      error?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['outboxMessage']
  >;

  export type OutboxMessageSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      topic?: boolean;
      type?: boolean;
      payload?: boolean;
      status?: boolean;
      error?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['outboxMessage']
  >;

  export type OutboxMessageSelectScalar = {
    id?: boolean;
    topic?: boolean;
    type?: boolean;
    payload?: boolean;
    status?: boolean;
    error?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type $OutboxMessagePayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'OutboxMessage';
    objects: {};
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        topic: string;
        type: string;
        payload: Prisma.JsonValue;
        status: $Enums.OutboxStatus;
        error: string | null;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['outboxMessage']
    >;
    composites: {};
  };

  type OutboxMessageGetPayload<S extends boolean | null | undefined | OutboxMessageDefaultArgs> =
    $Result.GetResult<Prisma.$OutboxMessagePayload, S>;

  type OutboxMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OutboxMessageFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: OutboxMessageCountAggregateInputType | true;
    };

  export interface OutboxMessageDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['OutboxMessage'];
      meta: { name: 'OutboxMessage' };
    };
    /**
     * Find zero or one OutboxMessage that matches the filter.
     * @param {OutboxMessageFindUniqueArgs} args - Arguments to find a OutboxMessage
     * @example
     * // Get one OutboxMessage
     * const outboxMessage = await prisma.outboxMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OutboxMessageFindUniqueArgs>(
      args: SelectSubset<T, OutboxMessageFindUniqueArgs<ExtArgs>>,
    ): Prisma__OutboxMessageClient<
      $Result.GetResult<Prisma.$OutboxMessagePayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one OutboxMessage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OutboxMessageFindUniqueOrThrowArgs} args - Arguments to find a OutboxMessage
     * @example
     * // Get one OutboxMessage
     * const outboxMessage = await prisma.outboxMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OutboxMessageFindUniqueOrThrowArgs>(
      args: SelectSubset<T, OutboxMessageFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__OutboxMessageClient<
      $Result.GetResult<Prisma.$OutboxMessagePayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first OutboxMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxMessageFindFirstArgs} args - Arguments to find a OutboxMessage
     * @example
     * // Get one OutboxMessage
     * const outboxMessage = await prisma.outboxMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OutboxMessageFindFirstArgs>(
      args?: SelectSubset<T, OutboxMessageFindFirstArgs<ExtArgs>>,
    ): Prisma__OutboxMessageClient<
      $Result.GetResult<Prisma.$OutboxMessagePayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first OutboxMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxMessageFindFirstOrThrowArgs} args - Arguments to find a OutboxMessage
     * @example
     * // Get one OutboxMessage
     * const outboxMessage = await prisma.outboxMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OutboxMessageFindFirstOrThrowArgs>(
      args?: SelectSubset<T, OutboxMessageFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__OutboxMessageClient<
      $Result.GetResult<Prisma.$OutboxMessagePayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more OutboxMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OutboxMessages
     * const outboxMessages = await prisma.outboxMessage.findMany()
     *
     * // Get first 10 OutboxMessages
     * const outboxMessages = await prisma.outboxMessage.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const outboxMessageWithIdOnly = await prisma.outboxMessage.findMany({ select: { id: true } })
     *
     */
    findMany<T extends OutboxMessageFindManyArgs>(
      args?: SelectSubset<T, OutboxMessageFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$OutboxMessagePayload<ExtArgs>, T, 'findMany'>
    >;

    /**
     * Create a OutboxMessage.
     * @param {OutboxMessageCreateArgs} args - Arguments to create a OutboxMessage.
     * @example
     * // Create one OutboxMessage
     * const OutboxMessage = await prisma.outboxMessage.create({
     *   data: {
     *     // ... data to create a OutboxMessage
     *   }
     * })
     *
     */
    create<T extends OutboxMessageCreateArgs>(
      args: SelectSubset<T, OutboxMessageCreateArgs<ExtArgs>>,
    ): Prisma__OutboxMessageClient<
      $Result.GetResult<Prisma.$OutboxMessagePayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many OutboxMessages.
     * @param {OutboxMessageCreateManyArgs} args - Arguments to create many OutboxMessages.
     * @example
     * // Create many OutboxMessages
     * const outboxMessage = await prisma.outboxMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends OutboxMessageCreateManyArgs>(
      args?: SelectSubset<T, OutboxMessageCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many OutboxMessages and returns the data saved in the database.
     * @param {OutboxMessageCreateManyAndReturnArgs} args - Arguments to create many OutboxMessages.
     * @example
     * // Create many OutboxMessages
     * const outboxMessage = await prisma.outboxMessage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many OutboxMessages and only return the `id`
     * const outboxMessageWithIdOnly = await prisma.outboxMessage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends OutboxMessageCreateManyAndReturnArgs>(
      args?: SelectSubset<T, OutboxMessageCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$OutboxMessagePayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

    /**
     * Delete a OutboxMessage.
     * @param {OutboxMessageDeleteArgs} args - Arguments to delete one OutboxMessage.
     * @example
     * // Delete one OutboxMessage
     * const OutboxMessage = await prisma.outboxMessage.delete({
     *   where: {
     *     // ... filter to delete one OutboxMessage
     *   }
     * })
     *
     */
    delete<T extends OutboxMessageDeleteArgs>(
      args: SelectSubset<T, OutboxMessageDeleteArgs<ExtArgs>>,
    ): Prisma__OutboxMessageClient<
      $Result.GetResult<Prisma.$OutboxMessagePayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one OutboxMessage.
     * @param {OutboxMessageUpdateArgs} args - Arguments to update one OutboxMessage.
     * @example
     * // Update one OutboxMessage
     * const outboxMessage = await prisma.outboxMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends OutboxMessageUpdateArgs>(
      args: SelectSubset<T, OutboxMessageUpdateArgs<ExtArgs>>,
    ): Prisma__OutboxMessageClient<
      $Result.GetResult<Prisma.$OutboxMessagePayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more OutboxMessages.
     * @param {OutboxMessageDeleteManyArgs} args - Arguments to filter OutboxMessages to delete.
     * @example
     * // Delete a few OutboxMessages
     * const { count } = await prisma.outboxMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends OutboxMessageDeleteManyArgs>(
      args?: SelectSubset<T, OutboxMessageDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more OutboxMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OutboxMessages
     * const outboxMessage = await prisma.outboxMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends OutboxMessageUpdateManyArgs>(
      args: SelectSubset<T, OutboxMessageUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one OutboxMessage.
     * @param {OutboxMessageUpsertArgs} args - Arguments to update or create a OutboxMessage.
     * @example
     * // Update or create a OutboxMessage
     * const outboxMessage = await prisma.outboxMessage.upsert({
     *   create: {
     *     // ... data to create a OutboxMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OutboxMessage we want to update
     *   }
     * })
     */
    upsert<T extends OutboxMessageUpsertArgs>(
      args: SelectSubset<T, OutboxMessageUpsertArgs<ExtArgs>>,
    ): Prisma__OutboxMessageClient<
      $Result.GetResult<Prisma.$OutboxMessagePayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of OutboxMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxMessageCountArgs} args - Arguments to filter OutboxMessages to count.
     * @example
     * // Count the number of OutboxMessages
     * const count = await prisma.outboxMessage.count({
     *   where: {
     *     // ... the filter for the OutboxMessages we want to count
     *   }
     * })
     **/
    count<T extends OutboxMessageCountArgs>(
      args?: Subset<T, OutboxMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OutboxMessageCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a OutboxMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends OutboxMessageAggregateArgs>(
      args: Subset<T, OutboxMessageAggregateArgs>,
    ): Prisma.PrismaPromise<GetOutboxMessageAggregateType<T>>;

    /**
     * Group by OutboxMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxMessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends OutboxMessageGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OutboxMessageGroupByArgs['orderBy'] }
        : { orderBy?: OutboxMessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, OutboxMessageGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetOutboxMessageGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the OutboxMessage model
     */
    readonly fields: OutboxMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OutboxMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OutboxMessageClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the OutboxMessage model
   */
  interface OutboxMessageFieldRefs {
    readonly id: FieldRef<'OutboxMessage', 'String'>;
    readonly topic: FieldRef<'OutboxMessage', 'String'>;
    readonly type: FieldRef<'OutboxMessage', 'String'>;
    readonly payload: FieldRef<'OutboxMessage', 'Json'>;
    readonly status: FieldRef<'OutboxMessage', 'OutboxStatus'>;
    readonly error: FieldRef<'OutboxMessage', 'String'>;
    readonly createdAt: FieldRef<'OutboxMessage', 'DateTime'>;
    readonly updatedAt: FieldRef<'OutboxMessage', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * OutboxMessage findUnique
   */
  export type OutboxMessageFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OutboxMessage
     */
    select?: OutboxMessageSelect<ExtArgs> | null;
    /**
     * Filter, which OutboxMessage to fetch.
     */
    where: OutboxMessageWhereUniqueInput;
  };

  /**
   * OutboxMessage findUniqueOrThrow
   */
  export type OutboxMessageFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OutboxMessage
     */
    select?: OutboxMessageSelect<ExtArgs> | null;
    /**
     * Filter, which OutboxMessage to fetch.
     */
    where: OutboxMessageWhereUniqueInput;
  };

  /**
   * OutboxMessage findFirst
   */
  export type OutboxMessageFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OutboxMessage
     */
    select?: OutboxMessageSelect<ExtArgs> | null;
    /**
     * Filter, which OutboxMessage to fetch.
     */
    where?: OutboxMessageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OutboxMessages to fetch.
     */
    orderBy?: OutboxMessageOrderByWithRelationInput | OutboxMessageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for OutboxMessages.
     */
    cursor?: OutboxMessageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OutboxMessages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OutboxMessages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OutboxMessages.
     */
    distinct?: OutboxMessageScalarFieldEnum | OutboxMessageScalarFieldEnum[];
  };

  /**
   * OutboxMessage findFirstOrThrow
   */
  export type OutboxMessageFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OutboxMessage
     */
    select?: OutboxMessageSelect<ExtArgs> | null;
    /**
     * Filter, which OutboxMessage to fetch.
     */
    where?: OutboxMessageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OutboxMessages to fetch.
     */
    orderBy?: OutboxMessageOrderByWithRelationInput | OutboxMessageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for OutboxMessages.
     */
    cursor?: OutboxMessageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OutboxMessages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OutboxMessages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OutboxMessages.
     */
    distinct?: OutboxMessageScalarFieldEnum | OutboxMessageScalarFieldEnum[];
  };

  /**
   * OutboxMessage findMany
   */
  export type OutboxMessageFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OutboxMessage
     */
    select?: OutboxMessageSelect<ExtArgs> | null;
    /**
     * Filter, which OutboxMessages to fetch.
     */
    where?: OutboxMessageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OutboxMessages to fetch.
     */
    orderBy?: OutboxMessageOrderByWithRelationInput | OutboxMessageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing OutboxMessages.
     */
    cursor?: OutboxMessageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OutboxMessages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OutboxMessages.
     */
    skip?: number;
    distinct?: OutboxMessageScalarFieldEnum | OutboxMessageScalarFieldEnum[];
  };

  /**
   * OutboxMessage create
   */
  export type OutboxMessageCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OutboxMessage
     */
    select?: OutboxMessageSelect<ExtArgs> | null;
    /**
     * The data needed to create a OutboxMessage.
     */
    data: XOR<OutboxMessageCreateInput, OutboxMessageUncheckedCreateInput>;
  };

  /**
   * OutboxMessage createMany
   */
  export type OutboxMessageCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many OutboxMessages.
     */
    data: OutboxMessageCreateManyInput | OutboxMessageCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * OutboxMessage createManyAndReturn
   */
  export type OutboxMessageCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OutboxMessage
     */
    select?: OutboxMessageSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many OutboxMessages.
     */
    data: OutboxMessageCreateManyInput | OutboxMessageCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * OutboxMessage update
   */
  export type OutboxMessageUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OutboxMessage
     */
    select?: OutboxMessageSelect<ExtArgs> | null;
    /**
     * The data needed to update a OutboxMessage.
     */
    data: XOR<OutboxMessageUpdateInput, OutboxMessageUncheckedUpdateInput>;
    /**
     * Choose, which OutboxMessage to update.
     */
    where: OutboxMessageWhereUniqueInput;
  };

  /**
   * OutboxMessage updateMany
   */
  export type OutboxMessageUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update OutboxMessages.
     */
    data: XOR<OutboxMessageUpdateManyMutationInput, OutboxMessageUncheckedUpdateManyInput>;
    /**
     * Filter which OutboxMessages to update
     */
    where?: OutboxMessageWhereInput;
  };

  /**
   * OutboxMessage upsert
   */
  export type OutboxMessageUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OutboxMessage
     */
    select?: OutboxMessageSelect<ExtArgs> | null;
    /**
     * The filter to search for the OutboxMessage to update in case it exists.
     */
    where: OutboxMessageWhereUniqueInput;
    /**
     * In case the OutboxMessage found by the `where` argument doesn't exist, create a new OutboxMessage with this data.
     */
    create: XOR<OutboxMessageCreateInput, OutboxMessageUncheckedCreateInput>;
    /**
     * In case the OutboxMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OutboxMessageUpdateInput, OutboxMessageUncheckedUpdateInput>;
  };

  /**
   * OutboxMessage delete
   */
  export type OutboxMessageDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OutboxMessage
     */
    select?: OutboxMessageSelect<ExtArgs> | null;
    /**
     * Filter which OutboxMessage to delete.
     */
    where: OutboxMessageWhereUniqueInput;
  };

  /**
   * OutboxMessage deleteMany
   */
  export type OutboxMessageDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which OutboxMessages to delete
     */
    where?: OutboxMessageWhereInput;
  };

  /**
   * OutboxMessage without action
   */
  export type OutboxMessageDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OutboxMessage
     */
    select?: OutboxMessageSelect<ExtArgs> | null;
  };

  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted';
    ReadCommitted: 'ReadCommitted';
    RepeatableRead: 'RepeatableRead';
    Serializable: 'Serializable';
  };

  export type TransactionIsolationLevel =
    (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];

  export const OrderScalarFieldEnum: {
    id: 'id';
    number: 'number';
    userId: 'userId';
    status: 'status';
    currency: 'currency';
    subtotal: 'subtotal';
    shipping: 'shipping';
    tax: 'tax';
    discount: 'discount';
    total: 'total';
    shippingAddress: 'shippingAddress';
    billingAddress: 'billingAddress';
    notes: 'notes';
    metadata: 'metadata';
    placedAt: 'placedAt';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type OrderScalarFieldEnum =
    (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum];

  export const OrderItemScalarFieldEnum: {
    id: 'id';
    orderId: 'orderId';
    productId: 'productId';
    variantId: 'variantId';
    sellerId: 'sellerId';
    title: 'title';
    sku: 'sku';
    imageUrl: 'imageUrl';
    quantity: 'quantity';
    unitPrice: 'unitPrice';
    totalPrice: 'totalPrice';
    status: 'status';
    createdAt: 'createdAt';
  };

  export type OrderItemScalarFieldEnum =
    (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum];

  export const PaymentScalarFieldEnum: {
    id: 'id';
    orderId: 'orderId';
    provider: 'provider';
    providerRef: 'providerRef';
    amount: 'amount';
    currency: 'currency';
    status: 'status';
    method: 'method';
    failureReason: 'failureReason';
    metadata: 'metadata';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type PaymentScalarFieldEnum =
    (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum];

  export const ShipmentScalarFieldEnum: {
    id: 'id';
    orderId: 'orderId';
    trackingNumber: 'trackingNumber';
    carrier: 'carrier';
    status: 'status';
    estimatedAt: 'estimatedAt';
    shippedAt: 'shippedAt';
    deliveredAt: 'deliveredAt';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type ShipmentScalarFieldEnum =
    (typeof ShipmentScalarFieldEnum)[keyof typeof ShipmentScalarFieldEnum];

  export const OrderEventScalarFieldEnum: {
    id: 'id';
    orderId: 'orderId';
    actor: 'actor';
    event: 'event';
    data: 'data';
    createdAt: 'createdAt';
  };

  export type OrderEventScalarFieldEnum =
    (typeof OrderEventScalarFieldEnum)[keyof typeof OrderEventScalarFieldEnum];

  export const OutboxMessageScalarFieldEnum: {
    id: 'id';
    topic: 'topic';
    type: 'type';
    payload: 'payload';
    status: 'status';
    error: 'error';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type OutboxMessageScalarFieldEnum =
    (typeof OutboxMessageScalarFieldEnum)[keyof typeof OutboxMessageScalarFieldEnum];

  export const SortOrder: {
    asc: 'asc';
    desc: 'desc';
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull;
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];

  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull;
    JsonNull: typeof JsonNull;
  };

  export type NullableJsonNullValueInput =
    (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];

  export const QueryMode: {
    default: 'default';
    insensitive: 'insensitive';
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];

  export const JsonNullValueFilter: {
    DbNull: typeof DbNull;
    JsonNull: typeof JsonNull;
    AnyNull: typeof AnyNull;
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];

  export const NullsOrder: {
    first: 'first';
    last: 'last';
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];

  /**
   * Field references
   */

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;

  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;

  /**
   * Reference to a field of type 'OrderStatus'
   */
  export type EnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'OrderStatus'
  >;

  /**
   * Reference to a field of type 'OrderStatus[]'
   */
  export type ListEnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'OrderStatus[]'
  >;

  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>;

  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>;

  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;

  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;

  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'DateTime[]'
  >;

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;

  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;

  /**
   * Reference to a field of type 'ItemStatus'
   */
  export type EnumItemStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'ItemStatus'
  >;

  /**
   * Reference to a field of type 'ItemStatus[]'
   */
  export type ListEnumItemStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'ItemStatus[]'
  >;

  /**
   * Reference to a field of type 'PaymentProvider'
   */
  export type EnumPaymentProviderFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'PaymentProvider'
  >;

  /**
   * Reference to a field of type 'PaymentProvider[]'
   */
  export type ListEnumPaymentProviderFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'PaymentProvider[]'
  >;

  /**
   * Reference to a field of type 'PaymentStatus'
   */
  export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'PaymentStatus'
  >;

  /**
   * Reference to a field of type 'PaymentStatus[]'
   */
  export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'PaymentStatus[]'
  >;

  /**
   * Reference to a field of type 'ShipmentStatus'
   */
  export type EnumShipmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'ShipmentStatus'
  >;

  /**
   * Reference to a field of type 'ShipmentStatus[]'
   */
  export type ListEnumShipmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'ShipmentStatus[]'
  >;

  /**
   * Reference to a field of type 'OutboxStatus'
   */
  export type EnumOutboxStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'OutboxStatus'
  >;

  /**
   * Reference to a field of type 'OutboxStatus[]'
   */
  export type ListEnumOutboxStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'OutboxStatus[]'
  >;

  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;

  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;

  /**
   * Deep Input Types
   */

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[];
    OR?: OrderWhereInput[];
    NOT?: OrderWhereInput | OrderWhereInput[];
    id?: StringFilter<'Order'> | string;
    number?: StringFilter<'Order'> | string;
    userId?: StringFilter<'Order'> | string;
    status?: EnumOrderStatusFilter<'Order'> | $Enums.OrderStatus;
    currency?: StringFilter<'Order'> | string;
    subtotal?: DecimalFilter<'Order'> | Decimal | DecimalJsLike | number | string;
    shipping?: DecimalFilter<'Order'> | Decimal | DecimalJsLike | number | string;
    tax?: DecimalFilter<'Order'> | Decimal | DecimalJsLike | number | string;
    discount?: DecimalFilter<'Order'> | Decimal | DecimalJsLike | number | string;
    total?: DecimalFilter<'Order'> | Decimal | DecimalJsLike | number | string;
    shippingAddress?: JsonFilter<'Order'>;
    billingAddress?: JsonNullableFilter<'Order'>;
    notes?: StringNullableFilter<'Order'> | string | null;
    metadata?: JsonNullableFilter<'Order'>;
    placedAt?: DateTimeNullableFilter<'Order'> | Date | string | null;
    createdAt?: DateTimeFilter<'Order'> | Date | string;
    updatedAt?: DateTimeFilter<'Order'> | Date | string;
    items?: OrderItemListRelationFilter;
    payments?: PaymentListRelationFilter;
    shipments?: ShipmentListRelationFilter;
    timeline?: OrderEventListRelationFilter;
  };

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder;
    number?: SortOrder;
    userId?: SortOrder;
    status?: SortOrder;
    currency?: SortOrder;
    subtotal?: SortOrder;
    shipping?: SortOrder;
    tax?: SortOrder;
    discount?: SortOrder;
    total?: SortOrder;
    shippingAddress?: SortOrder;
    billingAddress?: SortOrderInput | SortOrder;
    notes?: SortOrderInput | SortOrder;
    metadata?: SortOrderInput | SortOrder;
    placedAt?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    items?: OrderItemOrderByRelationAggregateInput;
    payments?: PaymentOrderByRelationAggregateInput;
    shipments?: ShipmentOrderByRelationAggregateInput;
    timeline?: OrderEventOrderByRelationAggregateInput;
  };

  export type OrderWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      number?: string;
      AND?: OrderWhereInput | OrderWhereInput[];
      OR?: OrderWhereInput[];
      NOT?: OrderWhereInput | OrderWhereInput[];
      userId?: StringFilter<'Order'> | string;
      status?: EnumOrderStatusFilter<'Order'> | $Enums.OrderStatus;
      currency?: StringFilter<'Order'> | string;
      subtotal?: DecimalFilter<'Order'> | Decimal | DecimalJsLike | number | string;
      shipping?: DecimalFilter<'Order'> | Decimal | DecimalJsLike | number | string;
      tax?: DecimalFilter<'Order'> | Decimal | DecimalJsLike | number | string;
      discount?: DecimalFilter<'Order'> | Decimal | DecimalJsLike | number | string;
      total?: DecimalFilter<'Order'> | Decimal | DecimalJsLike | number | string;
      shippingAddress?: JsonFilter<'Order'>;
      billingAddress?: JsonNullableFilter<'Order'>;
      notes?: StringNullableFilter<'Order'> | string | null;
      metadata?: JsonNullableFilter<'Order'>;
      placedAt?: DateTimeNullableFilter<'Order'> | Date | string | null;
      createdAt?: DateTimeFilter<'Order'> | Date | string;
      updatedAt?: DateTimeFilter<'Order'> | Date | string;
      items?: OrderItemListRelationFilter;
      payments?: PaymentListRelationFilter;
      shipments?: ShipmentListRelationFilter;
      timeline?: OrderEventListRelationFilter;
    },
    'id' | 'number'
  >;

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder;
    number?: SortOrder;
    userId?: SortOrder;
    status?: SortOrder;
    currency?: SortOrder;
    subtotal?: SortOrder;
    shipping?: SortOrder;
    tax?: SortOrder;
    discount?: SortOrder;
    total?: SortOrder;
    shippingAddress?: SortOrder;
    billingAddress?: SortOrderInput | SortOrder;
    notes?: SortOrderInput | SortOrder;
    metadata?: SortOrderInput | SortOrder;
    placedAt?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: OrderCountOrderByAggregateInput;
    _avg?: OrderAvgOrderByAggregateInput;
    _max?: OrderMaxOrderByAggregateInput;
    _min?: OrderMinOrderByAggregateInput;
    _sum?: OrderSumOrderByAggregateInput;
  };

  export type OrderScalarWhereWithAggregatesInput = {
    AND?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[];
    OR?: OrderScalarWhereWithAggregatesInput[];
    NOT?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Order'> | string;
    number?: StringWithAggregatesFilter<'Order'> | string;
    userId?: StringWithAggregatesFilter<'Order'> | string;
    status?: EnumOrderStatusWithAggregatesFilter<'Order'> | $Enums.OrderStatus;
    currency?: StringWithAggregatesFilter<'Order'> | string;
    subtotal?: DecimalWithAggregatesFilter<'Order'> | Decimal | DecimalJsLike | number | string;
    shipping?: DecimalWithAggregatesFilter<'Order'> | Decimal | DecimalJsLike | number | string;
    tax?: DecimalWithAggregatesFilter<'Order'> | Decimal | DecimalJsLike | number | string;
    discount?: DecimalWithAggregatesFilter<'Order'> | Decimal | DecimalJsLike | number | string;
    total?: DecimalWithAggregatesFilter<'Order'> | Decimal | DecimalJsLike | number | string;
    shippingAddress?: JsonWithAggregatesFilter<'Order'>;
    billingAddress?: JsonNullableWithAggregatesFilter<'Order'>;
    notes?: StringNullableWithAggregatesFilter<'Order'> | string | null;
    metadata?: JsonNullableWithAggregatesFilter<'Order'>;
    placedAt?: DateTimeNullableWithAggregatesFilter<'Order'> | Date | string | null;
    createdAt?: DateTimeWithAggregatesFilter<'Order'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'Order'> | Date | string;
  };

  export type OrderItemWhereInput = {
    AND?: OrderItemWhereInput | OrderItemWhereInput[];
    OR?: OrderItemWhereInput[];
    NOT?: OrderItemWhereInput | OrderItemWhereInput[];
    id?: StringFilter<'OrderItem'> | string;
    orderId?: StringFilter<'OrderItem'> | string;
    productId?: StringFilter<'OrderItem'> | string;
    variantId?: StringNullableFilter<'OrderItem'> | string | null;
    sellerId?: StringFilter<'OrderItem'> | string;
    title?: StringFilter<'OrderItem'> | string;
    sku?: StringNullableFilter<'OrderItem'> | string | null;
    imageUrl?: StringNullableFilter<'OrderItem'> | string | null;
    quantity?: IntFilter<'OrderItem'> | number;
    unitPrice?: DecimalFilter<'OrderItem'> | Decimal | DecimalJsLike | number | string;
    totalPrice?: DecimalFilter<'OrderItem'> | Decimal | DecimalJsLike | number | string;
    status?: EnumItemStatusFilter<'OrderItem'> | $Enums.ItemStatus;
    createdAt?: DateTimeFilter<'OrderItem'> | Date | string;
    order?: XOR<OrderRelationFilter, OrderWhereInput>;
  };

  export type OrderItemOrderByWithRelationInput = {
    id?: SortOrder;
    orderId?: SortOrder;
    productId?: SortOrder;
    variantId?: SortOrderInput | SortOrder;
    sellerId?: SortOrder;
    title?: SortOrder;
    sku?: SortOrderInput | SortOrder;
    imageUrl?: SortOrderInput | SortOrder;
    quantity?: SortOrder;
    unitPrice?: SortOrder;
    totalPrice?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    order?: OrderOrderByWithRelationInput;
  };

  export type OrderItemWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: OrderItemWhereInput | OrderItemWhereInput[];
      OR?: OrderItemWhereInput[];
      NOT?: OrderItemWhereInput | OrderItemWhereInput[];
      orderId?: StringFilter<'OrderItem'> | string;
      productId?: StringFilter<'OrderItem'> | string;
      variantId?: StringNullableFilter<'OrderItem'> | string | null;
      sellerId?: StringFilter<'OrderItem'> | string;
      title?: StringFilter<'OrderItem'> | string;
      sku?: StringNullableFilter<'OrderItem'> | string | null;
      imageUrl?: StringNullableFilter<'OrderItem'> | string | null;
      quantity?: IntFilter<'OrderItem'> | number;
      unitPrice?: DecimalFilter<'OrderItem'> | Decimal | DecimalJsLike | number | string;
      totalPrice?: DecimalFilter<'OrderItem'> | Decimal | DecimalJsLike | number | string;
      status?: EnumItemStatusFilter<'OrderItem'> | $Enums.ItemStatus;
      createdAt?: DateTimeFilter<'OrderItem'> | Date | string;
      order?: XOR<OrderRelationFilter, OrderWhereInput>;
    },
    'id'
  >;

  export type OrderItemOrderByWithAggregationInput = {
    id?: SortOrder;
    orderId?: SortOrder;
    productId?: SortOrder;
    variantId?: SortOrderInput | SortOrder;
    sellerId?: SortOrder;
    title?: SortOrder;
    sku?: SortOrderInput | SortOrder;
    imageUrl?: SortOrderInput | SortOrder;
    quantity?: SortOrder;
    unitPrice?: SortOrder;
    totalPrice?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    _count?: OrderItemCountOrderByAggregateInput;
    _avg?: OrderItemAvgOrderByAggregateInput;
    _max?: OrderItemMaxOrderByAggregateInput;
    _min?: OrderItemMinOrderByAggregateInput;
    _sum?: OrderItemSumOrderByAggregateInput;
  };

  export type OrderItemScalarWhereWithAggregatesInput = {
    AND?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[];
    OR?: OrderItemScalarWhereWithAggregatesInput[];
    NOT?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'OrderItem'> | string;
    orderId?: StringWithAggregatesFilter<'OrderItem'> | string;
    productId?: StringWithAggregatesFilter<'OrderItem'> | string;
    variantId?: StringNullableWithAggregatesFilter<'OrderItem'> | string | null;
    sellerId?: StringWithAggregatesFilter<'OrderItem'> | string;
    title?: StringWithAggregatesFilter<'OrderItem'> | string;
    sku?: StringNullableWithAggregatesFilter<'OrderItem'> | string | null;
    imageUrl?: StringNullableWithAggregatesFilter<'OrderItem'> | string | null;
    quantity?: IntWithAggregatesFilter<'OrderItem'> | number;
    unitPrice?:
      | DecimalWithAggregatesFilter<'OrderItem'>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    totalPrice?:
      | DecimalWithAggregatesFilter<'OrderItem'>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    status?: EnumItemStatusWithAggregatesFilter<'OrderItem'> | $Enums.ItemStatus;
    createdAt?: DateTimeWithAggregatesFilter<'OrderItem'> | Date | string;
  };

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[];
    OR?: PaymentWhereInput[];
    NOT?: PaymentWhereInput | PaymentWhereInput[];
    id?: StringFilter<'Payment'> | string;
    orderId?: StringFilter<'Payment'> | string;
    provider?: EnumPaymentProviderFilter<'Payment'> | $Enums.PaymentProvider;
    providerRef?: StringNullableFilter<'Payment'> | string | null;
    amount?: DecimalFilter<'Payment'> | Decimal | DecimalJsLike | number | string;
    currency?: StringFilter<'Payment'> | string;
    status?: EnumPaymentStatusFilter<'Payment'> | $Enums.PaymentStatus;
    method?: StringNullableFilter<'Payment'> | string | null;
    failureReason?: StringNullableFilter<'Payment'> | string | null;
    metadata?: JsonNullableFilter<'Payment'>;
    createdAt?: DateTimeFilter<'Payment'> | Date | string;
    updatedAt?: DateTimeFilter<'Payment'> | Date | string;
    order?: XOR<OrderRelationFilter, OrderWhereInput>;
  };

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder;
    orderId?: SortOrder;
    provider?: SortOrder;
    providerRef?: SortOrderInput | SortOrder;
    amount?: SortOrder;
    currency?: SortOrder;
    status?: SortOrder;
    method?: SortOrderInput | SortOrder;
    failureReason?: SortOrderInput | SortOrder;
    metadata?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    order?: OrderOrderByWithRelationInput;
  };

  export type PaymentWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: PaymentWhereInput | PaymentWhereInput[];
      OR?: PaymentWhereInput[];
      NOT?: PaymentWhereInput | PaymentWhereInput[];
      orderId?: StringFilter<'Payment'> | string;
      provider?: EnumPaymentProviderFilter<'Payment'> | $Enums.PaymentProvider;
      providerRef?: StringNullableFilter<'Payment'> | string | null;
      amount?: DecimalFilter<'Payment'> | Decimal | DecimalJsLike | number | string;
      currency?: StringFilter<'Payment'> | string;
      status?: EnumPaymentStatusFilter<'Payment'> | $Enums.PaymentStatus;
      method?: StringNullableFilter<'Payment'> | string | null;
      failureReason?: StringNullableFilter<'Payment'> | string | null;
      metadata?: JsonNullableFilter<'Payment'>;
      createdAt?: DateTimeFilter<'Payment'> | Date | string;
      updatedAt?: DateTimeFilter<'Payment'> | Date | string;
      order?: XOR<OrderRelationFilter, OrderWhereInput>;
    },
    'id'
  >;

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder;
    orderId?: SortOrder;
    provider?: SortOrder;
    providerRef?: SortOrderInput | SortOrder;
    amount?: SortOrder;
    currency?: SortOrder;
    status?: SortOrder;
    method?: SortOrderInput | SortOrder;
    failureReason?: SortOrderInput | SortOrder;
    metadata?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: PaymentCountOrderByAggregateInput;
    _avg?: PaymentAvgOrderByAggregateInput;
    _max?: PaymentMaxOrderByAggregateInput;
    _min?: PaymentMinOrderByAggregateInput;
    _sum?: PaymentSumOrderByAggregateInput;
  };

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[];
    OR?: PaymentScalarWhereWithAggregatesInput[];
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Payment'> | string;
    orderId?: StringWithAggregatesFilter<'Payment'> | string;
    provider?: EnumPaymentProviderWithAggregatesFilter<'Payment'> | $Enums.PaymentProvider;
    providerRef?: StringNullableWithAggregatesFilter<'Payment'> | string | null;
    amount?: DecimalWithAggregatesFilter<'Payment'> | Decimal | DecimalJsLike | number | string;
    currency?: StringWithAggregatesFilter<'Payment'> | string;
    status?: EnumPaymentStatusWithAggregatesFilter<'Payment'> | $Enums.PaymentStatus;
    method?: StringNullableWithAggregatesFilter<'Payment'> | string | null;
    failureReason?: StringNullableWithAggregatesFilter<'Payment'> | string | null;
    metadata?: JsonNullableWithAggregatesFilter<'Payment'>;
    createdAt?: DateTimeWithAggregatesFilter<'Payment'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'Payment'> | Date | string;
  };

  export type ShipmentWhereInput = {
    AND?: ShipmentWhereInput | ShipmentWhereInput[];
    OR?: ShipmentWhereInput[];
    NOT?: ShipmentWhereInput | ShipmentWhereInput[];
    id?: StringFilter<'Shipment'> | string;
    orderId?: StringFilter<'Shipment'> | string;
    trackingNumber?: StringNullableFilter<'Shipment'> | string | null;
    carrier?: StringNullableFilter<'Shipment'> | string | null;
    status?: EnumShipmentStatusFilter<'Shipment'> | $Enums.ShipmentStatus;
    estimatedAt?: DateTimeNullableFilter<'Shipment'> | Date | string | null;
    shippedAt?: DateTimeNullableFilter<'Shipment'> | Date | string | null;
    deliveredAt?: DateTimeNullableFilter<'Shipment'> | Date | string | null;
    createdAt?: DateTimeFilter<'Shipment'> | Date | string;
    updatedAt?: DateTimeFilter<'Shipment'> | Date | string;
    order?: XOR<OrderRelationFilter, OrderWhereInput>;
  };

  export type ShipmentOrderByWithRelationInput = {
    id?: SortOrder;
    orderId?: SortOrder;
    trackingNumber?: SortOrderInput | SortOrder;
    carrier?: SortOrderInput | SortOrder;
    status?: SortOrder;
    estimatedAt?: SortOrderInput | SortOrder;
    shippedAt?: SortOrderInput | SortOrder;
    deliveredAt?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    order?: OrderOrderByWithRelationInput;
  };

  export type ShipmentWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: ShipmentWhereInput | ShipmentWhereInput[];
      OR?: ShipmentWhereInput[];
      NOT?: ShipmentWhereInput | ShipmentWhereInput[];
      orderId?: StringFilter<'Shipment'> | string;
      trackingNumber?: StringNullableFilter<'Shipment'> | string | null;
      carrier?: StringNullableFilter<'Shipment'> | string | null;
      status?: EnumShipmentStatusFilter<'Shipment'> | $Enums.ShipmentStatus;
      estimatedAt?: DateTimeNullableFilter<'Shipment'> | Date | string | null;
      shippedAt?: DateTimeNullableFilter<'Shipment'> | Date | string | null;
      deliveredAt?: DateTimeNullableFilter<'Shipment'> | Date | string | null;
      createdAt?: DateTimeFilter<'Shipment'> | Date | string;
      updatedAt?: DateTimeFilter<'Shipment'> | Date | string;
      order?: XOR<OrderRelationFilter, OrderWhereInput>;
    },
    'id'
  >;

  export type ShipmentOrderByWithAggregationInput = {
    id?: SortOrder;
    orderId?: SortOrder;
    trackingNumber?: SortOrderInput | SortOrder;
    carrier?: SortOrderInput | SortOrder;
    status?: SortOrder;
    estimatedAt?: SortOrderInput | SortOrder;
    shippedAt?: SortOrderInput | SortOrder;
    deliveredAt?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: ShipmentCountOrderByAggregateInput;
    _max?: ShipmentMaxOrderByAggregateInput;
    _min?: ShipmentMinOrderByAggregateInput;
  };

  export type ShipmentScalarWhereWithAggregatesInput = {
    AND?: ShipmentScalarWhereWithAggregatesInput | ShipmentScalarWhereWithAggregatesInput[];
    OR?: ShipmentScalarWhereWithAggregatesInput[];
    NOT?: ShipmentScalarWhereWithAggregatesInput | ShipmentScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Shipment'> | string;
    orderId?: StringWithAggregatesFilter<'Shipment'> | string;
    trackingNumber?: StringNullableWithAggregatesFilter<'Shipment'> | string | null;
    carrier?: StringNullableWithAggregatesFilter<'Shipment'> | string | null;
    status?: EnumShipmentStatusWithAggregatesFilter<'Shipment'> | $Enums.ShipmentStatus;
    estimatedAt?: DateTimeNullableWithAggregatesFilter<'Shipment'> | Date | string | null;
    shippedAt?: DateTimeNullableWithAggregatesFilter<'Shipment'> | Date | string | null;
    deliveredAt?: DateTimeNullableWithAggregatesFilter<'Shipment'> | Date | string | null;
    createdAt?: DateTimeWithAggregatesFilter<'Shipment'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'Shipment'> | Date | string;
  };

  export type OrderEventWhereInput = {
    AND?: OrderEventWhereInput | OrderEventWhereInput[];
    OR?: OrderEventWhereInput[];
    NOT?: OrderEventWhereInput | OrderEventWhereInput[];
    id?: StringFilter<'OrderEvent'> | string;
    orderId?: StringFilter<'OrderEvent'> | string;
    actor?: StringFilter<'OrderEvent'> | string;
    event?: StringFilter<'OrderEvent'> | string;
    data?: JsonNullableFilter<'OrderEvent'>;
    createdAt?: DateTimeFilter<'OrderEvent'> | Date | string;
    order?: XOR<OrderRelationFilter, OrderWhereInput>;
  };

  export type OrderEventOrderByWithRelationInput = {
    id?: SortOrder;
    orderId?: SortOrder;
    actor?: SortOrder;
    event?: SortOrder;
    data?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    order?: OrderOrderByWithRelationInput;
  };

  export type OrderEventWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: OrderEventWhereInput | OrderEventWhereInput[];
      OR?: OrderEventWhereInput[];
      NOT?: OrderEventWhereInput | OrderEventWhereInput[];
      orderId?: StringFilter<'OrderEvent'> | string;
      actor?: StringFilter<'OrderEvent'> | string;
      event?: StringFilter<'OrderEvent'> | string;
      data?: JsonNullableFilter<'OrderEvent'>;
      createdAt?: DateTimeFilter<'OrderEvent'> | Date | string;
      order?: XOR<OrderRelationFilter, OrderWhereInput>;
    },
    'id'
  >;

  export type OrderEventOrderByWithAggregationInput = {
    id?: SortOrder;
    orderId?: SortOrder;
    actor?: SortOrder;
    event?: SortOrder;
    data?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    _count?: OrderEventCountOrderByAggregateInput;
    _max?: OrderEventMaxOrderByAggregateInput;
    _min?: OrderEventMinOrderByAggregateInput;
  };

  export type OrderEventScalarWhereWithAggregatesInput = {
    AND?: OrderEventScalarWhereWithAggregatesInput | OrderEventScalarWhereWithAggregatesInput[];
    OR?: OrderEventScalarWhereWithAggregatesInput[];
    NOT?: OrderEventScalarWhereWithAggregatesInput | OrderEventScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'OrderEvent'> | string;
    orderId?: StringWithAggregatesFilter<'OrderEvent'> | string;
    actor?: StringWithAggregatesFilter<'OrderEvent'> | string;
    event?: StringWithAggregatesFilter<'OrderEvent'> | string;
    data?: JsonNullableWithAggregatesFilter<'OrderEvent'>;
    createdAt?: DateTimeWithAggregatesFilter<'OrderEvent'> | Date | string;
  };

  export type OutboxMessageWhereInput = {
    AND?: OutboxMessageWhereInput | OutboxMessageWhereInput[];
    OR?: OutboxMessageWhereInput[];
    NOT?: OutboxMessageWhereInput | OutboxMessageWhereInput[];
    id?: StringFilter<'OutboxMessage'> | string;
    topic?: StringFilter<'OutboxMessage'> | string;
    type?: StringFilter<'OutboxMessage'> | string;
    payload?: JsonFilter<'OutboxMessage'>;
    status?: EnumOutboxStatusFilter<'OutboxMessage'> | $Enums.OutboxStatus;
    error?: StringNullableFilter<'OutboxMessage'> | string | null;
    createdAt?: DateTimeFilter<'OutboxMessage'> | Date | string;
    updatedAt?: DateTimeFilter<'OutboxMessage'> | Date | string;
  };

  export type OutboxMessageOrderByWithRelationInput = {
    id?: SortOrder;
    topic?: SortOrder;
    type?: SortOrder;
    payload?: SortOrder;
    status?: SortOrder;
    error?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type OutboxMessageWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: OutboxMessageWhereInput | OutboxMessageWhereInput[];
      OR?: OutboxMessageWhereInput[];
      NOT?: OutboxMessageWhereInput | OutboxMessageWhereInput[];
      topic?: StringFilter<'OutboxMessage'> | string;
      type?: StringFilter<'OutboxMessage'> | string;
      payload?: JsonFilter<'OutboxMessage'>;
      status?: EnumOutboxStatusFilter<'OutboxMessage'> | $Enums.OutboxStatus;
      error?: StringNullableFilter<'OutboxMessage'> | string | null;
      createdAt?: DateTimeFilter<'OutboxMessage'> | Date | string;
      updatedAt?: DateTimeFilter<'OutboxMessage'> | Date | string;
    },
    'id'
  >;

  export type OutboxMessageOrderByWithAggregationInput = {
    id?: SortOrder;
    topic?: SortOrder;
    type?: SortOrder;
    payload?: SortOrder;
    status?: SortOrder;
    error?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: OutboxMessageCountOrderByAggregateInput;
    _max?: OutboxMessageMaxOrderByAggregateInput;
    _min?: OutboxMessageMinOrderByAggregateInput;
  };

  export type OutboxMessageScalarWhereWithAggregatesInput = {
    AND?:
      | OutboxMessageScalarWhereWithAggregatesInput
      | OutboxMessageScalarWhereWithAggregatesInput[];
    OR?: OutboxMessageScalarWhereWithAggregatesInput[];
    NOT?:
      | OutboxMessageScalarWhereWithAggregatesInput
      | OutboxMessageScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'OutboxMessage'> | string;
    topic?: StringWithAggregatesFilter<'OutboxMessage'> | string;
    type?: StringWithAggregatesFilter<'OutboxMessage'> | string;
    payload?: JsonWithAggregatesFilter<'OutboxMessage'>;
    status?: EnumOutboxStatusWithAggregatesFilter<'OutboxMessage'> | $Enums.OutboxStatus;
    error?: StringNullableWithAggregatesFilter<'OutboxMessage'> | string | null;
    createdAt?: DateTimeWithAggregatesFilter<'OutboxMessage'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'OutboxMessage'> | Date | string;
  };

  export type OrderCreateInput = {
    id?: string;
    number: string;
    userId: string;
    status?: $Enums.OrderStatus;
    currency?: string;
    subtotal: Decimal | DecimalJsLike | number | string;
    shipping?: Decimal | DecimalJsLike | number | string;
    tax?: Decimal | DecimalJsLike | number | string;
    discount?: Decimal | DecimalJsLike | number | string;
    total: Decimal | DecimalJsLike | number | string;
    shippingAddress: JsonNullValueInput | InputJsonValue;
    billingAddress?: NullableJsonNullValueInput | InputJsonValue;
    notes?: string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    placedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: OrderItemCreateNestedManyWithoutOrderInput;
    payments?: PaymentCreateNestedManyWithoutOrderInput;
    shipments?: ShipmentCreateNestedManyWithoutOrderInput;
    timeline?: OrderEventCreateNestedManyWithoutOrderInput;
  };

  export type OrderUncheckedCreateInput = {
    id?: string;
    number: string;
    userId: string;
    status?: $Enums.OrderStatus;
    currency?: string;
    subtotal: Decimal | DecimalJsLike | number | string;
    shipping?: Decimal | DecimalJsLike | number | string;
    tax?: Decimal | DecimalJsLike | number | string;
    discount?: Decimal | DecimalJsLike | number | string;
    total: Decimal | DecimalJsLike | number | string;
    shippingAddress: JsonNullValueInput | InputJsonValue;
    billingAddress?: NullableJsonNullValueInput | InputJsonValue;
    notes?: string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    placedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput;
    payments?: PaymentUncheckedCreateNestedManyWithoutOrderInput;
    shipments?: ShipmentUncheckedCreateNestedManyWithoutOrderInput;
    timeline?: OrderEventUncheckedCreateNestedManyWithoutOrderInput;
  };

  export type OrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    number?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    currency?: StringFieldUpdateOperationsInput | string;
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    shipping?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    tax?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    shippingAddress?: JsonNullValueInput | InputJsonValue;
    billingAddress?: NullableJsonNullValueInput | InputJsonValue;
    notes?: NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    placedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    items?: OrderItemUpdateManyWithoutOrderNestedInput;
    payments?: PaymentUpdateManyWithoutOrderNestedInput;
    shipments?: ShipmentUpdateManyWithoutOrderNestedInput;
    timeline?: OrderEventUpdateManyWithoutOrderNestedInput;
  };

  export type OrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    number?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    currency?: StringFieldUpdateOperationsInput | string;
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    shipping?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    tax?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    shippingAddress?: JsonNullValueInput | InputJsonValue;
    billingAddress?: NullableJsonNullValueInput | InputJsonValue;
    notes?: NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    placedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput;
    payments?: PaymentUncheckedUpdateManyWithoutOrderNestedInput;
    shipments?: ShipmentUncheckedUpdateManyWithoutOrderNestedInput;
    timeline?: OrderEventUncheckedUpdateManyWithoutOrderNestedInput;
  };

  export type OrderCreateManyInput = {
    id?: string;
    number: string;
    userId: string;
    status?: $Enums.OrderStatus;
    currency?: string;
    subtotal: Decimal | DecimalJsLike | number | string;
    shipping?: Decimal | DecimalJsLike | number | string;
    tax?: Decimal | DecimalJsLike | number | string;
    discount?: Decimal | DecimalJsLike | number | string;
    total: Decimal | DecimalJsLike | number | string;
    shippingAddress: JsonNullValueInput | InputJsonValue;
    billingAddress?: NullableJsonNullValueInput | InputJsonValue;
    notes?: string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    placedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type OrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    number?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    currency?: StringFieldUpdateOperationsInput | string;
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    shipping?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    tax?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    shippingAddress?: JsonNullValueInput | InputJsonValue;
    billingAddress?: NullableJsonNullValueInput | InputJsonValue;
    notes?: NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    placedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type OrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    number?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    currency?: StringFieldUpdateOperationsInput | string;
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    shipping?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    tax?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    shippingAddress?: JsonNullValueInput | InputJsonValue;
    billingAddress?: NullableJsonNullValueInput | InputJsonValue;
    notes?: NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    placedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type OrderItemCreateInput = {
    id?: string;
    productId: string;
    variantId?: string | null;
    sellerId: string;
    title: string;
    sku?: string | null;
    imageUrl?: string | null;
    quantity: number;
    unitPrice: Decimal | DecimalJsLike | number | string;
    totalPrice: Decimal | DecimalJsLike | number | string;
    status?: $Enums.ItemStatus;
    createdAt?: Date | string;
    order: OrderCreateNestedOneWithoutItemsInput;
  };

  export type OrderItemUncheckedCreateInput = {
    id?: string;
    orderId: string;
    productId: string;
    variantId?: string | null;
    sellerId: string;
    title: string;
    sku?: string | null;
    imageUrl?: string | null;
    quantity: number;
    unitPrice: Decimal | DecimalJsLike | number | string;
    totalPrice: Decimal | DecimalJsLike | number | string;
    status?: $Enums.ItemStatus;
    createdAt?: Date | string;
  };

  export type OrderItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    productId?: StringFieldUpdateOperationsInput | string;
    variantId?: NullableStringFieldUpdateOperationsInput | string | null;
    sellerId?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    sku?: NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: IntFieldUpdateOperationsInput | number;
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    status?: EnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput;
  };

  export type OrderItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    orderId?: StringFieldUpdateOperationsInput | string;
    productId?: StringFieldUpdateOperationsInput | string;
    variantId?: NullableStringFieldUpdateOperationsInput | string | null;
    sellerId?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    sku?: NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: IntFieldUpdateOperationsInput | number;
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    status?: EnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type OrderItemCreateManyInput = {
    id?: string;
    orderId: string;
    productId: string;
    variantId?: string | null;
    sellerId: string;
    title: string;
    sku?: string | null;
    imageUrl?: string | null;
    quantity: number;
    unitPrice: Decimal | DecimalJsLike | number | string;
    totalPrice: Decimal | DecimalJsLike | number | string;
    status?: $Enums.ItemStatus;
    createdAt?: Date | string;
  };

  export type OrderItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    productId?: StringFieldUpdateOperationsInput | string;
    variantId?: NullableStringFieldUpdateOperationsInput | string | null;
    sellerId?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    sku?: NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: IntFieldUpdateOperationsInput | number;
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    status?: EnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type OrderItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    orderId?: StringFieldUpdateOperationsInput | string;
    productId?: StringFieldUpdateOperationsInput | string;
    variantId?: NullableStringFieldUpdateOperationsInput | string | null;
    sellerId?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    sku?: NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: IntFieldUpdateOperationsInput | number;
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    status?: EnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type PaymentCreateInput = {
    id?: string;
    provider: $Enums.PaymentProvider;
    providerRef?: string | null;
    amount: Decimal | DecimalJsLike | number | string;
    currency?: string;
    status?: $Enums.PaymentStatus;
    method?: string | null;
    failureReason?: string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    order: OrderCreateNestedOneWithoutPaymentsInput;
  };

  export type PaymentUncheckedCreateInput = {
    id?: string;
    orderId: string;
    provider: $Enums.PaymentProvider;
    providerRef?: string | null;
    amount: Decimal | DecimalJsLike | number | string;
    currency?: string;
    status?: $Enums.PaymentStatus;
    method?: string | null;
    failureReason?: string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type PaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    provider?: EnumPaymentProviderFieldUpdateOperationsInput | $Enums.PaymentProvider;
    providerRef?: NullableStringFieldUpdateOperationsInput | string | null;
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    currency?: StringFieldUpdateOperationsInput | string;
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    method?: NullableStringFieldUpdateOperationsInput | string | null;
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    order?: OrderUpdateOneRequiredWithoutPaymentsNestedInput;
  };

  export type PaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    orderId?: StringFieldUpdateOperationsInput | string;
    provider?: EnumPaymentProviderFieldUpdateOperationsInput | $Enums.PaymentProvider;
    providerRef?: NullableStringFieldUpdateOperationsInput | string | null;
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    currency?: StringFieldUpdateOperationsInput | string;
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    method?: NullableStringFieldUpdateOperationsInput | string | null;
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type PaymentCreateManyInput = {
    id?: string;
    orderId: string;
    provider: $Enums.PaymentProvider;
    providerRef?: string | null;
    amount: Decimal | DecimalJsLike | number | string;
    currency?: string;
    status?: $Enums.PaymentStatus;
    method?: string | null;
    failureReason?: string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type PaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    provider?: EnumPaymentProviderFieldUpdateOperationsInput | $Enums.PaymentProvider;
    providerRef?: NullableStringFieldUpdateOperationsInput | string | null;
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    currency?: StringFieldUpdateOperationsInput | string;
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    method?: NullableStringFieldUpdateOperationsInput | string | null;
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type PaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    orderId?: StringFieldUpdateOperationsInput | string;
    provider?: EnumPaymentProviderFieldUpdateOperationsInput | $Enums.PaymentProvider;
    providerRef?: NullableStringFieldUpdateOperationsInput | string | null;
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    currency?: StringFieldUpdateOperationsInput | string;
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    method?: NullableStringFieldUpdateOperationsInput | string | null;
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ShipmentCreateInput = {
    id?: string;
    trackingNumber?: string | null;
    carrier?: string | null;
    status?: $Enums.ShipmentStatus;
    estimatedAt?: Date | string | null;
    shippedAt?: Date | string | null;
    deliveredAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    order: OrderCreateNestedOneWithoutShipmentsInput;
  };

  export type ShipmentUncheckedCreateInput = {
    id?: string;
    orderId: string;
    trackingNumber?: string | null;
    carrier?: string | null;
    status?: $Enums.ShipmentStatus;
    estimatedAt?: Date | string | null;
    shippedAt?: Date | string | null;
    deliveredAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ShipmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null;
    carrier?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumShipmentStatusFieldUpdateOperationsInput | $Enums.ShipmentStatus;
    estimatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    shippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    order?: OrderUpdateOneRequiredWithoutShipmentsNestedInput;
  };

  export type ShipmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    orderId?: StringFieldUpdateOperationsInput | string;
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null;
    carrier?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumShipmentStatusFieldUpdateOperationsInput | $Enums.ShipmentStatus;
    estimatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    shippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ShipmentCreateManyInput = {
    id?: string;
    orderId: string;
    trackingNumber?: string | null;
    carrier?: string | null;
    status?: $Enums.ShipmentStatus;
    estimatedAt?: Date | string | null;
    shippedAt?: Date | string | null;
    deliveredAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ShipmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null;
    carrier?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumShipmentStatusFieldUpdateOperationsInput | $Enums.ShipmentStatus;
    estimatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    shippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ShipmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    orderId?: StringFieldUpdateOperationsInput | string;
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null;
    carrier?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumShipmentStatusFieldUpdateOperationsInput | $Enums.ShipmentStatus;
    estimatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    shippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type OrderEventCreateInput = {
    id?: string;
    actor: string;
    event: string;
    data?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    order: OrderCreateNestedOneWithoutTimelineInput;
  };

  export type OrderEventUncheckedCreateInput = {
    id?: string;
    orderId: string;
    actor: string;
    event: string;
    data?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
  };

  export type OrderEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    actor?: StringFieldUpdateOperationsInput | string;
    event?: StringFieldUpdateOperationsInput | string;
    data?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    order?: OrderUpdateOneRequiredWithoutTimelineNestedInput;
  };

  export type OrderEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    orderId?: StringFieldUpdateOperationsInput | string;
    actor?: StringFieldUpdateOperationsInput | string;
    event?: StringFieldUpdateOperationsInput | string;
    data?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type OrderEventCreateManyInput = {
    id?: string;
    orderId: string;
    actor: string;
    event: string;
    data?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
  };

  export type OrderEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    actor?: StringFieldUpdateOperationsInput | string;
    event?: StringFieldUpdateOperationsInput | string;
    data?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type OrderEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    orderId?: StringFieldUpdateOperationsInput | string;
    actor?: StringFieldUpdateOperationsInput | string;
    event?: StringFieldUpdateOperationsInput | string;
    data?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type OutboxMessageCreateInput = {
    id?: string;
    topic: string;
    type: string;
    payload: JsonNullValueInput | InputJsonValue;
    status?: $Enums.OutboxStatus;
    error?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type OutboxMessageUncheckedCreateInput = {
    id?: string;
    topic: string;
    type: string;
    payload: JsonNullValueInput | InputJsonValue;
    status?: $Enums.OutboxStatus;
    error?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type OutboxMessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    topic?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    payload?: JsonNullValueInput | InputJsonValue;
    status?: EnumOutboxStatusFieldUpdateOperationsInput | $Enums.OutboxStatus;
    error?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type OutboxMessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    topic?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    payload?: JsonNullValueInput | InputJsonValue;
    status?: EnumOutboxStatusFieldUpdateOperationsInput | $Enums.OutboxStatus;
    error?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type OutboxMessageCreateManyInput = {
    id?: string;
    topic: string;
    type: string;
    payload: JsonNullValueInput | InputJsonValue;
    status?: $Enums.OutboxStatus;
    error?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type OutboxMessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    topic?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    payload?: JsonNullValueInput | InputJsonValue;
    status?: EnumOutboxStatusFieldUpdateOperationsInput | $Enums.OutboxStatus;
    error?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type OutboxMessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    topic?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    payload?: JsonNullValueInput | InputJsonValue;
    status?: EnumOutboxStatusFieldUpdateOperationsInput | $Enums.OutboxStatus;
    error?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type EnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus;
  };

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>;
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>;
    notIn?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>;
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>;
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>;
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>;
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string;
  };
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonFilterBase<$PrismaModel>>,
          Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>;

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    path?: string[];
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
  };
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonNullableFilterBase<$PrismaModel>>,
          Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>;

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    path?: string[];
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
  };

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type OrderItemListRelationFilter = {
    every?: OrderItemWhereInput;
    some?: OrderItemWhereInput;
    none?: OrderItemWhereInput;
  };

  export type PaymentListRelationFilter = {
    every?: PaymentWhereInput;
    some?: PaymentWhereInput;
    none?: PaymentWhereInput;
  };

  export type ShipmentListRelationFilter = {
    every?: ShipmentWhereInput;
    some?: ShipmentWhereInput;
    none?: ShipmentWhereInput;
  };

  export type OrderEventListRelationFilter = {
    every?: OrderEventWhereInput;
    some?: OrderEventWhereInput;
    none?: OrderEventWhereInput;
  };

  export type SortOrderInput = {
    sort: SortOrder;
    nulls?: NullsOrder;
  };

  export type OrderItemOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type PaymentOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type ShipmentOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type OrderEventOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder;
    number?: SortOrder;
    userId?: SortOrder;
    status?: SortOrder;
    currency?: SortOrder;
    subtotal?: SortOrder;
    shipping?: SortOrder;
    tax?: SortOrder;
    discount?: SortOrder;
    total?: SortOrder;
    shippingAddress?: SortOrder;
    billingAddress?: SortOrder;
    notes?: SortOrder;
    metadata?: SortOrder;
    placedAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type OrderAvgOrderByAggregateInput = {
    subtotal?: SortOrder;
    shipping?: SortOrder;
    tax?: SortOrder;
    discount?: SortOrder;
    total?: SortOrder;
  };

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder;
    number?: SortOrder;
    userId?: SortOrder;
    status?: SortOrder;
    currency?: SortOrder;
    subtotal?: SortOrder;
    shipping?: SortOrder;
    tax?: SortOrder;
    discount?: SortOrder;
    total?: SortOrder;
    notes?: SortOrder;
    placedAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder;
    number?: SortOrder;
    userId?: SortOrder;
    status?: SortOrder;
    currency?: SortOrder;
    subtotal?: SortOrder;
    shipping?: SortOrder;
    tax?: SortOrder;
    discount?: SortOrder;
    total?: SortOrder;
    notes?: SortOrder;
    placedAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type OrderSumOrderByAggregateInput = {
    subtotal?: SortOrder;
    shipping?: SortOrder;
    tax?: SortOrder;
    discount?: SortOrder;
    total?: SortOrder;
  };

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type EnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>;
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>;
  };

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>;
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>;
    notIn?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>;
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>;
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>;
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>;
    not?:
      | NestedDecimalWithAggregatesFilter<$PrismaModel>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedDecimalFilter<$PrismaModel>;
    _sum?: NestedDecimalFilter<$PrismaModel>;
    _min?: NestedDecimalFilter<$PrismaModel>;
    _max?: NestedDecimalFilter<$PrismaModel>;
  };
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonWithAggregatesFilterBase<$PrismaModel>>,
          Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>;

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    path?: string[];
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedJsonFilter<$PrismaModel>;
    _max?: NestedJsonFilter<$PrismaModel>;
  };
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>,
          Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>;

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    path?: string[];
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedJsonNullableFilter<$PrismaModel>;
    _max?: NestedJsonNullableFilter<$PrismaModel>;
  };

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: NestedDateTimeNullableFilter<$PrismaModel>;
  };

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type EnumItemStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ItemStatus | EnumItemStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ItemStatus[] | ListEnumItemStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ItemStatus[] | ListEnumItemStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumItemStatusFilter<$PrismaModel> | $Enums.ItemStatus;
  };

  export type OrderRelationFilter = {
    is?: OrderWhereInput;
    isNot?: OrderWhereInput;
  };

  export type OrderItemCountOrderByAggregateInput = {
    id?: SortOrder;
    orderId?: SortOrder;
    productId?: SortOrder;
    variantId?: SortOrder;
    sellerId?: SortOrder;
    title?: SortOrder;
    sku?: SortOrder;
    imageUrl?: SortOrder;
    quantity?: SortOrder;
    unitPrice?: SortOrder;
    totalPrice?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
  };

  export type OrderItemAvgOrderByAggregateInput = {
    quantity?: SortOrder;
    unitPrice?: SortOrder;
    totalPrice?: SortOrder;
  };

  export type OrderItemMaxOrderByAggregateInput = {
    id?: SortOrder;
    orderId?: SortOrder;
    productId?: SortOrder;
    variantId?: SortOrder;
    sellerId?: SortOrder;
    title?: SortOrder;
    sku?: SortOrder;
    imageUrl?: SortOrder;
    quantity?: SortOrder;
    unitPrice?: SortOrder;
    totalPrice?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
  };

  export type OrderItemMinOrderByAggregateInput = {
    id?: SortOrder;
    orderId?: SortOrder;
    productId?: SortOrder;
    variantId?: SortOrder;
    sellerId?: SortOrder;
    title?: SortOrder;
    sku?: SortOrder;
    imageUrl?: SortOrder;
    quantity?: SortOrder;
    unitPrice?: SortOrder;
    totalPrice?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
  };

  export type OrderItemSumOrderByAggregateInput = {
    quantity?: SortOrder;
    unitPrice?: SortOrder;
    totalPrice?: SortOrder;
  };

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type EnumItemStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ItemStatus | EnumItemStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ItemStatus[] | ListEnumItemStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ItemStatus[] | ListEnumItemStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumItemStatusWithAggregatesFilter<$PrismaModel> | $Enums.ItemStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumItemStatusFilter<$PrismaModel>;
    _max?: NestedEnumItemStatusFilter<$PrismaModel>;
  };

  export type EnumPaymentProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentProvider | EnumPaymentProviderFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentProvider[] | ListEnumPaymentProviderFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentProvider[] | ListEnumPaymentProviderFieldRefInput<$PrismaModel>;
    not?: NestedEnumPaymentProviderFilter<$PrismaModel> | $Enums.PaymentProvider;
  };

  export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus;
  };

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder;
    orderId?: SortOrder;
    provider?: SortOrder;
    providerRef?: SortOrder;
    amount?: SortOrder;
    currency?: SortOrder;
    status?: SortOrder;
    method?: SortOrder;
    failureReason?: SortOrder;
    metadata?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type PaymentAvgOrderByAggregateInput = {
    amount?: SortOrder;
  };

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder;
    orderId?: SortOrder;
    provider?: SortOrder;
    providerRef?: SortOrder;
    amount?: SortOrder;
    currency?: SortOrder;
    status?: SortOrder;
    method?: SortOrder;
    failureReason?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder;
    orderId?: SortOrder;
    provider?: SortOrder;
    providerRef?: SortOrder;
    amount?: SortOrder;
    currency?: SortOrder;
    status?: SortOrder;
    method?: SortOrder;
    failureReason?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type PaymentSumOrderByAggregateInput = {
    amount?: SortOrder;
  };

  export type EnumPaymentProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentProvider | EnumPaymentProviderFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentProvider[] | ListEnumPaymentProviderFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentProvider[] | ListEnumPaymentProviderFieldRefInput<$PrismaModel>;
    not?: NestedEnumPaymentProviderWithAggregatesFilter<$PrismaModel> | $Enums.PaymentProvider;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumPaymentProviderFilter<$PrismaModel>;
    _max?: NestedEnumPaymentProviderFilter<$PrismaModel>;
  };

  export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>;
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>;
  };

  export type EnumShipmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentStatus | EnumShipmentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ShipmentStatus[] | ListEnumShipmentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ShipmentStatus[] | ListEnumShipmentStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumShipmentStatusFilter<$PrismaModel> | $Enums.ShipmentStatus;
  };

  export type ShipmentCountOrderByAggregateInput = {
    id?: SortOrder;
    orderId?: SortOrder;
    trackingNumber?: SortOrder;
    carrier?: SortOrder;
    status?: SortOrder;
    estimatedAt?: SortOrder;
    shippedAt?: SortOrder;
    deliveredAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ShipmentMaxOrderByAggregateInput = {
    id?: SortOrder;
    orderId?: SortOrder;
    trackingNumber?: SortOrder;
    carrier?: SortOrder;
    status?: SortOrder;
    estimatedAt?: SortOrder;
    shippedAt?: SortOrder;
    deliveredAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ShipmentMinOrderByAggregateInput = {
    id?: SortOrder;
    orderId?: SortOrder;
    trackingNumber?: SortOrder;
    carrier?: SortOrder;
    status?: SortOrder;
    estimatedAt?: SortOrder;
    shippedAt?: SortOrder;
    deliveredAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type EnumShipmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentStatus | EnumShipmentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ShipmentStatus[] | ListEnumShipmentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ShipmentStatus[] | ListEnumShipmentStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumShipmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.ShipmentStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumShipmentStatusFilter<$PrismaModel>;
    _max?: NestedEnumShipmentStatusFilter<$PrismaModel>;
  };

  export type OrderEventCountOrderByAggregateInput = {
    id?: SortOrder;
    orderId?: SortOrder;
    actor?: SortOrder;
    event?: SortOrder;
    data?: SortOrder;
    createdAt?: SortOrder;
  };

  export type OrderEventMaxOrderByAggregateInput = {
    id?: SortOrder;
    orderId?: SortOrder;
    actor?: SortOrder;
    event?: SortOrder;
    createdAt?: SortOrder;
  };

  export type OrderEventMinOrderByAggregateInput = {
    id?: SortOrder;
    orderId?: SortOrder;
    actor?: SortOrder;
    event?: SortOrder;
    createdAt?: SortOrder;
  };

  export type EnumOutboxStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OutboxStatus | EnumOutboxStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.OutboxStatus[] | ListEnumOutboxStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OutboxStatus[] | ListEnumOutboxStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumOutboxStatusFilter<$PrismaModel> | $Enums.OutboxStatus;
  };

  export type OutboxMessageCountOrderByAggregateInput = {
    id?: SortOrder;
    topic?: SortOrder;
    type?: SortOrder;
    payload?: SortOrder;
    status?: SortOrder;
    error?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type OutboxMessageMaxOrderByAggregateInput = {
    id?: SortOrder;
    topic?: SortOrder;
    type?: SortOrder;
    status?: SortOrder;
    error?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type OutboxMessageMinOrderByAggregateInput = {
    id?: SortOrder;
    topic?: SortOrder;
    type?: SortOrder;
    status?: SortOrder;
    error?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type EnumOutboxStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OutboxStatus | EnumOutboxStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.OutboxStatus[] | ListEnumOutboxStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OutboxStatus[] | ListEnumOutboxStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumOutboxStatusWithAggregatesFilter<$PrismaModel> | $Enums.OutboxStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumOutboxStatusFilter<$PrismaModel>;
    _max?: NestedEnumOutboxStatusFilter<$PrismaModel>;
  };

  export type OrderItemCreateNestedManyWithoutOrderInput = {
    create?:
      | XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
      | OrderItemCreateWithoutOrderInput[]
      | OrderItemUncheckedCreateWithoutOrderInput[];
    connectOrCreate?:
      | OrderItemCreateOrConnectWithoutOrderInput
      | OrderItemCreateOrConnectWithoutOrderInput[];
    createMany?: OrderItemCreateManyOrderInputEnvelope;
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
  };

  export type PaymentCreateNestedManyWithoutOrderInput = {
    create?:
      | XOR<PaymentCreateWithoutOrderInput, PaymentUncheckedCreateWithoutOrderInput>
      | PaymentCreateWithoutOrderInput[]
      | PaymentUncheckedCreateWithoutOrderInput[];
    connectOrCreate?:
      | PaymentCreateOrConnectWithoutOrderInput
      | PaymentCreateOrConnectWithoutOrderInput[];
    createMany?: PaymentCreateManyOrderInputEnvelope;
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[];
  };

  export type ShipmentCreateNestedManyWithoutOrderInput = {
    create?:
      | XOR<ShipmentCreateWithoutOrderInput, ShipmentUncheckedCreateWithoutOrderInput>
      | ShipmentCreateWithoutOrderInput[]
      | ShipmentUncheckedCreateWithoutOrderInput[];
    connectOrCreate?:
      | ShipmentCreateOrConnectWithoutOrderInput
      | ShipmentCreateOrConnectWithoutOrderInput[];
    createMany?: ShipmentCreateManyOrderInputEnvelope;
    connect?: ShipmentWhereUniqueInput | ShipmentWhereUniqueInput[];
  };

  export type OrderEventCreateNestedManyWithoutOrderInput = {
    create?:
      | XOR<OrderEventCreateWithoutOrderInput, OrderEventUncheckedCreateWithoutOrderInput>
      | OrderEventCreateWithoutOrderInput[]
      | OrderEventUncheckedCreateWithoutOrderInput[];
    connectOrCreate?:
      | OrderEventCreateOrConnectWithoutOrderInput
      | OrderEventCreateOrConnectWithoutOrderInput[];
    createMany?: OrderEventCreateManyOrderInputEnvelope;
    connect?: OrderEventWhereUniqueInput | OrderEventWhereUniqueInput[];
  };

  export type OrderItemUncheckedCreateNestedManyWithoutOrderInput = {
    create?:
      | XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
      | OrderItemCreateWithoutOrderInput[]
      | OrderItemUncheckedCreateWithoutOrderInput[];
    connectOrCreate?:
      | OrderItemCreateOrConnectWithoutOrderInput
      | OrderItemCreateOrConnectWithoutOrderInput[];
    createMany?: OrderItemCreateManyOrderInputEnvelope;
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
  };

  export type PaymentUncheckedCreateNestedManyWithoutOrderInput = {
    create?:
      | XOR<PaymentCreateWithoutOrderInput, PaymentUncheckedCreateWithoutOrderInput>
      | PaymentCreateWithoutOrderInput[]
      | PaymentUncheckedCreateWithoutOrderInput[];
    connectOrCreate?:
      | PaymentCreateOrConnectWithoutOrderInput
      | PaymentCreateOrConnectWithoutOrderInput[];
    createMany?: PaymentCreateManyOrderInputEnvelope;
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[];
  };

  export type ShipmentUncheckedCreateNestedManyWithoutOrderInput = {
    create?:
      | XOR<ShipmentCreateWithoutOrderInput, ShipmentUncheckedCreateWithoutOrderInput>
      | ShipmentCreateWithoutOrderInput[]
      | ShipmentUncheckedCreateWithoutOrderInput[];
    connectOrCreate?:
      | ShipmentCreateOrConnectWithoutOrderInput
      | ShipmentCreateOrConnectWithoutOrderInput[];
    createMany?: ShipmentCreateManyOrderInputEnvelope;
    connect?: ShipmentWhereUniqueInput | ShipmentWhereUniqueInput[];
  };

  export type OrderEventUncheckedCreateNestedManyWithoutOrderInput = {
    create?:
      | XOR<OrderEventCreateWithoutOrderInput, OrderEventUncheckedCreateWithoutOrderInput>
      | OrderEventCreateWithoutOrderInput[]
      | OrderEventUncheckedCreateWithoutOrderInput[];
    connectOrCreate?:
      | OrderEventCreateOrConnectWithoutOrderInput
      | OrderEventCreateOrConnectWithoutOrderInput[];
    createMany?: OrderEventCreateManyOrderInputEnvelope;
    connect?: OrderEventWhereUniqueInput | OrderEventWhereUniqueInput[];
  };

  export type StringFieldUpdateOperationsInput = {
    set?: string;
  };

  export type EnumOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.OrderStatus;
  };

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string;
    increment?: Decimal | DecimalJsLike | number | string;
    decrement?: Decimal | DecimalJsLike | number | string;
    multiply?: Decimal | DecimalJsLike | number | string;
    divide?: Decimal | DecimalJsLike | number | string;
  };

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
  };

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
  };

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
  };

  export type OrderItemUpdateManyWithoutOrderNestedInput = {
    create?:
      | XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
      | OrderItemCreateWithoutOrderInput[]
      | OrderItemUncheckedCreateWithoutOrderInput[];
    connectOrCreate?:
      | OrderItemCreateOrConnectWithoutOrderInput
      | OrderItemCreateOrConnectWithoutOrderInput[];
    upsert?:
      | OrderItemUpsertWithWhereUniqueWithoutOrderInput
      | OrderItemUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: OrderItemCreateManyOrderInputEnvelope;
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    update?:
      | OrderItemUpdateWithWhereUniqueWithoutOrderInput
      | OrderItemUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?:
      | OrderItemUpdateManyWithWhereWithoutOrderInput
      | OrderItemUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[];
  };

  export type PaymentUpdateManyWithoutOrderNestedInput = {
    create?:
      | XOR<PaymentCreateWithoutOrderInput, PaymentUncheckedCreateWithoutOrderInput>
      | PaymentCreateWithoutOrderInput[]
      | PaymentUncheckedCreateWithoutOrderInput[];
    connectOrCreate?:
      | PaymentCreateOrConnectWithoutOrderInput
      | PaymentCreateOrConnectWithoutOrderInput[];
    upsert?:
      | PaymentUpsertWithWhereUniqueWithoutOrderInput
      | PaymentUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: PaymentCreateManyOrderInputEnvelope;
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[];
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[];
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[];
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[];
    update?:
      | PaymentUpdateWithWhereUniqueWithoutOrderInput
      | PaymentUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?:
      | PaymentUpdateManyWithWhereWithoutOrderInput
      | PaymentUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[];
  };

  export type ShipmentUpdateManyWithoutOrderNestedInput = {
    create?:
      | XOR<ShipmentCreateWithoutOrderInput, ShipmentUncheckedCreateWithoutOrderInput>
      | ShipmentCreateWithoutOrderInput[]
      | ShipmentUncheckedCreateWithoutOrderInput[];
    connectOrCreate?:
      | ShipmentCreateOrConnectWithoutOrderInput
      | ShipmentCreateOrConnectWithoutOrderInput[];
    upsert?:
      | ShipmentUpsertWithWhereUniqueWithoutOrderInput
      | ShipmentUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: ShipmentCreateManyOrderInputEnvelope;
    set?: ShipmentWhereUniqueInput | ShipmentWhereUniqueInput[];
    disconnect?: ShipmentWhereUniqueInput | ShipmentWhereUniqueInput[];
    delete?: ShipmentWhereUniqueInput | ShipmentWhereUniqueInput[];
    connect?: ShipmentWhereUniqueInput | ShipmentWhereUniqueInput[];
    update?:
      | ShipmentUpdateWithWhereUniqueWithoutOrderInput
      | ShipmentUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?:
      | ShipmentUpdateManyWithWhereWithoutOrderInput
      | ShipmentUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: ShipmentScalarWhereInput | ShipmentScalarWhereInput[];
  };

  export type OrderEventUpdateManyWithoutOrderNestedInput = {
    create?:
      | XOR<OrderEventCreateWithoutOrderInput, OrderEventUncheckedCreateWithoutOrderInput>
      | OrderEventCreateWithoutOrderInput[]
      | OrderEventUncheckedCreateWithoutOrderInput[];
    connectOrCreate?:
      | OrderEventCreateOrConnectWithoutOrderInput
      | OrderEventCreateOrConnectWithoutOrderInput[];
    upsert?:
      | OrderEventUpsertWithWhereUniqueWithoutOrderInput
      | OrderEventUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: OrderEventCreateManyOrderInputEnvelope;
    set?: OrderEventWhereUniqueInput | OrderEventWhereUniqueInput[];
    disconnect?: OrderEventWhereUniqueInput | OrderEventWhereUniqueInput[];
    delete?: OrderEventWhereUniqueInput | OrderEventWhereUniqueInput[];
    connect?: OrderEventWhereUniqueInput | OrderEventWhereUniqueInput[];
    update?:
      | OrderEventUpdateWithWhereUniqueWithoutOrderInput
      | OrderEventUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?:
      | OrderEventUpdateManyWithWhereWithoutOrderInput
      | OrderEventUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: OrderEventScalarWhereInput | OrderEventScalarWhereInput[];
  };

  export type OrderItemUncheckedUpdateManyWithoutOrderNestedInput = {
    create?:
      | XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
      | OrderItemCreateWithoutOrderInput[]
      | OrderItemUncheckedCreateWithoutOrderInput[];
    connectOrCreate?:
      | OrderItemCreateOrConnectWithoutOrderInput
      | OrderItemCreateOrConnectWithoutOrderInput[];
    upsert?:
      | OrderItemUpsertWithWhereUniqueWithoutOrderInput
      | OrderItemUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: OrderItemCreateManyOrderInputEnvelope;
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    update?:
      | OrderItemUpdateWithWhereUniqueWithoutOrderInput
      | OrderItemUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?:
      | OrderItemUpdateManyWithWhereWithoutOrderInput
      | OrderItemUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[];
  };

  export type PaymentUncheckedUpdateManyWithoutOrderNestedInput = {
    create?:
      | XOR<PaymentCreateWithoutOrderInput, PaymentUncheckedCreateWithoutOrderInput>
      | PaymentCreateWithoutOrderInput[]
      | PaymentUncheckedCreateWithoutOrderInput[];
    connectOrCreate?:
      | PaymentCreateOrConnectWithoutOrderInput
      | PaymentCreateOrConnectWithoutOrderInput[];
    upsert?:
      | PaymentUpsertWithWhereUniqueWithoutOrderInput
      | PaymentUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: PaymentCreateManyOrderInputEnvelope;
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[];
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[];
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[];
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[];
    update?:
      | PaymentUpdateWithWhereUniqueWithoutOrderInput
      | PaymentUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?:
      | PaymentUpdateManyWithWhereWithoutOrderInput
      | PaymentUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[];
  };

  export type ShipmentUncheckedUpdateManyWithoutOrderNestedInput = {
    create?:
      | XOR<ShipmentCreateWithoutOrderInput, ShipmentUncheckedCreateWithoutOrderInput>
      | ShipmentCreateWithoutOrderInput[]
      | ShipmentUncheckedCreateWithoutOrderInput[];
    connectOrCreate?:
      | ShipmentCreateOrConnectWithoutOrderInput
      | ShipmentCreateOrConnectWithoutOrderInput[];
    upsert?:
      | ShipmentUpsertWithWhereUniqueWithoutOrderInput
      | ShipmentUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: ShipmentCreateManyOrderInputEnvelope;
    set?: ShipmentWhereUniqueInput | ShipmentWhereUniqueInput[];
    disconnect?: ShipmentWhereUniqueInput | ShipmentWhereUniqueInput[];
    delete?: ShipmentWhereUniqueInput | ShipmentWhereUniqueInput[];
    connect?: ShipmentWhereUniqueInput | ShipmentWhereUniqueInput[];
    update?:
      | ShipmentUpdateWithWhereUniqueWithoutOrderInput
      | ShipmentUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?:
      | ShipmentUpdateManyWithWhereWithoutOrderInput
      | ShipmentUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: ShipmentScalarWhereInput | ShipmentScalarWhereInput[];
  };

  export type OrderEventUncheckedUpdateManyWithoutOrderNestedInput = {
    create?:
      | XOR<OrderEventCreateWithoutOrderInput, OrderEventUncheckedCreateWithoutOrderInput>
      | OrderEventCreateWithoutOrderInput[]
      | OrderEventUncheckedCreateWithoutOrderInput[];
    connectOrCreate?:
      | OrderEventCreateOrConnectWithoutOrderInput
      | OrderEventCreateOrConnectWithoutOrderInput[];
    upsert?:
      | OrderEventUpsertWithWhereUniqueWithoutOrderInput
      | OrderEventUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: OrderEventCreateManyOrderInputEnvelope;
    set?: OrderEventWhereUniqueInput | OrderEventWhereUniqueInput[];
    disconnect?: OrderEventWhereUniqueInput | OrderEventWhereUniqueInput[];
    delete?: OrderEventWhereUniqueInput | OrderEventWhereUniqueInput[];
    connect?: OrderEventWhereUniqueInput | OrderEventWhereUniqueInput[];
    update?:
      | OrderEventUpdateWithWhereUniqueWithoutOrderInput
      | OrderEventUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?:
      | OrderEventUpdateManyWithWhereWithoutOrderInput
      | OrderEventUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: OrderEventScalarWhereInput | OrderEventScalarWhereInput[];
  };

  export type OrderCreateNestedOneWithoutItemsInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput;
    connect?: OrderWhereUniqueInput;
  };

  export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type EnumItemStatusFieldUpdateOperationsInput = {
    set?: $Enums.ItemStatus;
  };

  export type OrderUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput;
    upsert?: OrderUpsertWithoutItemsInput;
    connect?: OrderWhereUniqueInput;
    update?: XOR<
      XOR<OrderUpdateToOneWithWhereWithoutItemsInput, OrderUpdateWithoutItemsInput>,
      OrderUncheckedUpdateWithoutItemsInput
    >;
  };

  export type OrderCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<OrderCreateWithoutPaymentsInput, OrderUncheckedCreateWithoutPaymentsInput>;
    connectOrCreate?: OrderCreateOrConnectWithoutPaymentsInput;
    connect?: OrderWhereUniqueInput;
  };

  export type EnumPaymentProviderFieldUpdateOperationsInput = {
    set?: $Enums.PaymentProvider;
  };

  export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus;
  };

  export type OrderUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<OrderCreateWithoutPaymentsInput, OrderUncheckedCreateWithoutPaymentsInput>;
    connectOrCreate?: OrderCreateOrConnectWithoutPaymentsInput;
    upsert?: OrderUpsertWithoutPaymentsInput;
    connect?: OrderWhereUniqueInput;
    update?: XOR<
      XOR<OrderUpdateToOneWithWhereWithoutPaymentsInput, OrderUpdateWithoutPaymentsInput>,
      OrderUncheckedUpdateWithoutPaymentsInput
    >;
  };

  export type OrderCreateNestedOneWithoutShipmentsInput = {
    create?: XOR<OrderCreateWithoutShipmentsInput, OrderUncheckedCreateWithoutShipmentsInput>;
    connectOrCreate?: OrderCreateOrConnectWithoutShipmentsInput;
    connect?: OrderWhereUniqueInput;
  };

  export type EnumShipmentStatusFieldUpdateOperationsInput = {
    set?: $Enums.ShipmentStatus;
  };

  export type OrderUpdateOneRequiredWithoutShipmentsNestedInput = {
    create?: XOR<OrderCreateWithoutShipmentsInput, OrderUncheckedCreateWithoutShipmentsInput>;
    connectOrCreate?: OrderCreateOrConnectWithoutShipmentsInput;
    upsert?: OrderUpsertWithoutShipmentsInput;
    connect?: OrderWhereUniqueInput;
    update?: XOR<
      XOR<OrderUpdateToOneWithWhereWithoutShipmentsInput, OrderUpdateWithoutShipmentsInput>,
      OrderUncheckedUpdateWithoutShipmentsInput
    >;
  };

  export type OrderCreateNestedOneWithoutTimelineInput = {
    create?: XOR<OrderCreateWithoutTimelineInput, OrderUncheckedCreateWithoutTimelineInput>;
    connectOrCreate?: OrderCreateOrConnectWithoutTimelineInput;
    connect?: OrderWhereUniqueInput;
  };

  export type OrderUpdateOneRequiredWithoutTimelineNestedInput = {
    create?: XOR<OrderCreateWithoutTimelineInput, OrderUncheckedCreateWithoutTimelineInput>;
    connectOrCreate?: OrderCreateOrConnectWithoutTimelineInput;
    upsert?: OrderUpsertWithoutTimelineInput;
    connect?: OrderWhereUniqueInput;
    update?: XOR<
      XOR<OrderUpdateToOneWithWhereWithoutTimelineInput, OrderUpdateWithoutTimelineInput>,
      OrderUncheckedUpdateWithoutTimelineInput
    >;
  };

  export type EnumOutboxStatusFieldUpdateOperationsInput = {
    set?: $Enums.OutboxStatus;
  };

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type NestedEnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus;
  };

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>;
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>;
    notIn?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>;
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>;
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>;
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>;
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string;
  };

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>;
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>;
  };

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>;
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>;
    notIn?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>;
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>;
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>;
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>;
    not?:
      | NestedDecimalWithAggregatesFilter<$PrismaModel>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedDecimalFilter<$PrismaModel>;
    _sum?: NestedDecimalFilter<$PrismaModel>;
    _min?: NestedDecimalFilter<$PrismaModel>;
    _max?: NestedDecimalFilter<$PrismaModel>;
  };
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<NestedJsonFilterBase<$PrismaModel>>,
          Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>;

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    path?: string[];
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
  };

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<NestedJsonNullableFilterBase<$PrismaModel>>,
          Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>;

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    path?: string[];
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
  };

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: NestedDateTimeNullableFilter<$PrismaModel>;
  };

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type NestedEnumItemStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ItemStatus | EnumItemStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ItemStatus[] | ListEnumItemStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ItemStatus[] | ListEnumItemStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumItemStatusFilter<$PrismaModel> | $Enums.ItemStatus;
  };

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatFilter<$PrismaModel> | number;
  };

  export type NestedEnumItemStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ItemStatus | EnumItemStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ItemStatus[] | ListEnumItemStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ItemStatus[] | ListEnumItemStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumItemStatusWithAggregatesFilter<$PrismaModel> | $Enums.ItemStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumItemStatusFilter<$PrismaModel>;
    _max?: NestedEnumItemStatusFilter<$PrismaModel>;
  };

  export type NestedEnumPaymentProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentProvider | EnumPaymentProviderFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentProvider[] | ListEnumPaymentProviderFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentProvider[] | ListEnumPaymentProviderFieldRefInput<$PrismaModel>;
    not?: NestedEnumPaymentProviderFilter<$PrismaModel> | $Enums.PaymentProvider;
  };

  export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus;
  };

  export type NestedEnumPaymentProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentProvider | EnumPaymentProviderFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentProvider[] | ListEnumPaymentProviderFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentProvider[] | ListEnumPaymentProviderFieldRefInput<$PrismaModel>;
    not?: NestedEnumPaymentProviderWithAggregatesFilter<$PrismaModel> | $Enums.PaymentProvider;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumPaymentProviderFilter<$PrismaModel>;
    _max?: NestedEnumPaymentProviderFilter<$PrismaModel>;
  };

  export type NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>;
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>;
  };

  export type NestedEnumShipmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentStatus | EnumShipmentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ShipmentStatus[] | ListEnumShipmentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ShipmentStatus[] | ListEnumShipmentStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumShipmentStatusFilter<$PrismaModel> | $Enums.ShipmentStatus;
  };

  export type NestedEnumShipmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentStatus | EnumShipmentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ShipmentStatus[] | ListEnumShipmentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ShipmentStatus[] | ListEnumShipmentStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumShipmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.ShipmentStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumShipmentStatusFilter<$PrismaModel>;
    _max?: NestedEnumShipmentStatusFilter<$PrismaModel>;
  };

  export type NestedEnumOutboxStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OutboxStatus | EnumOutboxStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.OutboxStatus[] | ListEnumOutboxStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OutboxStatus[] | ListEnumOutboxStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumOutboxStatusFilter<$PrismaModel> | $Enums.OutboxStatus;
  };

  export type NestedEnumOutboxStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OutboxStatus | EnumOutboxStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.OutboxStatus[] | ListEnumOutboxStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OutboxStatus[] | ListEnumOutboxStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumOutboxStatusWithAggregatesFilter<$PrismaModel> | $Enums.OutboxStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumOutboxStatusFilter<$PrismaModel>;
    _max?: NestedEnumOutboxStatusFilter<$PrismaModel>;
  };

  export type OrderItemCreateWithoutOrderInput = {
    id?: string;
    productId: string;
    variantId?: string | null;
    sellerId: string;
    title: string;
    sku?: string | null;
    imageUrl?: string | null;
    quantity: number;
    unitPrice: Decimal | DecimalJsLike | number | string;
    totalPrice: Decimal | DecimalJsLike | number | string;
    status?: $Enums.ItemStatus;
    createdAt?: Date | string;
  };

  export type OrderItemUncheckedCreateWithoutOrderInput = {
    id?: string;
    productId: string;
    variantId?: string | null;
    sellerId: string;
    title: string;
    sku?: string | null;
    imageUrl?: string | null;
    quantity: number;
    unitPrice: Decimal | DecimalJsLike | number | string;
    totalPrice: Decimal | DecimalJsLike | number | string;
    status?: $Enums.ItemStatus;
    createdAt?: Date | string;
  };

  export type OrderItemCreateOrConnectWithoutOrderInput = {
    where: OrderItemWhereUniqueInput;
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>;
  };

  export type OrderItemCreateManyOrderInputEnvelope = {
    data: OrderItemCreateManyOrderInput | OrderItemCreateManyOrderInput[];
    skipDuplicates?: boolean;
  };

  export type PaymentCreateWithoutOrderInput = {
    id?: string;
    provider: $Enums.PaymentProvider;
    providerRef?: string | null;
    amount: Decimal | DecimalJsLike | number | string;
    currency?: string;
    status?: $Enums.PaymentStatus;
    method?: string | null;
    failureReason?: string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type PaymentUncheckedCreateWithoutOrderInput = {
    id?: string;
    provider: $Enums.PaymentProvider;
    providerRef?: string | null;
    amount: Decimal | DecimalJsLike | number | string;
    currency?: string;
    status?: $Enums.PaymentStatus;
    method?: string | null;
    failureReason?: string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type PaymentCreateOrConnectWithoutOrderInput = {
    where: PaymentWhereUniqueInput;
    create: XOR<PaymentCreateWithoutOrderInput, PaymentUncheckedCreateWithoutOrderInput>;
  };

  export type PaymentCreateManyOrderInputEnvelope = {
    data: PaymentCreateManyOrderInput | PaymentCreateManyOrderInput[];
    skipDuplicates?: boolean;
  };

  export type ShipmentCreateWithoutOrderInput = {
    id?: string;
    trackingNumber?: string | null;
    carrier?: string | null;
    status?: $Enums.ShipmentStatus;
    estimatedAt?: Date | string | null;
    shippedAt?: Date | string | null;
    deliveredAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ShipmentUncheckedCreateWithoutOrderInput = {
    id?: string;
    trackingNumber?: string | null;
    carrier?: string | null;
    status?: $Enums.ShipmentStatus;
    estimatedAt?: Date | string | null;
    shippedAt?: Date | string | null;
    deliveredAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ShipmentCreateOrConnectWithoutOrderInput = {
    where: ShipmentWhereUniqueInput;
    create: XOR<ShipmentCreateWithoutOrderInput, ShipmentUncheckedCreateWithoutOrderInput>;
  };

  export type ShipmentCreateManyOrderInputEnvelope = {
    data: ShipmentCreateManyOrderInput | ShipmentCreateManyOrderInput[];
    skipDuplicates?: boolean;
  };

  export type OrderEventCreateWithoutOrderInput = {
    id?: string;
    actor: string;
    event: string;
    data?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
  };

  export type OrderEventUncheckedCreateWithoutOrderInput = {
    id?: string;
    actor: string;
    event: string;
    data?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
  };

  export type OrderEventCreateOrConnectWithoutOrderInput = {
    where: OrderEventWhereUniqueInput;
    create: XOR<OrderEventCreateWithoutOrderInput, OrderEventUncheckedCreateWithoutOrderInput>;
  };

  export type OrderEventCreateManyOrderInputEnvelope = {
    data: OrderEventCreateManyOrderInput | OrderEventCreateManyOrderInput[];
    skipDuplicates?: boolean;
  };

  export type OrderItemUpsertWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput;
    update: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>;
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>;
  };

  export type OrderItemUpdateWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput;
    data: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>;
  };

  export type OrderItemUpdateManyWithWhereWithoutOrderInput = {
    where: OrderItemScalarWhereInput;
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyWithoutOrderInput>;
  };

  export type OrderItemScalarWhereInput = {
    AND?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[];
    OR?: OrderItemScalarWhereInput[];
    NOT?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[];
    id?: StringFilter<'OrderItem'> | string;
    orderId?: StringFilter<'OrderItem'> | string;
    productId?: StringFilter<'OrderItem'> | string;
    variantId?: StringNullableFilter<'OrderItem'> | string | null;
    sellerId?: StringFilter<'OrderItem'> | string;
    title?: StringFilter<'OrderItem'> | string;
    sku?: StringNullableFilter<'OrderItem'> | string | null;
    imageUrl?: StringNullableFilter<'OrderItem'> | string | null;
    quantity?: IntFilter<'OrderItem'> | number;
    unitPrice?: DecimalFilter<'OrderItem'> | Decimal | DecimalJsLike | number | string;
    totalPrice?: DecimalFilter<'OrderItem'> | Decimal | DecimalJsLike | number | string;
    status?: EnumItemStatusFilter<'OrderItem'> | $Enums.ItemStatus;
    createdAt?: DateTimeFilter<'OrderItem'> | Date | string;
  };

  export type PaymentUpsertWithWhereUniqueWithoutOrderInput = {
    where: PaymentWhereUniqueInput;
    update: XOR<PaymentUpdateWithoutOrderInput, PaymentUncheckedUpdateWithoutOrderInput>;
    create: XOR<PaymentCreateWithoutOrderInput, PaymentUncheckedCreateWithoutOrderInput>;
  };

  export type PaymentUpdateWithWhereUniqueWithoutOrderInput = {
    where: PaymentWhereUniqueInput;
    data: XOR<PaymentUpdateWithoutOrderInput, PaymentUncheckedUpdateWithoutOrderInput>;
  };

  export type PaymentUpdateManyWithWhereWithoutOrderInput = {
    where: PaymentScalarWhereInput;
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutOrderInput>;
  };

  export type PaymentScalarWhereInput = {
    AND?: PaymentScalarWhereInput | PaymentScalarWhereInput[];
    OR?: PaymentScalarWhereInput[];
    NOT?: PaymentScalarWhereInput | PaymentScalarWhereInput[];
    id?: StringFilter<'Payment'> | string;
    orderId?: StringFilter<'Payment'> | string;
    provider?: EnumPaymentProviderFilter<'Payment'> | $Enums.PaymentProvider;
    providerRef?: StringNullableFilter<'Payment'> | string | null;
    amount?: DecimalFilter<'Payment'> | Decimal | DecimalJsLike | number | string;
    currency?: StringFilter<'Payment'> | string;
    status?: EnumPaymentStatusFilter<'Payment'> | $Enums.PaymentStatus;
    method?: StringNullableFilter<'Payment'> | string | null;
    failureReason?: StringNullableFilter<'Payment'> | string | null;
    metadata?: JsonNullableFilter<'Payment'>;
    createdAt?: DateTimeFilter<'Payment'> | Date | string;
    updatedAt?: DateTimeFilter<'Payment'> | Date | string;
  };

  export type ShipmentUpsertWithWhereUniqueWithoutOrderInput = {
    where: ShipmentWhereUniqueInput;
    update: XOR<ShipmentUpdateWithoutOrderInput, ShipmentUncheckedUpdateWithoutOrderInput>;
    create: XOR<ShipmentCreateWithoutOrderInput, ShipmentUncheckedCreateWithoutOrderInput>;
  };

  export type ShipmentUpdateWithWhereUniqueWithoutOrderInput = {
    where: ShipmentWhereUniqueInput;
    data: XOR<ShipmentUpdateWithoutOrderInput, ShipmentUncheckedUpdateWithoutOrderInput>;
  };

  export type ShipmentUpdateManyWithWhereWithoutOrderInput = {
    where: ShipmentScalarWhereInput;
    data: XOR<ShipmentUpdateManyMutationInput, ShipmentUncheckedUpdateManyWithoutOrderInput>;
  };

  export type ShipmentScalarWhereInput = {
    AND?: ShipmentScalarWhereInput | ShipmentScalarWhereInput[];
    OR?: ShipmentScalarWhereInput[];
    NOT?: ShipmentScalarWhereInput | ShipmentScalarWhereInput[];
    id?: StringFilter<'Shipment'> | string;
    orderId?: StringFilter<'Shipment'> | string;
    trackingNumber?: StringNullableFilter<'Shipment'> | string | null;
    carrier?: StringNullableFilter<'Shipment'> | string | null;
    status?: EnumShipmentStatusFilter<'Shipment'> | $Enums.ShipmentStatus;
    estimatedAt?: DateTimeNullableFilter<'Shipment'> | Date | string | null;
    shippedAt?: DateTimeNullableFilter<'Shipment'> | Date | string | null;
    deliveredAt?: DateTimeNullableFilter<'Shipment'> | Date | string | null;
    createdAt?: DateTimeFilter<'Shipment'> | Date | string;
    updatedAt?: DateTimeFilter<'Shipment'> | Date | string;
  };

  export type OrderEventUpsertWithWhereUniqueWithoutOrderInput = {
    where: OrderEventWhereUniqueInput;
    update: XOR<OrderEventUpdateWithoutOrderInput, OrderEventUncheckedUpdateWithoutOrderInput>;
    create: XOR<OrderEventCreateWithoutOrderInput, OrderEventUncheckedCreateWithoutOrderInput>;
  };

  export type OrderEventUpdateWithWhereUniqueWithoutOrderInput = {
    where: OrderEventWhereUniqueInput;
    data: XOR<OrderEventUpdateWithoutOrderInput, OrderEventUncheckedUpdateWithoutOrderInput>;
  };

  export type OrderEventUpdateManyWithWhereWithoutOrderInput = {
    where: OrderEventScalarWhereInput;
    data: XOR<OrderEventUpdateManyMutationInput, OrderEventUncheckedUpdateManyWithoutOrderInput>;
  };

  export type OrderEventScalarWhereInput = {
    AND?: OrderEventScalarWhereInput | OrderEventScalarWhereInput[];
    OR?: OrderEventScalarWhereInput[];
    NOT?: OrderEventScalarWhereInput | OrderEventScalarWhereInput[];
    id?: StringFilter<'OrderEvent'> | string;
    orderId?: StringFilter<'OrderEvent'> | string;
    actor?: StringFilter<'OrderEvent'> | string;
    event?: StringFilter<'OrderEvent'> | string;
    data?: JsonNullableFilter<'OrderEvent'>;
    createdAt?: DateTimeFilter<'OrderEvent'> | Date | string;
  };

  export type OrderCreateWithoutItemsInput = {
    id?: string;
    number: string;
    userId: string;
    status?: $Enums.OrderStatus;
    currency?: string;
    subtotal: Decimal | DecimalJsLike | number | string;
    shipping?: Decimal | DecimalJsLike | number | string;
    tax?: Decimal | DecimalJsLike | number | string;
    discount?: Decimal | DecimalJsLike | number | string;
    total: Decimal | DecimalJsLike | number | string;
    shippingAddress: JsonNullValueInput | InputJsonValue;
    billingAddress?: NullableJsonNullValueInput | InputJsonValue;
    notes?: string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    placedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    payments?: PaymentCreateNestedManyWithoutOrderInput;
    shipments?: ShipmentCreateNestedManyWithoutOrderInput;
    timeline?: OrderEventCreateNestedManyWithoutOrderInput;
  };

  export type OrderUncheckedCreateWithoutItemsInput = {
    id?: string;
    number: string;
    userId: string;
    status?: $Enums.OrderStatus;
    currency?: string;
    subtotal: Decimal | DecimalJsLike | number | string;
    shipping?: Decimal | DecimalJsLike | number | string;
    tax?: Decimal | DecimalJsLike | number | string;
    discount?: Decimal | DecimalJsLike | number | string;
    total: Decimal | DecimalJsLike | number | string;
    shippingAddress: JsonNullValueInput | InputJsonValue;
    billingAddress?: NullableJsonNullValueInput | InputJsonValue;
    notes?: string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    placedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    payments?: PaymentUncheckedCreateNestedManyWithoutOrderInput;
    shipments?: ShipmentUncheckedCreateNestedManyWithoutOrderInput;
    timeline?: OrderEventUncheckedCreateNestedManyWithoutOrderInput;
  };

  export type OrderCreateOrConnectWithoutItemsInput = {
    where: OrderWhereUniqueInput;
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>;
  };

  export type OrderUpsertWithoutItemsInput = {
    update: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>;
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>;
    where?: OrderWhereInput;
  };

  export type OrderUpdateToOneWithWhereWithoutItemsInput = {
    where?: OrderWhereInput;
    data: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>;
  };

  export type OrderUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    number?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    currency?: StringFieldUpdateOperationsInput | string;
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    shipping?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    tax?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    shippingAddress?: JsonNullValueInput | InputJsonValue;
    billingAddress?: NullableJsonNullValueInput | InputJsonValue;
    notes?: NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    placedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    payments?: PaymentUpdateManyWithoutOrderNestedInput;
    shipments?: ShipmentUpdateManyWithoutOrderNestedInput;
    timeline?: OrderEventUpdateManyWithoutOrderNestedInput;
  };

  export type OrderUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    number?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    currency?: StringFieldUpdateOperationsInput | string;
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    shipping?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    tax?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    shippingAddress?: JsonNullValueInput | InputJsonValue;
    billingAddress?: NullableJsonNullValueInput | InputJsonValue;
    notes?: NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    placedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    payments?: PaymentUncheckedUpdateManyWithoutOrderNestedInput;
    shipments?: ShipmentUncheckedUpdateManyWithoutOrderNestedInput;
    timeline?: OrderEventUncheckedUpdateManyWithoutOrderNestedInput;
  };

  export type OrderCreateWithoutPaymentsInput = {
    id?: string;
    number: string;
    userId: string;
    status?: $Enums.OrderStatus;
    currency?: string;
    subtotal: Decimal | DecimalJsLike | number | string;
    shipping?: Decimal | DecimalJsLike | number | string;
    tax?: Decimal | DecimalJsLike | number | string;
    discount?: Decimal | DecimalJsLike | number | string;
    total: Decimal | DecimalJsLike | number | string;
    shippingAddress: JsonNullValueInput | InputJsonValue;
    billingAddress?: NullableJsonNullValueInput | InputJsonValue;
    notes?: string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    placedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: OrderItemCreateNestedManyWithoutOrderInput;
    shipments?: ShipmentCreateNestedManyWithoutOrderInput;
    timeline?: OrderEventCreateNestedManyWithoutOrderInput;
  };

  export type OrderUncheckedCreateWithoutPaymentsInput = {
    id?: string;
    number: string;
    userId: string;
    status?: $Enums.OrderStatus;
    currency?: string;
    subtotal: Decimal | DecimalJsLike | number | string;
    shipping?: Decimal | DecimalJsLike | number | string;
    tax?: Decimal | DecimalJsLike | number | string;
    discount?: Decimal | DecimalJsLike | number | string;
    total: Decimal | DecimalJsLike | number | string;
    shippingAddress: JsonNullValueInput | InputJsonValue;
    billingAddress?: NullableJsonNullValueInput | InputJsonValue;
    notes?: string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    placedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput;
    shipments?: ShipmentUncheckedCreateNestedManyWithoutOrderInput;
    timeline?: OrderEventUncheckedCreateNestedManyWithoutOrderInput;
  };

  export type OrderCreateOrConnectWithoutPaymentsInput = {
    where: OrderWhereUniqueInput;
    create: XOR<OrderCreateWithoutPaymentsInput, OrderUncheckedCreateWithoutPaymentsInput>;
  };

  export type OrderUpsertWithoutPaymentsInput = {
    update: XOR<OrderUpdateWithoutPaymentsInput, OrderUncheckedUpdateWithoutPaymentsInput>;
    create: XOR<OrderCreateWithoutPaymentsInput, OrderUncheckedCreateWithoutPaymentsInput>;
    where?: OrderWhereInput;
  };

  export type OrderUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: OrderWhereInput;
    data: XOR<OrderUpdateWithoutPaymentsInput, OrderUncheckedUpdateWithoutPaymentsInput>;
  };

  export type OrderUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    number?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    currency?: StringFieldUpdateOperationsInput | string;
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    shipping?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    tax?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    shippingAddress?: JsonNullValueInput | InputJsonValue;
    billingAddress?: NullableJsonNullValueInput | InputJsonValue;
    notes?: NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    placedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    items?: OrderItemUpdateManyWithoutOrderNestedInput;
    shipments?: ShipmentUpdateManyWithoutOrderNestedInput;
    timeline?: OrderEventUpdateManyWithoutOrderNestedInput;
  };

  export type OrderUncheckedUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    number?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    currency?: StringFieldUpdateOperationsInput | string;
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    shipping?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    tax?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    shippingAddress?: JsonNullValueInput | InputJsonValue;
    billingAddress?: NullableJsonNullValueInput | InputJsonValue;
    notes?: NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    placedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput;
    shipments?: ShipmentUncheckedUpdateManyWithoutOrderNestedInput;
    timeline?: OrderEventUncheckedUpdateManyWithoutOrderNestedInput;
  };

  export type OrderCreateWithoutShipmentsInput = {
    id?: string;
    number: string;
    userId: string;
    status?: $Enums.OrderStatus;
    currency?: string;
    subtotal: Decimal | DecimalJsLike | number | string;
    shipping?: Decimal | DecimalJsLike | number | string;
    tax?: Decimal | DecimalJsLike | number | string;
    discount?: Decimal | DecimalJsLike | number | string;
    total: Decimal | DecimalJsLike | number | string;
    shippingAddress: JsonNullValueInput | InputJsonValue;
    billingAddress?: NullableJsonNullValueInput | InputJsonValue;
    notes?: string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    placedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: OrderItemCreateNestedManyWithoutOrderInput;
    payments?: PaymentCreateNestedManyWithoutOrderInput;
    timeline?: OrderEventCreateNestedManyWithoutOrderInput;
  };

  export type OrderUncheckedCreateWithoutShipmentsInput = {
    id?: string;
    number: string;
    userId: string;
    status?: $Enums.OrderStatus;
    currency?: string;
    subtotal: Decimal | DecimalJsLike | number | string;
    shipping?: Decimal | DecimalJsLike | number | string;
    tax?: Decimal | DecimalJsLike | number | string;
    discount?: Decimal | DecimalJsLike | number | string;
    total: Decimal | DecimalJsLike | number | string;
    shippingAddress: JsonNullValueInput | InputJsonValue;
    billingAddress?: NullableJsonNullValueInput | InputJsonValue;
    notes?: string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    placedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput;
    payments?: PaymentUncheckedCreateNestedManyWithoutOrderInput;
    timeline?: OrderEventUncheckedCreateNestedManyWithoutOrderInput;
  };

  export type OrderCreateOrConnectWithoutShipmentsInput = {
    where: OrderWhereUniqueInput;
    create: XOR<OrderCreateWithoutShipmentsInput, OrderUncheckedCreateWithoutShipmentsInput>;
  };

  export type OrderUpsertWithoutShipmentsInput = {
    update: XOR<OrderUpdateWithoutShipmentsInput, OrderUncheckedUpdateWithoutShipmentsInput>;
    create: XOR<OrderCreateWithoutShipmentsInput, OrderUncheckedCreateWithoutShipmentsInput>;
    where?: OrderWhereInput;
  };

  export type OrderUpdateToOneWithWhereWithoutShipmentsInput = {
    where?: OrderWhereInput;
    data: XOR<OrderUpdateWithoutShipmentsInput, OrderUncheckedUpdateWithoutShipmentsInput>;
  };

  export type OrderUpdateWithoutShipmentsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    number?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    currency?: StringFieldUpdateOperationsInput | string;
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    shipping?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    tax?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    shippingAddress?: JsonNullValueInput | InputJsonValue;
    billingAddress?: NullableJsonNullValueInput | InputJsonValue;
    notes?: NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    placedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    items?: OrderItemUpdateManyWithoutOrderNestedInput;
    payments?: PaymentUpdateManyWithoutOrderNestedInput;
    timeline?: OrderEventUpdateManyWithoutOrderNestedInput;
  };

  export type OrderUncheckedUpdateWithoutShipmentsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    number?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    currency?: StringFieldUpdateOperationsInput | string;
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    shipping?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    tax?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    shippingAddress?: JsonNullValueInput | InputJsonValue;
    billingAddress?: NullableJsonNullValueInput | InputJsonValue;
    notes?: NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    placedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput;
    payments?: PaymentUncheckedUpdateManyWithoutOrderNestedInput;
    timeline?: OrderEventUncheckedUpdateManyWithoutOrderNestedInput;
  };

  export type OrderCreateWithoutTimelineInput = {
    id?: string;
    number: string;
    userId: string;
    status?: $Enums.OrderStatus;
    currency?: string;
    subtotal: Decimal | DecimalJsLike | number | string;
    shipping?: Decimal | DecimalJsLike | number | string;
    tax?: Decimal | DecimalJsLike | number | string;
    discount?: Decimal | DecimalJsLike | number | string;
    total: Decimal | DecimalJsLike | number | string;
    shippingAddress: JsonNullValueInput | InputJsonValue;
    billingAddress?: NullableJsonNullValueInput | InputJsonValue;
    notes?: string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    placedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: OrderItemCreateNestedManyWithoutOrderInput;
    payments?: PaymentCreateNestedManyWithoutOrderInput;
    shipments?: ShipmentCreateNestedManyWithoutOrderInput;
  };

  export type OrderUncheckedCreateWithoutTimelineInput = {
    id?: string;
    number: string;
    userId: string;
    status?: $Enums.OrderStatus;
    currency?: string;
    subtotal: Decimal | DecimalJsLike | number | string;
    shipping?: Decimal | DecimalJsLike | number | string;
    tax?: Decimal | DecimalJsLike | number | string;
    discount?: Decimal | DecimalJsLike | number | string;
    total: Decimal | DecimalJsLike | number | string;
    shippingAddress: JsonNullValueInput | InputJsonValue;
    billingAddress?: NullableJsonNullValueInput | InputJsonValue;
    notes?: string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    placedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput;
    payments?: PaymentUncheckedCreateNestedManyWithoutOrderInput;
    shipments?: ShipmentUncheckedCreateNestedManyWithoutOrderInput;
  };

  export type OrderCreateOrConnectWithoutTimelineInput = {
    where: OrderWhereUniqueInput;
    create: XOR<OrderCreateWithoutTimelineInput, OrderUncheckedCreateWithoutTimelineInput>;
  };

  export type OrderUpsertWithoutTimelineInput = {
    update: XOR<OrderUpdateWithoutTimelineInput, OrderUncheckedUpdateWithoutTimelineInput>;
    create: XOR<OrderCreateWithoutTimelineInput, OrderUncheckedCreateWithoutTimelineInput>;
    where?: OrderWhereInput;
  };

  export type OrderUpdateToOneWithWhereWithoutTimelineInput = {
    where?: OrderWhereInput;
    data: XOR<OrderUpdateWithoutTimelineInput, OrderUncheckedUpdateWithoutTimelineInput>;
  };

  export type OrderUpdateWithoutTimelineInput = {
    id?: StringFieldUpdateOperationsInput | string;
    number?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    currency?: StringFieldUpdateOperationsInput | string;
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    shipping?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    tax?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    shippingAddress?: JsonNullValueInput | InputJsonValue;
    billingAddress?: NullableJsonNullValueInput | InputJsonValue;
    notes?: NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    placedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    items?: OrderItemUpdateManyWithoutOrderNestedInput;
    payments?: PaymentUpdateManyWithoutOrderNestedInput;
    shipments?: ShipmentUpdateManyWithoutOrderNestedInput;
  };

  export type OrderUncheckedUpdateWithoutTimelineInput = {
    id?: StringFieldUpdateOperationsInput | string;
    number?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    currency?: StringFieldUpdateOperationsInput | string;
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    shipping?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    tax?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    shippingAddress?: JsonNullValueInput | InputJsonValue;
    billingAddress?: NullableJsonNullValueInput | InputJsonValue;
    notes?: NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    placedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput;
    payments?: PaymentUncheckedUpdateManyWithoutOrderNestedInput;
    shipments?: ShipmentUncheckedUpdateManyWithoutOrderNestedInput;
  };

  export type OrderItemCreateManyOrderInput = {
    id?: string;
    productId: string;
    variantId?: string | null;
    sellerId: string;
    title: string;
    sku?: string | null;
    imageUrl?: string | null;
    quantity: number;
    unitPrice: Decimal | DecimalJsLike | number | string;
    totalPrice: Decimal | DecimalJsLike | number | string;
    status?: $Enums.ItemStatus;
    createdAt?: Date | string;
  };

  export type PaymentCreateManyOrderInput = {
    id?: string;
    provider: $Enums.PaymentProvider;
    providerRef?: string | null;
    amount: Decimal | DecimalJsLike | number | string;
    currency?: string;
    status?: $Enums.PaymentStatus;
    method?: string | null;
    failureReason?: string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ShipmentCreateManyOrderInput = {
    id?: string;
    trackingNumber?: string | null;
    carrier?: string | null;
    status?: $Enums.ShipmentStatus;
    estimatedAt?: Date | string | null;
    shippedAt?: Date | string | null;
    deliveredAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type OrderEventCreateManyOrderInput = {
    id?: string;
    actor: string;
    event: string;
    data?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
  };

  export type OrderItemUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string;
    productId?: StringFieldUpdateOperationsInput | string;
    variantId?: NullableStringFieldUpdateOperationsInput | string | null;
    sellerId?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    sku?: NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: IntFieldUpdateOperationsInput | number;
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    status?: EnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type OrderItemUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string;
    productId?: StringFieldUpdateOperationsInput | string;
    variantId?: NullableStringFieldUpdateOperationsInput | string | null;
    sellerId?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    sku?: NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: IntFieldUpdateOperationsInput | number;
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    status?: EnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type OrderItemUncheckedUpdateManyWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string;
    productId?: StringFieldUpdateOperationsInput | string;
    variantId?: NullableStringFieldUpdateOperationsInput | string | null;
    sellerId?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    sku?: NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: IntFieldUpdateOperationsInput | number;
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    status?: EnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type PaymentUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string;
    provider?: EnumPaymentProviderFieldUpdateOperationsInput | $Enums.PaymentProvider;
    providerRef?: NullableStringFieldUpdateOperationsInput | string | null;
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    currency?: StringFieldUpdateOperationsInput | string;
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    method?: NullableStringFieldUpdateOperationsInput | string | null;
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type PaymentUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string;
    provider?: EnumPaymentProviderFieldUpdateOperationsInput | $Enums.PaymentProvider;
    providerRef?: NullableStringFieldUpdateOperationsInput | string | null;
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    currency?: StringFieldUpdateOperationsInput | string;
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    method?: NullableStringFieldUpdateOperationsInput | string | null;
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type PaymentUncheckedUpdateManyWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string;
    provider?: EnumPaymentProviderFieldUpdateOperationsInput | $Enums.PaymentProvider;
    providerRef?: NullableStringFieldUpdateOperationsInput | string | null;
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string;
    currency?: StringFieldUpdateOperationsInput | string;
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    method?: NullableStringFieldUpdateOperationsInput | string | null;
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ShipmentUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string;
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null;
    carrier?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumShipmentStatusFieldUpdateOperationsInput | $Enums.ShipmentStatus;
    estimatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    shippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ShipmentUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string;
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null;
    carrier?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumShipmentStatusFieldUpdateOperationsInput | $Enums.ShipmentStatus;
    estimatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    shippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ShipmentUncheckedUpdateManyWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string;
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null;
    carrier?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumShipmentStatusFieldUpdateOperationsInput | $Enums.ShipmentStatus;
    estimatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    shippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type OrderEventUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string;
    actor?: StringFieldUpdateOperationsInput | string;
    event?: StringFieldUpdateOperationsInput | string;
    data?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type OrderEventUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string;
    actor?: StringFieldUpdateOperationsInput | string;
    event?: StringFieldUpdateOperationsInput | string;
    data?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type OrderEventUncheckedUpdateManyWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string;
    actor?: StringFieldUpdateOperationsInput | string;
    event?: StringFieldUpdateOperationsInput | string;
    data?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  /**
   * Aliases for legacy arg types
   */
  /**
   * @deprecated Use OrderCountOutputTypeDefaultArgs instead
   */
  export type OrderCountOutputTypeArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = OrderCountOutputTypeDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use OrderDefaultArgs instead
   */
  export type OrderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    OrderDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use OrderItemDefaultArgs instead
   */
  export type OrderItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    OrderItemDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use PaymentDefaultArgs instead
   */
  export type PaymentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    PaymentDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use ShipmentDefaultArgs instead
   */
  export type ShipmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    ShipmentDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use OrderEventDefaultArgs instead
   */
  export type OrderEventArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    OrderEventDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use OutboxMessageDefaultArgs instead
   */
  export type OutboxMessageArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = OutboxMessageDefaultArgs<ExtArgs>;

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number;
  };

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF;
}
