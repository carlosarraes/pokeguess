"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const root = document.getElementById('root');
const type = document.getElementById('type');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const btn = document.getElementById('btn-new');
const modal = document.getElementById('modal');
const answer = document.getElementById('answer');
function fetchPokemon(numPokemon) {
    return __awaiter(this, void 0, void 0, function* () {
        const num = Math.floor(Math.random() * numPokemon + 1);
        const response = yield fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
        const data = yield response.json();
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
        }
        else {
            const capName = data.types[0].type.name[0].toUpperCase() + data.types[0].type.name.slice(1);
            type.innerText = `${capName}`;
        }
        // Adiciona Altura
        const cHeight = (data.height / 10).toFixed(1);
        height.innerText = `${cHeight} m`;
        // Adiciona Peso
        const cWeight = (data.weight / 10).toFixed(1);
        weight.innerText = `${cWeight} Kg`;
        img.classList.add('fill-black');
        // Faz Append da imagem
        root.appendChild(img);
        return data.name;
    });
}
window.onload = () => __awaiter(void 0, void 0, void 0, function* () {
    function handleModal(state, msg) {
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
    function handleSubmit(e) {
        if (answer.value.toLowerCase() === data) {
            handleModal('success', 'Acertou!');
        }
        else {
            handleModal('failed', 'Errou, diminuindo blur!');
        }
    }
    const data = yield fetchPokemon(151);
    console.log(data);
    btn.addEventListener('click', handleSubmit);
});
