var projects = [];

function Project (opts) {
  // DONE: Use the js object passed in to complete this contructor function:
  // Save ALL the properties of `opts` into `this`.
  this.title = opts.title;
  this.category = opts.category;
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.publishedOn = opts.publishedOn;
  this.body = opts.body;
}

Project.prototype.toHtml = function() {
  var $newProject = $('project.template').clone();

  $newProject.attr('data-category', this.category);

  // TODO: Use jQuery to fill in the template with properties
  // from this particular Project instance. We need to fill in:
  // the author name and url, the Project title and body, and the
  // publication date.

  //$('h1').html(this.title);

  $newProject.find('h1').html(this.title);

  // Include the publication date as a 'title' attribute to show on hover:
  $newProject.find('time[pubdate]').attr('title', this.publishedOn);

  // Display the date as a relative number of "days ago":
  $newProject.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');

  $newProject.append('<hr>');

  // TODO: This cloned Project is no longer a template, so we should remove that class...

  // Remove Project.template so that this will show on page:
  $('project').removeClass('template');

  return $newProject;
};

rawData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(function(ele) {
  projects.push(new Project(ele));
});

projects.forEach(function(a){
  $('#projects').append(a.toHtml());
});
