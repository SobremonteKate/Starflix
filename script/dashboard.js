var formatBlock = function(blockmsg) {
    return {
        message: blockmsg,
        css: {
            border: 'none',
            padding: '15px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .5,
            color: '#fff',
            width: '200px'
        }
    };
}

var checkSession = function() {
    $.get('php/checksession.php', function(data) {
        var sessiondata = $.parseJSON(data);
        if(!sessiondata.isSuccess) {
            $(location).attr('href','login.html');
        } else {
                loadFirst();
        }
    });
};


var loadFirst = function() {
    setTimeout(function() {
        $('#core').removeClass('hidden');
        // $('#loader').addClass('hidden');
    }, 1000);
};

$('#logout').click(function(){
    $.get('php/logout.php', function(data) {
        checkSession();
    });    
});

$("#dash").click(function () {
    loadContent('dash.html', function () {
        console.log('dash.html loaded');
        updateTvShowCount();
        updateMovieCount();
        updateSeriesCount();
        updateUserCounts();
    });
});




$(window).on('popstate', function () {
    var path = location.pathname;
    if (path === '/dashboard') {
        loadContent('dashboard.html');
    } else if (path === '/tvShow') {
        loadContent('tvShow.html', initializeTvShowFeatures);
    } else if (path === '/series') {
        loadContent('series.html', initializeSeriesFeatures);
    } else if (path === '/movie') {
        loadContent('movie.html', initializeMovieFeatures);
    } else if (path === '/setupUser') {
        loadContent('setupUser.html', initializeUserFeatures);
    } else if (path === '/updateUser') {
        loadContent('updateUser.html', initializeUserFeatures);
    } else if (path === '/viewRecords') {
        loadContent('viewRecords.html', initializeViewUserFeature);
    } else if (path === '/account') {
        loadContent('account.html', initializeAccountFeatures);
    } else if (path === '/dash') {
        loadContent('dash.html', function() {
            updateTvShowCount();
            updateMovieCount();
            updateSeriesCount();
            updateUserCounts();
        });
    }
});



function loadContent(url, callback) {
    const blockmsg = 'Please wait <img style="display:inline;width:20px;height:20px;" src="public/img/loader.gif"/>';
    
        //used so that the scripts/functions dont jumble in the code and mess up the page
    if ($.blockUI) {
        $('#main-content').block({ 
            message: blockmsg,
            css: {
                border: 'none',
                padding: '15px',
                backgroundColor: '#000',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                opacity: 0.5,
                color: '#fff'
            }
        });
    } else {
        // Fallback loading indicator
        $('#main-content').html(`<div class="text-center">${blockmsg}</div>`);
    }

    $('#main-content').fadeOut(400, function () {
        $.get(url, function (data) {
            console.log('Content loaded:', url);
            $('#main-content').html(data).fadeIn(400);
            
            // Unblock if blockUI is available
            if ($.blockUI) {
                $('#main-content').unblock();
            }

            if (callback) callback(); // Reinitialize scripts

            // Update the browser's history (URL)
            history.pushState(null, null, url);
        }).fail(function (error) {
            console.error('Error loading content:', error);
            
            // Unblock if blockUI is available
            if ($.blockUI) {
                $('#main-content').unblock();
            }
        });
    });
}


// Attach event listeners, para magload yung html sa dashboard na linked
$("#TvShows, #TvShowslink").click(function () {
    loadContent('tvShow.html', function () {
        console.log('tvShow.html loaded');
        initializeTvShowFeatures(); 
    });
});


$("#Series, #Serieslink").click(function () {
    loadContent('series.html', function () {
        console.log('series.html loaded');
        initializeSeriesFeatures(); 
    });
});


$("#Movies, #Movieslink").click(function () {
    loadContent('movie.html', function () {
        console.log('movie.html loaded');
        initializeMovieFeatures(); 
    });
});


$("#SetupUser").click(function () {
    loadContent('setupUser.html', function () {
        console.log('setupUser.html loaded');
        initializeUserFeatures(); 
    });
});


$("#updateUserr").click(function () {
    console.log('updateUserr clicked');
    loadContent('updateUser.html', function () {
        console.log('updateUser.html loaded');
        initializeUserFeatures(); 
    });
});

$("#viewRecords").click(function () {
    loadContent('viewRecords.html', function () {
        console.log('viewRecords.html loaded');
        initializeViewUserFeatures(); 
    });
});


$("#account").click(function () {
    loadContent('account.html', function () {
        console.log('account.html loaded');
        initializeAccountFeatures(); 
    });
});


var Index = function() {
    "use strict";
    
    return {
        init: function() {
            checkSession()
             

        }
    }
}()

var checkSession = function () {
    $.get('php/checksession.php', function (data) {
        var sessiondata = $.parseJSON(data);
        if (!sessiondata.isSuccess) {
            $(location).attr('href', 'login.html');
        } else {
            loadFirst();
        }
    });
};

// Function for loading initial page content after session check
var loadFirst = function () {
    setTimeout(function () {
        $('#core').removeClass('hidden');
    }, 1000);
};

// Logout function
$('#logout').click(function () {
    $.get('php/logout.php', function (data) {
        checkSession();
    });
});

// Function to format block message for loading screen
var formatBlock = function (blockmsg) {
    return {
        message: blockmsg,
        css: {
            border: 'none',
            padding: '15px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .5,
            color: '#fff',
            width: '200px'
        }
    };
};


