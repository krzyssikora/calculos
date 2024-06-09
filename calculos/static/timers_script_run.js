let items;
let task_idx = 0;
let task_start;
let timer_total;
let total_exceeded = false;
const tasks_no = tasks.length;
const snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');


tasksCompleted = function() {
    let value = 0;
    for (let i=0; i<tasks_no; i++) {
        value += tasks[i]['status'];
    };
    return value;
};

showTask = function(tid) {
    for (let i=0; i<tasks_no; i++) {
        let container = document.getElementById(`container-${i}`);
        if (tid == i) {
            container.classList.remove('hidden');
        } else {
            container.classList.add('hidden');
        };
    };
};


updateTimesOnClick = function() {
    let difference = new Date().getTime() - task_start;
    tasks[task_idx]['time_spent'] += difference;
    tasks[task_idx]['time_left'] -= difference;
    task_start = Date.now();
};

previousTask = function() {
    updateTimesOnClick();
    do {
        task_idx--;
        if (task_idx < 0) {
            task_idx += tasks_no;
        };
    } while (tasks[task_idx]['status'] == 1);
    showTask(task_idx);
};

nextTask = function() {
    updateTimesOnClick();
    do {
        task_idx = (task_idx + 1) % tasks_no;
    } while (tasks[task_idx]['status'] == 1);
    showTask(task_idx);
};

document.getElementById('backward').addEventListener('click', (e) => {
    e.preventDefault;
    previousTask();
});

document.getElementById('forward').addEventListener('click', (e) => {
    e.preventDefault;
    nextTask();
});

updateElement = function(identifier, time, time_to_check, npref) {
    let prefix = '';
    let class_name = 'text-success';
    if (time_to_check < 0) {
        prefix = npref;
        class_name = 'text-danger';
    };
    let element = document.getElementById(identifier);
    element.innerHTML = prefix + delta_to_timestring(time);
    element.classList.add(class_name);
};


endTiming = function() {
    clearInterval(timer_total);
    let url = "/timers/done";
    let tasks_json = JSON.stringify({'tasks': tasks});
    fetch(url, {
        method:'POST',
        headers:{
            'Content-type':'application/json',
            'X-CSRFToken':csrftoken,
        },
        body:JSON.stringify({'tasks': tasks})
    })
    .then((response) => response.json())
    .then(function(data) {
        let to_hide = [...document.querySelectorAll('#total-time, #buttons')];
        let tasks = data['tasks'];
        let total_time = 0;
        let total_spent = 0;
        let total_left = 0;
        tasks.forEach(task => {
            let task_id = task['order'];
            to_hide.push(document.getElementById(`container-${task_id}`));
            document.getElementById(`lp-${task_id}`).innerHTML = task_id + 1;
            total_time += task['total_time'];
            total_spent += task['time_spent'];
            total_left += task['time_left'];
            updateElement(`summary-spent-${task_id}`, task['time_spent'], task['total_time'] - task['time_spent'], '');
            updateElement(`summary-left-${task_id}`, task['time_left'], task['time_left'], '-');
        });
        document.getElementById('summary-total-time').innerHTML = delta_to_timestring(total_time);
        updateElement('summary-total-left', total_left, total_time - total_spent, '-');
        updateElement('summary-total-spent', total_spent, total_spent, '');
        to_hide.forEach(elt => {
            elt.classList.add('hidden');
        });
        document.getElementById('summary').classList.remove('hidden');
    });
};

finishTask = function() {
    updateTimesOnClick();
    tasks[task_idx]['status'] = 1;
    if (tasksCompleted() == tasks_no) {
        endTiming();
    } else {
        while (tasks[task_idx]['status'] == 1) {
            task_idx = (task_idx + 1) % tasks_no;
        };
    };
    showTask(task_idx);
};
document.getElementById('accept').addEventListener('click', (e) => {
    e.preventDefault;
    finishTask();
});


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
    delta = Math.abs(delta);
    // let days = Math.floor(delta / (1000 * 60 * 60 * 24));
    let hours = Math.floor((delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = '0' + Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = '0' + Math.round((delta % (1000 * 60)) / 1000);
    let formattedTime;
    if (hours > 0) {
        formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    } else {
        formattedTime = minutes.substr(-2) + ':' + seconds.substr(-2);
    };
    return formattedTime;
};

// tags where time is to be displayed
const total_time_left_tag = document.getElementById('total-time-left');
const total_time_spent_tag = document.getElementById('total-time-spent');
const task_time_left_tags = [];
const task_time_spent_tags = [];

let total_time_spent = 0;
let total_time = 0
for (let i=0; i<tasks.length; i++) {
    let task = tasks[i];
    total_time += task['total_time'];
    task_time_left_tags.push(document.getElementById(`task-time-left-${i}`));
    task_time_spent_tags.push(document.getElementById(`task-time-spent-${i}`));
};
let total_time_left = total_time;

initialize = function() {
    showTask(task_idx);
    const start = Date.now();
    task_start = start;

    // Update the count down every 1 second
    timer_total = setInterval(function() {
        // Get today's date and time
        let now = new Date().getTime();
        let total_time_spent = now - start;
        let task_time_spent = now - task_start;

        total_time_left = total_time - total_time_spent;

        // Display the results
        total_time_left_tag.innerHTML = delta_to_timestring(total_time_left);
        total_time_spent_tag.innerHTML = delta_to_timestring(total_time_spent);
        task_time_left_tags[task_idx].innerHTML = delta_to_timestring(tasks[task_idx]['time_left'] - task_time_spent);
        task_time_spent_tags[task_idx].innerHTML = delta_to_timestring(tasks[task_idx]['time_spent'] + task_time_spent);

        // If the count down is finished:
        if (total_time_spent > total_time & !total_exceeded) {
            total_exceeded = true;
            snd.play();
            total_time_left_tag.classList.remove('text-success');
            total_time_left_tag.classList.add('text-danger');
        };
        if (tasks[task_idx]['time_spent'] + task_time_spent > tasks[task_idx]['total_time']) {
            if (!tasks[task_idx]['exceeded']) {
                tasks[task_idx]['exceeded'] = true;
                task_time_left_tags[task_idx].classList.remove('text-success');
                task_time_left_tags[task_idx].classList.add('text-danger');
                snd.play();
            };
        };
    }, 1000);
};

window.onload = initialize;
