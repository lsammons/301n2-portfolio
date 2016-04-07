// var projects = [];
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

// TODO: Instead of a global `projects = []` array, let's track this list of all projects directly on the
// constructor function.
// Note: it is NOT on the prototype. In JavaScript, functions are themselves
// objects, which means we can add properties/values to them at any time. In this case, we have
// a key/value pair to track, that relates to ALL of the Article objects, so it does not belong on
// the prototype, as that would only be relevant to a single instantiated Article.
Project.all = [];

Project.prototype.toHtml = function() {
  var template = Handlebars.compile($('#rawData-template').text());
  // var myTemplate = $('#rawData-template').html();
  // var finishedTemplate = Handlebars.compile(myTemplate);
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? '- created ' + this.daysAgo + ' days ago' : '(comp/spec)';
  this.creativeTeam = this.creatives;

  this.body = marked(this.body); // for marked.js markdown

  return template(this);
};

// TODO: There are some other functions that also relate to articles across the board, rather than
// just single instances. Object-oriented programming would call these "class-level" functions,
// that are relevant to the entire "class" of objects that are Articles.

// TODO: This function will take the rawData, how ever it is provided,
// and use it to instantiate all the projects. This code is moved from elsewhere, and
// encapsulated in a simply-named function for clarity.
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
    // When rawData is already in localStorage,
    // we can load it with the .loadAll function above,
    // and then render the index page (using the proper method on the articleView object).
    //TODO: What do we pass in here to the .loadAll function?
    Project.loadAll(
      JSON.parse(localStorage.rawData)
    );
    //TODO: What method do we call to render the index page?
    //articleView.someFunctionToCall;
    projectView.initIndexPage();
  } else {
    // TODO: When we don't already have the rawData,
    // we need to retrieve the JSON file from the server with AJAX (which jQuery method is best for this?),
    // cache it in localStorage so we can skip the server call next time,
    // then load all the data into Project.all with the .loadAll function above,
    // and then render the index page.
    console.log('hello');
    // $.getJSON('../data/hackerIpsum.json', function( data ) {
    $.getJSON('../data/webProjects.json', function( data ) {
      localStorage.rawData = JSON.stringify(data);
      Project.loadAll(
        JSON.parse(localStorage.rawData)
      );
      projectView.initIndexPage();
    });
  }
};



  // OLD METHOD OF WORKING WITH RAW DATA
// rawData.forEach(function(ele) {
//   projects.push(new Project(ele));
// });

    // OLD METHOD OF SEPARATING OUT EACH PROJECT
// projects.forEach(function(a){
//   $('#projects').append(a.toHtml());
// });
