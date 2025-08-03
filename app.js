// Classe principal da aplicação
class SubscriptionKiller {
    constructor() {
        this.currentUser = null;
        this.subscriptions = [];
        this.editingId = null;
        
        this.init();
    }

    init() {
        this.loadTheme();
        this.bindEvents();
        this.checkAuth();
        this.loadData();
    }

    // === AUTENTICAÇÃO ===
    checkAuth() {
        const user = localStorage.getItem('sk_user');
        if (user) {
            this.currentUser = JSON.parse(user);
            this.showMainScreen();
        } else {
            this.showLoginScreen();
        }
    }

    login(username, password) {
        // Simulação de login - em produção seria uma API
        if (username === 'demo' && password === '123') {
            const user = {
                id: 1,
                username: username,
                loginTime: new Date().toISOString()
            };
            
            this.currentUser = user;
            localStorage.setItem('sk_user', JSON.stringify(user));
            this.showMainScreen();
            return true;
        }
        return false;
    }

    logout() {
        localStorage.removeItem('sk_user');
        this.currentUser = null;
        this.showLoginScreen();
    }

    // === NAVEGAÇÃO ===
    showLoginScreen() {
        document.getElementById('loginScreen').classList.add('active');
        document.getElementById('mainScreen').classList.remove('active');
    }

    showMainScreen() {
        document.getElementById('loginScreen').classList.remove('active');
        document.getElementById('mainScreen').classList.add('active');
        this.updateDashboard();
        this.renderTable();
        this.updateCharts();
    }

    // === GERENCIAMENTO DE DADOS ===
    loadData() {
        const data = localStorage.getItem('sk_subscriptions');
        if (data) {
            this.subscriptions = JSON.parse(data);
        } else {
            // Dados de exemplo
            this.subscriptions = [
                {
                    id: 1,
                    name: 'Netflix',
                    category: 'streaming',
                    price: 29.90,
                    nextPayment: '2025-09-15',
                    status: 'ativa'
                },
                {
                    id: 2,
                    name: 'Spotify',
                    category: 'streaming',
                    price: 19.90,
                    nextPayment: '2025-09-10',
                    status: 'ativa'
                },
                {
                    id: 3,
                    name: 'Adobe Creative Cloud',
                    category: 'software',
                    price: 89.90,
                    nextPayment: '2025-09-20',
                    status: 'ativa'
                },
                {
                    id: 4,
                    name: 'Xbox Game Pass',
                    category: 'games',
                    price: 34.95,
                    nextPayment: '2025-08-25',
                    status: 'cancelada'
                }
            ];
            this.saveData();
        }
    }

    saveData() {
        localStorage.setItem('sk_subscriptions', JSON.stringify(this.subscriptions));
    }

    // === CRUD ASSINATURAS ===
    addSubscription(data) {
        const subscription = {
            id: Date.now(),
            name: data.name,
            category: data.category,
            price: parseFloat(data.price),
            nextPayment: data.nextPayment,
            status: data.status
        };
        
        this.subscriptions.push(subscription);
        this.saveData();
        this.updateDashboard();
        this.renderTable();
        this.updateCharts();
    }

    updateSubscription(id, data) {
        const index = this.subscriptions.findIndex(sub => sub.id === id);
        if (index !== -1) {
            this.subscriptions[index] = {
                ...this.subscriptions[index],
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                nextPayment: data.nextPayment,
                status: data.status
            };
            this.saveData();
            this.updateDashboard();
            this.renderTable();
            this.updateCharts();
        }
    }

    deleteSubscription(id) {
        if (confirm('Tem certeza que deseja excluir esta assinatura?')) {
            this.subscriptions = this.subscriptions.filter(sub => sub.id !== id);
            this.saveData();
            this.updateDashboard();
            this.renderTable();
            this.updateCharts();
        }
    }

    // === DASHBOARD ===
    updateDashboard() {
        const activeSubscriptions = this.subscriptions.filter(sub => sub.status === 'ativa');
        const totalMonthly = activeSubscriptions.reduce((sum, sub) => sum + sub.price, 0);
        const totalYearly = totalMonthly * 12;
        const potentialSavings = this.subscriptions
            .filter(sub => sub.status === 'cancelada')
            .reduce((sum, sub) => sum + sub.price * 12, 0);

        document.getElementById('totalMonthly').textContent = this.formatCurrency(totalMonthly);
        document.getElementById('totalYearly').textContent = this.formatCurrency(totalYearly);
        document.getElementById('activeCount').textContent = activeSubscriptions.length;
        document.getElementById('potentialSavings').textContent = this.formatCurrency(potentialSavings);
    }

