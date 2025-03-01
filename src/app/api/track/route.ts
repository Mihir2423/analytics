import { NextRequest, NextResponse } from "next/server";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const res = await req.json();
    const {
      domain,
      url,
      event,
      source,
      visitor_id,
      session_id,
      timestamp,
      data,
    } = res;

    // Validate that URL includes the domain
    if (!url.includes(domain)) {
      return NextResponse.json(
        {
          error:
            "The script points to a different domain than the current URL. Make sure they match.",
        },
        { headers: corsHeaders }
      );
    }

    // Log all tracking data
    console.log("Analytics event received:", {
      event,
      url,
      domain,
      timestamp: timestamp || new Date().toISOString(),
      visitor: visitor_id,
      session: session_id,
      source,
      data,
    });

    // Handle different event types
    if (event === "session_start") {
      console.log("New session started:", {
        session: session_id,
        visitor: visitor_id,
        landing_page: url,
        source,
        referrer: data?.referrer,
      });
      // Here you would add new row to log a new visit with its source
      // Example: await db.insert('sessions', { session_id, visitor_id, start_time: new Date(), source, landing_page: url });
    }

    if (event === "pageview") {
      console.log("Page view:", {
        url,
        session: session_id,
        visitor: visitor_id,
        title: res.title,
      });
      // Here you would log the pageview
      // Example: await db.insert('pageviews', { session_id, visitor_id, url, timestamp: new Date() });
    }

    if (event === "session_end") {
      console.log("Session ended:", {
        session: session_id,
        duration: data?.duration,
      });
      // Here you would update the session record with end time
      // Example: await db.update('sessions', { session_id }, { end_time: new Date(), duration: data?.duration });
    }

    // Handle custom events
    if (event === "event") {
      console.log("Custom event:", {
        category: data?.category,
        action: data?.action,
        label: data?.label,
        value: data?.value,
      });
      // Example: await db.insert('events', { session_id, visitor_id, category: data.category, action: data.action, label: data.label, value: data.value });
    }

    // Return success response with CORS headers
    return NextResponse.json(
      { success: true, event },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("Error processing analytics data:", error);
    return NextResponse.json(
      { error: "Failed to process analytics data" },
      { status: 500, headers: corsHeaders }
    );
  }
}
