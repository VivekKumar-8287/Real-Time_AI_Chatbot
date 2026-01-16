import type { ConnectionStatus } from "../types/chat";

export const StatusIndicator = ({ status }: { status: ConnectionStatus }) => {
  const colors = {
    connected: 'bg-green-500',
    connecting: 'bg-yellow-500',
    disconnected: 'bg-red-500',
  };

  return (
    <div className="flex items-center gap-2 text-sm font-medium">
      <span className={`h-3 w-3 rounded-full ${colors[status]} animate-pulse`} />
      <span className="capitalize text-slate-600">{status}</span>
    </div>
  );
};