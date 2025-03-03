(function () {
  "use strict";
  var location = window.location;
  var document = window.document;
  var scriptElement = document.currentScript;
  var dataDomain = scriptElement.getAttribute("data-domain");

  // Enhanced UTM parameter tracking with referrer inference
  function getUTMParameters() {
    let queryString = location.search;
    const params = new URLSearchParams(queryString);

    // Check if UTM parameters exist in the URL
    var utmSource = params.get("utm_source");
    var utmMedium = params.get("utm_medium");
    var utmCampaign = params.get("utm_campaign");
    var utmTerm = params.get("utm_term");
    var utmContent = params.get("utm_content");

    // If we don't have UTM source but have a referrer, try to infer the source
    if (!utmSource && document.referrer) {
      var referrerUrl = new URL(document.referrer);
      var referrerHostname = referrerUrl.hostname.toLowerCase();

      // Check for common social media and known referrers
      if (
        referrerHostname.includes("facebook.com") ||
        referrerHostname.includes("fb.com")
      ) {
        utmSource = "facebook";
        utmMedium = utmMedium || "social";
      } else if (
        referrerHostname.includes("twitter.com") ||
        referrerHostname.includes("x.com")
      ) {
        utmSource = "twitter";
        utmMedium = utmMedium || "social";
      } else if (referrerHostname.includes("instagram.com")) {
        utmSource = "instagram";
        utmMedium = utmMedium || "social";
      } else if (referrerHostname.includes("linkedin.com")) {
        utmSource = "linkedin";
        utmMedium = utmMedium || "social";
      } else if (referrerHostname.includes("google.")) {
        utmSource = "google";
        utmMedium = utmMedium || "organic";
      } else if (referrerHostname.includes("bing.com")) {
        utmSource = "bing";
        utmMedium = utmMedium || "organic";
      } else if (referrerUrl.hostname !== location.hostname) {
        // Any other external referrer
        utmSource = referrerHostname;
        utmMedium = utmMedium || "referral";
      }
    }

    // Store the UTM parameters in localStorage to persist across sessions
    if (utmSource) {
      localStorage.setItem("utm_source", utmSource);
      if (utmMedium) localStorage.setItem("utm_medium", utmMedium);
      if (utmCampaign) localStorage.setItem("utm_campaign", utmCampaign);
      if (utmTerm) localStorage.setItem("utm_term", utmTerm);
      if (utmContent) localStorage.setItem("utm_content", utmContent);
    }

    // Return either the URL parameters or the stored ones
    return {
      source: utmSource || localStorage.getItem("utm_source") || null,
      medium: utmMedium || localStorage.getItem("utm_medium") || null,
      campaign: utmCampaign || localStorage.getItem("utm_campaign") || null,
      term: utmTerm || localStorage.getItem("utm_term") || null,
      content: utmContent || localStorage.getItem("utm_content") || null,
    };
  }

  // Get UTM parameters using the new function
  var utmParams = getUTMParameters();

  var endpoint = "https://analytics-code.vercel.app/api/track";
  var sessionDuration = 30 * 60 * 1000; // 30 minutes

  // Visitor identification (anonymous)
  function getVisitorId() {
    var visitorId = localStorage.getItem("visitor_id");
    if (!visitorId) {
      visitorId = "visitor-" + Math.random().toString(36).substr(2, 16);
      localStorage.setItem("visitor_id", visitorId);
    }
    return visitorId;
  }

  // Country detection function
  function detectCountry(callback) {
    // First check if we have a stored country
    var storedCountry = localStorage.getItem("visitor_country");
    if (storedCountry) {
      callback(storedCountry);
      return;
    }

    // Try to get country using a free IP geolocation API
    fetch("https://ipapi.co/json/")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.country) {
          localStorage.setItem("visitor_country", data.country);
          callback(data.country);
        } else {
          callback("unknown");
        }
      })
      .catch(() => {
        // Fallback to another service if the first one fails
        fetch("https://ip-api.com/json/")
          .then((response) => response.json())
          .then((data) => {
            if (data && data.countryCode) {
              localStorage.setItem("visitor_country", data.countryCode);
              callback(data.countryCode);
            } else {
              callback("unknown");
            }
          })
          .catch(() => callback("unknown"));
      });
  }

  function generateSessionId() {
    return "session-" + Math.random().toString(36).substr(2, 9);
  }

  function initializeSession() {
    var sessionId = sessionStorage.getItem("session_id");
    var expirationTimestamp = sessionStorage.getItem(
      "session_expiration_timestamp"
    );
    var isNewSession = false;

    if (
      !sessionId ||
      !expirationTimestamp ||
      isSessionExpired(parseInt(expirationTimestamp))
    ) {
      // Generate a new session ID
      sessionId = generateSessionId();
      // Set the expiration timestamp
      expirationTimestamp = Date.now() + sessionDuration;
      // Store the session ID and expiration timestamp in sessionStorage
      sessionStorage.setItem("session_id", sessionId);
      sessionStorage.setItem(
        "session_expiration_timestamp",
        expirationTimestamp
      );
      isNewSession = true;
    } else {
      // Extend the session
      expirationTimestamp = Date.now() + sessionDuration;
      sessionStorage.setItem(
        "session_expiration_timestamp",
        expirationTimestamp
      );
    }

    if (isNewSession) {
      trackSessionStart();
    }

    return {
      sessionId: sessionId,
      expirationTimestamp: parseInt(expirationTimestamp),
      isNewSession: isNewSession,
    };
  }

  function isSessionExpired(expirationTimestamp) {
    return Date.now() >= expirationTimestamp;
  }

  function resetActivityTimer() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    var session = initializeSession();
    // Just updating the expiration time
  }

  // User activity monitoring
  ["mousedown", "keydown", "touchstart", "scroll"].forEach(function (evt) {
    document.addEventListener(evt, throttle(resetActivityTimer, 5000), {
      passive: true,
    });
  });

  // Throttle function to limit how often a function is called
  function throttle(func, limit) {
    var lastCall = 0;
    return function () {
      var now = Date.now();
      if (now - lastCall >= limit) {
        lastCall = now;
        func.apply(this, arguments);
      }
    };
  }

  // Function to send tracking events to the endpoint
  function trigger(eventName, eventData, options) {
    var session = initializeSession();
    var visitorId = getVisitorId();

    function sendWithCountry(country) {
      var payload = {
        event: eventName,
        url: location.href,
        path: location.pathname,
        domain: dataDomain,
        referrer: document.referrer,
        title: document.title,
        utm: utmParams,
        visitor_id: visitorId,
        session_id: session.sessionId,
        timestamp: new Date().toISOString(),
        screen: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
        language: navigator.language,
        user_agent: navigator.userAgent,
        country: country, // Add the country to the payload
        data: eventData || {},
      };

      // Using sendBeacon API for more reliable data sending, falling back to XHR
      if (navigator.sendBeacon && !options?.forceXHR) {
        navigator.sendBeacon(endpoint, JSON.stringify(payload));
        options?.callback?.();
      } else {
        sendRequest(payload, options);
      }
    }

    // Get country and then send the data
    detectCountry(sendWithCountry);
  }

  // Function to send HTTP requests
  function sendRequest(payload, options) {
    var request = new XMLHttpRequest();
    request.open("POST", endpoint, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        options?.callback?.();
      }
    };
    request.send(JSON.stringify(payload));
  }

  // Queue of tracking events
  var queue = (window.your_tracking && window.your_tracking.q) || [];

  // Enhanced API with more options
  window.your_tracking = function (eventName, eventData, options) {
    trigger(eventName, eventData, options);
  };

  // Public API methods
  window.your_tracking.pageview = function (customData) {
    trigger("pageview", customData);
  };

  window.your_tracking.event = function (category, action, label, value) {
    trigger("event", { category, action, label, value });
  };

  window.your_tracking.timing = function (category, variable, time, label) {
    trigger("timing", { category, variable, time, label });
  };

  // Process queued events
  for (var i = 0; i < queue.length; i++) {
    var args = queue[i];
    if (typeof args[0] === "string") {
      window.your_tracking.apply(this, args);
    }
  }

  function trackPageView() {
    window.your_tracking.pageview();
  }

  function trackSessionStart() {
    var referrerInfo = document.referrer
      ? {
          url: document.referrer,
          domain: new URL(document.referrer).hostname,
        }
      : null;

    trigger("session_start", {
      landing_page: location.href,
      referrer: referrerInfo,
    });
  }

  function trackSessionEnd() {
    var session = sessionStorage.getItem("session_id");
    if (session) {
      trigger(
        "session_end",
        {
          duration:
            Date.now() -
            parseInt(sessionStorage.getItem("last_activity") || Date.now()),
        },
        { forceXHR: true }
      );
    }
  }

  // Track performance metrics
  function trackPerformance() {
    if (window.performance && window.performance.timing) {
      var timing = window.performance.timing;
      var performanceData = {
        load_time: timing.loadEventEnd - timing.navigationStart,
        dom_ready: timing.domContentLoadedEventEnd - timing.navigationStart,
        network_latency: timing.responseEnd - timing.requestStart,
        processing_time: timing.domComplete - timing.responseEnd,
        total_time: timing.loadEventEnd - timing.navigationStart,
      };

      // Wait for the load event to finish
      setTimeout(function () {
        trigger("performance", performanceData);
      }, 0);
    }
  }

  // Track outbound links
  document.addEventListener("click", function (event) {
    var target = event.target.closest("a");
    if (!target) return;

    var href = target.getAttribute("href") || "";
    var isOutbound =
      href.indexOf("http") === 0 && !href.includes(location.hostname);
    var isDownload = /\.(pdf|zip|docx?|xlsx?|pptx?|rar|tar|gz|exe)$/i.test(
      href
    );

    if (isOutbound) {
      trigger("outbound_click", {
        url: href,
        text: target.innerText,
        target: target.getAttribute("target"),
      });
    }

    if (isDownload) {
      trigger("download", {
        file: href,
        name: href.split("/").pop(),
      });
    }
  });

  // Track form submissions
  document.addEventListener("submit", function (event) {
    var form = event.target;
    if (!form || !form.tagName || form.tagName.toLowerCase() !== "form") return;

    var formId = form.id || form.getAttribute("name") || "unknown_form";
    trigger("form_submit", {
      form_id: formId,
      form_class: form.className,
      form_action: form.action,
    });
  });

  // SPA navigation tracking
  var initialPathname = location.pathname;
  var lastHistoryState = history.state;

  // Listen for history API changes
  var originalPushState = history.pushState;
  history.pushState = function () {
    originalPushState.apply(this, arguments);
    handleUrlChange();
  };

  var originalReplaceState = history.replaceState;
  history.replaceState = function () {
    originalReplaceState.apply(this, arguments);
    handleUrlChange();
  };

  function handleUrlChange() {
    if (
      location.pathname !== initialPathname ||
      history.state !== lastHistoryState
    ) {
      setTimeout(function () {
        trackPageView();
        initialPathname = location.pathname;
        lastHistoryState = history.state;
      }, 50);
    }
  }

  // Track scrolling depth
  var scrollDepthMarkers = [25, 50, 75, 90];
  var scrollDepthTracked = {};

  window.addEventListener(
    "scroll",
    throttle(function () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      var scrollPercent = Math.round((scrollTop / scrollHeight) * 100);

      scrollDepthMarkers.forEach(function (marker) {
        if (scrollPercent >= marker && !scrollDepthTracked[marker]) {
          scrollDepthTracked[marker] = true;
          trigger("scroll_depth", { depth: marker });
        }
      });
    }, 1000)
  );

  // Initialize everything
  function initialize() {
    // Check for existing session
    initializeSession();

    // Track performance
    if (document.readyState === "complete") {
      trackPerformance();
    } else {
      window.addEventListener("load", trackPerformance);
    }

    // Track initial page view
    trackPageView();

    // Clean up when the page is unloaded
    window.addEventListener("beforeunload", function () {
      // Update last activity time to calculate session duration
      sessionStorage.setItem("last_activity", Date.now().toString());
      // Use a synchronous request for beforeunload
      trackSessionEnd();
    });

    // Event listeners for navigation
    window.addEventListener("popstate", handleUrlChange);
    window.addEventListener("hashchange", handleUrlChange);
  }

  // Start tracking
  initialize();
})();
