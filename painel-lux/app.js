const LUXAcademy = {
    vault: {
        idor: "VFgyMDI0MDIyNjAwMDAwMw==" 
    },

    init() {
        this.bindEvents();
        console.log("LUX Academy carregada. Boa sorte, h4ck3r!");
    },

    bindEvents() {
        // Controle de Expansão dos Cards
        document.querySelectorAll('.lab-header').forEach(header => {
            header.addEventListener('click', () => {
                const card = header.parentElement;
                if (!card.classList.contains('locked')) {
                    card.classList.toggle('expanded');
                }
            });
        });

        // Validação da Flag
        const btnIdor = document.getElementById('btn-idor');
        if (btnIdor) {
            btnIdor.addEventListener('click', () => this.validate('idor'));
        }
    },

    validate(labId) {
        const input = document.getElementById(`input-${labId}`);
        const result = document.getElementById(`result-${labId}`);
        const value = input.value.trim().toUpperCase();
        
        // Decodifica a flag do "cofre" para comparar
        const expected = atob(this.vault[labId]);

        if (value === expected) {
            result.textContent = "✓ Flag correta! Excelente trabalho.";
            result.className = "flag-result success";
            input.style.borderColor = "#22c55e";
            this.saveProgress(labId);
        } else {
            result.textContent = "✗ Flag inválida. Tente novamente.";
            result.className = "flag-result error";
            input.style.borderColor = "#ef4444";
            this.shake(input);
        }
    },

    shake(el) {
        el.style.animation = "shake 0.4s ease";
        setTimeout(() => el.style.animation = "", 400);
    },

    saveProgress(labId) {
        const progress = JSON.parse(localStorage.getItem('lux_progress') || '{}');
        progress[labId] = true;
        localStorage.setItem('lux_progress', JSON.stringify(progress));
    }
};

document.addEventListener('DOMContentLoaded', () => LUXAcademy.init());