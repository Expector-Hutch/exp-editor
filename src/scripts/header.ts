import tippy from 'tippy.js';

export function initHeader() {
    const headers: HTMLCollectionOf<HTMLElement> = document.getElementsByTagName("header");
    for (let header of headers) {
        const menu_boxes: HTMLCollectionOf<Element> = header.getElementsByTagName("menu-box");
        for (let menu_box of menu_boxes) {
            tippy(menu_box.getElementsByClassName("father-btn")[0], {
                content() {
                    return menu_box.getElementsByClassName("menu-tmp")[0].innerHTML;
                },
                interactive: true,
                allowHTML: true,
                placement: "bottom-start",
                arrow: false,
                offset: [0, 0],
                trigger: "click"
            });
        }
    }
}