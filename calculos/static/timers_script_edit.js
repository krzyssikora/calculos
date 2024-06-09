const sortableList = document.querySelector(".sortable-list");

timestamp_to_timestring = function(unix_timestamp) {
    let date = new Date(unix_timestamp);
    // Hours part from the timestamp
    let hours = date.getHours();
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    let seconds = "0" + date.getSeconds();
    // Will display time in 10:30:23 format
    let formattedTime;
    if (hours > 0) {
        formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    } else {
        formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    };
    return formattedTime;
};

delta_to_timestring = function(delta) {
    // let days = Math.floor(delta / (1000 * 60 * 60 * 24));
    let hours = Math.floor((delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = '0' + Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = '0' + Math.floor((delta % (1000 * 60)) / 1000);
    let formattedTime;
    if (hours > 0) {
        formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    } else {
        formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    };
    return formattedTime;
};


const initSortableList = (e) => {
    e.preventDefault();
    items = sortableList.querySelectorAll(".item:not(.item-add)");
    const draggingItem = document.querySelector(".dragging");
    // Getting all items except currently dragging and making array of them
    let siblings = [...sortableList.querySelectorAll(".item:not(.dragging)")];

    // Finding the sibling after which the dragging item should be placed
    let nextSibling = siblings.find(sibling => {
        return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    });
    if (!nextSibling) {
        nextSibling = siblings[siblings.length - 2]
    };

    // Inserting the dragging item before the found sibling
    sortableList.insertBefore(draggingItem, nextSibling);
};

if (sortableList) {
    items = sortableList.querySelectorAll(".item:not(.item-add)");
    items.forEach(item => {
        item.addEventListener("dragstart", () => {
            // Adding dragging class to item after a delay
            setTimeout(() => item.classList.add("dragging"), 0);
        });
        // Removing dragging class from item on dragend event
        item.addEventListener("dragend", () => item.classList.remove("dragging"));
    });
    sortableList.addEventListener("dragover", initSortableList);
    sortableList.addEventListener("dragenter", e => e.preventDefault());
};
