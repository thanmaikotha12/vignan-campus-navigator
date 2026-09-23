/* =====================================================
   VIGNAN CAMPUSNAV
   CAMPUS MAP JAVASCRIPT
===================================================== */


/* ================= LOCATION DATA ================= */

const campusLocations = {

    university: {
        name: "Vignan University",
        icon: "🏫",
        category: "Academic",
        area: "Central Campus",
        hours: "Campus Hours",
        description:
            "Main university campus area containing important academic and student facilities."
    },

    "a-block": {
        name: "A Block",
        icon: "🏢",
        category: "Academic",
        area: "Academic Zone",
        hours: "8 AM – 6 PM",
        description:
            "Academic building used for classrooms, teaching activities and departmental work."
    },
    "n-block": {
    name: "N Block",
    icon: "🏢",
    category: "Academic",
    area: "Academic Zone",
    hours: "8 AM – 6 PM",
    description:
        "N Block is an academic block of Vignan University. The Computer Science and Engineering department is located in N Block."
},

    "h-block": {
        name: "H Block",
        icon: "🏢",
        category: "Academic",
        area: "Academic Zone",
        hours: "8 AM – 6 PM",
        description:
            "Academic block containing classrooms and learning spaces for students."
    },

    "u-block": {
        name: "U Block",
        icon: "💻",
        category: "Academic",
        area: "Academic Zone",
        hours: "8 AM – 6 PM",
        description:
            "Technology-focused academic building used for computer-based learning and practical activities."
    },

    foundation: {
        name: "Vignan Foundation",
        icon: "🔬",
        category: "Academic",
        area: "Research Zone",
        hours: "Campus Hours",
        description:
            "Facility associated with science, technology, research and academic activities."
    },

    visvesvaraya: {
        name: "Visvesvaraya Block",
        icon: "🏛️",
        category: "Academic",
        area: "Academic Zone",
        hours: "Campus Hours",
        description:
            "Academic facility serving students and university activities."
    },

    pharmacy: {
        name: "Pharmacy College",
        icon: "💊",
        category: "Academic",
        area: "Academic Zone",
        hours: "9 AM – 5 PM",
        description:
            "Academic facility supporting pharmacy education, laboratory work and practical learning."
    },

    library: {
        name: "NTR Vignan Library",
        icon: "📚",
        category: "Student",
        area: "Learning Zone",
        hours: "8 AM – 8 PM",
        description:
            "Central learning resource with books, study areas and academic resources."
    },

    playground: {
        name: "University Playground",
        icon: "🏟️",
        category: "Sports",
        area: "Sports Zone",
        hours: "6 AM – 8 PM",
        description:
            "Outdoor recreation area for sports, physical activities and campus events."
    },

    lara: {
        name: "LARA Institute",
        icon: "🏫",
        category: "Academic",
        area: "Academic Zone",
        hours: "Campus Hours",
        description:
            "Academic and learning facility located within the wider Vignan campus area."
    },

    admin: {
        name: "Admin Block",
        icon: "🏛️",
        category: "Facilities",
        area: "Administration Zone",
        hours: "9 AM – 5 PM",
        description:
            "Administrative facility supporting admissions, student services and university administration."
    },

    hostel: {
        name: "Student Hostels",
        icon: "🛏️",
        category: "Student",
        area: "Residential Zone",
        hours: "24 Hours",
        description:
            "Residential facilities providing accommodation and supporting services for students."
    },

    gate: {
        name: "Main Gate",
        icon: "🚪",
        category: "Facilities",
        area: "Main Entrance",
        hours: "24 Hours",
        description:
            "Primary entrance to the Vignan University campus for students, staff and visitors."
    }

};


/* ================= ELEMENTS ================= */

const markers =
    document.querySelectorAll(".building");

const searchInput =
    document.getElementById("mapSearch");

const clearSearch =
    document.getElementById("clearSearch");

const filterButtons =
    document.querySelectorAll(".map-filter");

const locationCount =
    document.getElementById("locationCount");

const popup =
    document.getElementById("mapPopup");

const popupIcon =
    document.getElementById("popupIcon");

const popupCategory =
    document.getElementById("popupCategory");

