function moverFazendo(data) {
    // console.log(data.data.parm);
    var atividade = data.data.array;
    // console.log(atividade);

    // alert($(this).text());
    swal({
        title: atividade.nome,
        html: "<p><b>Descrição:</b>" + atividade.descricao + "</p>",
        showCancelButton: true,
        confirmButtonText: "Iniciar tarefa",
        cancelButtonText: "Cancelar",
        focusConfirm: false,
        focusCancel: true
    }).then((result) => {
        // console.log(result)
        if (result.value) {
            swal({
                title: "Digite seu nome:",
                type: "question",
                text: "",
                input: "text",
                showCancelButton: true,
                cancelButtonText: "Cancelar"
            }).then((value) => {
                if (value.value) {
                    // mover o quadrado

                    atividade.usuario = value.value;
                    dados.fazendo.push(atividade);
                    var index = dados.fazendo.indexOf(atividade);


                    $(atividade).remove();
                    atividade.click({ array: dados.fazendo[index] }, moverFeito);
                    $("#fazendo").append(atividade);
                    delete dados.fazer[dados.fazendo.indexOf(atividade)];

                    swal({
                        title: "Tarefa iniciada com sucesso!",
                        type: "success"
                    });

                } else {
                    swal({
                        type: "error",
                        title: "Digite seu nome",
                        text: "É nescesario digitar seu nome!"
                    })
                }
            });
        }

    });
}


function moverFeito(data) {
    var atividade = data.data.array;
    // console.log(data.data);

    swal({
        title: atividade.nome,
        html: "<p><b>Descrição:</b>" + atividade.descricao + "</p><p><b>usuário: </b>" + atividade.usuario + "</p>",
        showCancelButton: true,
        confirmButtonText: "Finalizar tarefa",
        cancelButtonText: "Cancelar",
        focusConfirm: false,
        focusCancel: true
    }).then((result) => {
        if (result.value) {

            
            dados.feito.push(atividade);
            var index = dados.feito.indexOf(atividade);


            $(atividade).remove();
            atividade.click({ array: dados.fazendo[index] }, mostrarAtividade);
            $("#feito").append(atividade);
            delete dados.fazendo[dados.fazendo.indexOf(atividade)];


            swal({
                title: "Tarefa finalizada com sucesso!",
                type: "success"
            });
        }

    });
}

function mostrarAtividade(data){
    var atividade = data.data.array;
    // console.log(data.data);

    swal({
        title: atividade.nome,
        html: "<p><b>Descrição:</b>" + atividade.descricao + "</p><p><b>usuário: </b>" + atividade.usuario + "</p>",
    })
}

var dados = {
    fazer: [],
    fazendo: [],
    feito: []
};

$(document).ready(function () {
    $("#btn-add").click(function () {
        
        swal.mixin({
            input: 'text',
            confirmButtonText: 'Proximo',
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            progressSteps: ['1', '2']
        }).queue([
            {
                title: 'Nome da atividade',
                text: 'Escreva o nome da atividade:'
            },
            {
                title: "Descrição da atividade",
                text: "Escreva a descrição da atividade",
                input: "textarea"
            }
        ]).then((result) => {
            if (result.value && result.value[0]) {

                var atividade = $("<p class='card d-inline-block'> " + result.value[0] + " </p>");
                atividade.nome = result.value[0];
                atividade.descricao = result.value[1];
                dados.fazer.push(atividade);
                console.log(atividade);

                var index = dados.fazer.indexOf(atividade)
                dados.fazer[index].click({ array: dados.fazer[index] }, moverFazendo)
                // console.log(dados.fazer.indexOf(atividade));
                $("#fazer").append(atividade);


                swal({
                    title: 'Tarefa adicionada com sucesso!',
                    type: "success"
                })
            }
        })


    });
});