/* =====================================================
   VIGNAN CAMPUSNAV
   ROUTE FINDER
===================================================== */


/* =====================================================
   LOCATION DATA
===================================================== */

const locations = {

    gate: {
        name: "Main Gate",
        icon: "🚪"
    },

    "a-block": {
        name: "A Block",
        icon: "🏫"
    },

    "h-block": {
        name: "H Block",
        icon: "🏢"
    },

    "u-block": {
        name: "U Block",
        icon: "💻"
    },

    library: {
        name: "NTR Vignan Library",
        icon: "📚"
    },

    admin: {
        name: "Administrative Block",
        icon: "🏛️"
    },

    pharmacy: {
        name: "Pharmacy College",
        icon: "💊"
    },

    hostel: {
        name: "Hostels",
        icon: "🛏️"
    },

    medical: {
        name: "Health Centre",
        icon: "🏥"
    },

    sports: {
        name: "University Playground",
        icon: "🏟️"
    }

};


/* =====================================================
   CAMPUS WALKING NETWORK
===================================================== */

const campusGraph = {

    gate: {
        "a-block": 280,
        admin: 320,
        hostel: 600
    },

    "a-block": {
        gate: 280,
        "h-block": 240,
        admin: 360
    },

    "h-block": {
        "a-block": 240,
        "u-block": 260,
        library: 300,
        medical: 220
    },

    "u-block": {
        "h-block": 260,
        library: 350,
        pharmacy: 420
    },

    library: {
        "h-block": 300,
        "u-block": 350,
        admin: 330,
        medical: 240,
        sports: 400
    },

    admin: {
        gate: 320,
        "a-block": 360,
        library: 330,
        medical: 260
    },

    medical: {
        "h-block": 220,
        library: 240,
        admin: 260
    },

    pharmacy: {
        "u-block": 420,
        sports: 300,
        hostel: 350
    },

    hostel: {
        gate: 600,
        pharmacy: 350,
        sports: 250
    },

    sports: {
        library: 400,
        pharmacy: 300,
        hostel: 250
    }

};


/* =====================================================
   MAP POSITIONS
===================================================== */

const mapPositions = {

    gate: {
        x: 55,
        y: 200
    },

    "a-block": {
        x: 135,
        y: 90
    },

    "h-block": {
        x: 310,
        y: 175
    },

    "u-block": {
        x: 570,
        y: 80
    },

    library: {
        x: 350,
        y: 320
    },

    admin: {
        x: 120,
        y: 300
    },

    medical: {
        x: 240,
        y: 225
    },

    pharmacy: {
        x: 590,
        y: 275
    },

    hostel: {
        x: 600,
        y: 170
    },

    sports: {
        x: 490,
        y: 330
    }

};


/* =====================================================
   DOM ELEMENTS
===================================================== */

const fromLocation =
    document.getElementById("fromLocation");

const toLocation =
    document.getElementById("toLocation");

const findRouteButton =
    document.getElementById("findRouteButton");

const routeResult =
    document.getElementById("routeResult");

const routeEmpty =
    document.getElementById("routeEmpty");

const routeDistance =
    document.getElementById("routeDistance");

const routeTime =
    document.getElementById("routeTime");

const routeStops =
    document.getElementById("routeStops");

const routePath =
    document.getElementById("routePath");

const routeMarkers =
    document.getElementById("routeMarkers");

const directionsList =
    document.getElementById("directionsList");


/* =====================================================
   DIJKSTRA ALGORITHM
===================================================== */

function findShortestPath(start, destination) {

    const distances = {};

    const previous = {};

    const unvisited =
        new Set(Object.keys(campusGraph));


    Object.keys(campusGraph).forEach(
        node => {

            distances[node] =
                Infinity;

            previous[node] =
                null;

        }
    );


    distances[start] = 0;


    while (unvisited.size > 0) {

        let current = null;

        let shortest =
            Infinity;


        unvisited.forEach(
            node => {

                if (
                    distances[node]
                    < shortest
                ) {

                    shortest =
                        distances[node];

                    current =
                        node;

                }

            }
        );


        if (current === null) {
            break;
        }


        unvisited.delete(current);


        if (current === destination) {
            break;
        }


        const neighbours =
            campusGraph[current];


        Object.keys(neighbours).forEach(
            neighbour => {

                if (
                    !unvisited.has(neighbour)
                ) {
                    return;
                }


                const newDistance =
                    distances[current]
                    + neighbours[neighbour];


                if (
                    newDistance
                    < distances[neighbour]
                ) {

                    distances[neighbour] =
                        newDistance;

                    previous[neighbour] =
                        current;

                }

            }
        );

    }


    const path = [];

    let current =
        destination;


    while (current !== null) {

        path.unshift(current);

        current =
            previous[current];

    }


    if (
        path.length === 0 ||
        path[0] !== start
    ) {

        return null;

    }


    return {

        path: path,

        distance:
            distances[destination]

    };

}


/* =====================================================
   FIND ROUTE
===================================================== */

