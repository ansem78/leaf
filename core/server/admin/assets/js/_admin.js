$(function() {

    // Header.
    $('#toggle-nav').sidr({
        name : 'mobile-header',
        renaming : false,
        source : '#desktop-header'
    });

    $('.header-bar-close').on('click',function() {
        $.sidr('close','mobile-header');
    });

    if ($.isTouchCapable()) {
        $('#mobile-header').on('swipeleft',function() {
            $.sidr('close','mobile-header');
        });
    }

    $(window).on('resize',function() {
        $.sidr('close','mobile-header');
    });

    // Auto-display vertical scrollbar.
    $('.autoscroll').css('overflow','hidden');

    $('.autoscroll').on('mouseover',function() {
        $(this).css('overflow','auto');
    }).on('mouseout',function() {
        $(this).css('overflow','hidden');
    });

    // Sidebar.
    $('.toggle-sidebar').sidr({
        name : 'sidebar',
        renaming : false,
        source : '#sidebar',
        side : 'right',
        displace : false
    });

    $('#sidebar .title .close').on('click',function() {
        $.sidr('close','sidebar');
    });

    // Editor.
    $('#editor-markdown .editor-panel-content').prop('contenteditable',true);

    $('body').on('click','#editor-controls ul button',function() {
        var b = $(this);
        var i = $('#editor-controls ul button').index(b);
        $('.editor-panel').css('z-index','1');
        $('.editor-panel').eq(i).css('z-index','2');
        $('#editor-controls ul button').removeClass('active');
        b.addClass('active');
    });


});