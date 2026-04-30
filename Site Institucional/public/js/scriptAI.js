const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatMessages = document.getElementById('chat-messages');

async function enviarMensagem(){
    const mensagem = userInput.value.trim()
    if(!mensagem)return;

    apendMessage('user', mensagem);
    userInput.value = ''

    const loadingMsg = document.createElement('div')
    loadingMsg.className = ' p-2 mb-2 bg-light border rounded text-muted italic'
    loadingMsg.innerText = 'Byte AI está buscando...'
    chatMessages.appendChild(loadingMsg)

    try{
        const response = awaitfetch('/pergunta-gemini', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ pergunta: mensagem })
        })
        const data = await response.json();

        chatMessages.removeChild(loadingMsg);
        appendMessage('ai', data.response)

    }catch(error){
        loadingMsg.innerText = 'Erro ao conectar com a IA'
        console.error("Erro no fetch:", error)
    }
}

//baloes
function appendMessage(role, text) {
    const msgDiv = document.createElement('div')
    msgDiv.style.maxWidth = '80%'
    msgDiv.classList.add('p-2', 'mb-2', 'rounded', 'shadow-sm')

    if(role === 'user'){
        msgDiv.classList.add('bg-primary', 'text-white', 'ms-auto')
    }else{
        msgDiv.classList.add('bg-white', 'border', 'me-auto', 'text-dark')
    }

    msgDiv.innerText = text
    chatMessages.scrollTop = chatMessages.scrollHeight
}