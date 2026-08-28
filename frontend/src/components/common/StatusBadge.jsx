import React from 'react';
import { Clock, CheckCircle2, PlayCircle, CheckCheck, XCircle } from 'lucide-react';

export const StatusBadge = ({ status }) => {
  switch (status) {
    case 'finding_labour':
    case 'pending':
      return (
        <span className="badge-finding">
          <Clock className="w-3.5 h-3.5 animate-spin" />
          Finding Labour
        </span>
      );
    case 'confirmed':
      return (
        <span className="badge-confirmed">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Confirmed
        </span>
      );
    case 'in_progress':
      return (
        <span className="badge-progress">
          <PlayCircle className="w-3.5 h-3.5" />
          Work In Progress
        </span>
      );
    case 'completed':
      return (
        <span className="badge-completed">
          <CheckCheck className="w-3.5 h-3.5" />
          Completed
        </span>
      );
    case 'cancelled':
      return (
        <span className="badge-cancelled">
          <XCircle className="w-3.5 h-3.5" />
          Cancelled
        </span>
      );
    default:
      return (
        <span className="bg-slate-100 text-slate-700 font-medium px-2.5 py-0.5 rounded-full text-xs">
          {status}
        </span>
      );
  }
};