const popupName =
    document.getElementById("popupName");

const popupDescription =
    document.getElementById("popupDescription");

const popupArea =
    document.getElementById("popupArea");

const popupHours =
    document.getElementById("popupHours");

const navigateButton =
    document.getElementById("navigateButton");


let selectedLocation = null;

let selectedCategory = "all";

let zoom = 1;


/* ================= SHOW POPUP ================= */

function showLocation(id) {

    const location =
        campusLocations[id];

    if (!location) {
        return;
    }

    selectedLocation = id;


    markers.forEach(marker => {

        marker.classList.remove("selected");

    });


    const marker =
        document.querySelector(
            `[data-id="${id}"]`
        );


    if (marker) {

        marker.classList.add("selected");

    }


    popupIcon.textContent =
        location.icon;

    popupCategory.textContent =
        location.category;

    popupName.textContent =
        location.name;

    popupDescription.textContent =
        location.description;

    popupArea.textContent =
        `📍 ${location.area}`;

    popupHours.textContent =
        `🕐 ${location.hours}`;


    popup.classList.add("show");

}


/* ================= BUILDING CLICK ================= */

markers.forEach(marker => {

    marker.addEventListener(
        "click",
        () => {

            showLocation(
                marker.dataset.id
            );

        }
    );

});


/* ================= CLOSE POPUP ================= */

document
    .getElementById("closePopup")
    .addEventListener(
        "click",
        () => {

            popup.classList.remove("show");

            markers.forEach(marker => {

                marker.classList.remove(
                    "selected"
                );

            });

            selectedLocation = null;

        }
    );


/* ================= SEARCH ================= */

function filterMap() {

    const search =
        searchInput.value
            .trim()
            .toLowerCase();


    let visible = 0;


    markers.forEach(marker => {

        const id =
            marker.dataset.id;

        const location =
            campusLocations[id];


        const name =
            location.name.toLowerCase();


        const category =
            marker.dataset.category;


        const matchesSearch =
            name.includes(search);


        const matchesCategory =
            selectedCategory === "all"
            ||
            category === selectedCategory;


        if (
            matchesSearch &&
            matchesCategory
        ) {

            marker.style.display =
                "flex";

            visible++;

        } else {

            marker.style.display =
                "none";

        }

    });


    locationCount.textContent =
        `${visible} location${visible === 1 ? "" : "s"}`;


    if (search.length > 0) {

        clearSearch.style.display =
            "block";

    } else {

        clearSearch.style.display =
            "none";

    }

}


searchInput.addEventListener(
    "input",
    filterMap
);


/* ================= CLEAR SEARCH ================= */

clearSearch.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        filterMap();

        searchInput.focus();

    }
);


/* ================= CATEGORY FILTER ================= */

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            filterButtons.forEach(btn => {

                btn.classList.remove(
                    "active"
                );

            });


            button.classList.add(
                "active"
            );


            selectedCategory =
                button.dataset.category;


            filterMap();

        }
    );

});


/* ================= ZOOM ================= */

const mapCanvas =
    document.getElementById("mapCanvas");


document
    .getElementById("zoomIn")
    .addEventListener(
        "click",
        () => {

            zoom =
                Math.min(
                    zoom + 0.1,
                    1.5
                );

            mapCanvas.style.transform =
                `scale(${zoom})`;

        }
    );


document
    .getElementById("zoomOut")
    .addEventListener(
        "click",
        () => {

            zoom =
                Math.max(
                    zoom - 0.1,
                    0.8
                );

            mapCanvas.style.transform =
                `scale(${zoom})`;

        }
    );


/* ================= RESET ================= */

document
    .getElementById("resetMap")
    .addEventListener(
        "click",
        () => {

            zoom = 1;

            mapCanvas.style.transform =
                "scale(1)";

        }
    );


/* ================= NAVIGATE ================= */

navigateButton.addEventListener(
    "click",
    () => {

        if (!selectedLocation) {
            return;
        }


        localStorage.setItem(
            "route-destination",
            selectedLocation
        );


        window.location.href =
            "route.html";

    }
);


/* ================= INITIAL ================= */

filterMap();