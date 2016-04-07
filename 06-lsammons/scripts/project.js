// the constructor function, with list of projects appended directly to the function as object.
function Project (opts) {
  this.client = opts.client;
  this.clientUrl = opts.clientUrl;
  this.title = opts.title;
  this.category = opts.category;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn;
  this.creatives = opts.creatives;
}

// Tracking list of all projects directly on the constructor function.
// Note: it is NOT on the prototype. In JavaScript, functions are themselves
// objects, which means we can add properties/values to them at any time. In this case, we have
// a key/value pair to track, that relates to ALL of the Project objects, so it does not belong on
// the prototype, as that would only be relevant to a single instantiated Project.
Project.all = [];

// Prototype only touches one instance of an object
Project.prototype.toHtml = function() {
  var template = Handlebars.compile($('#rawData-template').text());
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? '- created ' + this.daysAgo + ' days ago' : '(comp/spec)';
  this.creativeTeam = this.creatives;
  this.body = marked(this.body); // for marked.js markdown
  return template(this);
};

// This function takes the JSON rawData, how ever it is provided (local or remote),
// and use it to instantiate all the projects.
Project.loadAll = function(rawData) {
  rawData.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });
  rawData.forEach(function(ele) {
    Project.all.push(new Project(ele));
  });
};

// This function will retrieve the data from either a local or remote source,
// and process it, then hand off control to the View.
Project.fetchAll = function() {
  if (localStorage.rawData) {
    Project.loadAll(
      JSON.parse(localStorage.rawData)
    );
    projectView.initIndexPage();
  } else {
    $.getJSON('../data/webProjects.json', function( data ) {
      localStorage.rawData = JSON.stringify(data);
      Project.loadAll(
        JSON.parse(localStorage.rawData)
      );
      projectView.initIndexPage();
    });
  }
};
