import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle,
  MapPin,
  User,
  Edit3,
  Save,
  X,
  Search,
  FileText,
  Filter
} from 'lucide-react';

interface Complaint {
  id: string;
  title: string;
  description: string;
  status: string;
  severity: string;
  location: string;
  created_at: string;
  admin_notes: string | null;
  image_url: string | null;
  user_id: string;
  profiles: {
    full_name: string;
    email: string;
  } | null;
  categories: {
    name: string;
    color: string;
    department: string;
  } | null;
}

interface AllComplaintsTableProps {
  complaints: Complaint[];
  onUpdateComplaint: (complaintId: string, status: string, adminNotes: string) => Promise<void>;
}

export default function AllComplaintsTable({ complaints, onUpdateComplaint }: AllComplaintsTableProps) {
  const [editingComplaint, setEditingComplaint] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ status: '', admin_notes: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');

  const startEditing = (complaint: Complaint) => {
    setEditingComplaint(complaint.id);
    setEditForm({
      status: complaint.status,
      admin_notes: complaint.admin_notes || ''
    });
  };

  const cancelEditing = () => {
    setEditingComplaint(null);
    setEditForm({ status: '', admin_notes: '' });
  };

  const saveChanges = async (complaintId: string) => {
    await onUpdateComplaint(complaintId, editForm.status, editForm.admin_notes);
    setEditingComplaint(null);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Clock className="w-4 h-4" />;
      case 'in_progress':
        return <AlertCircle className="w-4 h-4" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-civic-blue text-white';
      case 'in_progress':
        return 'bg-yellow-500 text-white';
      case 'resolved':
        return 'bg-civic-green text-white';
      default:
        return 'bg-civic-gray text-foreground';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-civic-green-light text-civic-green-dark';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-civic-gray text-foreground';
    }
  };

  // Filter complaints based on search term, status, and severity
  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = 
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.profiles?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter;
    const matchesSeverity = severityFilter === 'all' || complaint.severity === severityFilter;
    const matchesDepartment = departmentFilter === 'all' || 
                             complaint.categories?.department === departmentFilter;

    return matchesSearch && matchesStatus && matchesSeverity && matchesDepartment;
  });

  const uniqueDepartments = Array.from(new Set(
    complaints
      .map(c => c.categories?.department)
      .filter(dept => dept)
  ));

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-muted/50 rounded-lg">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search complaints by title, description, location, or user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>

          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severity</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>

          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {uniqueDepartments.map(dept => (
                <SelectItem key={dept} value={dept!}>
                  {dept?.replace('_', ' ').toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredComplaints.length} of {complaints.length} complaints
        </p>
        {(searchTerm || statusFilter !== 'all' || severityFilter !== 'all' || departmentFilter !== 'all') && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setSeverityFilter('all');
              setDepartmentFilter('all');
            }}
          >
            <X className="w-3 h-3 mr-1" />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Complaints List */}
      {filteredComplaints.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            {searchTerm || statusFilter !== 'all' || severityFilter !== 'all' || departmentFilter !== 'all'
              ? 'No matching complaints found' 
              : 'No complaints found'
            }
          </h3>
          <p className="text-muted-foreground">
            {searchTerm || statusFilter !== 'all' || severityFilter !== 'all' || departmentFilter !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : 'No complaints have been filed yet'
            }
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredComplaints.map((complaint) => (
            <div key={complaint.id} className="border rounded-lg p-6 hover:shadow-soft transition-shadow">
              <div className="flex flex-col space-y-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between space-y-2 md:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-foreground">{complaint.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        ID: {complaint.id.slice(0, 8).toUpperCase()}
                      </Badge>
                      {complaint.categories && (
                        <Badge 
                          variant="secondary"
                          style={{ backgroundColor: complaint.categories.color }}
                          className="text-white"
                        >
                          {complaint.categories.name}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{complaint.profiles?.full_name || complaint.profiles?.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{complaint.location}</span>
                      </div>
                      <span>
                        {new Date(complaint.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2">
                    <Badge className={getSeverityColor(complaint.severity)}>
                      {complaint.severity.toUpperCase()}
                    </Badge>
                    
                    <Badge className={`${getStatusColor(complaint.status)} flex items-center space-x-1`}>
                      {getStatusIcon(complaint.status)}
                      <span>{complaint.status.replace('_', ' ').toUpperCase()}</span>
                    </Badge>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground">
                  {complaint.description}
                </p>

                {/* Image */}
                {complaint.image_url && (
                  <div>
                    <img 
                      src={complaint.image_url} 
                      alt="Complaint evidence" 
                      className="max-w-sm h-48 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Admin Actions */}
                {editingComplaint === complaint.id ? (
                  <div className="bg-muted p-4 rounded-lg space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select 
                          value={editForm.status} 
                          onValueChange={(value) => setEditForm(prev => ({ ...prev, status: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="submitted">Submitted</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="admin_notes">Admin Notes</Label>
                      <Textarea
                        id="admin_notes"
                        placeholder="Add notes about the resolution or current status..."
                        value={editForm.admin_notes}
                        onChange={(e) => setEditForm(prev => ({ ...prev, admin_notes: e.target.value }))}
                        rows={3}
                      />
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        onClick={() => saveChanges(complaint.id)}
                        className="flex items-center space-x-1"
                      >
                        <Save className="w-3 h-3" />
                        <span>Save</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={cancelEditing}
                        className="flex items-center space-x-1"
                      >
                        <X className="w-3 h-3" />
                        <span>Cancel</span>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex-1">
                      {complaint.admin_notes && (
                        <div className="text-sm">
                          <span className="font-medium text-muted-foreground">Admin Notes: </span>
                          <span className="text-foreground">{complaint.admin_notes}</span>
                        </div>
                      )}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => startEditing(complaint)}
                      className="flex items-center space-x-1"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}