export const save = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const load = (key: string): any => {
    let ls = localStorage.getItem(key)
    if (ls != null)
        return JSON.parse(ls)
    else ls
}

export const reset = (key: string) => {
    localStorage.removeItem(key)
}