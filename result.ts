type Result<T> = 
    | { kind: "ok"; value: T}
    | { kind: "error";  error: string };

export function ok<T>(v: T): Result<T> {
    return {kind: "ok", value: v}
}

export function err<T>(e: string): Result<T> {
    return {kind: "error", error: e};
}
