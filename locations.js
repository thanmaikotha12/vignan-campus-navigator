/* =====================================================
   VIGNAN CAMPUSNAV
   LOCATIONS
===================================================== */


/* =====================================================
   LOCATION INFORMATION
===================================================== */

const locationData = {

    "a-block": {

        name: "A Block",

        icon: "🏫",

        category: "Academic",

        location: "Academic Zone",

        hours: "8 AM – 6 PM",

        facilities:
            "Classrooms, faculty offices",

        description:
            "A Block is one of the important academic buildings on the Vignan campus. It supports classroom-based learning, departmental activities and student interaction."

    },


    "h-block": {

        name: "H Block",

        icon: "🏢",

        category: "Academic",

        location: "Academic Zone",

        hours: "8 AM – 6 PM",

        facilities:
            "Classrooms, laboratories",

        description:
            "H Block provides academic spaces for students and faculty, including classrooms and practical learning areas."

    },


    "u-block": {

        name: "U Block",

        icon: "💻",

        category: "Academic",

        location: "Academic Zone",

        hours: "8 AM – 6 PM",

        facilities:
            "Computer labs, classrooms",

        description:
            "U Block is a technology-oriented academic area designed for computer-based learning, programming activities and practical sessions."

    },


    library: {

        name: "NTR Vignan Library",

        icon: "📚",

        category: "Student",

        location: "Learning Zone",

        hours: "8 AM – 8 PM",

        facilities:
            "Books, study areas, digital resources",

        description:
            "The NTR Vignan Library is a central learning resource where students can access books, study spaces and academic resources."

    },


    admin: {

        name: "Administrative Block",

        icon: "🏛️",

        category: "Services",

        location: "Administration Zone",

        hours: "9 AM – 5 PM",

        facilities:
            "Admissions, student services, administration",

        description:
            "The Administrative Block handles important university services including admissions, administration and student-related support."

    },


    pharmacy: {

        name: "Pharmacy College",

        icon: "💊",

        category: "Academic",

        location: "Academic Zone",

        hours: "9 AM – 5 PM",

        facilities:
            "Classrooms, laboratories, practical facilities",

        description:
            "The Pharmacy College provides academic and practical learning facilities for students studying pharmaceutical sciences."

    },


    hostel: {

        name: "Student Hostels",

        icon: "🛏️",

        category: "Student",

        location: "Residential Zone",

        hours: "24 Hours",

        facilities:
            "Accommodation, dining, common areas",

        description:
            "Student hostels provide residential accommodation and essential facilities for students living on campus."

    },


    cafeteria: {

        name: "Campus Cafeteria",

        icon: "🍴",

        category: "Food",

        location: "Student Zone",

        hours: "8 AM – 8 PM",

        facilities:
            "Meals, snacks, refreshments",

        description:
            "The Campus Cafeteria provides students and staff with meals, snacks and refreshments during the campus day."

    },


    medical: {

        name: "Health Centre",

        icon: "🏥",

        category: "Services",

        location: "Service Zone",

        hours: "Campus Hours",

        facilities:
            "Basic medical support, first aid",

        description:
            "The Health Centre provides basic medical assistance and health-related support for students and members of the campus community."

    },


    sports: {

        name: "University Playground",

        icon: "🏟️",

        category: "Sports",

        location: "Sports Zone",

        hours: "6 AM – 8 PM",

        facilities:
            "Outdoor sports, recreation area",

        description:
            "The University Playground is an outdoor recreation area used for sports, physical activities and campus events."

    }

};


/* =====================================================
   ELEMENTS
===================================================== */

const searchInput =
    document.getElementById(
        "locationSearch"
    );

const clearSearch =
    document.getElementById(
        "clearSearch"
    );

const cards =
    document.querySelectorAll(
        ".location-card"
    );

const filterButtons =
    document.querySelectorAll(
        ".filter-btn"
    );

const resultCount =
    document.getElementById(
        "resultCount"
    );

const noResults =
    document.getElementById(
        "noResults"
    );


let currentCategory = "all";

let currentLocation = null;


/* =====================================================
   FILTER LOCATIONS
===================================================== */

