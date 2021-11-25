const section = $("section");
const display = $(".maincontent");
const sideMenu = $(".fixed-menu");
const menuItems = sideMenu.find(".fixed-menu__item");

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();


let inScroll = false;

section.first().addClass("active");

const countSectionPosition = sectionEq => {
    return sectionEq * -100;
};

const changeMenuThemeForSection = (sectionEq) => {
    const currentSection = section.eq(sectionEq);
    const menuTheme = currentSection.attr("data-sidemenu-theme");

    if (menuTheme === "yellow") {
        sideMenu.addClass("fixed-menu--shadowed");
    } else {
        sideMenu.removeClass("fixed-menu--shadowed");
    }

};


const performTransition = sectionEq => {

    if (inScroll === false) {

        const transitionOver = 1000;
        const mouseInertOver = 300;

        inScroll = true;

        const position = countSectionPosition(sectionEq);

        changeMenuThemeForSection(sectionEq);

        display.css({
            transform: `translateY(${position}%)`
        });

        section.eq(sectionEq).addClass("active").siblings().removeClass("active");

        setTimeout(() => {
            inScroll = false;

            sideMenu.find(".fixed-menu__item")
                .eq(sectionEq)
                .addClass("fixed-menu__item--active")
                .siblings()
                .removeClass("fixed-menu__item--active");
        }, transitionOver + mouseInertOver);
    }
};

const viewportScroller = direction => {
    const activeSection = section.filter(".active");
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    return {
        next() {
            if (nextSection.length) {
                performTransition(nextSection.index());
            }
        },
        prev() {
            if (prevSection.length) {
                performTransition(prevSection.index());
            }
        },
    };
};

$(window).on("wheel", e => {
    const deltaY = e.originalEvent.deltaY;
    const scroller = viewportScroller();

    if (deltaY > 0) {
        scroller.next();
    }

    if (deltaY < 0) {
        scroller.prev();
    }
});

$(window).on("keydown", e => {

    const tagName = e.target.tagName.toLowerCase();
    const scroller = viewportScroller();

    if (tagName != "input" && tagName != "textarea") {
        switch (e.keyCode) {
            case 38:
                scroller.prev();
                break;

            case 40:
                scroller.next();
                break;
        }
    }
});

$(".wrapper").on("touchmove", e => e.preventDefault());

$("[data-scroll-to]").click(e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr("data-scroll-to");
    const reqSection = $(`[data-section-id=${target}]`);

    performTransition(reqSection.index());
});

if (isMobile) {

    $("body").swipe({
        swipe: function (event, direction) {
            const scroller = viewportScroller();
            let scrollDirection = "";

            if (direction === "up") scrollDirection = "next";
            if (direction === "down") scrollDirection = "prev";

            scroller[scrollDirection]();

        },
    });
}

