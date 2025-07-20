import React, { useState, useEffect } from 'react';
import { Shield, Flag, Users, MessageSquare, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { useModeration } from '../../hooks/useModeration';
import { CommentReport } from '../../types/enhanced';
import { LoadingSpinner } from '../LoadingSpinner';
import { formatDistanceToNow } from '../../utils/dateUtils';

export const ModerationDashboard: React.FC = () => {
  const { isModerator, isAdmin, fetchReports, updateReportStatus, isLoading } = useModeration();
  const [reports, setReports] = useState<CommentReport[]>([]);
  const [activeTab, setActiveTab] = useState<'pending' | 'reviewed' | 'all'>('pending');

  useEffect(() => {
    if (isModerator) {
      loadReports();
    }
  }, [activeTab, isModerator]);

  const loadReports = async () => {
    try {
      const status = activeTab === 'all' ? undefined : activeTab;
      const data = await fetchReports(status);
      setReports(data || []);
    } catch (error) {
      console.error('Error loading reports:', error);
    }
  };

  const handleReportAction = async (reportId: string, status: CommentReport['status']) => {
    try {
      await updateReportStatus(reportId, status);
      await loadReports();
    } catch (error) {
      console.error('Error updating report:', error);
    }
  };

  if (!isModerator) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">Access Denied</h2>
          <p className="text-gray-500">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  const getReasonColor = (reason: string) => {
    switch (reason) {
      case 'spam': return 'bg-yellow-100 text-yellow-800';
      case 'harassment': return 'bg-red-100 text-red-800';
      case 'inappropriate': return 'bg-purple-100 text-purple-800';
      case 'misinformation': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'dismissed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-dark-gray">Moderation Dashboard</h1>
            <p className="text-gray-600">Manage reports and community safety</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center space-x-3">
              <Flag className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600">Pending Reports</p>
                <p className="text-xl font-bold text-dark-gray">
                  {reports.filter(r => r.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Resolved</p>
                <p className="text-xl font-bold text-dark-gray">
                  {reports.filter(r => r.status === 'resolved').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center space-x-3">
              <XCircle className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-sm text-gray-600">Dismissed</p>
                <p className="text-xl font-bold text-dark-gray">
                  {reports.filter(r => r.status === 'dismissed').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Total Reports</p>
                <p className="text-xl font-bold text-dark-gray">{reports.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {[
            { id: 'pending', label: 'Pending' },
            { id: 'reviewed', label: 'Reviewed' },
            { id: 'all', label: 'All Reports' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-white text-deep-blue shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-xl border border-gray-200">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : reports.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {reports.map((report) => (
              <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <Flag className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getReasonColor(report.reason)}`}>
                          {report.reason}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Reported by <span className="font-medium">@{(report as any).reporter?.username}</span>
                      </p>
                      {report.description && (
                        <p className="text-sm text-gray-700 mb-3 bg-gray-50 p-3 rounded-lg">
                          "{report.description}"
                        </p>
                      )}
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Reported comment:</span> {(report as any).comment?.content}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500">
                        Reported {formatDistanceToNow(report.created_at)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {report.status === 'pending' && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleReportAction(report.id, 'resolved')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center space-x-1"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Resolve</span>
                    </button>
                    <button
                      onClick={() => handleReportAction(report.id, 'dismissed')}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm flex items-center space-x-1"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Dismiss</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Flag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No Reports</h3>
              <p className="text-gray-500">
                {activeTab === 'pending' 
                  ? 'No pending reports to review' 
                  : 'No reports found for this filter'
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};