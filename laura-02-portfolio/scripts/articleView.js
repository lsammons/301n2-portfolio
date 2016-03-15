var articleView = {};

articleView.populateFilters = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      var val = $(this).find('address a').text();
      var optionTag = '<option value="' + val + '">' + val + '</option>';
      $('#author-filter').append(optionTag);

      val = $(this).attr('data-category');
      optionTag = '<option value="' + val + '">' + val + '</option>';
      if ($('#category-filter option[value="' + val + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      var targetName = $(this).val();
      $('article').hide();
      $('article').each(function() {
        var name = $(this).attr('data-attribute');
        if (name === targetName) {
          $(this).show();
        };
      });
    } else {
      $('article').show();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      // grab the option "value", which is the author name
      var targetCategory = $(this).val();
      $('article').hide();

      $('article').each(function() {
        var name = $(this).attr('data-category');
        if (name === targetCategory) {
          $(this).show();
        };
      });

    } else {
      $('article').show();
      $('article.template').hide();
    }
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = function() {
  $('.main-nav').on('click','li.tab', function(){
    $('.tab-content').hide();
    $('#'+ $(this).data('content')).show();
  });

  $('.main-nav .tab:first').click();
};

articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide();
  $('#articles').on('click',function(ev){
    var $evTarget = $(ev.target);
    ev.preventDefault();

    if($evTarget.hasClass('read-on')){
      $evTarget.prev().children().show();
      $evTarget.hide();
    }
  });
};

$(document).ready(function() {
  articleView.populateFilters();
  articleView.handleAuthorFilter();
  articleView.handleCategoryFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
});
