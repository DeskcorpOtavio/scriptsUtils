interface PageHeaderProps {
  title: string;
  description: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold tracking-tight mb-1">{title}</h2>
      <p className="text-neutral-400 text-sm">{description}</p>
    </div>
  );
}
