this.workflowCockpit = workflowCockpit({
    init: _init,
    onSubmit: _saveData,
    onError: _rollback
});

function _init(data, info) {
    if (data && data.loadContext) {
        const { initialVariables } = data.loadContext;
        console.log("initialVariables: " + JSON.stringify(initialVariables));
    }
    
    info
        .getUserData()
        .then(function (user) {
            document.querySelector(".nomFun").setAttribute("value", user.fullname);
        })
        .then(function () {
        info.getPlatformData().then(function (platformData) {
            console.log(platformData);
        });
    });
}

function _saveData(data, info) {
    if (!isFormValid()) {
      document.getElementById("gridCheck").setAttribute("class", "form-check-input is-invalid");
      throw new Error("Os dados informados não são válidos.");
    }
    let newData = {};
    let selectArea = document.getElementById("areaEmp");
    let selectRegArea = document.getElementById("regArea");

    const dadosProprietarios = [];
    let blocksProp = document.querySelectorAll('#box-proprietario');
  
    // Aba 1
    newData.nomFun = document.getElementById("nomFun").value;
    newData.area = selectArea.options[selectArea.selectedIndex].value;
    newData.dataEntrada = document.getElementById("dataEntrada").value;

    // Aba 2
    blocksProp.forEach(function(block) {
        const nomeProp = block.querySelector('#nomeProp').value;
        const contatoProp = block.querySelector('#contatoProp').value;
        const emailProp = block.querySelector('#emailProp').value;
        
        dadosProprietarios.push({nomeProp, contatoProp, emailProp});
    })
    
    newData.props = dadosProprietarios;
    
    // Aba 3
    newData.regArea = selectRegArea.options[selectRegArea.selectedIndex].value;
    newData.cepArea = document.getElementById("cepArea").value;
    newData.cepEstado = document.getElementById("cepEstado").value;
    newData.municipio = document.getElementById("municipio").value;
    newData.areaHect = document.getElementById("areaHect").value;
    newData.areaMQ = document.getElementById("areaMQ").value;
 
    console.log(newData);
    return {
      formData: newData,
    };
}

function _rollback(data, info) {
    console.log(data.error);
    if (info.isRequestNew()) {
       return removeData(data.processInstanceId);
    }
    return rollbackData(data.processInstanceId);
}
