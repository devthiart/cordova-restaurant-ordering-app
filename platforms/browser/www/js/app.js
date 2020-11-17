$('.collection-item').on('click', function(){
    var tann_$badge = $('.badge', this);
    if(tann_$badge.length == 0) {
        tann_$badge = $('<span class="badge brown-text">0</span>').appendTo(this);
    }
    tann_$badge.text(parseInt(tann_$badge.text())+1);
});

$('.modal-trigger').leanModal();

$('#confirmar').on('click', function(){
    var tann_texto = '';
    
    $('.badge').parent().each(function(){
        var tann_produto = this.firstChild.textContent;
        var tann_quantidade = this.lastChild.textContent;
        
        tann_texto += tann_quantidade + ': ' + tann_produto + ', ';
    });
    
    $('#resumo').text(tann_texto);
});

$('.collection').on('click', '.badge', function(){
    $(this).remove();
    return false;
});

$('.acao-limpar').on('click', function(){
    $('#numero-mesa').val('');
    $('.badge').remove();
});