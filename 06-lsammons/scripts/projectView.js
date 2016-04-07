// Configure a view object, to hold all our functions for dynamic updates
//and project-related event handlers.
var projectView = {};

projectView.populateFilters = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {

      var val = $(this).find('address a').text();
      var optionTag = '<option value="' + val + '">' + val + '</option>';
      // can remove author filter?
      //$('#author-filter').append(optionTag);

      val = $(this).attr('data-category');
      optionTag = '<option value="' + val + '">' + val + '</option>';

      if ($('#category-filter option[value="' + val + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    } // end .template if
  });// end jQuery select article function
}; // end main function


// projectView.handleAuthorFilter = function() {
//   $('#author-filter').on('change', function() {
//     if ($(this).val()) {
//       $('article').hide();
//       $('article[data-author="' + $(this).val() + '"]').fadeIn();
//     } else {
//       $('article').fadeIn();
//       $('article.template').hide();
//     }
//     $('#category-filter').val('');
//   });
// };

// projectView.handleCategoryFilter = function() {
//   $('#category-filter').on('change', function() {
//     if ($(this).val()) {
//       $('article').hide();
//       $('article[data-category="' + $(this).val() + '"]').fadeIn();
//     } else {
//       $('article').fadeIn();
//       $('article.template').hide();
//     }
//     $('#author-filter').val('');
//   });
// };

/* LAURA - this function allows filter by category for projects by category */
projectView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $('article[data-category="' + $(this).val() + '"]').fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    //$('#author-filter').val('');
  });
};

/* LAURA this handles the clicks and hides/shows content */
projectView.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function(e) {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });

  $('.main-nav .tab:first').click(); // Let's now trigger a click on the first .tab element, to set up the page.
};

/* LAURA teasers are the small blocks truncated for each project */
projectView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide(); // Hide elements beyond the first 2 in any artcile body.

  $('#projects').on('click', 'a.read-on', function(e) {  // articles 5
    e.preventDefault();
    $(this).parent().find('*').fadeIn();
    $(this).hide();
  });
};

// LAURA - NEW FUNCTIONS BELOW!
// projectView.initNewArticlePage = function() { // initNewArticlePage
//   $('.tab-content').show();
//   $('#export-field').hide();
//   $('#article-json').on('focus', function(){
//     this.select();
//   });
//
//   $('#new-form').on('change', 'input, textarea', projectView.create);
// };

// projectView.create = function() {
//   var article;
//   $('#articles').empty();

  // Instantiate an article based on what's in the form fields:
  // article = new Project({
  //   title: $('#article-title').val(),
  //   author: $('#article-author').val(),
  //   authorUrl: $('#article-author-url').val(),
  //   category: $('#article-category').val(),
  //   body: $('#article-body').val(),
  //   publishedOn: $('#article-published:checked').length ? util.today() : null
  // });

  // Use the Handblebars template to put this new article into the DOM:
  // $('#projects').append(article.toHtml());

  // Activate the highlighting of any code blocks:
  // $('pre code').each(function(i, block) {
  //   hljs.highlightBlock(block);
  // });

  // Export the new article as JSON, so it's ready to copy/paste into blogArticles.js:
//   $('#export-field').show();
//   $('#article-json').val(JSON.stringify(article) + ',');
// };

projectView.initIndexPage = function() {
  Project.all.forEach(function(a){
    $('#projects').append(a.toHtml());
  });

  projectView.populateFilters();
  projectView.handleCategoryFilter();
  //projectView.handleAuthorFilter();
  projectView.handleMainNav();
  projectView.setTeasers();
};
