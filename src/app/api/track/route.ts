import { NextRequest, NextResponse } from "next/server";
import { DeviceType } from "@prisma/client";
import { UAParser } from "ua-parser-js";
import prisma from "@/lib/db";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json({}, { headers: corsHeaders });
}

// Helper function to determine device type from user agent
function getDeviceType(userAgent: string): DeviceType {
  const parser = new UAParser(userAgent);
  const device = parser.getDevice();
  const deviceType = device.type?.toLowerCase() || "";

  if (deviceType.includes("mobile")) return "MOBILE";
  if (deviceType.includes("tablet")) return "TABLET";
  return "DESKTOP";
}

// Helper function to extract OS information
function getOSInfo(userAgent: string): { name: string } {
  const parser = new UAParser(userAgent);
  const os = parser.getOS();
  return {
    name: os.name || "Unknown",
  };
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const {
      domain,
      url,
      event,
      source,
      user_agent,
      visitor_id,
      session_id,
      utm,
      referrer,
      path,
    } = payload;

    // Validate domain match
    if (!url.includes(domain)) {
      return NextResponse.json(
        {
          error:
            "The script points to a different domain than the current URL. Make sure they match.",
        },
        { headers: corsHeaders }
      );
    }

    // Get the project ID from domain
    const projectExist = await prisma.project.findUnique({
      where: { domain: domain },
    });
    if (!projectExist) {
      return NextResponse.json(
        {
          error:
            "The project does not exist. Make sure you have created the project in your dashboard.",
        },
        { headers: corsHeaders }
      );
    }

    const projectId = projectExist.id;

    // Get country information from request headers (simplified)
    const countryCode = req.headers.get("cf-ipcountry") || "US";
    const countryName = countryCode === "US" ? "United States" : "Unknown";

    // Get device information
    const deviceType = user_agent ? getDeviceType(user_agent) : "DESKTOP";

    // Get OS information
    const osInfo = user_agent ? getOSInfo(user_agent) : { name: "Unknown" };

    // Get source information
    const sourceName = source || utm?.source || "direct";

    // Log all collected data
    console.log("==== ANALYTICS EVENT ====");
    console.log("Event Type:", event);
    console.log("Project/Domain:", domain);
    console.log("URL:", url);
    console.log("Path:", path);
    console.log("Visitor ID:", visitor_id);
    console.log("Session ID:", session_id);
    console.log("Country:", `${countryName} (${countryCode})`);
    console.log("Device Type:", deviceType);
    console.log("OS:", osInfo.name);
    console.log("Source:", sourceName);
    console.log("Referrer:", referrer);
    console.log("UTM Parameters:", utm);
    console.log("User Agent:", user_agent);
    console.log("Full Payload:", JSON.stringify(payload, null, 2));
    console.log("========================");

    // Update Analytics for the project
    const analyticsRecord = await prisma.analytics.upsert({
      where: { projectId },
      update: {
        totalPageVisits: { increment: event === "pageview" ? 1 : 0 },
        totalVisitors: { increment: event === "session_start" ? 1 : 0 },
      },
      create: {
        projectId,
        totalPageVisits: event === "pageview" ? 1 : 0,
        totalVisitors: event === "session_start" ? 1 : 0,
      },
    });

    // Ensure the analyticsId is valid
    const analyticsId = analyticsRecord.id;

    // Update VisitData for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await prisma.visitData.upsert({
      where: {
        analyticsId_date: {
          analyticsId: analyticsId,
          date: today,
        },
      },
      update: {
        pageVisits: { increment: event === "pageview" ? 1 : 0 },
        visitors: { increment: event === "session_start" ? 1 : 0 },
      },
      create: {
        analyticsId: analyticsId,
        date: today,
        pageVisits: event === "pageview" ? 1 : 0,
        visitors: event === "session_start" ? 1 : 0,
      },
    });

    // Update RouteAnalytics
    if (path) {
      await prisma.routeAnalytics.upsert({
        where: {
          analyticsId_route: {
            analyticsId: analyticsId,
            route: path,
          },
        },
        update: {
          pageVisits: { increment: event === "pageview" ? 1 : 0 },
          visitors: { increment: event === "session_start" ? 1 : 0 },
        },
        create: {
          analyticsId: analyticsId,
          route: path,
          pageVisits: event === "pageview" ? 1 : 0,
          visitors: event === "session_start" ? 1 : 0,
        },
      });
    }

    // Update CountryAnalytics
    await prisma.countryAnalytics.upsert({
      where: {
        analyticsId_countryCode: {
          analyticsId: analyticsId,
          countryCode,
        },
      },
      update: {
        visitors: { increment: event === "session_start" ? 1 : 0 },
      },
      create: {
        analyticsId: analyticsId,
        countryCode,
        countryName,
        visitors: event === "session_start" ? 1 : 0,
      },
    });

    // Update DeviceAnalytics
    await prisma.deviceAnalytics.upsert({
      where: {
        analyticsId_deviceType: {
          analyticsId: analyticsId,
          deviceType,
        },
      },
      update: {
        visitors: { increment: event === "session_start" ? 1 : 0 },
      },
      create: {
        analyticsId: analyticsId,
        deviceType,
        visitors: event === "session_start" ? 1 : 0,
      },
    });

    // Update OSAnalytics
    await prisma.oSAnalytics.upsert({
      where: {
        analyticsId_osName: {
          analyticsId: analyticsId,
          osName: osInfo.name,
        },
      },
      update: {
        visitors: { increment: event === "session_start" ? 1 : 0 },
      },
      create: {
        analyticsId: analyticsId,
        osName: osInfo.name,
        visitors: event === "session_start" ? 1 : 0,
      },
    });

    // Update SourceAnalytics
    await prisma.sourceAnalytics.upsert({
      where: {
        analyticsId_sourceName: {
          analyticsId: analyticsId,
          sourceName,
        },
      },
      update: {
        visitors: { increment: event === "session_start" ? 1 : 0 },
      },
      create: {
        analyticsId: analyticsId,
        sourceName,
        visitors: event === "session_start" ? 1 : 0,
      },
    });

    // Return success response
    return NextResponse.json(
      { success: true, event, received: true },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("Error processing analytics data:", error);
    return NextResponse.json(
      { error: "Failed to process analytics data", details: String(error) },
      { status: 500, headers: corsHeaders }
    );
  }
}
