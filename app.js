const animalProfiles = {
  fox: {
    name: "여우 루루",
    greetings: [
      "안녕! 나는 숲속에서 온 여우 루루야.",
      "반가워! 오늘 숲에서 본 멋진 나뭇잎을 알려줄까?",
    ],
    tone: "반짝이는 모험",
  },
  rabbit: {
    name: "토끼 모모",
    greetings: [
      "안녕하세요! 토끼 모모예요. 당근 이야기 좋아해요!",
      "깡총! 오늘은 어떤 신나는 일이 있었나요?",
    ],
    tone: "포근하고 상냥",
  },
  bear: {
    name: "곰 토토",
    greetings: [
      "안녕, 나는 곰 토토야. 든든하게 들어줄게!",
      "포옹하고 싶은 하루였어? 같이 쉬어볼까?",
    ],
    tone: "따뜻한 위로",
  },
  penguin: {
    name: "펭귄 피요",
    greetings: [
      "빙글빙글! 펭귄 피요가 왔어요.",
      "차가운 바다에서 놀고 왔어요. 너는 어땠어요?",
    ],
    tone: "상쾌한 즐거움",
  },
  cat: {
    name: "고양이 나비",
    greetings: [
      "야옹! 나는 고양이 나비야.",
      "부드러운 낮잠 이후라 기분이 좋아! 너는?",
    ],
    tone: "장난꾸러기",
  },
};

const prompts = [
  "오늘 가장 재미있었던 일은 뭐였어요?",
  "좋아하는 색깔을 말해줄래요?",
  "지금 어떤 기분인지 알려줘도 괜찮아요.",
  "함께 하고 싶은 놀이가 있나요?",
];

const messages = document.getElementById("messages");
const form = document.getElementById("chat-form");
const input = document.getElementById("chat-text");
const select = document.getElementById("animal-select");

let currentAnimal = select.value;

const addMessage = (text, role) => {
  const bubble = document.createElement("div");
  bubble.className = `message message--${role}`;
  bubble.textContent = text;
  messages.appendChild(bubble);
  messages.scrollTop = messages.scrollHeight;
};

const getRandom = (items) => items[Math.floor(Math.random() * items.length)];

const greetAnimal = () => {
  const profile = animalProfiles[currentAnimal];
  addMessage(`${profile.name}: ${getRandom(profile.greetings)}`, "ai");
  addMessage(`${profile.name}: ${getRandom(prompts)}`, "ai");
};

select.addEventListener("change", (event) => {
  currentAnimal = event.target.value;
  messages.innerHTML = "";
  greetAnimal();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");

  const profile = animalProfiles[currentAnimal];
  const reply = `${profile.name}: (${profile.tone}) ${text} 들려줘서 고마워요! ${getRandom(
    prompts,
  )}`;
  window.setTimeout(() => addMessage(reply, "ai"), 400);

  input.value = "";
});

greetAnimal();
