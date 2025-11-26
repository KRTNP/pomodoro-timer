import React from 'react';

export default function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="stat-card">
      <div className="flex items-center gap-3">
        <div className="stat-icon">
          <Icon size={18} />
        </div>
        <div>
          <p className="text-sm text-slate-400">{label}</p>
          <p className="text-xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
}
