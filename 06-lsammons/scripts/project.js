var projects = [];

function Project (opts) {
  this.client = opts.client;
  this.clientUrl = opts.clientUrl;
  this.title = opts.title;
  this.category = opts.category;
  this.body = opts.body;
  this.createdOn = opts.createdOn;
  this.creatives = opts.creatives;
}

Project.prototype.toHtml = function() {
  var myTemplate = $('#rawData-template').html();
  var finishedTemplate = Handlebars.compile(myTemplate);
  this.daysAgo = parseInt((new Date() - new Date(this.createdOn))/60/60/24/1000);
  this.publishStatus = this.createdOn ? '- created ' + this.daysAgo + ' days ago' : '(comp/spec)';
  this.creativeTeam = this.creatives;
  return finishedTemplate(this);
};

rawData.forEach(function(ele) {
  projects.push(new Project(ele));
});

projects.forEach(function(a){
  $('#projects').append(a.toHtml());
});
