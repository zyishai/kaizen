declare type Optional<T> = T | undefined | null;
declare type KaizenId = string;
declare interface ActionCtorProps {
    id?: KaizenId;
    title: string;
    description?: string;
}
declare interface InMemoryActionCtorProps {
    id: KaizenId;
    title: string;
    description?: string;
}