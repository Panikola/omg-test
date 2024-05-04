import { iterateArray } from "../utils";
import { onUnmounted } from "vue";

export default function useObserver(visibleObject: Record<string, boolean>) {
    const updateVisibleList = (entries: IntersectionObserverEntry[]) => {
        const generator = iterateArray(entries)
        for (let [_, entry] of generator) {
            const rowId = entry.target.id;
            if (entry.isIntersecting) {
                visibleObject[rowId] = true;
            } else {
                delete visibleObject[rowId];
            }
        }
    }

    const observer = new IntersectionObserver(updateVisibleList)

    const addObserver = (el: Element) => {
        return observer.observe(el)
    }

    const removeObserver = (el: Element) => {
        observer.unobserve(el)
    }

    const disconnectObserver = () => {
        observer.disconnect()
    }

    onUnmounted(() => {
        disconnectObserver()
    })

    return {
        addObserver,
        removeObserver,
    }
}