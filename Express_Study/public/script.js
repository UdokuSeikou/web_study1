async function getPersonalData() {
    const response = await fetch('/api');
    return await response.json();
}

async function showPersonalData(target) {
    const data = await getPersonalData();
    let html = '';
    for (let row of data.rows) {
        html += `<tr>
                    <td>${row.id}</td>
                    <td>${row.name}</td>
                    <td>${row.email}</td>
                </tr>`;
    }
    target.innerHTML = html;
}