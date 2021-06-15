export function h<K extends keyof HTMLElementTagNameMap>(tag: K, attr?: { class?: string[] | string, click?: (e: any) => void, css?: string }, append?: (Node | string)[] | (Node | string)): HTMLElementTagNameMap[K];
export function h (tag: string | HTMLElement, attr?: { class?: string[] | string, click?: (e: any) => void, css?: string }, append?: (Node | string)[] | (Node | string))
{
    const el = (typeof tag == "string")?document.createElement(tag):tag
    if (attr) {
        if(attr.class)
        {
            if (Array.isArray(attr.class)) attr.class.forEach(e => el.classList.add(e))
            else el.classList.add(attr.class)
            if (attr.css) el.style.cssText = attr.css;
        }
        if(attr.click) el.addEventListener('click', attr.click)
    }
    if (append) {
        if(Array.isArray(append)) el.append(...append)
        else el.append(append)
    }
    
    return el
}