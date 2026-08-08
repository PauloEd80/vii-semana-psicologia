document.addEventListener('DOMContentLoaded', () => {
    const resumoTextarea = document.getElementById('resumo');
    const contadorPalavras = document.getElementById('contador-palavras');
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('arquivo');
    const fileInfo = document.getElementById('file-info');
    const btnAddCoautor = document.getElementById('btn-add-coautor');
    const listaCoautores = document.getElementById('lista-coautores');
    const form = document.getElementById('form-submissao');
    const modal = document.getElementById('modal-protocolo');
    const numeroProtocolo = document.getElementById('numero-protocolo');
    const btnFecharModal = document.getElementById('btn-fechar-modal');

    // Contador dinâmico de palavras
    resumoTextarea.addEventListener('input', () => {
        const palavras = resumoTextarea.value.trim().split(/\s+/).filter(word => word.length > 0);
        contadorPalavras.textContent = palavras.length;
        contadorPalavras.style.color = palavras.length > 300 ? '#e63946' : '#6c757d';
    });

    // Adição/remoção dinâmica de coautores
    btnAddCoautor.addEventListener('click', () => {
        const div = document.createElement('div');
        div.className = 'coautor-row';
        div.innerHTML = `
            <input type="text" placeholder="Nome completo do coautor" required>
            <input type="text" placeholder="E-mail" required>
            <button type="button" class="btn btn-danger btn-remover">X</button>
        `;
        listaCoautores.appendChild(div);

        div.querySelector('.btn-remover').addEventListener('click', () => div.remove());
    });

    // Drag and Drop e Validação de arquivo PDF (Max 10MB)
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, e => {
            e.preventDefault();
            e.stopPropagation();
        });
    });

    ['dragenter', 'dragover'].forEach(() => uploadArea.classList.add('dragover'));
    ['dragleave', 'drop'].forEach(() => uploadArea.classList.remove('dragover'));

    uploadArea.addEventListener('drop', e => {
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            fileInput.files = files;
            validarArquivo(files[0]);
        }
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            validarArquivo(fileInput.files[0]);
        }
    });

    function validarArquivo(file) {
        if (file.type !== 'application/pdf') {
            alert('Apenas arquivos em formato PDF são aceitos.');
            fileInput.value = '';
            fileInfo.textContent = '';
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            alert('O arquivo excede o tamanho máximo de 10 MB.');
            fileInput.value = '';
            fileInfo.textContent = '';
            return;
        }
        fileInfo.textContent = `Arquivo anexado: ${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`;
    }

    // Submissão do formulário e geração do protocolo
    form.addEventListener('submit', e => {
        e.preventDefault();
        const palavras = resumoTextarea.value.trim().split(/\s+/).filter(w => w.length > 0);
        if (palavras.length > 300) {
            alert('Por favor, reduza o resumo para no máximo 300 palavras.');
            return;
        }

        const protocolo = 'PSI2026-' + Math.floor(100000 + Math.random() * 900000);
        numeroProtocolo.textContent = protocolo;
        modal.style.display = 'flex';
    });

    btnFecharModal.addEventListener('click', () => {
        modal.style.display = 'none';
        form.reset();
        fileInfo.textContent = '';
        listaCoautores.innerHTML = '';
        contadorPalavras.textContent = '0';
    });
});