function filterLocations() {

    const search =
        searchInput.value
            .trim()
            .toLowerCase();


    let visibleCount = 0;


    cards.forEach(card => {

        const name =
            card.dataset.name
                .toLowerCase();

        const category =
            card.dataset.category;


        const matchesSearch =
            name.includes(search);


        const matchesCategory =
            currentCategory === "all"
            ||
            category === currentCategory;


        if (
            matchesSearch &&
            matchesCategory
        ) {

            card.style.display =
                "block";

            visibleCount++;

        } else {

            card.style.display =
                "none";

        }

    });


    resultCount.textContent =
        `${visibleCount} location${visibleCount === 1 ? "" : "s"}`;


    if (visibleCount === 0) {

        noResults.classList.remove(
            "hidden"
        );

    } else {

        noResults.classList.add(
            "hidden"
        );

    }


    if (search.length > 0) {

        clearSearch.style.display =
            "block";

    } else {

        clearSearch.style.display =
            "none";

    }

}


/* =====================================================
   SEARCH
===================================================== */

searchInput.addEventListener(
    "input",
    filterLocations
);


/* =====================================================
   CLEAR SEARCH
===================================================== */

clearSearch.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        filterLocations();

        searchInput.focus();

    }
);


/* =====================================================
   CATEGORY FILTER
===================================================== */

filterButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                filterButtons
                    .forEach(btn =>
                        btn.classList.remove(
                            "active"
                        )
                    );


                button.classList.add(
                    "active"
                );


                currentCategory =
                    button.dataset.category;


                filterLocations();

            }
        );

    }
);


/* =====================================================
   MODAL ELEMENTS
===================================================== */

const modal =
    document.getElementById(
        "locationModal"
    );

const closeModal =
    document.getElementById(
        "closeModal"
    );

const modalIcon =
    document.getElementById(
        "modalIcon"
    );

const modalCategory =
    document.getElementById(
        "modalCategory"
    );

const modalName =
    document.getElementById(
        "modalName"
    );

const modalDescription =
    document.getElementById(
        "modalDescription"
    );

const modalLocation =
    document.getElementById(
        "modalLocation"
    );

const modalHours =
    document.getElementById(
        "modalHours"
    );

const modalType =
    document.getElementById(
        "modalType"
    );

const modalFacilities =
    document.getElementById(
        "modalFacilities"
    );


/* =====================================================
   OPEN MODAL
===================================================== */

function openLocationModal(id) {

    const location =
        locationData[id];


    if (!location) {
        return;
    }


    currentLocation = id;


    modalIcon.textContent =
        location.icon;


    modalCategory.textContent =
        location.category;


    modalName.textContent =
        location.name;


    modalDescription.textContent =
        location.description;


    modalLocation.textContent =
        location.location;


    modalHours.textContent =
        location.hours;


    modalType.textContent =
        location.category;


    modalFacilities.textContent =
        location.facilities;


    modal.classList.add(
        "show"
    );


    document.body.style.overflow =
        "hidden";

}


/* =====================================================
   DETAILS BUTTONS
===================================================== */

document
    .querySelectorAll(
        ".details-btn"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const id =
                    button.dataset.location;


                openLocationModal(id);

            }
        );

    });


/* =====================================================
   CLOSE MODAL
===================================================== */

function closeLocationModal() {

    modal.classList.remove(
        "show"
    );


    document.body.style.overflow =
        "";

}


closeModal.addEventListener(
    "click",
    closeLocationModal
);


/* =====================================================
   CLICK OUTSIDE MODAL
===================================================== */

modal.addEventListener(
    "click",
    event => {

        if (
            event.target === modal
        ) {

            closeLocationModal();

        }

    }
);


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeLocationModal();

        }

    }
);


/* =====================================================
   NAVIGATE BUTTON
===================================================== */

document
    .getElementById(
        "navigateButton"
    )
    .addEventListener(
        "click",
        () => {

            if (!currentLocation) {
                return;
            }


            localStorage.setItem(
                "route-destination",
                currentLocation
            );


            window.location.href =
                "route.html";

        }
    );


/* =====================================================
   MAP BUTTON
===================================================== */

document
    .getElementById(
        "modalMapButton"
    )
    .addEventListener(
        "click",
        () => {

            if (!currentLocation) {
                return;
            }


            localStorage.setItem(
                "map-location",
                currentLocation
            );


            window.location.href =
                "map.html";

        }
    );


/* =====================================================
   INITIAL COUNT
===================================================== */

filterLocations();