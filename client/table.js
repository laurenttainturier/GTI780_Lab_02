function constructTable(header_id, values_id) {
    let tableHeader = document.getElementById(header_id);
    let tableValues = document.getElementById(values_id);
    for (let i = 0; i < teamNumber; i++) {
        let th = document.createElement('th');
        let td = document.createElement('td');
        th.innerHTML = i;
        if (i < 10) {
            td.id = `equipe0${i}/${values_id.split('_')[0]}`;
        }
        else {
            td.id = `equipe${i}/${values_id.split('_')[0]}`;
        }
        tableHeader.appendChild(th);
        tableValues.appendChild(td);
    }
}

constructTable('temperature_header', 'temperature_values');
constructTable('pression_header', 'pression_values');
