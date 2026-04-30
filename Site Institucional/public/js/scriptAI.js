const chatToggle = document.getElementById("chat-toggle");
const chatWindow = document.getElementById("chat-window");
const closeChat = document.getElementById("close-chat");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatMessages = document.getElementById("chat-messages");

chatToggle.onclick = () => {
  chatWindow.classList.toggle("d-none");
};

closeChat.onclick = () => {
  chatWindow.classList.add("d-none");
};

async function enviarMensagem() {
  const mensagem = userInput.value.trim();
  if (!mensagem) return;

  appendMessage("user", mensagem);
  userInput.value = "";

  const loadingMsg = document.createElement("div");
  loadingMsg.className = " p-2 mb-2 bg-light border rounded text-muted italic";
  loadingMsg.innerText = "Byte AI está buscando...";
  chatMessages.appendChild(loadingMsg);

  try {
    const response = await fetch("/pergunta-gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pergunta: mensagem }),
    });
    const data = await response.json();

    chatMessages.removeChild(loadingMsg);
    appendMessage("ai", data.response);
  } catch (error) {
    loadingMsg.innerText = "Erro ao conectar com a IA";
    console.error("Erro no fetch:", error);
  }
}

//baloes
function appendMessage(role, text) {
  const msgDiv = document.createElement("div");
  msgDiv.style.maxWidth = "80%";
  msgDiv.classList.add("p-2", "mb-2", "rounded", "shadow-sm");

  if (role === "user") {
    msgDiv.classList.add("bg-primary", "text-white", "ms-auto");
  } else {
    msgDiv.classList.add("bg-white", "border", "me-auto", "text-dark");
  }

  msgDiv.innerText = text;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendBtn.onclick = enviarMensagem;
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") enviarMensagem();
});
