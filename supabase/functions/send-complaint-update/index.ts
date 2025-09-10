import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ComplaintUpdateRequest {
  userEmail: string;
  userName: string;
  complaintId: string;
  complaintTitle: string;
  oldStatus: string;
  newStatus: string;
  adminNotes?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      userEmail, 
      userName, 
      complaintId, 
      complaintTitle, 
      oldStatus, 
      newStatus, 
      adminNotes 
    }: ComplaintUpdateRequest = await req.json();

    const formatStatus = (status: string) => {
      return status.replace('_', ' ').toUpperCase();
    };

    const getStatusDescription = (status: string) => {
      switch (status) {
        case 'submitted':
          return 'Your complaint has been received and is awaiting review.';
        case 'in_progress':
          return 'Your complaint is currently being reviewed and addressed by our team.';
        case 'resolved':
          return 'Your complaint has been resolved. Thank you for your patience.';
        default:
          return 'Your complaint status has been updated.';
      }
    };

    const emailResponse = await resend.emails.send({
      from: "Civic Care <notifications@resend.dev>",
      to: [userEmail],
      subject: `Complaint Update: ${formatStatus(newStatus)} - ${complaintTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2563eb; margin-bottom: 20px;">Civic Care - Complaint Update</h1>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="margin-top: 0; color: #1e293b;">Hello ${userName},</h2>
            <p>Your complaint has been updated. Here are the details:</p>
          </div>
          
          <div style="background-color: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <h3 style="margin-top: 0; color: #1e293b;">Complaint Details</h3>
            <p><strong>ID:</strong> ${complaintId.slice(0, 8).toUpperCase()}</p>
            <p><strong>Title:</strong> ${complaintTitle}</p>
            <p><strong>Previous Status:</strong> ${formatStatus(oldStatus)}</p>
            <p><strong>New Status:</strong> <span style="color: #059669; font-weight: bold;">${formatStatus(newStatus)}</span></p>
          </div>
          
          <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 15px; margin-bottom: 20px;">
            <p style="margin: 0; color: #065f46;">
              <strong>Status Update:</strong> ${getStatusDescription(newStatus)}
            </p>
          </div>
          
          ${adminNotes ? `
          <div style="background-color: #f1f5f9; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
            <h4 style="margin-top: 0; color: #1e293b;">Admin Notes:</h4>
            <p style="margin-bottom: 0; color: #475569;">${adminNotes}</p>
          </div>
          ` : ''}
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="${req.headers.get('origin') || 'https://your-app.lovable.app'}/track-complaint" 
               style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Track Your Complaint
            </a>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;">
          
          <p style="color: #64748b; font-size: 14px; text-align: center;">
            This is an automated message from Civic Care. If you have questions about your complaint, 
            please contact our support team.
          </p>
        </div>
      `,
    });

    console.log("Complaint update email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-complaint-update function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);