    // === TABELA ===
    renderTable() {
        const tbody = document.getElementById('subscriptionsTableBody');
        const searchTerm = document.getElementById('searchFilter').value.toLowerCase();
        const categoryFilter = document.getElementById('categoryFilter').value;
        const statusFilter = document.getElementById('statusFilter').value;

        let filteredSubscriptions = this.subscriptions.filter(sub => {
            const matchesSearch = sub.name.toLowerCase().includes(searchTerm);
            const matchesCategory = !categoryFilter || sub.category === categoryFilter;
            const matchesStatus = !statusFilter || sub.status === statusFilter;
            return matchesSearch && matchesCategory && matchesStatus;
        });

        tbody.innerHTML = filteredSubscriptions.map(sub => `
            <tr>
                <td>${sub.name}</td>
                <td>${this.getCategoryLabel(sub.category)}</td>
                <td>${this.formatCurrency(sub.price)}</td>
                <td>${this.formatDate(sub.nextPayment)}</td>
                <td><span class="status-badge status-${sub.status}">${sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}</span></td>
                <td>
                    <button class="btn btn-secondary" onclick="app.editSubscription(${sub.id})">✏️</button>
                    <button class="btn btn-danger" onclick="app.deleteSubscription(${sub.id})">🗑️</button>
                </td>
            </tr>
        `).join('');
    }

    // === MODAL ===
    openModal(title = 'Nova Assinatura', subscription = null) {
        document.getElementById('modalTitle').textContent = title;
        const modal = document.getElementById('subscriptionModal');
        
        if (subscription) {
            document.getElementById('subName').value = subscription.name;
            document.getElementById('subCategory').value = subscription.category;
            document.getElementById('subPrice').value = subscription.price;
            document.getElementById('subNextPayment').value = subscription.nextPayment;
            document.getElementById('subStatus').value = subscription.status;
            this.editingId = subscription.id;
        } else {
            document.getElementById('subscriptionForm').reset();
            this.editingId = null;
        }
        
        modal.classList.add('active');
    }

    closeModal() {
        document.getElementById('subscriptionModal').classList.remove('active');
        this.editingId = null;
    }

    editSubscription(id) {
        const subscription = this.subscriptions.find(sub => sub.id === id);
        if (subscription) {
            this.openModal('Editar Assinatura', subscription);
        }
    }

    // === TEMA ===
    loadTheme() {
        const theme = localStorage.getItem('sk_theme') || 'light';
        document.documentElement.setAttribute('data-theme', theme);
        this.updateThemeIcon(theme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('sk_theme', newTheme);
        this.updateThemeIcon(newTheme);
    }

    updateThemeIcon(theme) {
        const icon = document.getElementById('themeToggle');
        icon.textContent = theme === 'dark' ? '☀️' : '🌙';
        icon.title = theme === 'dark' ? 'Modo claro' : 'Modo escuro';
    }

    // === GRÁFICOS ===
    updateCharts() {
        this.drawMonthlyChart();
        this.drawCategoryChart();
    }

    drawMonthlyChart() {
        const canvas = document.getElementById('monthlyChart');
        const ctx = canvas.getContext('2d');
        
        // Limpar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Dados dos últimos 6 meses
        const months = ['Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago'];
        const data = [120, 150, 180, 160, 200, 175]; // Dados simulados
        
        const maxValue = Math.max(...data);
        const padding = 40;
        const chartWidth = canvas.width - padding * 2;
        const chartHeight = canvas.height - padding * 2;
        
        // Configurar estilo
        ctx.strokeStyle = '#2563eb';
        ctx.fillStyle = '#2563eb';
        ctx.lineWidth = 2;
        
        // Desenhar eixos
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
        
        // Desenhar linha do gráfico
        ctx.beginPath();
        data.forEach((value, index) => {
            const x = padding + (index * chartWidth) / (data.length - 1);
            const y = canvas.height - padding - (value / maxValue) * chartHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
            
            // Desenhar pontos
            ctx.fillRect(x - 3, y - 3, 6, 6);
        });
        ctx.stroke();
        
        // Adicionar labels
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-color');
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        
        months.forEach((month, index) => {
            const x = padding + (index * chartWidth) / (months.length - 1);
            ctx.fillText(month, x, canvas.height - 10);
        });
    }

    drawCategoryChart() {
        const canvas = document.getElementById('categoryChart');
        const ctx = canvas.getContext('2d');
        
        // Limpar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Calcular dados por categoria
        const categoryData = {};
        this.subscriptions.filter(sub => sub.status === 'ativa').forEach(sub => {
            categoryData[sub.category] = (categoryData[sub.category] || 0) + sub.price;
        });
        
        const categories = Object.keys(categoryData);
        const values = Object.values(categoryData);
        const total = values.reduce((sum, val) => sum + val, 0);
        
        if (total === 0) return;
        
        const colors = ['#2563eb', '#16a34a', '#d97706', '#dc2626', '#7c3aed'];
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 20;
        
        let currentAngle = -Math.PI / 2;
        
        categories.forEach((category, index) => {
            const sliceAngle = (values[index] / total) * 2 * Math.PI;
            
            // Desenhar fatia
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.closePath();
            ctx.fillStyle = colors[index % colors.length];
            ctx.fill();
            
            // Adicionar label
            const labelAngle = currentAngle + sliceAngle / 2;
            const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
            const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);
            
            ctx.fillStyle = 'white';
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(this.getCategoryLabel(category), labelX, labelY);
            
            currentAngle += sliceAngle;
        });
    }

