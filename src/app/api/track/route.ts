/* eslint-disable no-console */
import { NextRequest, NextResponse } from "next/server";
import { DeviceType } from "@prisma/client";
import { UAParser } from "ua-parser-js";
import prisma from "@/lib/db";

const countryNames: Record<string, string> = {
  US: "United States",
  CA: "Canada",
  MX: "Mexico",

  // South America
  BR: "Brazil",
  AR: "Argentina",
  CO: "Colombia",
  CL: "Chile",
  PE: "Peru",

  // Europe
  GB: "United Kingdom",
  DE: "Germany",
  FR: "France",
  IT: "Italy",
  ES: "Spain",
  NL: "Netherlands",
  SE: "Sweden",
  NO: "Norway",
  FI: "Finland",
  DK: "Denmark",
  PL: "Poland",
  RU: "Russia",
  TR: "Turkey",
  PT: "Portugal",
  CH: "Switzerland",
  BE: "Belgium",
  AT: "Austria",
  IE: "Ireland",
  CZ: "Czech Republic",
  HU: "Hungary",
  UA: "Ukraine",
  GR: "Greece",

  // Asia
  IN: "India",
  CN: "China",
  JP: "Japan",
  KR: "South Korea",
  SG: "Singapore",
  MY: "Malaysia",
  ID: "Indonesia",
  TH: "Thailand",
  PH: "Philippines",
  VN: "Vietnam",
  SA: "Saudi Arabia",
  AE: "United Arab Emirates",
  IL: "Israel",
  PK: "Pakistan",
  BD: "Bangladesh",

  // Africa
  ZA: "South Africa",
  NG: "Nigeria",
  EG: "Egypt",
  KE: "Kenya",
  MA: "Morocco",
  GH: "Ghana",
  DZ: "Algeria",
  ET: "Ethiopia",

  // Oceania
  AU: "Australia",
  NZ: "New Zealand",
  FJ: "Fiji",

  // Central America & Caribbean
  CU: "Cuba",
  DO: "Dominican Republic",
  JM: "Jamaica",
  PA: "Panama",
  CR: "Costa Rica",
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json({}, { headers: corsHeaders });
}

function getDeviceType(userAgent: string): DeviceType {
  const parser = new UAParser(userAgent);
  const device = parser.getDevice();
  const deviceType = device.type?.toLowerCase() || "";

  if (deviceType.includes("mobile")) return "MOBILE";
  if (deviceType.includes("tablet")) return "TABLET";
  return "DESKTOP";
}

function getOSInfo(userAgent: string): { name: string } {
  const parser = new UAParser(userAgent);
  const os = parser.getOS();
  return {
    name: os.name || "Unknown",
  };
}

/**
 * Get country information from various edge providers
 * This mimics how Vercel and other platforms determine visitor location
 */
function getCountryInfo(req: NextRequest): { code: string; name: string } {
  // Check various headers from different CDNs and edge providers
  // Cloudflare
  const cfCountry = req.headers.get("cf-ipcountry");

  // Vercel
  const vercelCountry = req.headers.get("x-vercel-ip-country");

  // Fastly
  const fastlyCountry = req.headers.get("Fastly-Geo-Country");

  // Akamai
  const akamaiCountry = req.headers
    .get("X-Akamai-Edgescape")
    ?.split(",")
    .find((item) => item.trim().startsWith("country_code="))
    ?.split("=")[1];

  // AWS CloudFront
  const cloudfrontCountry = req.headers.get("CloudFront-Viewer-Country");

  // Use the first available country code, or default to "XX" for unknown
  const countryCode =
    cfCountry ||
    vercelCountry ||
    fastlyCountry ||
    akamaiCountry ||
    cloudfrontCountry ||
    "XX";

  // Look up the country name from our mapping, or use a generic name if not found
  const countryName =
    countryNames[countryCode] ||
    (countryCode === "XX" ? "Unknown" : `Country (${countryCode})`);

  return { code: countryCode, name: countryName };
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

    if (!url.includes(domain)) {
      return NextResponse.json(
        {
          error:
            "The script points to a different domain than the current URL. Make sure they match.",
        },
        { headers: corsHeaders },
      );
    }

    const projectExist = await prisma.project.findUnique({
      where: { domain: domain },
    });
    if (!projectExist) {
      return NextResponse.json(
        {
          error:
            "The project does not exist. Make sure you have created the project in your dashboard.",
        },
        { headers: corsHeaders },
      );
    }

    const projectId = projectExist.id;

    // Get country information using our enhanced method
    const { code: countryCode, name: countryName } = getCountryInfo(req);

    const deviceType = user_agent ? getDeviceType(user_agent) : "DESKTOP";

    const osInfo = user_agent ? getOSInfo(user_agent) : { name: "Unknown" };

    const sourceName = source || utm?.medium || utm?.source || "direct";

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

    const analyticsId = analyticsRecord.id;

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

    return NextResponse.json(
      { success: true, event, received: true },
      { headers: corsHeaders },
    );
  } catch (error) {
    console.error("Error processing analytics data:", error);
    return NextResponse.json(
      { error: "Failed to process analytics data", details: String(error) },
      { status: 500, headers: corsHeaders },
    );
  }
}
