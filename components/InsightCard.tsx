import React from 'react';
interface InsightCardProps {
  title: string;
  description: string;
  category: string;
  icon?: React.ReactNode;
  color?: string;
}
export const InsightCard = ({
  title,
  description,
  category,
  icon,
  color = 'bg-[#F8EBDD]'
}: InsightCardProps) => {
  return <div className={`${color} rounded-2xl p-5 mb-4 shadow-sm`}>
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs uppercase tracking-wider text-[#1E1B2E]/60">
          {category}
        </span>
        {icon && <div className="text-[#B76E79]">{icon}</div>}
      </div>
      <h3 className="text-lg font-medium mb-2 text-[#1E1B2E]">{title}</h3>
      <p className="text-sm text-[#1E1B2E]/80">{description}</p>
    </div>;
};