let $test = jQuery('#test')
$test.addClass('red').addClass('black').find('.child').addClass('red')
$test.find('.child').end().addClass('pink')
$test.find('.child').each((div) => console.log(div))
$test.find('.child').parent().print()
$test.children().print()