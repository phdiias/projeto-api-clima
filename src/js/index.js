const chaveDeApi = '54311d62b8694a7cad6164925241411';
const btnBusca = document.querySelector('.btn-busca');

btnBusca.addEventListener('click', async () => {
  const cidade = document.querySelector('#input-busca').value;

  if (!cidade) return;

  const dados = await buscarDadosDeClima(cidade);

  preencherDadosNaTela(dados);
});

async function buscarDadosDeClima(cidade) {
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${chaveDeApi}&q=${cidade}&aqi=no&lang=pt`;

  const resposta = await fetch(apiUrl);

  if (resposta.status !== 200) return;

  const dados = await resposta.json();

  return dados;
}

function preencherDadosNaTela(dados) {
  const cidadeFormatada = dados.location.name;
  const temperatura = Math.round(dados.current.temp_c);
  const umidade = dados.current.humidity;
  const condicao = dados.current.condition.text;
  const velocidade = dados.current.wind_kph;
  const iconeCondicao = dados.current.condition.icon;

  document.querySelector('#cidade').textContent = cidadeFormatada;
  document.querySelector('#temperatura').textContent = `${temperatura}°C`;
  document.querySelector('#umidade').textContent = `${umidade}%`;
  document.querySelector('#velocidade').textContent = `${velocidade}km/h`;
  document.querySelector('#condicao').textContent = condicao;
  document.querySelector('#icone-condicao').setAttribute('src', iconeCondicao);
}
