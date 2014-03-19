window.required_files = [];
window.require = function(files, callback) {

    var total     = files.length,
        complete  = total,
        file      = null,
        completed = 0;

    for (var i = 0; i < total; i++) {

        file = files[i];
        if (window.required_files.indexOf(file) > -1) {
            complete -= 1;
            continue;
        }

        var element    = document.createElement('script');
        element.type    = 'text/javascript';
        element.src     = '/js/lib/obelisk/' + file + '.js';
        element.onload  = function() {
            completed  += 1;
        };

        window.required_files.push(file);
        document.body.appendChild(element);
    }
    if (callback !== undefined) {

        var times       = 0;
        var max         = 10;
        var synchronous = setInterval(function() {

            times += 1;
            if (completed >= complete || times == max) {

                clearInterval(synchronous);
                callback.apply(window, []);
            }

        }, 100);
    }

    return true;
}

