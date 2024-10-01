// Função para obter localização
navigator.geolocation.getCurrentPosition(success, error);

function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    
    const apiKey = 'SUA_API_KEY'; // Substitua aqui pela sua chave da OpenWeather API
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const temp = data.main.temp.toFixed(1);
            const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('pt-BR');
            const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('pt-BR');

            document.getElementById('localizacao').textContent = `Localização: Lat ${lat.toFixed(2)}, Lon ${lon.toFixed(2)}`;
            document.getElementById('temperatura').textContent = `Temperatura: ${temp}°C`;
            document.getElementById('nascerSol').textContent = `Nascer do Sol: ${sunrise}`;
            document.getElementById('porSol').textContent = `Pôr do Sol: ${sunset}`;
        })
        .catch(() => {
            document.getElementById('localizacao').textContent = "Não foi possível carregar os dados do clima.";
        });
}

function error() {
    document.getElementById('localizacao').textContent = "Não foi possível obter a localização.";
}

// Função para iniciar temporizador
document.getElementById('startBtn').addEventListener('click', () => {
    let minutes = document.getElementById('timerInput').value;
    let time = minutes * 60;
    const display = document.getElementById('timerDisplay');

    const countdown = setInterval(() => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        display.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        time--;

        if (time < 0) {
            clearInterval(countdown);
            display.textContent = "00:00:00";
        }
    }, 1000);
});

// Função para exibir calendário
const today = new Date();
document.getElementById('dataAtual').textContent = today.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

// Exibir calendário completo (exemplo básico)
const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let calendarHtml = '';

for (let i = 1; i <= monthDays[today.getMonth()]; i++) {
    calendarHtml += `<div>${i}</div>`;
}

document.getElementById('calendarioCompleto').innerHTML = calendarHtml;
