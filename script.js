<script>
    window.addEventListener("load", () => {
        const setCheckedForSlideInView = () => {
            let slides = document.querySelectorAll(".slide");
            let dots = document.querySelectorAll("#dots input");
            slides.forEach((slide, index) => {
                if (slide.getBoundingClientRect().left < window.innerWidth / 2 && slide.getBoundingClientRect().right > window.innerWidth / 2) {
                    dots[index].checked = true;
                }
            });
        }

        document.querySelectorAll('input[name="slide"]').forEach((elem) => {
            // when any radio button is clicked, scroll the corresponding slide into view
            elem.addEventListener("change", () => {
                document.querySelector(".slides").removeEventListener("scroll", setCheckedForSlideInView);

                let slides = document.querySelectorAll(".slide");
                slides.forEach((slide) => {
                    if (slide.id === elem.value) {
                        slide.scrollIntoView({ behavior: "smooth", block: "center" });
                    }
                });
                
                // TODO: seems like the listener gets reatached before the scroll is finished, so
                // the radio buttons are still cheked during the scroll. Need to find a fix for this.
                document.querySelector(".slides").addEventListener("scroll", setCheckedForSlideInView);
            });
        });

        // when any slide is scrolled into view, check the corresponding radio button
        document.querySelector(".slides").addEventListener("scroll", setCheckedForSlideInView);

        // scroll to the second slide on page load
        document.querySelector("#slide2").scrollIntoView({ behavior: "smooth", block: "center" });
    })

    // add paddings to the slides container to make centering the first and last images possible
    document.querySelector(".slides .slide:first-child img").addEventListener("load", () => {
        let slides = document.querySelector(".slides");
        let slideImg = document.querySelector(".slide:first-child img");
        slides.style.paddingLeft = `${slides.getBoundingClientRect().width / 2 - slideImg.width / 2 + 10}px`;
    });
    document.querySelector(".slides .slide:last-child img").addEventListener("load", () => {
        let slides = document.querySelector(".slides");
        let slideImg = document.querySelector(".slide:last-child img");
        slides.style.paddingRight = `${slides.getBoundingClientRect().width / 2 - slideImg.width / 2 + 10}px`;
    });
</script>