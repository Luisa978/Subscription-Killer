// js/storage.js

const STORAGE_KEY = 'subscription_killer_data_v2';

// Retorna os dados atuais (lista de assinaturas)
export function getSubscriptions() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Salva toda a lista de assinaturas
export function saveSubscriptions(subscriptions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(subscriptions));
}

// Adiciona uma nova assinatura
export function addSubscription(subscription) {
  const subs = getSubscriptions();
  subs.push(subscription);
  saveSubscriptions(subs);
}

// Atualiza uma assinatura existente por ID
export function updateSubscription(id, updatedData) {
  let subs = getSubscriptions();
  subs = subs.map(sub => (sub.id === id ? { ...sub, ...updatedData } : sub));
  saveSubscriptions(subs);
}

// Remove uma assinatura por ID
export function deleteSubscription(id) {
  const subs = getSubscriptions().filter(sub => sub.id !== id);
  saveSubscriptions(subs);
}

// Gera um ID único para nova assinatura
export function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

// Limpa todos os dados salvos (opcional)
export function clearAllSubscriptions() {
  localStorage.removeItem(STORAGE_KEY);
}