    // === EXPORTAÇÃO ===
    exportToCSV() {
        const headers = ['Nome', 'Categoria', 'Valor Mensal', 'Próximo Pagamento', 'Status'];
        const csvContent = [
            headers.join(','),
            ...this.subscriptions.map(sub => [
                `"${sub.name}"`,
                `"${this.getCategoryLabel(sub.category)}"`,
                sub.price.toFixed(2).replace('.', ','),
                sub.nextPayment,
                `"${sub.status}"`
            ].join(','))
        ].join('\n');
        
        this.downloadFile(csvContent, 'assinaturas.csv', 'text/csv');
    }

    createBackup() {
        const backup = {
            version: '1.0',
            timestamp: new Date().toISOString(),
            user: this.currentUser,
            subscriptions: this.subscriptions,
            theme: localStorage.getItem('sk_theme')
        };
        
        const backupContent = JSON.stringify(backup, null, 2);
        this.downloadFile(backupContent, `backup_${new Date().toISOString().split('T')[0]}.json`, 'application/json');
    }

    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // === UTILITÁRIOS ===
    formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('pt-BR');
    }

    getCategoryLabel(category) {
        const labels = {
            streaming: 'Streaming',
            software: 'Software',
            games: 'Games',
            fitness: 'Fitness',
            outros: 'Outros'
        };
        return labels[category] || category;
    }

    // === EVENT LISTENERS ===
    bindEvents() {
        // Login
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (this.login(username, password)) {
                document.getElementById('loginForm').reset();
            } else {
                alert('Usuário ou senha inválidos!');
            }
        });

        // Logout
        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.logout();
        });

        // Tema
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Modal
        document.getElementById('addSubscriptionBtn').addEventListener('click', () => {
            this.openModal();
        });

        document.querySelector('.modal-close').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('cancelModalBtn').addEventListener('click', () => {
            this.closeModal();
        });

        // Formulário de assinatura
        document.getElementById('subscriptionForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('subName').value,
                category: document.getElementById('subCategory').value,
                price: document.getElementById('subPrice').value,
                nextPayment: document.getElementById('subNextPayment').value,
                status: document.getElementById('subStatus').value
            };

            if (this.editingId) {
                this.updateSubscription(this.editingId, formData);
            } else {
                this.addSubscription(formData);
            }
            
            this.closeModal();
        });

        // Filtros
        document.getElementById('searchFilter').addEventListener('input', () => {
            this.renderTable();
        });

        document.getElementById('categoryFilter').addEventListener('change', () => {
            this.renderTable();
        });

        document.getElementById('statusFilter').addEventListener('change', () => {
            this.renderTable();
        });

        // Exportação
        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportToCSV();
        });

        document.getElementById('backupBtn').addEventListener('click', () => {
            this.createBackup();
        });

        // Fechar modal clicando fora
        document.getElementById('subscriptionModal').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.closeModal();
            }
        });
    }
}

// Inicializar aplicação
const app = new SubscriptionKiller();