function generateRoute() {

    const start =
        fromLocation.value;

    const destination =
        toLocation.value;


    if (!start || !destination) {

        alert(
            "Please select both starting point and destination."
        );

        return;

    }


    if (start === destination) {

        alert(
            "Starting point and destination cannot be the same."
        );

        return;

    }


    const result =
        findShortestPath(
            start,
            destination
        );


    if (!result) {

        alert(
            "No route could be found."
        );

        return;

    }


    showRoute(
        result.path,
        result.distance
    );

}


/* =====================================================
   SHOW ROUTE
===================================================== */

function showRoute(
    path,
    distance
) {

    routeEmpty.classList.add(
        "hidden"
    );

    routeResult.classList.remove(
        "hidden"
    );


    routeDistance.textContent =
        `${distance} m`;


    const minutes =
        Math.max(
            1,
            Math.ceil(distance / 80)
        );


    routeTime.textContent =
        `${minutes} min`;


    routeStops.textContent =
        path.length;


    drawRoute(path);

    createMarkers(path);

    createDirections(path);


    routeResult.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =====================================================
   DRAW ROUTE
===================================================== */

function drawRoute(path) {

    if (!path.length) {
        return;
    }


    const first =
        mapPositions[path[0]];


    let d =
        `M ${first.x} ${first.y}`;


    for (
        let i = 1;
        i < path.length;
        i++
    ) {

        const previous =
            mapPositions[path[i - 1]];

        const current =
            mapPositions[path[i]];


        /*
            Add a smooth midpoint curve.
        */

        const controlX =
            (previous.x + current.x) / 2;

        const controlY =
            (previous.y + current.y) / 2;


        d +=
            ` Q ${controlX} ${controlY} ${current.x} ${current.y}`;

    }


    routePath.setAttribute(
        "d",
        d
    );

}


/* =====================================================
   CREATE MAP MARKERS
===================================================== */

function createMarkers(path) {

    routeMarkers.innerHTML = "";


    path.forEach(
        (id, index) => {

            const position =
                mapPositions[id];


            const marker =
                document.createElement(
                    "div"
                );


            marker.classList.add(
                "route-marker"
            );


            if (
                index === path.length - 1
            ) {

                marker.classList.add(
                    "end"
                );

                marker.textContent =
                    "🎯";

            } else if (
                index === 0
            ) {

                marker.textContent =
                    "📍";

            } else {

                marker.textContent =
                    "•";

            }


            marker.style.left =
                `${(position.x / 700) * 100}%`;


            marker.style.top =
                `${(position.y / 400) * 100}%`;


            marker.title =
                locations[id].name;


            routeMarkers.appendChild(
                marker
            );

        }
    );

}


/* =====================================================
   DIRECTIONS
===================================================== */

function createDirections(path) {

    directionsList.innerHTML = "";


    path.forEach(
        (id, index) => {

            const step =
                document.createElement(
                    "div"
                );


            step.className =
                "direction-step";


            const number =
                index + 1;


            if (index === 0) {

                step.innerHTML = `

                    <div class="direction-number">
                        ${number}
                    </div>

                    <div>

                        <strong>
                            Start at ${locations[id].name}
                        </strong>

                        <span>
                            Begin your journey from this location.
                        </span>

                    </div>

                `;

            } else if (
                index === path.length - 1
            ) {

                step.innerHTML = `

                    <div class="direction-number">
                        ${number}
                    </div>

                    <div>

                        <strong>
                            Arrive at ${locations[id].name}
                        </strong>

                        <span>
                            You have reached your destination.
                        </span>

                    </div>

                `;

            } else {

                step.innerHTML = `

                    <div class="direction-number">
                        ${number}
                    </div>

                    <div>

                        <strong>
                            Continue via ${locations[id].name}
                        </strong>

                        <span>
                            Follow the campus pathway towards your destination.
                        </span>

                    </div>

                `;

            }


            directionsList.appendChild(
                step
            );

        }
    );

}


/* =====================================================
   SWAP LOCATIONS
===================================================== */

document
    .getElementById("swapLocations")
    .addEventListener(
        "click",
        () => {

            const temporary =
                fromLocation.value;


            fromLocation.value =
                toLocation.value;


            toLocation.value =
                temporary;

        }
    );


/* =====================================================
   FIND BUTTON
===================================================== */

findRouteButton.addEventListener(
    "click",
    generateRoute
);


/* =====================================================
   QUICK ROUTES
===================================================== */

document
    .querySelectorAll(".quick-route")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                fromLocation.value =
                    button.dataset.from;


                toLocation.value =
                    button.dataset.to;


                generateRoute();

            }
        );

    });


/* =====================================================
   CLEAR ROUTE
===================================================== */

document
    .getElementById("clearRoute")
    .addEventListener(
        "click",
        () => {

            routeResult.classList.add(
                "hidden"
            );

            routeEmpty.classList.remove(
                "hidden"
            );


            routePath.setAttribute(
                "d",
                ""
            );


            routeMarkers.innerHTML =
                "";

            directionsList.innerHTML =
                "";

        }
    );


/* =====================================================
   SAVED DESTINATION
===================================================== */

const savedDestination =
    localStorage.getItem(
        "route-destination"
    );


if (
    savedDestination &&
    locations[savedDestination]
) {

    toLocation.value =
        savedDestination;


    localStorage.removeItem(
        "route-destination"
    );

}