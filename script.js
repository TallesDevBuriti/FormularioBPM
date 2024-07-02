$(document).ready(function () {
    $(document).ready(function(){
        $('.datepicker').datepicker({
            format: 'dd/mm/yyyy',
            todayHighlight: true,
            autoclose: true
        });
    });

    $('#box-dados-proprietarios').on('click', '#btn-close-tab', function() {
        $(this).closest('#box-proprietario').remove();
    });
    
    $('#btn-add-new-line').click(function() {
        var customHtml = `
                <div id="box-proprietario">
                    <hr>
                    <div class="d-flex justify-content-end mb-3">
                        <button type="button" id="btn-close-tab" class="btn btn-light btn-sm">
                            <img src="./src/img/icons/close_tab.svg" alt="Icone de fechar aba">
                        </button>
                    </div>
                    <div class="row g-2">
                        <div class="form-floating">
                            <input type="email" class="form-control" id="nomeProp" placeholder="Fulano de Tal...">
                            <label for="floatingInputGrid">Nome do Proprietário *</label>
                        </div>
                        <div class="col-md">
                            <div class="form-floating">
                              <input type="tel" class="form-control propPhone" id="contatoProp" maxlength="15" placeholder="(00) 00000-0000">
                              <label for="floatingInputGrid">Contato *</label>
                            </div>
                        </div>
                        <div class="col-md">
                            <div class="form-floating">
                              <input type="email" class="form-control" id="emailProp" placeholder="Fulano de Tal...">
                              <label for="floatingInputGrid">Email *</label>
                            </div>
                        </div>
                    </div>
                </div>`;
        
        $('#box-dados-proprietarios').append(customHtml);
    });
    
    // Consulta API de CEP
    $("#btn-search-cep").click(function() {
        let inputTextCep = $(".box-search-cep").val();
    
        fetch(`https://viacep.com.br/ws/${inputTextCep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.uf) {
                $('.box-estado').val(data.uf);
                $('.box-municipio').val(data.localidade);

                $('.box-estado').prop('disabled', true);
                $('.box-municipio').prop('disabled', true);
            } else {
                console.error('Resposta inválida da API');
            }
        })
        .catch(error => {
            console.error('Erro ao consultar a API:', error);
        });
    });

    // Format string to contact
    $('#box-dados-proprietarios').on('input', '#contatoProp', function() {
        let value = $(this).val();
        value = value.replace(/\D/g, '');
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        $(this).val(value);
    });

    // Format string to CEP (ZipCode)
    $('#cepArea').on('input', function() {
        console.log('foi')
        let value = $(this).val();
        value = value.replace(/\D/g, '');
        value = value.replace(/^(\d{5})(\d)/, '$1-$2');
        $(this).val(value);
    })   
})
