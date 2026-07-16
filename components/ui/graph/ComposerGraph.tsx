'use client';

import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  NodeMouseHandler,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import {
  CenterNode,
  AttributeNode,
  RelatedNode,
  CompositionNode,
  LineageNode,
} from './CustomNodes';

// Define the custom node types for React Flow
const nodeTypes = {
  centerNode: CenterNode,
  attributeNode: AttributeNode,
  relatedNode: RelatedNode,
  compositionNode: CompositionNode,
  lineageNode: LineageNode,
};

interface ComposerGraphProps {
  composer: any;
  compositions: any[];
}

export default function ComposerGraph({ composer, compositions }: ComposerGraphProps) {
  const router = useRouter();

  // Generate Nodes and Edges based on the composer data
  const { initialNodes, initialEdges } = useMemo(() => {
    const nodes: any[] = [];
    const edges: any[] = [];

    // 1. Center Node (The Haridasa)
    nodes.push({
      id: 'center',
      type: 'centerNode',
      position: { x: 0, y: 0 },
      data: { name: composer.name, period: composer.timeline || 'Unknown Period', imageUrl: composer.imageUrl },
    });

    const edgeStyle = { strokeWidth: 2 };
    
    // 2. Attributes (Top Arc)
    const attributes = [
      { id: 'attr-1', label: 'Alias', value: composer.ankita?.name || 'Unknown', color: '#fbbf24' },
      { id: 'attr-2', label: 'Period', value: composer.timeline || 'Unknown', color: '#fbbf24' },
      { id: 'attr-3', label: 'Philosophy', value: 'Dvaita Vedanta', color: '#fbbf24' },
    ];
    
    const attrPositions = [
      { x: -180, y: -220 },
      { x: 0, y: -250 },
      { x: 180, y: -220 },
    ];

    attributes.forEach((attr, idx) => {
      nodes.push({
        id: attr.id,
        type: 'attributeNode',
        position: attrPositions[idx],
        data: { ...attr },
      });
      edges.push({
        id: `e-center-${attr.id}`,
        source: 'center',
        target: attr.id,
        sourceHandle: 'top',
        style: { ...edgeStyle, stroke: attr.color },
        animated: true,
      });
    });

    // 3. Top Compositions (Right Column)
    const topCompositions = compositions.slice(0, 3);
    const compPositions = [
      { x: 350, y: -100 },
      { x: 380, y: 0 },
      { x: 350, y: 100 },
    ];

    topCompositions.forEach((comp, idx) => {
      const compId = `comp-${comp.id}`;
      nodes.push({
        id: compId,
        type: 'compositionNode',
        position: compPositions[idx] || { x: 350, y: 100 * idx },
        data: { title: comp.title, raga: comp.raga?.name || 'Unknown' },
      });
      edges.push({
        id: `e-center-${compId}`,
        source: 'center',
        target: compId,
        sourceHandle: 'right',
        style: { ...edgeStyle, stroke: '#34d399' },
      });
    });

    // 4. Related Haridasas (Left Column - Use real valid IDs)
    const related = [
      { id: 'kanaka-dasa', name: 'Kanaka Dasa', relationship: 'Contemporary' },
      { id: 'vijaya-dasa', name: 'Vijaya Dasa', relationship: 'Influenced By' },
      { id: 'jagannatha-dasaru', name: 'Jagannatha Dasa', relationship: 'Lineage' },
    ];
    const relPositions = [
      { x: -380, y: -100 },
      { x: -420, y: 0 },
      { x: -380, y: 100 },
    ];

    related.forEach((rel, idx) => {
      nodes.push({
        id: rel.id,
        type: 'relatedNode',
        position: relPositions[idx],
        data: { ...rel },
      });
      edges.push({
        id: `e-center-${rel.id}`,
        source: 'center',
        target: rel.id,
        sourceHandle: 'left',
        style: { ...edgeStyle, stroke: '#c084fc' },
      });
    });

    // 5. Disciple Lineage (Bottom Row - Use real valid IDs)
    const lineage = [
      { id: 'sripadaraja', name: 'Shripadaraya', relationship: 'Guru' },
      { id: 'vadiraja-tirtha', name: 'Vadiraja Tirtha', relationship: 'Contemporary' },
      { id: 'srinivasa-dasa', name: 'Srinivasa Dasa', relationship: 'Disciple' },
    ];
    const linPositions = [
      { x: -200, y: 250 },
      { x: 0, y: 280 },
      { x: 200, y: 250 },
    ];

    lineage.forEach((lin, idx) => {
      nodes.push({
        id: lin.id,
        type: 'lineageNode',
        position: linPositions[idx],
        data: { ...lin },
      });
      edges.push({
        id: `e-center-${lin.id}`,
        source: 'center',
        target: lin.id,
        style: { ...edgeStyle, stroke: '#60a5fa' },
      });
    });

    return { initialNodes: nodes, initialEdges: edges };
  }, [composer, compositions]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const handleNodeClick: NodeMouseHandler = useCallback((event, node) => {
      if (node.type === 'compositionNode') {
          // Assuming composition node IDs were prefixed with 'comp-'
          const actualId = node.id.replace('comp-', '');
          router.push(`/library/${actualId}`);
      } else if (node.type === 'relatedNode' || node.type === 'lineageNode') {
          router.push(`/graph?composerId=${node.id}`);
      }
  }, [router]);

  return (
    <div className="w-full h-full bg-slate-50/50 rounded-[2rem] border border-slate-200 overflow-hidden relative shadow-inner">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.5}
        maxZoom={1.5}
        attributionPosition="bottom-right"
      >
        <Background color="#cbd5e1" gap={24} size={2} />
        <Controls showInteractive={false} className="bg-white border-slate-200 fill-slate-600 shadow-sm rounded-xl overflow-hidden" />
      </ReactFlow>
      
      {/* Legend overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm border border-slate-200 flex items-center gap-6 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-400"></div> Composer</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-orange-200"></div> Attributes</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-purple-300"></div> Related</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-300"></div> Compositions</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-300"></div> Lineage</div>
      </div>
    </div>
  );
}
