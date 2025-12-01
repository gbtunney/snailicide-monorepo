import type {
    Entries,
    Simplify,
    UnknownRecord,
    ValueOf,
} from 'type-fest'
import type {
    EntriesOf,
    FromEntriesTuples,
    KeysOf,
} from './../types/utility.js'
export const keysOf = <ObjectType extends UnknownRecord>(
    obj: ObjectType,
): Array<KeysOf<ObjectType>> => Object.keys(obj) as Array<KeysOf<ObjectType>>

export const entriesOf = <ObjectType extends UnknownRecord>(
    obj: ObjectType,
): EntriesOf<ObjectType> => Object.entries(obj) as EntriesOf<ObjectType>

export const fromEntries = <
    TupleArrayType extends ReadonlyArray<readonly [PropertyKey, unknown]>,
>(
    entryTuples: TupleArrayType,
): FromEntriesTuples<TupleArrayType> =>
    Object.fromEntries(
        entryTuples as ReadonlyArray<readonly [PropertyKey, unknown]>,
    ) as FromEntriesTuples<TupleArrayType>

export const fromEntriesRecord = <Key extends PropertyKey, Value>(
    entryTuples: ReadonlyArray<readonly [Key, Value]>,
): Record<Key, Value> =>
    Object.fromEntries(
        entryTuples as ReadonlyArray<readonly [PropertyKey, Value]>,
    ) as Record<Key, Value>

export const mapKeys = <
    ObjectType extends UnknownRecord,
    NewKey extends PropertyKey,
>(
    object: ObjectType,
    mapper: <Key extends keyof ObjectType>(key: Key, index: number) => NewKey,
): Record<NewKey, ValueOf<ObjectType>> => {
    const tuples: ReadonlyArray<readonly [NewKey, ValueOf<ObjectType>]> =
        entriesOf(object).map(
            ([key, value], index) =>
                [
                    mapper(key as keyof ObjectType, index),
                    value as ValueOf<ObjectType>,
                ] as const,
        )
    return fromEntriesRecord<NewKey, ValueOf<ObjectType>>(tuples)
}

export const mapObject = <
    ObjectType extends UnknownRecord,
    NewKey extends PropertyKey,
    NewValue,
>(
    object: ObjectType,
    mapper: <Key extends keyof ObjectType>(
        entry: readonly [Key, ObjectType[Key]],
        index: number,
    ) => readonly [NewKey, NewValue] | null | undefined,
): Record<NewKey, NewValue> => {
    const tuples: Array<readonly [NewKey, NewValue]> = []
    let index = 0
    for (const entry of entriesOf(object) as Entries<ObjectType>) {
        const next = mapper(entry as any, index++)
        if (next) tuples.push(next)
    }
    return fromEntriesRecord<NewKey, NewValue>(tuples)
}

export const mapValues = <ObjectType extends UnknownRecord, MappedValue>(
    object: ObjectType,
    mapper: <Key extends keyof ObjectType>(
        value: ObjectType[Key],
        key: Key,
        index: number,
    ) => MappedValue,
): Simplify<{ [Key in keyof ObjectType]: MappedValue }> => {
    const tuples: ReadonlyArray<readonly [keyof ObjectType, MappedValue]> = (
        entriesOf(object) as Entries<ObjectType>
    ).map(
        ([key, value], index) =>
            [
                key,
                mapper(
                    value as ObjectType[keyof ObjectType],
                    key as keyof ObjectType,
                    index,
                ),
            ] as const,
    )
    return fromEntriesRecord<keyof ObjectType, MappedValue>(
        tuples,
    ) as Simplify<{
        [Key in keyof ObjectType]: MappedValue
    }>
}
