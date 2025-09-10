import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import AllComplaintsTable from '@/components/AllComplaintsTable';
import { 
  Shield,
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  LogOut,
  Home,
  List,
  MapPin,
  User,
  Edit3,
  Save,
  X
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

export default function AdminDashboard() {
  const { user, isAdmin, isMasterAdmin, adminUser, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingComplaint, setEditingComplaint] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    status: '',
    admin_notes: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    if (!isAdmin) {
      navigate('/dashboard');
      return;
    }
    fetchComplaints();
  }, [user, isAdmin, navigate]);

  const fetchComplaints = async () => {
    try {
      let query = supabase
        .from('complaints')
        .select(`
          *,
          profiles:user_id (
            full_name,
            email
          ),
          categories:category_id (
            name,
            color,
            department
          )
        `)
        .order('created_at', { ascending: false });

      // Filter by department if admin is not master admin
      if (!isMasterAdmin && adminUser?.department !== 'all' && adminUser?.department !== 'general') {
        query = query.eq('categories.department', adminUser.department);
      }

      const { data, error } = await query;

      if (error) throw error;
      setComplaints(data || []);
    } catch (error) {
      console.error('Error fetching complaints:', error);
      toast({
        title: "Error loading complaints",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

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
    try {
      const complaint = complaints.find(c => c.id === complaintId);
      const oldStatus = complaint?.status;

      const { error } = await supabase
        .from('complaints')
        .update({
          status: editForm.status,
          admin_notes: editForm.admin_notes,
          updated_at: new Date().toISOString(),
          resolved_at: editForm.status === 'resolved' ? new Date().toISOString() : null
        })
        .eq('id', complaintId);

      if (error) throw error;

      // Send email notification if status changed
      if (complaint && oldStatus !== editForm.status && complaint.profiles?.email) {
        try {
          await supabase.functions.invoke('send-complaint-update', {
            body: {
              userEmail: complaint.profiles.email,
              userName: complaint.profiles.full_name || 'User',
              complaintId: complaintId,
              complaintTitle: complaint.title,
              oldStatus: oldStatus,
              newStatus: editForm.status,
              adminNotes: editForm.admin_notes || undefined
            }
          });
        } catch (emailError) {
          console.error('Error sending email notification:', emailError);
          // Continue with success even if email fails
        }
      }

      toast({
        title: "Complaint updated successfully",
        description: "The complaint status has been updated and the user has been notified"
      });

      setEditingComplaint(null);
      fetchComplaints();
    } catch (error) {
      toast({
        title: "Error updating complaint",
        description: "Please try again later",
        variant: "destructive"
      });
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <Home className="w-6 h-6 text-primary" />
                <span className="text-xl font-bold text-gradient">Civic Care</span>
              </Link>
              <div className="h-4 w-px bg-border"></div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="font-semibold">Admin Dashboard</span>
                <Badge variant="secondary" className="bg-primary text-primary-foreground">
                  {isMasterAdmin ? 'MASTER ADMIN' : adminUser?.department?.replace('_', ' ').toUpperCase() || 'ADMIN'}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                {user?.user_metadata?.full_name || user?.email} ({isMasterAdmin ? 'Master Admin' : adminUser?.role})
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSignOut}
                className="flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage and resolve civic complaints in your department
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Complaints</p>
                  <p className="text-2xl font-bold">{complaints.length}</p>
                </div>
                <FileText className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">
                    {complaints.filter(c => c.status === 'submitted').length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-civic-blue" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold">
                    {complaints.filter(c => c.status === 'in_progress').length}
                  </p>
                </div>
                <AlertCircle className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Resolved</p>
                  <p className="text-2xl font-bold">
                    {complaints.filter(c => c.status === 'resolved').length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-civic-green" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Complaints Management with Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="all-complaints" className="flex items-center space-x-2">
              <List className="w-4 h-4" />
              <span>All Complaints</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Complaints</CardTitle>
                <CardDescription>
                  Latest complaints in your department
                </CardDescription>
              </CardHeader>
              <CardContent>
                {complaints.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No complaints found</h3>
                    <p className="text-muted-foreground">
                      No complaints have been filed in your department yet
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {complaints.slice(0, 5).map((complaint) => (
                      <div key={complaint.id} className="border rounded-lg p-6 hover:shadow-soft transition-shadow">
                        <div className="flex flex-col space-y-4">
                          {/* Header */}
                          <div className="flex flex-col md:flex-row md:items-start justify-between space-y-2 md:space-y-0">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="font-semibold text-foreground">{complaint.title}</h3>
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
                    
                    {complaints.length > 5 && (
                      <div className="text-center pt-4">
                        <p className="text-sm text-muted-foreground">
                          Showing 5 of {complaints.length} complaints. Use the "All Complaints" tab to view more.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="all-complaints" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>All Complaints</CardTitle>
                <CardDescription>
                  Search, filter, and manage all complaints in the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AllComplaintsTable 
                  complaints={complaints} 
                  onUpdateComplaint={async (complaintId, status, adminNotes) => {
                    const complaint = complaints.find(c => c.id === complaintId);
                    const oldStatus = complaint?.status;

                    const { error } = await supabase
                      .from('complaints')
                      .update({
                        status: status,
                        admin_notes: adminNotes,
                        updated_at: new Date().toISOString(),
                        resolved_at: status === 'resolved' ? new Date().toISOString() : null
                      })
                      .eq('id', complaintId);

                    if (error) throw error;

                    // Send email notification if status changed
                    if (complaint && oldStatus !== status && complaint.profiles?.email) {
                      try {
                        await supabase.functions.invoke('send-complaint-update', {
                          body: {
                            userEmail: complaint.profiles.email,
                            userName: complaint.profiles.full_name || 'User',
                            complaintId: complaintId,
                            complaintTitle: complaint.title,
                            oldStatus: oldStatus,
                            newStatus: status,
                            adminNotes: adminNotes || undefined
                          }
                        });
                      } catch (emailError) {
                        console.error('Error sending email notification:', emailError);
                      }
                    }

                    toast({
                      title: "Complaint updated successfully",
                      description: "The complaint status has been updated and the user has been notified"
                    });

                    fetchComplaints();
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}