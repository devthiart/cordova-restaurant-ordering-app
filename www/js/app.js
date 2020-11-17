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

$('.scan-qrcode').click(function(){
    cordova.plugins.barcodeScanner.scan(function(resultado){
        Materialize.toast("Acessou Plugin", 2000);
        if(resultado.text) {
            Materialize.toast('Mesa ' + resultado.text, 2000);
            $('#numero-mesa').val(resultado.text);
            Materialize.toast("Funcionou", 2000);
        }
    },
    function(error){
        Materialize.toast('Erro ' + error, 3000, 'red-text');
    });
});

$('.acao-finalizar').click(function(){
    $.ajax({
        url: 'http://cozinhapp.sergiolopes.org/novo-pedido',
        data: {
            mesa: $('#numero-mesa').val(),
            pedido: $('#resumo').text()
        },
        success: function(resposta) {
            Materialize.toast(resposta, 2000);
            
            $('#numero-mesa').val('');
            $('.badge').remove();
        },
        error: function(erro) {
            Materialize.toast(erro.responseText, 3000, 'red-text');
        }
    });
});