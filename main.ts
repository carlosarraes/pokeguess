const root = document.getElementById('root')!;
const type = document.getElementById('type')!;
const weight = document.getElementById('weight')!;
const height = document.getElementById('height')!;
const btn = document.getElementById('btn-new')!;
const modal = document.getElementById('modal')!;
const answer = document.getElementById('answer')! as HTMLInputElement;

async function fetchPokemon(numPokemon: number): Promise<string> {
  const num: number = Math.floor(Math.random() * numPokemon + 1);
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
  const data = await response.json();

  root.innerHTML = '';
  const img = document.createElement('img');
  // Imagem
  img.classList.add('w-72');
  img.src = data.sprites.other.dream_world.front_default;

  // Adicioan Tipos
  if (data.types.length > 1) {
    for (let poke of data.types) {
      const capName = poke.type.name[0].toUpperCase() + poke.type.name.slice(1);
      type.innerText += ` ${capName}`;
    }
  } else {
    const capName = data.types[0].type.name[0].toUpperCase() + data.types[0].type.name.slice(1);
    type.innerText = `${capName}`;
  }

  // Adiciona Altura
  const cHeight: string = (data.height / 10).toFixed(1);
  height.innerText = `${cHeight} m`;

  // Adiciona Peso
  const cWeight: string = (data.weight / 10).toFixed(1);
  weight.innerText = `${cWeight} Kg`;

  img.classList.add('fill-black');
  // Faz Append da imagem
  root.appendChild(img);
  return data.name;
}

window.onload = async () => {
  function handleModal(state: string, msg: string) {
    if (state === 'success') {
      modal.classList.add('bg-green-400');
      modal.classList.remove('hidden');
      modal.innerText = msg;
    }
    if (state === 'failed') {
      console.log('entrei no fail');
      modal.classList.add('bg-red-400');
      modal.classList.remove('hidden');
      modal.innerText = msg;
    }

    setTimeout(() => {
      modal.classList.add('hidden');
    }, 3000);
  }

  function handleSubmit(e: MouseEvent) {
    if (answer.value.toLowerCase() === data) {
      handleModal('success', 'Acertou!');
    } else {
      handleModal('failed', 'Errou, diminuindo blur!');
    }
  }

  const data: string = await fetchPokemon(151);
  console.log(data);

  btn.addEventListener('click', handleSubmit);
};
