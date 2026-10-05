import React from 'react';
import { Bell, Check, X, Clock, Calendar, AlertTriangle, Heart, Trash2 } from 'lucide-react';
import { NotificationItem } from '../../types';
import { BottomSheet } from '../common/BottomSheet';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onDismiss: (id: string) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onDismiss,
}) => {
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="বিজ্ঞপ্তি কেন্দ্র (Notifications)"
      subtitle="ওষুধ ও অ্যাপয়েন্টমেন্টের সময়োচিত বার্তা"
    >
      <div className="space-y-4">
        {notifications.length > 0 && (
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs text-slate-500 font-medium">
              মোট {notifications.length}টি নোটিফিকেশন
            </span>
            <button
              onClick={onMarkAllRead}
              className="text-xs font-bold text-teal-700 hover:text-teal-800 transition-colors"
            >
              সব পড়া হয়েছে চিহ্নিত করুন
            </button>
          </div>
        )}

        {notifications.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <Bell className="w-10 h-10 mx-auto text-slate-300 mb-2 stroke-1" />
            <p className="text-sm font-medium">কোনো নতুন বিজ্ঞপ্তি নেই</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {notifications.map((notif) => {
              const getIcon = () => {
                switch (notif.type) {
                  case 'medicine':
                    return <Clock className="w-4 h-4 text-teal-600" />;
                  case 'appointment':
                    return <Calendar className="w-4 h-4 text-blue-600" />;
                  case 'alert':
                    return <AlertTriangle className="w-4 h-4 text-amber-600" />;
                  case 'family':
                    return <Heart className="w-4 h-4 text-rose-600" />;
                  default:
                    return <Bell className="w-4 h-4 text-slate-600" />;
                }
              };

              return (
                <div
                  key={notif.id}
                  className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                    notif.read ? 'bg-white border-slate-200/80 opacity-75' : 'bg-teal-50/40 border-teal-200 shadow-2xs'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-2xs">
                    {getIcon()}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{notif.title}</h4>
                      <span className="text-[10px] text-slate-400 font-mono shrink-0">{notif.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{notif.body}</p>
                  </div>

                  <button
                    onClick={() => onDismiss(notif.id)}
                    className="text-slate-300 hover:text-slate-600 p-1 rounded-lg"
                    aria-label="বিজ্ঞপ্তি মুছুন"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </BottomSheet>
  );
};
