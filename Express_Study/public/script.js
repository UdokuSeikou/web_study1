async function getPersonalDataById(id) {
    const response = await fetch('/api/'+id);
    return await response.json();
}

async function showPersonalDataById(target,id) {
    const data = await getPersonalDataById(id);
    let html = '';
    if(data.row) {
        html += `<tr>
                    <td>${data.row.id}</td>
                    <td>${data.row.name}</td>
                    <td>${data.row.email}</td>
                </tr>`;
    }
    target.innerHTML = html;
}

async function addPersonalData(data) {
    const response = await fetch('/api/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}