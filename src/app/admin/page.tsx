import { 
  RiArticleLine, 
  RiFileTextLine, 
  RiEyeLine, 
  RiCalendarLine,
  RiBarChartLine
} from 'react-icons/ri';
import Link from 'next/link';

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color = "blue",
  href 
}: { 
  title: string; 
  value: string; 
  icon: any; 
  color?: string;
  href?: string;
}) => {
  const colorClasses = {
    blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    green: "bg-green-500/10 text-green-600 dark:text-green-400",
    purple: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    orange: "bg-orange-500/10 text-orange-600 dark:text-orange-400"
  };

  const content = (
    <div className="bg-app-surface border border-app-border rounded-lg p-6 hover:shadow-lg transition-all duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-app-text-muted">{title}</p>
          <p className="text-2xl font-bold text-app-text-base mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
};

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: "blog",
      title: "New Blog Post Published",
      description: "Latest cricket analysis published",
      time: "2 hours ago",
      icon: RiArticleLine
    },
    {
      id: 2,
      type: "page",
      title: "About Page Updated",
      description: "Updated company information",
      time: "4 hours ago",
      icon: RiFileTextLine
    },
    {
      id: 3,
      type: "view",
      title: "High Traffic Day",
      description: "10,000+ page views today",
      time: "6 hours ago",
      icon: RiEyeLine
    }
  ];

      return (
      <div className="bg-app-surface border border-app-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-app-text-base mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="p-2 bg-app-primary/10 text-app-primary rounded-lg">
              <activity.icon className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-app-text-base">{activity.title}</p>
              <p className="text-xs text-app-text-muted">{activity.description}</p>
              <p className="text-xs text-app-text-muted mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-app-text-base">Dashboard</h1>
        <p className="text-app-text-muted mt-1">Welcome to your admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Blog Posts"
          value="24"
          icon={RiArticleLine}
          color="blue"
          href="/admin/blogs"
        />
        <StatCard
          title="Total Pages"
          value="8"
          icon={RiFileTextLine}
          color="green"
          href="/admin/pages"
        />
        <StatCard
          title="Total Views"
          value="45.2K"
          icon={RiEyeLine}
          color="purple"
        />
        <StatCard
          title="This Month"
          value="12.8K"
          icon={RiBarChartLine}
          color="orange"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Quick Actions */}
        <div className="bg-app-surface border border-app-border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-app-text-base mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link 
              href="/admin/blogs/new"
              className="flex items-center justify-between p-3 bg-app-primary text-white rounded-lg hover:bg-app-primary-hover transition-colors"
            >
              <span className="font-medium">Create New Blog Post</span>
              <RiArticleLine className="w-5 h-5" />
            </Link>
            <Link 
              href="/admin/pages/new"
              className="flex items-center justify-between p-3 bg-app-surface border border-app-border text-app-text-base rounded-lg hover:bg-app-bg transition-colors"
            >
              <span className="font-medium">Create New Page</span>
              <RiFileTextLine className="w-5 h-5" />
            </Link>
            <Link 
              href="/admin/settings"
              className="flex items-center justify-between p-3 bg-app-surface border border-app-border text-app-text-base rounded-lg hover:bg-app-bg transition-colors"
            >
              <span className="font-medium">Manage Settings</span>
              <RiCalendarLine className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <RecentActivity />
      </div>

      {/* Analytics Preview */}
      <div className="bg-app-surface border border-app-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-app-text-base mb-4">Analytics Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-app-primary">2,847</div>
            <div className="text-sm text-app-text-muted">Page Views Today</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-app-primary">156</div>
            <div className="text-sm text-app-text-muted">Unique Visitors</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-app-primary">4.2%</div>
            <div className="text-sm text-app-text-muted">Growth Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
} 