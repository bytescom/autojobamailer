export const CARD_COLORS = [
    'bg-orange-100',
    'bg-blue-100',
    'bg-green-100',
    'bg-purple-100',
    'bg-yellow-100',
    'bg-pink-100'
];

export const statusStyles = {
    'Draft':     'bg-gray-100  text-gray-700  border-gray-200',
    'Running':   'bg-blue-50   text-blue-600  border-blue-200',
    'Completed': 'bg-green-50  text-green-600 border-green-200',
    'Scheduled': 'bg-purple-50 text-purple-600 border-purple-200',
    'Failed':    'bg-red-50    text-red-600   border-red-200',
};

export const dotColors = {
    'Draft':     'bg-gray-500',
    'Running':   'bg-blue-500',
    'Completed': 'bg-green-500',
    'Scheduled': 'bg-purple-500',
    'Failed':    'bg-red-500',
};

export const formatDate = (d) => {
    return d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '—';
};

export const timeAgo = (d) => {
    if (!d) return '—';
    const diff = Date.now() - new Date(d).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
};
