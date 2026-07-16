import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { User, Music, Info } from 'lucide-react';
import { Typography } from '@/components/ui/typography';
import Image from 'next/image';

// Base styling configuration for nodes
const commonHandleStyle = { opacity: 0 }; // Hide handles for a cleaner look

export const CenterNode = ({ data }: any) => {
  return (
    <div className="flex flex-col items-center justify-center bg-amber-100 border-2 border-amber-400 rounded-full w-48 h-48 shadow-lg relative overflow-hidden p-2">
      <Handle type="target" position={Position.Top} style={commonHandleStyle} />
      
      {data.imageUrl ? (
        <div className="w-16 h-16 relative rounded-full overflow-hidden border-2 border-white shadow-sm mb-2 shrink-0">
          <Image src={data.imageUrl} alt={data.name} fill className="object-cover" sizes="64px" />
        </div>
      ) : (
        <div className="text-amber-600 mb-2">
          <User size={32} />
        </div>
      )}

      <Typography variant="h3" className="font-bold text-slate-900 text-center leading-tight mb-0.5 text-[15px] px-2 z-10">
        {data.name}
      </Typography>
      <Typography variant="p" className="text-[11px] font-medium text-slate-700 z-10">
        {data.period}
      </Typography>
      
      {/* Decorative background glow for text readability over potential images */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-amber-100/80 to-transparent pointer-events-none" />
      <Handle type="source" position={Position.Bottom} style={commonHandleStyle} />
      <Handle type="source" position={Position.Left} style={commonHandleStyle} id="left" />
      <Handle type="source" position={Position.Right} style={commonHandleStyle} id="right" />
      <Handle type="source" position={Position.Top} style={commonHandleStyle} id="top" />
    </div>
  );
};

export const AttributeNode = ({ data }: any) => {
  return (
    <div className="flex flex-col items-center justify-center bg-orange-50 border border-orange-200 rounded-[1.5rem] px-6 py-3 min-w-[120px] shadow-sm">
      <Handle type="target" position={Position.Bottom} style={commonHandleStyle} />
      <Typography variant="p" className="text-xs font-bold text-slate-900 mb-0.5">
        {data.label}
      </Typography>
      <Typography variant="p" className="text-xs text-slate-600 text-center">
        {data.value}
      </Typography>
      <Handle type="source" position={Position.Top} style={commonHandleStyle} />
    </div>
  );
};

export const RelatedNode = ({ data }: any) => {
  return (
    <div className="flex flex-col items-center justify-center bg-purple-50/80 border border-purple-200 rounded-[1rem] px-6 py-3 min-w-[160px] shadow-sm">
      <Handle type="target" position={Position.Right} style={commonHandleStyle} />
      <Typography variant="p" className="text-sm font-bold text-slate-900 mb-0.5 text-center">
        {data.name}
      </Typography>
      <Typography variant="p" className="text-xs text-slate-600 text-center">
        {data.relationship}
      </Typography>
      <Handle type="source" position={Position.Left} style={commonHandleStyle} />
    </div>
  );
};

export const CompositionNode = ({ data }: any) => {
  return (
    <div className="flex items-center bg-emerald-50/80 border border-emerald-200 rounded-[1rem] p-3 min-w-[200px] shadow-sm gap-3">
      <Handle type="target" position={Position.Left} style={commonHandleStyle} />
      <div className="text-emerald-700 bg-emerald-100 p-2 rounded-lg shrink-0">
        <Music size={18} />
      </div>
      <div className="flex flex-col">
        <Typography variant="p" className="text-sm font-bold text-slate-900 line-clamp-1 leading-tight mb-0.5">
            {data.title}
        </Typography>
        <Typography variant="p" className="text-xs text-slate-600 line-clamp-1">
            Raga: {data.raga}
        </Typography>
      </div>
      <Handle type="source" position={Position.Right} style={commonHandleStyle} />
    </div>
  );
};

export const LineageNode = ({ data }: any) => {
  return (
    <div className="flex flex-col items-center justify-center bg-blue-50/80 border border-blue-200 rounded-[1rem] px-6 py-3 min-w-[140px] shadow-sm">
      <Handle type="target" position={Position.Top} style={commonHandleStyle} />
      <Typography variant="p" className="text-sm font-bold text-slate-900 mb-0.5 text-center">
        {data.name}
      </Typography>
      <Typography variant="p" className="text-xs text-slate-600 text-center">
        {data.relationship}
      </Typography>
      <Handle type="source" position={Position.Bottom} style={commonHandleStyle} />
    </div>
  );
};
