/* =====================================
   VIGNAN CAMPUSNAV
   COMMON JAVASCRIPT
===================================== */


/* =====================================
   THEME
===================================== */

const themeToggle =
    document.getElementById("themeToggle");


function loadTheme() {

    const savedTheme =
        localStorage.getItem("vignan-theme");


    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        if (themeToggle) {
            themeToggle.textContent = "☀️";
        }

    } else {

        document.body.classList.remove("dark");

        if (themeToggle) {
            themeToggle.textContent = "🌙";
        }

    }

}


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            document.body.classList.toggle("dark");

            const isDark =
                document.body.classList.contains("dark");


            localStorage.setItem(
                "vignan-theme",
                isDark ? "dark" : "light"
            );


            themeToggle.textContent =
                isDark ? "☀️" : "🌙";

        }
    );

}


loadTheme();



/* =====================================
   MOBILE MENU
===================================== */

const menuToggle =
    document.getElementById("menuToggle");

const mobileMenu =
    document.getElementById("mobileMenu");


if (menuToggle && mobileMenu) {

    menuToggle.addEventListener(
        "click",
        () => {

            if (
                mobileMenu.style.display === "flex"
            ) {

                mobileMenu.style.display = "none";

            } else {

                mobileMenu.style.display = "flex";

            }

        }
    );

}



/* =====================================
   CAMPUS SEARCH DATA
===================================== */

const campusLocations = [

    {
        id: "a-block",
        name: "A Block",
        category: "Academic Block",
        icon: "🏫"
    },

    {
        id: "h-block",
        name: "H Block",
        category: "Academic Block",
        icon: "🏢"
    },

    {
        id: "u-block",
        name: "U Block",
        category: "Academic Block",
        icon: "💻"
    },

    {
        id: "library",
        name: "NTR Vignan Library",
        category: "Learning Resource",
        icon: "📚"
    },

    {
        id: "admin",
        name: "Administrative Block",
        category: "Administration",
        icon: "🏛️"
    },

    {
        id: "pharmacy",
        name: "Pharmacy College",
        category: "Academic",
        icon: "💊"
    },

    {
        id: "hostel",
        name: "Hostels",
        category: "Student Accommodation",
        icon: "🛏️"
    },

    {
        id: "medical",
        name: "Health Centre",
        category: "Medical Facility",
        icon: "🏥"
    },

    {
        id: "sports",
        name: "Sports Facilities",
        category: "Sports",
        icon: "🏟️"
    },

    {
        id: "playground",
        name: "University Playground",
        category: "Sports Facility",
        icon: "⚽"
    },

    {
        id: "gate",
        name: "Main Gate",
        category: "Campus Entrance",
        icon: "🚪"
    }

];



/* =====================================
   HOME SEARCH
===================================== */

const homeSearch =
    document.getElementById("homeSearch");

const searchResults =
    document.getElementById("homeSearchResults");


function displaySearchResults(value) {

    if (!searchResults) {
        return;
    }


    const query =
        value.toLowerCase().trim();


    if (!query) {

        searchResults.innerHTML = "";

        return;

    }


    const matches =
        campusLocations.filter(location => {

            return (
                location.name
                    .toLowerCase()
                    .includes(query)
                ||
                location.category
                    .toLowerCase()
                    .includes(query)
            );

        });


    if (matches.length === 0) {

        searchResults.innerHTML = `

            <div class="search-result">

                <div class="search-result-icon">
                    🔎
                </div>

                <div>

                    <strong>
                        No location found
                    </strong>

                    <small>
                        Try another building or facility.
                    </small>

                </div>

            </div>

        `;

        return;

    }


    searchResults.innerHTML =
        matches.map(location => `

            <div
                class="search-result"
                onclick="openLocation('${location.id}')">

                <div class="search-result-icon">
                    ${location.icon}
                </div>

                <div>

                    <strong>
                        ${location.name}
                    </strong>

                    <small>
                        ${location.category}
                    </small>

                </div>

            </div>

        `).join("");

}


if (homeSearch) {

    homeSearch.addEventListener(
        "input",
        function () {

            displaySearchResults(
                this.value
            );

        }
    );

}



/* =====================================
   OPEN SEARCH LOCATION
===================================== */

function openLocation(id) {

    localStorage.setItem(
        "selected-location",
        id
    );


    window.location.href =
        `map.html?location=${id}`;

}



/* =====================================
   SEARCH BUTTON
===================================== */

const homeSearchButton =
    document.getElementById(
        "homeSearchButton"
    );


if (homeSearchButton) {

    homeSearchButton.addEventListener(
        "click",
        () => {

            const value =
                homeSearch.value.trim();


            if (!value) {

                window.location.href =
                    "map.html";

                return;

            }


            const firstMatch =
                campusLocations.find(
                    location =>
                        location.name
                            .toLowerCase()
                            .includes(
                                value.toLowerCase()
                            )
                );


            if (firstMatch) {

                openLocation(
                    firstMatch.id
                );

            } else {

                window.location.href =
                    "map.html";

            }

        }
    );

}