// Classes para gerenciar os dados dos sensores
class Sensor {
    constructor() {
        this.dados = [];
    }

    adicionarDados(horario, valor) {
        if (this.dados.length < 48) {
            this.dados.push({ horario, valor });
            this.ordenarDados();
            return true;
        }
        return false;
    }
}

class Temperatura extends Sensor {
    ordenarDados() {
        this.dados.sort((a, b) => a.valor - b.valor); // Ordem crescente
    }
}

class Umidade extends Sensor {
    ordenarDados() {
        this.dados.sort((a, b) => b.valor - a.valor); // Ordem decrescente
    }
}

class CO2 extends Sensor {
    ordenarDados() {
        this.dados.sort((a, b) => a.valor - b.valor); // Ordem crescente
    }
}

// Instâncias dos sensores
const temperatura = new Temperatura();
const umidade = new Umidade();
const co2 = new CO2();

// Configuração dos gráficos
const tempChart = new Chart(document.getElementById('tempChart'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Temperatura (°C)',
            data: [],
            borderColor: '#1a73e8',
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});

const humidChart = new Chart(document.getElementById('humidChart'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Umidade (%)',
            data: [],
            borderColor: '#34a853',
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});

const co2Chart = new Chart(document.getElementById('co2Chart'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'CO2 (ppm)',
            data: [],
            borderColor: '#ea4335',
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});

// Funções para adicionar dados
function adicionarTemperatura() {
    const horario = document.getElementById('temp-time').value;
    const valor = parseFloat(document.getElementById('temp-value').value);

    if (temperatura.adicionarDados(horario, valor)) {
        atualizarTabela('temp-table', temperatura.dados);
        atualizarGrafico(tempChart, temperatura.dados);
    }
}

function adicionarUmidade() {
    const horario = document.getElementById('humid-time').value;
    const valor = parseFloat(document.getElementById('humid-value').value);

    if (umidade.adicionarDados(horario, valor)) {
        atualizarTabela('humid-table', umidade.dados);
        atualizarGrafico(humidChart, umidade.dados);
    }
}

function adicionarCO2() {
    const horario = document.getElementById('co2-time').value;
    const valor = parseFloat(document.getElementById('co2-value').value);

    if (co2.adicionarDados(horario, valor)) {
        atualizarTabela('co2-table', co2.dados);
        atualizarGrafico(co2Chart, co2.dados);
    }
}

// Funções auxiliares
function atualizarTabela(tableId, dados) {
    const tbody = document.querySelector(`#${tableId} tbody`);
    tbody.innerHTML = '';

    dados.forEach(dado => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${dado.horario}</td>
            <td>${dado.valor.toFixed(2)}</td>
        `;
        tbody.appendChild(tr);
    });
}

function atualizarGrafico(chart, dados) {
    chart.data.labels = dados.map(d => d.horario);
    chart.data.datasets[0].data = dados.map(d => d.valor);
    chart.update();
}