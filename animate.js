function animate(obj, distance, callback) {
    clearInterval(obj.timer);
    if (obj.offsetLeft < distance) {
        obj.timer = setInterval(function () {
            if (obj.offsetLeft < distance) {
                let forWord = Math.ceil((distance - obj.offsetLeft) / 10);
                obj.style.left = obj.offsetLeft + forWord + 'px';
            } else {
                if (typeof callback === 'function') {
                    callback();
                }//callback&&callback();
                clearInterval(obj.timer);
            }
        }, 15)
    } else {
        obj.timer = setInterval(function () {
            if (obj.offsetLeft > distance) {
                let forWord = Math.floor((distance - obj.offsetLeft) / 10);
                obj.style.left = obj.offsetLeft + forWord + 'px';
            } else {
                if (typeof callback == 'function') {
                    callback();
                }
                clearInterval(obj.timer);
            }
        }, 15)
    }
}