import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Search, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  MapPin,
  Calendar,
  FileText,
  Home,
  User,
  Camera
} from 'lucide-react';

interface ComplaintDetails {
  id: string;
  title: string;
  description: string;
  status: string;
  severity: string;
  location: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  admin_notes: string | null;
  categories: {
    name: string;
    color: string;
  } | null;
  profiles: {
    full_name: string;
    email: string;
  } | null;
}

export default function TrackComplaint() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [complaintId, setComplaintId] = useState('');
  const [complaint, setComplaint] = useState<ComplaintDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintId.trim()) {
      toast({
        title: "Please enter a complaint ID",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setSearched(true);
    
    try {
      const { data, error } = await supabase
        .from('complaints')
        .select(`
          *,
          categories:category_id (
            name,
            color
          ),
          profiles:user_id (
            full_name,
            email
          )
        `)
        .eq('id', complaintId.toLowerCase())
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          setComplaint(null);
          toast({
            title: "Complaint not found",
            description: "Please check the ID and try again",
            variant: "destructive"
          });
        } else {
          throw error;
        }
      } else {
        setComplaint(data);
        toast({
          title: "Complaint found",
          description: "Here are the details"
        });
      }
    } catch (error) {
      toast({
        title: "Error searching complaint",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Clock className="w-5 h-5" />;
      case 'in_progress':
        return <AlertCircle className="w-5 h-5" />;
      case 'resolved':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
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

  const formatStatus = (status: string) => {
    return status.replace('_', ' ').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>
            <div className="h-4 w-px bg-border"></div>
            <Link to="/" className="flex items-center space-x-2">
              <Home className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold text-gradient">Civic Care</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Track Complaint</h1>
            <p className="text-muted-foreground">
              Enter your complaint ID to check the current status
            </p>
          </div>

          {/* Search Form */}
          <Card className="shadow-card mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="w-5 h-5 text-primary" />
                <span>Search by Complaint ID</span>
              </CardTitle>
              <CardDescription>
                Enter the complaint ID you received when filing your complaint
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="complaintId">Complaint ID</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="complaintId"
                      placeholder="Enter complaint ID..."
                      value={complaintId}
                      onChange={(e) => setComplaintId(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      type="submit" 
                      className="btn-hero-primary"
                      disabled={loading}
                    >
                      {loading ? 'Searching...' : 'Search'}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Results */}
          {searched && !complaint && !loading && (
            <Card className="shadow-card">
              <CardContent className="py-12 text-center">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Complaint Not Found</h3>
                <p className="text-muted-foreground mb-4">
                  The complaint ID you entered could not be found. Please check the ID and try again.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setComplaintId('');
                    setSearched(false);
                  }}
                >
                  Try Again
                </Button>
              </CardContent>
            </Card>
          )}

          {complaint && (
            <div className="space-y-6">
              {/* Status Overview */}
              <Card className="shadow-card">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                    <div>
                      <CardTitle className="text-xl">{complaint.title}</CardTitle>
                      <CardDescription className="flex items-center space-x-2 mt-2">
                        <span>ID: {complaint.id.slice(0, 8).toUpperCase()}</span>
                        {complaint.categories && (
                          <>
                            <span>•</span>
                            <Badge 
                              variant="secondary"
                              style={{ backgroundColor: complaint.categories.color }}
                              className="text-white"
                            >
                              {complaint.categories.name}
                            </Badge>
                          </>
                        )}
                      </CardDescription>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                      <Badge className={getSeverityColor(complaint.severity)}>
                        {complaint.severity.toUpperCase()} PRIORITY
                      </Badge>
                      
                      <Badge className={`${getStatusColor(complaint.status)} flex items-center space-x-1`}>
                        {getStatusIcon(complaint.status)}
                        <span>{formatStatus(complaint.status)}</span>
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Complaint Details */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-primary" />
                      <span>Complaint Details</span>
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Description</Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {complaint.description}
                      </p>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div>
                        <Label className="text-sm font-medium">Location</Label>
                        <p className="text-sm text-muted-foreground">
                          {complaint.location}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div>
                        <Label className="text-sm font-medium">Submitted</Label>
                        <p className="text-sm text-muted-foreground">
                          {new Date(complaint.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <User className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div>
                        <Label className="text-sm font-medium">Submitted by</Label>
                        <p className="text-sm text-muted-foreground">
                          {complaint.profiles?.full_name || 'Anonymous'}
                        </p>
                      </div>
                    </div>

                    {complaint.image_url && (
                      <div>
                        <Label className="text-sm font-medium flex items-center space-x-2 mb-2">
                          <Camera className="w-4 h-4" />
                          <span>Photo Evidence</span>
                        </Label>
                        <img 
                          src={complaint.image_url} 
                          alt="Complaint evidence" 
                          className="w-full h-48 object-cover rounded-lg border"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Status & Updates */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-primary" />
                      <span>Status & Updates</span>
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Current Status</Label>
                      <div className="mt-2">
                        <Badge className={`${getStatusColor(complaint.status)} flex items-center space-x-2 w-fit`}>
                          {getStatusIcon(complaint.status)}
                          <span>{formatStatus(complaint.status)}</span>
                        </Badge>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium">Last Updated</Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(complaint.updated_at).toLocaleString()}
                      </p>
                    </div>
                    
                    {complaint.admin_notes && (
                      <div>
                        <Label className="text-sm font-medium">Admin Notes</Label>
                        <div className="mt-2 p-3 bg-muted rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            {complaint.admin_notes}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {/* Status Timeline */}
                    <div>
                      <Label className="text-sm font-medium mb-3 block">Progress Timeline</Label>
                      <div className="space-y-3">
                        <div className={`flex items-center space-x-3 ${
                          complaint.status === 'submitted' || 
                          complaint.status === 'in_progress' || 
                          complaint.status === 'resolved' 
                            ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          <div className={`w-3 h-3 rounded-full ${
                            complaint.status === 'submitted' || 
                            complaint.status === 'in_progress' || 
                            complaint.status === 'resolved' 
                              ? 'bg-civic-blue' : 'bg-muted-foreground'
                          }`}></div>
                          <span className="text-sm">Complaint Submitted</span>
                        </div>
                        
                        <div className={`flex items-center space-x-3 ${
                          complaint.status === 'in_progress' || 
                          complaint.status === 'resolved' 
                            ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          <div className={`w-3 h-3 rounded-full ${
                            complaint.status === 'in_progress' || 
                            complaint.status === 'resolved' 
                              ? 'bg-yellow-500' : 'bg-muted-foreground'
                          }`}></div>
                          <span className="text-sm">Under Review</span>
                        </div>
                        
                        <div className={`flex items-center space-x-3 ${
                          complaint.status === 'resolved' 
                            ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          <div className={`w-3 h-3 rounded-full ${
                            complaint.status === 'resolved' 
                              ? 'bg-civic-green' : 'bg-muted-foreground'
                          }`}></div>
                          <span className="text-sm">Resolved</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}