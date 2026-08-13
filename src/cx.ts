export function cx(...names: readonly (string | false | null | undefined)[]): string {
    return names.filter((name): name is string => Boolean(name)).join(' ');
}
