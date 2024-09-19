import tippy, { createSingleton } from 'tippy.js';

export function initHeader() {
    createSingleton(tippy(".father-btn", {
        content(ref) {
            console.log((ref as HTMLElement).dataset.likingTmp);
            return document.getElementById((ref as HTMLElement).dataset.likingTmp || "")?.innerHTML || "";
        }
    }), {
        interactive: true,
        allowHTML: true,
        placement: "bottom-start",
        arrow: false,
        offset: [0, 0],
        moveTransition: 'transform 0.2s ease-out',
        animation: "scale-extreme",
    });
}