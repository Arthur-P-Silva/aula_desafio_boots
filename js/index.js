const pages = [
    {
        id:"p01",
        name:"home",
        url:"./pages/home/home.html"
    }
]

function openPage(url) {
    const iframe = document.getElementById('pages');

    if(!iframe) return alert('ERRO! Iframe não encontrado');

    iframe.src = url || "";
}

// Criando função ao clicar no botão home
document.getElementById('home').addEventListener('click', () => {
    openPage(pages[0].url); 
})