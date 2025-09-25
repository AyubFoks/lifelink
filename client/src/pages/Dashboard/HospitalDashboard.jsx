import React, { useState } from "react";


export default function HospitalDashboard() {
  const [showForm, setShowForm] = useState(false);
  const [inventory, setInventory] = useState(initialInventory);
  const [requests, setRequests] = useState(initialRequests);

  function updateStatus(id, newStatus) {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: newStatus, updatedAt: new Date().toISOString().slice(0, 10) } : req
      )
    );
  }

  function addRequest(e) {
    e.preventDefault();
    const form = e.target;
    const newReq = {
      id: `REQ-${String(requests.length + 1).padStart(3, "0")}`,
      resource: form.resource.value,
      units: Number(form.units.value),
      status: "Pending",
      updatedAt: new Date().toISOString().slice(0, 10),
      facility: form.facility.value,
      location: form.location.value,
      urgent: form.urgent.checked,
    };
    setRequests((prev) => [newReq, ...prev]);
    setShowForm(false);
    form.reset();
  }

    return (
        <div className="flex min-h-screen bg-gray-50">

      {/* -------- SIDE NAVBAR -------- */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 space-y-6">
        <h2 className="text-xl font-bold text-black">Hospital Admin</h2>
        <nav className="space-y-3">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-700 transition"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      {/* -------- MAIN CONTENT -------- */}
      <main className="flex-1 p-6 lg:p-10 space-y-10">

        {/* -------- PAGE HEADER -------- */}
        <header>
          <h1 className="text-3xl font-bold text-black">National Hospital Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your hospital's donation requests, inventory and patient needs.</p>
        </header>

        {/* -------- QUICK ACTIONS -------- */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Request Donation
          </button>
          <button className="px-4 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition">
            Update Patient Needs
          </button>
          <button className="px-4 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition">
            View Inventory
          </button>
        </section>

        {/* -------- INVENTORY CARD -------- */}
        <section className="bg-white rounded-xl shadow border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-black mb-4">Current Inventory</h2>
          <div className="overflow-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-2 text-sm font-medium text-gray-600">Resource Type</th>
                  <th className="pb-2 text-sm font-medium text-gray-600">Quantity</th>
                  <th className="pb-2 text-sm font-medium text-gray-600">Status</th>
                  <th className="pb-2 text-sm font-medium text-gray-600">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.resource} className="border-b border-gray-100">
                    <td className="py-3 text-sm text-black">{item.resource}</td>
                    <td className="py-3 text-sm text-black">{item.units} Units</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-gray-500">{item.lastUpdated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* -------- RECENT REQUESTS CARD -------- */}
        <section id="requests" className="bg-white rounded-xl shadow border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-black">Recent Requests</h2>
            <button
              onClick={() => setShowForm(true)}
              className="px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition text-sm"
            >
              + New Request
            </button>
          </div>

          {/* ---- mini table ---- */}
          <div className="overflow-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-2 text-sm font-medium text-gray-600">Request ID</th>
                  <th className="pb-2 text-sm font-medium text-gray-600">Resource Type</th>
                  <th className="pb-2 text-sm font-medium text-gray-600">Quantity</th>
                  <th className="pb-2 text-sm font-medium text-gray-600">Status</th>
                  <th className="pb-2 text-sm font-medium text-gray-600">Last Updated</th>
                  <th className="pb-2 text-sm font-medium text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.id} className="border-b border-gray-100">
                    <td className="py-3 text-sm text-black">{req.id}</td>
                    <td className="py-3 text-sm text-black">{req.resource}</td>
                    <td className="py-3 text-sm text-black">{req.units} Units</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge(req.status)}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-gray-500">{req.updatedAt}</td>
                    <td className="py-3">
                      <select
                        value={req.status}
                        onChange={(e) => updateStatus(req.id, e.target.value)}
                        className="text-sm border border-gray-300 rounded px-2 py-1"
                      >
                        <option>Pending</option>
                        <option>Ongoing</option>
                        <option>Fulfilled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* -------- OPTIONAL FORM MODAL -------- */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
              <h3 className="text-lg font-semibold text-black mb-4">Create Donation Request</h3>
              <form onSubmit={addRequest} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient Blood Group</label>
                  <select name="resource" required className="w-full border border-gray-300 rounded-lg px-3 py-2">
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => (
                      <option key={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Units Needed</label>
                  <input name="units" type="number" min={1} required className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient Facility / Hospital</label>
                  <input name="facility" required className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="e.g. National Hospital" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input name="location" required className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="City, County" />
                </div>
                <div className="flex items-center gap-2">
                  <input id="urgent" name="urgent" type="checkbox" className="h-4 w-4 text-red-600" />
                  <label htmlFor="urgent" className="text-sm text-gray-700">Mark as urgent</label>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">Submit Request</button>
                  <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
