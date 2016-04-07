// Configure a view object, to hold all my functions for dynamic updates
//and project-related event handlers.
var projectView = {};

// populate the category filter on project page
projectView.populateFilters = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {

      var val = $(this).find('address a').text();
      var optionTag = '<option value="' + val + '">' + val + '</option>';

      val = $(this).attr('data-category');
      optionTag = '<option value="' + val + '">' + val + '</option>';

      if ($('#category-filter option[value="' + val + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

// this function allows filter by category for projects
projectView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $('article[data-category="' + $(this).val() + '"]').fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
  });
};

/*  handles the main nav clicks and hides/shows content */
projectView.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function(e) {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });
  // Let's now trigger a click on the first .tab element, to set up the page.
  $('.main-nav .tab:first').click();
};

//  teasers are the small blocks truncated for each project
projectView.setTeasers = function() {
  // Hide elements beyond the first 2 in any artcile body.
  $('.article-body *:nth-of-type(n+2)').hide();
  // articles 5
  $('#projects').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    $(this).parent().find('*').fadeIn();
    $(this).hide();
  });
};

// initialize index page
projectView.initIndexPage = function() {
  Project.all.forEach(function(a){
    $('#projects').append(a.toHtml());
  });
  projectView.populateFilters();
  projectView.handleCategoryFilter();
  projectView.handleMainNav();
  projectView.setTeasers();
};
