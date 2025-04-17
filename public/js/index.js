import Card from "./Card.js";
import CardStack from "./CardStack.js";
import AudioManager from "./AudioManager.js";

const btnStart = document.getElementById("btn-start");
const btnEnd = document.getElementById("btn-end");

const cardContainer = document.getElementById("card-container");

const cardElements = document.getElementsByClassName("card");

const startScreen = document.getElementById("start-screen");

const inputParticipant1 = document.getElementById("input-participant-1");
const inputParticipant2 = document.getElementById("input-participant-2");

const validationParticipant1 = document.getElementById(
  "validation-participant-1"
);
const validationParticipant2 = document.getElementById(
  "validation-participant-2"
);

const participantBars = document.getElementsByClassName("participant-bar");

const participant1NameContainer = document.getElementById("participant-1-name");
const participant2NameContainer = document.getElementById("participant-2-name");

const participant1ShotsContainer = document.getElementById(
  "participant-1-shots"
);
const participant2ShotsContainer = document.getElementById(
  "participant-2-shots"
);

const btnAddShotParticipant1 = document.getElementById(
  "btn-add-shot-participant-1"
);
const btnAddShotParticipant2 = document.getElementById(
  "btn-add-shot-participant-2"
);

const checkBoxMusic = document.getElementById("checkbox-music");
const checkBoxSfx = document.getElementById("checkbox-sfx");

const cardStack = new CardStack();
const audioManager = new AudioManager();

readJsonFile("data/prompts.json", (response) => {
  cardStack.importJson(response);
});

btnEnd.addEventListener("click", onBtnEndClicked);
btnStart.addEventListener("click", onBtnStartClicked);
btnAddShotParticipant1.addEventListener("click", (e) => {
  e.preventDefault();
  addShotToParticipant(1);
});

btnAddShotParticipant2.addEventListener("click", (e) => {
  e.preventDefault();
  addShotToParticipant(2);
});

function onBtnStartClicked(e) {
  e.preventDefault();

  const participant1Name = inputParticipant1.value.trim();
  const participant2Name = inputParticipant2.value.trim();

  const participant1NameEmpty = participant1Name.length === 0;
  const participant2NameEmpty = participant2Name.length === 0;

  validationParticipant1.hidden = !participant1NameEmpty;
  validationParticipant2.hidden = !participant2NameEmpty;

  if (participant1NameEmpty || participant2NameEmpty) {
    return;
  }

  cardStack.shuffle();
  cardContainer.innerHTML = cardStack.getNextCard().getHtml();
  initCardOnClickListener();

  audioManager.setMusicEnabled(checkBoxMusic.checked);
  audioManager.setSfxEnabled(checkBoxSfx.checked);

  audioManager.playElevatorMusic();
  audioManager.playWhipSoundEffect();
  startScreen.remove();
  btnEnd.hidden = false;

  participant1NameContainer.innerText = participant1Name;
  participant2NameContainer.innerText = participant2Name;

  for (let participantBar of participantBars) {
    participantBar.hidden = false;
  }
}
function onBtnEndClicked(e) {
  e.preventDefault();
  location.reload();
}

function initCardOnClickListener() {
  for (let cardElem of cardElements) {
    cardElem.addEventListener("click", onCardClicked);
  }
}

function onCardClicked(e) {
  e.preventDefault();

  const nextCard = cardStack.getNextCard();
  if (nextCard === undefined) {
    cardContainer.remove();
    return;
  }

  audioManager.playWhipSoundEffect();
  this.classList.add("cardFadeOut");

  setTimeout(() => {
    cardContainer.innerHTML = nextCard.getHtml();
    const card = document.getElementsByClassName("card")[0];
    card.classList.add("cardFadeIn");

    setTimeout(() => {
      card.classList.remove("cardFadeIn");
      initCardOnClickListener();
    }, 999);
  }, 999);
}

function addShotToParticipant(participantNumber) {
  let container;

  if (participantNumber === 1) {
    container = participant1ShotsContainer;
  }

  if (participantNumber === 2) {
    container = participant2ShotsContainer;
  }

  if (container === undefined) {
    return;
  }

  const currentValue = parseInt(container.innerText);
  container.innerText = currentValue + 1;
  audioManager.playCanOpeningSoundEffect();
}

function readJsonFile(filename, onResponse) {
  const rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", filename, true);
  rawFile.onreadystatechange = () => {
    if (rawFile.readyState === 4 && rawFile.status === 200) {
      onResponse(JSON.parse(rawFile.responseText));
    }
  };
  rawFile.send(null);
}
