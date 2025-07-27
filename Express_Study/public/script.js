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