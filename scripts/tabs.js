$(".reviews-switcher__link").click(e => {
    e.preventDefault;

    const $this = $(e.currentTarget);
    const curItem = $this.closest(".reviews-switcher__item");

    curItem.addClass("active").siblings().removeClass("active");
});