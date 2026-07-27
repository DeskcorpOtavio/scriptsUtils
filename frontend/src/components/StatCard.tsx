interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="bg-neutral-800/50 rounded-lg p-3 border border-neutral-800">
      <div className="flex items-center gap-1.5 text-neutral-500 mb-1">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <p className="text-sm font-semibold text-neutral-100 truncate">{value}</p>
    </div>
  );
}
