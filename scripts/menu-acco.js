const mesureWidth = item => {
    const screenWidth = $(window).width();
    const container = item.closest(".products-menu");
    const titlesBlocks = container.find(".products-menu__title");
    const titlesWidth = titlesBlocks.width() * titlesBlocks.length;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile){
        return (screenWidth - titlesWidth);
    } else {
        return 500;
    }

    
    
}

const closeEveryItemInContainer = container => {
    const items = container.find(".products-menu__item");
    items.removeClass("active");
    const content = container.find(".products-menu__content");
    content.width(0);
}

const openItemMenu = item => {
    const hiddenContent = item.find(".products-menu__content");
    const reqWidth = mesureWidth(item);
    item.addClass("active");
    hiddenContent.width(reqWidth);
}

$(".products-menu__title").on("click", e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const item = $this.closest(".products-menu__item");
    const itemOpened = item.hasClass("active");
    const container = $this.closest(".products-menu");
    
    if(itemOpened) {
        closeEveryItemInContainer(container);
    } else {
        closeEveryItemInContainer(container);
        openItemMenu(item);
    }
});