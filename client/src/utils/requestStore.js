export let globalRequests = [
  { id: 'REQ-01-001', resource: 'Blood Type O-', units: 2, status: 'Pending', hospital: 'City Hospital Centre', location: '123 Elm Street, Nairobi', urgent: true },
  { id: 'REQ-01-002', resource: 'Plasma', units: 1, status: 'Pending', hospital: 'National Hospital', location: '7981 Fila Street, Nairobi', urgent: false },
  { id: 'REQ-01-003', resource: 'Platelets', units: 1, status: 'Pending', hospital: 'City Hospital Centre', location: '123 Elm Street, Nairobi', urgent: false },
];

export const addRequest = (req) => {
  globalRequests.unshift({ ...req, id: 'REQ-' + Date.now(), status: 'Pending' });
};

export const updateRequestStatus = (id, status) => {
  globalRequests = globalRequests.map(r => (r.id === id ? { ...r, status } : r));
};