var LW = {};
LW.API = 'http://detroitwiki.org'; //surveys

LW.collections = {};
LW.models = {};
LW.views = {};
LW.routers = {};
LW.templates = {};


var app = {
    initialize: function() {
        this.bind();
        console.log("Initialize PhoneGap");
        
        // Init the backbone app. Later, this should go under deviceready. 
        
        // Start routing. 
        var Everything = new LW.views.Root();
        Everything.startRouting();
    },
    
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    
    deviceready: function() {
        // note that this is an event handler so the scope is that of the event
        // so we need to call app.report(), and not this.report()
        app.report('deviceready');
    },
    
    report: function(id) { 
        console.log("report:" + id);
        // hide the .pending <p> and show the .complete <p>
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
    }
};

