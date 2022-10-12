const root = document.getElementById('root')!;
const type = document.getElementById('type')!;
const weight = document.getElementById('weight')!;
const height = document.getElementById('height')!;
const lifes = document.getElementById('difficulty')!;
const btn = document.getElementById('btn-new')!;
const modal = document.getElementById('modal')!;
const answer = document.getElementById('answer')! as HTMLInputElement;
let tries = 5;

async function fetchPokemon(numPokemon: number): Promise<string> {
  const num: number = Math.floor(Math.random() * numPokemon + 1);
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
  const data = await response.json();

  root.innerHTML = '';
  const img = document.createElement('img');
  // Imagem
  img.classList.add('w-72', 'blur-2xl');
  img.src = data.sprites.other.dream_world.front_default;
  img.id = 'poke-img';

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

  // Faz Append da imagem
  root.appendChild(img);
  return data.name;
}

function handleBlur(tries: number) {
  const img = document.querySelector('#poke-img');

  if (tries === 4) {
    img?.classList.remove('blur-2xl');
    img?.classList.add('blur-xl');
  } else if (tries === 3) {
    img?.classList.remove('blur-xl');
    img?.classList.add('blur-lg');
  } else if (tries === 2) {
    img?.classList.remove('blur-lg');
    img?.classList.add('blur-md');
  } else if (tries === 1) {
    img?.classList.remove('blur-md');
    img?.classList.add('blur-sm');
  } else if (tries === 0) {
    lifes.innerText = 'Ultima tentativa!';
  }
}

function drawTries(tries: number): void {
  lifes.innerHTML = '';
  for (let i = 0; i < tries; i += 1) {
    if (tries === 5) {
      const divLife = document.createElement('div');
      divLife.classList.add('bg-green-700', 'w-2', 'h-4');
      lifes.appendChild(divLife);
    } else if (tries >= 3) {
      const divLife = document.createElement('div');
      divLife.classList.add('bg-yellow-500', 'w-2', 'h-4');
      lifes.appendChild(divLife);
      handleBlur(tries);
    } else {
      const divLife = document.createElement('div');
      divLife.classList.add('bg-red-500', 'w-2', 'h-4');
      lifes.appendChild(divLife);
      handleBlur(tries);
    }
  }
}
drawTries(tries);

window.onload = async () => {
  function handleModal(state: string, msg: string, ping: number) {
    const img = document.querySelector('#poke-img');

    if (state === 'success') {
      modal.classList.add('bg-green-400');
      modal.classList.remove('hidden');
      modal.innerText = msg;
      img?.classList.remove('blur-2xl', 'blur-xl', 'blur-lg', 'blur-md', 'blur-sm');
      setTimeout(() => {
        window.location.reload();
      }, ping);
    }
    if (state === 'failed') {
      tries -= 1;
      if (tries === 0) {
        drawTries(tries);
        handleModal(
          'end',
          `O pokemon era: ${data[0].toUpperCase() + data.slice(1)}, reiniciando em 5s`,
          5000
        );
        return;
      }
      drawTries(tries);
      modal.classList.add('bg-red-400');
      modal.classList.remove('hidden');
      modal.innerText = msg;
    }
    if (state === 'end') {
      modal.classList.add('bg-red-400');
      modal.classList.remove('hidden');
      modal.innerText = msg;
      img?.classList.remove('blur-sm');
      setTimeout(() => {
        window.location.reload();
      }, ping);
    }

    setTimeout(() => {
      modal.classList.add('hidden');
    }, ping);
  }

  function handleSubmit(e: MouseEvent) {
    if (answer.value.toLowerCase() === data) {
      handleModal('success', 'Acertou! Reiniciando o jogo em 5s', 5000);
    } else {
      handleModal('failed', 'Errou, diminuindo blur!', 1000);
    }
  }

  function handleEnter(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      if (answer.value.toLowerCase() === data) {
        handleModal('success', 'Acertou! Reiniciando o jogo em 5s', 5000);
      } else {
        handleModal('failed', 'Errou, diminuindo blur!', 1000);
      }
    }
  }

  const data: string = await fetchPokemon(151);

  answer.addEventListener('keyup', handleEnter);
  btn.addEventListener('click', handleSubmit);
};
