var btn_next = document.getElementById("btn_next");
var btn_prev = document.getElementById("btn_prev");
var back = document.getElementById("back");

url = "https://newsapi.org/v2/everything?q=Linux%20%20Open-source%20Android&apiKey=2d612ca6837644c2bf354560d77a9a7c&pageSize=10&language=en&page="

function get_page(nb_page) {
    req = url + nb_page
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            var articles = result['articles'];
            var nb_articles = articles.length;
            back.innerHTML = "";
            for (i = 0; i < nb_articles; i++) {
                var link = document.createElement('a');
                link.href = articles[i]['url'];
                link.setAttribute("target", "_blank");
                var back_div = document.createElement('div');
                back_div.setAttribute("class", "col s12 m12 card-panel tooltipped");
                back_div.setAttribute("id", "card_data");
                back_div.setAttribute("data-position", "bottom");
                back_div.setAttribute("data-tooltip", articles[i]['author'] + ": " + articles[i]['publishedAt']);
                M.Tooltip.init(back_div, null);

                var image = document.createElement('img');
                image.setAttribute("class", "responsive-img");
                image.setAttribute("id", "news_img");
                image.setAttribute("src", articles[i]['urlToImage']);

                var title = document.createElement('div');
                title.setAttribute("class", "card-title");
                title.setAttribute("id", "name_title");
                title.innerText = articles[i]['title'];

                var content = document.createElement('div');
                content.setAttribute("class", "col s12 m12 card-panel");
                content.setAttribute("id", "description");
                content.innerText = articles[i]["description"]

                back_div.appendChild(title);
                back_div.appendChild(image);
                back_div.appendChild(content);
                link.appendChild(back_div);
                back.appendChild(link);
            }

            localStorage.setItem("id_page", nb_page);
        }
    };
    xhttp.open("GET", req, true);
    xhttp.send();
}

document.addEventListener('DOMContentLoaded', function () {
    var localisation = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(localisation, null);

    if (localStorage) {

        page = localStorage.getItem("id_page");
        if (page) {
            get_page(page);
        }
        else {
            get_page(1);
        }
    }
});

btn_prev.addEventListener("click", function () {
    if (localStorage) {

        page = parseInt(localStorage.getItem("id_page"));
        if (page) {
            if (page > 1) {
                nb_page = page - 1;
                get_page(nb_page);
            }

            else {
                get_page(1);
            }

        }
        else {
            get_page(1);
        }
    }


});

btn_next.addEventListener("click", function () {
    if (localStorage) {

        page = parseInt(localStorage.getItem("id_page"));
        if (page) {
            if (page < 10) {
                nb_page = page + 1;
                get_page(nb_page);
            }

            else {
                get_page(1);
            }

        }

        else {
            get_page(1);
        }
    }
});


