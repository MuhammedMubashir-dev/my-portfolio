// Summaries supported by the ENKE timesheet and project Git history.
export const caseStudies = {
  6: {
    title: "Reducing duplicate requests in order history",
    sections: [
      { heading: "The problem", text: "The Customer app fetched active and past orders repeatedly: the parent screen requested counts, while each list requested the same data separately for its content and count. Across both lists, this produced six API calls." },
      { heading: "My contribution", text: "I refactored the Flutter order-loading flow so each list could use one response for both its displayed orders and its Provider-backed count." },
      { heading: "The solution", text: "I removed the redundant requests from the parent screen and reused each list's existing response to update its count. This reduced the combined active and past order requests from six to two." },
      { heading: "Evidence and scope", text: "Commit 4d51aaa records the change across the parent, active-order, and past-order screens. The before-and-after code supports the request-count reduction; it does not establish a measured loading-time improvement." },
    ],
  },
  5: {
    title: "Exporting complete, filtered POS reports",
    sections: [
      { heading: "The problem", text: "A report screen displays one page at a time, but its Excel export needs every matching record. Reusing visible listing state during export can change the screen, while duplicate records or inconsistent pagination can produce a misleading file." },
      { heading: "My contribution", text: "I developed Flutter report and transaction exports that fetch all matching pages using a fixed set of filters. I kept export requests separate from visible Provider state and added guards against stale invoice responses." },
      { heading: "The solution", text: "The export validates record IDs, pagination metadata, and totals before creating the file, rejecting duplicate or incomplete results. Shared filters and responsive report layouts support mobile and desktop, with English, Arabic, and Malayalam translations." },
      { heading: "Verification", text: "I added unit and widget regression tests covering incomplete pages, duplicate IDs, changing totals, delayed responses, and filter state." },
    ],
  },
  4: {
    title: "Keeping sign-in and profile links connected",
    sections: [
      { heading: "The problem", text: "LinkedIn login has to return from the browser to the right app session on Android and iOS. A deferred profile link can also arrive during startup, before authentication and navigation are ready." },
      { heading: "My contribution", text: "I implemented LinkedIn authentication with PKCE, native Kotlin and Swift modules, browser callbacks, and backend API integration in React Native. I also worked on Branch deep-link handling across the app lifecycle." },
      { heading: "The solution", text: "The authentication flow validates callback state and exchanges the authorization code through the backend. A persistent Branch subscription retains deferred profile navigation through startup and resumes it once the user is authenticated." },
      { heading: "Verification", text: "I added authentication regression tests for callback handling and PKCE, and updated Android/iOS release configuration." },
    ],
  },
  2: {
    title: "Making delivery lists load and filter reliably",
    sections: [
      { heading: "The problem", text: "Ganvin Executive's delivery lists returned inconsistent results for date filters. Some requests ignored the filter, while today's orders could disappear because of a backend timezone mismatch. Each delivery stage also needed its own pagination state." },
      { heading: "My contribution", text: "I implemented the Flutter-side API filtering and infinite scrolling for Ready to Pick, Picked, Delivery, and Delivered lists, and investigated the unexpected API responses with the backend team." },
      { heading: "The solution", text: "I passed date_filter and per_page explicitly and maintained separate page, loading, and hasMore state for each list. I used an explicit all filter to fix the My Jobs empty state and traced the today-filter issue to server timestamps so the backend correction could be coordinated." },
      { heading: "How I verified it", text: "I tested the authenticated endpoints in Postman with today, week, month, and all filters, compared the returned records, and shared an updated Executive app build for senior review. The investigation distinguished client-side filter handling from the server-side date issue." },
    ],
  },
}
