document.addEventListener('DOMContentLoaded', () => {
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwruM1BaAbvIpI4ftzYZ6lX5V_NDQ5_mGXPu1fBMhmhtMOQYvcMKiBZ1ZZfGEQH_xoh/exec';

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

    // Contador dinâmico de palavras do resumo (Limite: 300 palavras)
    resumoTextarea.addEventListener('input', () => {
        const palavras = resumoTextarea.value.trim().split(/\s+/).filter(word => word.length > 0);
        contadorPalavras.textContent = palavras.length;
        contadorPalavras.style.color = palavras.length > 300 ? '#e63946' : '#6c757d';
    });

    // Gerenciamento dinâmico de campos de coautores
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

    // Drag-and-drop e validações do arquivo PDF
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

    // Processamento da submissão e envio para o Google Apps Script
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const palavras = resumoTextarea.value.trim().split(/\s+/).filter(w => w.length > 0);
        if (palavras.length > 300) {
            alert('Por favor, reduza o resumo para no máximo 300 palavras.');
            return;
        }

        const arquivo = fileInput.files[0];
        if (!arquivo) {
            alert('Selecione um arquivo PDF.');
            return;
        }

        const base64 = await convertFileToBase64(arquivo);

        const coautores = [];
        document.querySelectorAll('.coautor-row').forEach(row => {
            const inputs = row.querySelectorAll('input');
            if (inputs[0].value && inputs[1].value) {
                coautores.push({ nome: inputs[0].value, email: inputs[1].value });
            }
        });

        const payload = {
            titulo: document.getElementById('titulo').value,
            eixo: document.getElementById('eixo').value,
            resumo: resumoTextarea.value,
            coautores: coautores,
            arquivoBase64: base64.split(',')[1]
        };

        try {
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.sucesso) {
                numeroProtocolo.textContent = result.protocolo;
                modal.style.display = 'flex';
            } else {
                alert('Falha na submissão: ' + result.mensagem);
            }
        } catch (error) {
            alert('Erro na conexão com o servidor de submissão.');
        }
    });

    function convertFileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    btnFecharModal.addEventListener('click', () => {
        modal.style.display = 'none';
        form.reset();
        fileInfo.textContent = '';
        listaCoautores.innerHTML = '';
        contadorPalavras.textContent = '0';
    });
});