$(function() {
    
    var $el = $(),
        $mainContent = $("#main-content");
    
    // Used for fading out the content while leaving whiteness/main content area along     
    $mainContent.wrapInner("<div id='fade-wrapper' />");
    
    // add in AJAX spinning graphic (hidden by CSS)
    $mainContent.append('<img src="images/ajax-loader.gif" id="ajax-loader" />');    
    
    var $fadeWrapper = $("#fade-wrapper"),
        $allNav = $("#main-nav a"),
        $allListItems = $("#main-nav li"),
        url = '',
        liClass = '',
        hash = window.location.hash,
        $ajaxLoader = $("#ajax-loader");
    
    // remove ID, which is used only for nav highlighting in non-JS version            
    $("body").attr("id", "");    
    
    // If, when the page loads, it has a #hash value in the URL
    if (hash) {
        hash = hash.substring(1);
        liClass = hash.substring(0,hash.length-4);
        url = hash + " #inside-content";
        $fadeWrapper.load(url);
        $("." + liClass).addClass("active");
    } else {
        // No hash tag present, so make the first item in the nav the active nav
        $("#main-nav li:first").addClass("active");
    }
        
    $allNav.click(function(e) {
    
        $el = $(this);
        
        // Only proceed with the AJAX nav if the click is the non-current page
        if (!$el.parent().hasClass("active")) {
        
            // Scroll the page up (mostly so they can see the spinner graphic begin)
            $(window).scrollTop(0);
                        
            url = $el.attr("href") + " #inside-content";
            
            $fadeWrapper.animate({ opacity: 0.1 });
            $ajaxLoader.fadeIn(400, function() {
            
                $fadeWrapper.load(url, function() {
                
                    window.location.hash = $el.attr("href");
                    
                    $fadeWrapper.animate({ opacity: 1 });
                    $ajaxLoader.fadeOut();
                
                });
            
                $allListItems.removeClass("active");
                $el.parent().addClass("active");
            
            });
                    
        }
        
        // Make sure the links don't reload the page
        e.preventDefault();
    
    });

});