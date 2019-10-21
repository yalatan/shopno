function ready() {
    /*scroll down*/
    scroll_down.onclick = function() {
        let q = document.documentElement.clientHeight;
        let scrollHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
        window.scrollTo({
            top: scrollHeight - q,
            behavior: "smooth"
        });

    };
    /**MAP */
    var myMap;
    ymaps.ready(init); // Ожидание загрузки API с сервера Яндекса
    function init() {
        var lpMapOptions1 = {
            center: [53.938623, 27.600566],
            zoom: 8,
            controls: ['fullscreenControl', 'zoomControl']
        };
        var lpPlacemark1 = new ymaps.Placemark(lpMapOptions1.center, {
            hintContent: 'Yalatan',
            balloonContentHeader: 'Natallia Nikitina',
            balloonContentBody: 'Junior Frontend Developer',
            balloonContentFooter: 'Минск, ул.Мележа, 25'
        });
        myMap = new ymaps.Map("map", lpMapOptions1, {
            searchControlProvider: 'yandex#search'
        });
        myMap.geoObjects.add(lpPlacemark1);
    }


    var mySwiper = new Swiper('.swiper-container', {
        // Optional parameters
        loop: true,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },


    });


    /*popup*/

    document.querySelectorAll(".open-modal").forEach(function(item) {
        item.onclick = function(e) {
            e.preventDefault();
            e.stopImmediatePropagation;

            let thismodal = item;
            let modal = thismodal.dataset.modal;
            console.log(modal);
            console.log(document.querySelector(modal).parentNode);
            document.querySelector(modal).parentNode.classList.add("open");
            setTimeout(function() {
                document.querySelector(modal).classList.add("open");
            }, 350);

            document.onclick = function(e) {
                console.log(e.target)
                let targetM = e.target;
                if (targetM.classList.contains("overlay")) {
                    console.log(targetM.querySelector(".modal"))
                    let arr = targetM.querySelectorAll(".modal");
                    for (let i = 0; i < arr.length; i++) {
                        arr[i].classList.remove("open");
                    };
                    setTimeout(function() {
                        targetM.classList.remove("open");
                    }, 350);

                }
            };
        }
    });

};


document.addEventListener("DOMContentLoaded", ready);